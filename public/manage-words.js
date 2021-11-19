// client-side js
// run by the browser each time your view template referencing it is loaded

console.log("hello world :o");

const words = [];

// define variables that reference elements on our page
const wordsForm = document.forms[0];
const wordInput = wordsForm.elements["word"];
const wordsList = document.getElementById("words");
const clearButton = document.querySelector("#clear-words");

// request the words from our app's sqlite database
fetch("/getWords", {})
  .then((res) => res.json())
  .then((response) => {
    response.forEach((row) => {
      appendNewWord(row.word);
    });
  });

// a helper function that creates a list item for a given word
const appendNewWord = (word) => {
  const newListItem = document.createElement("li");
  newListItem.add;
  newListItem.innerText = word;
  newListItem.addEventListener("click", function (event) {
    let listItem = event.target
    let listItemText = { word : listItem.innerText}
    fetch("/dropWord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listItemText),
    })
      .then((res) => res.json())
      .then((response) => {});
      listItem.parentNode.removeChild(listItem);
  });
  wordsList.appendChild(newListItem);
};

// listen for the form to be submitted and add a new word when it is
wordsForm.onsubmit = (event) => {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const data = { word: wordInput.value };

  fetch("/addWord", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(JSON.stringify(response));
    });
  // get word value and add it to the list
  words.push(wordInput.value);
  appendNewWord(wordInput.value);

  // reset form
  wordInput.value = "";
  wordInput.focus();
};

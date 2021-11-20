// client-side js
// run by the browser each time your view template referencing it is loaded

const cards = [];

// define variables that reference elements on our page
const wordGrid = document.forms[0];
const wordsList = document.getElementById("words");
const clearButton = document.querySelector("#clear-words");

// request the words from our app's sqlite database
// a helper function that creates a list item for a given dream
function appendNewWord(card) {
  const newListItem = document.createElement("div");
  newListItem.className = "card " + card.type + " clicked";
  newListItem.innerText = card.word;
  wordsList.appendChild(newListItem);
}

function handleClick(event) {
  event.target.className += " clicked";
}

fetch("/getCards", {})
  .then(res => res.json())
  .then(response => {
    response.forEach(row => {
      appendNewWord(row);
    });
  });

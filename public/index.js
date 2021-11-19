// client-side js
// run by the browser each time your view template referencing it is loaded

const words = [];

// define variables that reference elements on our page
const cardGrid = document.getElementById("cards");
const clearButton = document.querySelector("#clear-cards");

// request the words from our app's sqlite database
// a helper function that creates a list item for a given dream
function appendNewWord(card) {
  const newListItem = document.createElement("div");
  newListItem.className = "card " + card.type;
  newListItem.innerText = card.word;
  newListItem.addEventListener("mousedown", handleClick);
  cardGrid.appendChild(newListItem);
}

function handleClick(event) {
  if (event.target.classList.contains("clicked")) {
    event.target.classList.remove("clicked");
  } else {
    event.target.className += " clicked";
  }
}

function getWords() {
  fetch("/getCards", {})
    .then(res => res.json())
    .then(response => {
      response.forEach(row => {
        appendNewWord(row);
      });
    });
}

getWords();

clearButton.addEventListener("click", event => {
  fetch("/newGame", {})
    .then(res => res.json())
    .then(response => {
      cardGrid.innerHTML = "";
      getWords();
    });
});

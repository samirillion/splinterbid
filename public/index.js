// client-side js
// run by the browser each time your view template referencing it is loaded
// const words = [];

// // define variables that reference elements on our page
// const cardGrid = document.getElementById("cards");
// const clearButton = document.querySelector("#clear-cards");

// // request the words from our app's sqlite database
// // a helper function that creates a list item for a given dream
// function appendNewWord(card) {
//   const newListItem = document.createElement("div");
//   newListItem.className = "card " + card.type;
//   newListItem.innerText = card.word;
//   newListItem.addEventListener("mousedown", handleClick);
//   cardGrid.appendChild(newListItem);
// }

// function handleClick(event) {
//   if (event.target.classList.contains("clicked")) {
//     event.target.classList.remove("clicked");
//   } else {
//     event.target.className += " clicked";
//   }
// }

// function getWords() {
//   fetch("/getCards", {})
//     .then(res => res.json())
//     .then(response => {
//       response.forEach(row => {
//         appendNewWord(row);
//       });
//     });
// }

// clearButton.addEventListener("click", event => {
//   fetch("/newGame", {})
//     .then(res => res.json())
//     .then(response => {
//       cardGrid.innerHTML = "";
//       getWords();
//     });
// });

function build_your_hand(hand_data) {
  var your_hand = document.querySelector(".bottom");
  hand_data.hand.map((element, index) => {
    var card = document.createElement("div");
    var denomination = document.createTextNode(element[0]);
    card.appendChild(denomination);
    card.className = "card suit-" + element[1];
    element[2] = card;
    your_hand.appendChild(card);
  });
}

function run() {
  var your_number = "1";
  build_your_hand(gameState.players[your_number]);
}

run();

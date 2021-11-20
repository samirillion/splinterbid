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
    card.className = "card " + generate_class(element);
    card.addEventListener("click", (event) => {
      console.log(event.target);
    });
    element[2] = card;
    your_hand.appendChild(card);
  });
}

function generate_class(card_data) {

  denomination = card_data[0];
  
  var suit = "spades";
  if (card_data[1] == 0) {
    suit = "clubs";
  } else if (card_data[1] == 1) {
    suit = "diamonds";
  } else if (card_data[1] == 2) {
    suit = "hearts";
  }

  return suit + "-" + denomination;
}

function run() {
  var your_number = "0";
  build_your_hand(gameState.players[your_number]);
}

run();

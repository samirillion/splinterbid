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
  hand_data.hand.map(function(element) {

    // Create the card object
    var card = document.createElement("div");

    // Add a custom class name for the image sprite and stuff: clubs-1, etc.
    card.className = "card " + generate_class(element);

    // Add an event listener for a first click
    card.addEventListener("click", card_click);

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

function card_click(e) {
  // If the card has been clicked
  if ("translateY(-60px)" == this.style.transform) {
    this.style.transform = "translateY(-40vh)";

  } else {
    this.style.transform = "translateY(-60px)";
    console.log(this.getBoundingClientRect());
  }
}

function run() {
  var your_number = "3";
  build_your_hand(gameState.players[your_number]);
}

run();

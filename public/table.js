function build_hands(gameState) {

  var your_position = gameState.your_position
  var hands = gameState.players

  if (your_position == 0) {
    build_hand(hands[your_position], ".bottom")
    build_hand(hands[2], ".top")
    build_hand(hands[1], ".left")
    build_hand(hands[3], ".right")
  }

  if (your_position == 1) {
    build_hand(hands[your_position], ".bottom")
    build_hand(hands[3], ".top")
    build_hand(hands[2], ".left")
    build_hand(hands[0], ".right")
  }

  if (your_position == 2) {
    build_hand(hands[your_position], ".bottom")
    build_hand(hands[0], ".top")
    build_hand(hands[3], ".left")
    build_hand(hands[1], ".right")
  }

  if (your_position == 3) {
    build_hand(hands[your_position], ".bottom")
    build_hand(hands[1], ".top")
    build_hand(hands[0], ".left")
    build_hand(hands[2], ".right")
  }

}
function build_hand(hand_data, selector) {

  var the_hand = document.querySelector(selector);

  hand_data.hand.map(function (element) {
    // Create the card object
    var card = document.createElement("div");

    // Create Card Back
    var card_back = document.createElement("div");
    card_back.className = "back";

    // Create Card Front (face)
    var card_front = htmlToElement(`
      <div class="front">
        <div class="num-box top suit"></div>
        <div class="num-box bottom suit"></div>
        <div class="suit main"></div>
      </div>
    `);

    card.append(card_back, card_front);

    // Add a custom class name for the image sprite and stuff: clubs-1, etc.
    card.className = "card " + generate_class(element);

    // Add an event listener for a first click
    card.addEventListener("click", card_click);

    element[2] = card;
    the_hand.appendChild(card);

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

  return suit + " " + suit + "-" + denomination;
}

function card_click(e) {
  // If the card has been clicked
  var clicked_once = this.className.search("clicked");

  if (-1 == clicked_once) {
    this.classList.add("clicked");
    this.style.transform = "translateY(-60px)";
  } else {
    this.classList.remove("clicked");
    this.style.transform = "translateY(-40vh) translateX(-80px)";
  }
}

function run(gameState) {
  
  build_hands(gameState)
}

run(gameState);

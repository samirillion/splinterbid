function build_hands() {
  // var your_position = STATE.your_position;
  // var hands = STATE.players;

  // if (your_position == "north") {
  //   build_hand(hands[your_position], "bottom");
  //   build_hand(hands["south"], "top");
  //   build_hand(hands["east"], "left");
  //   build_hand(hands["west"], "right");
  // }

  // if (your_position == "east") {
  //   build_hand(hands[your_position], "bottom");
  //   build_hand(hands["west"], "top");
  //   build_hand(hands["south"], "left");
  //   build_hand(hands["north"], "right");
  // }

  // if (your_position == "south") {
  //   build_hand(hands[your_position], "bottom");
  //   build_hand(hands["north"], "top");
  //   build_hand(hands["west"], "left");
  //   build_hand(hands["east"], "right");
  // }

  // if (your_position == "west") {
  //   build_hand(hands[your_position], "bottom");
  //   build_hand(hands["east"], "top");
  //   build_hand(hands["north"], "left");
  //   build_hand(hands["south"], "right");
  // }
}

function build_hand(hand_data, selector) {
  var the_hand = document.querySelector("." + selector);

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
    card.className = "card " + generate_card_classes(element, selector);

    // Add an event listener for a first click
    card.addEventListener("click", card_click);

    element[2] = card;
    the_hand.appendChild(card);
  });
}

function generate_card_classes(card_data, selector) {
  denomination = card_data[0];

  var suit = "spades";
  if (card_data[1] == 0) {
    suit = "clubs";
  } else if (card_data[1] == 1) {
    suit = "diamonds";
  } else if (card_data[1] == 2) {
    suit = "hearts";
  }

  return suit + " " + suit + "-" + denomination + " " + selector;
}

function card_click(e) {
  // If the card has been clicked
  if (!STATE.bid_stage()) {
    var clicked_once = this.className.search("once");

    if (-1 == clicked_once) {
      this.classList.add("once");
    } else {
      this.classList.add("twice");

      let card_rect = this.getBoundingClientRect();
      let target_rect = document
        .querySelector(".target")
        .getBoundingClientRect();
      let translate_x = target_rect.right - card_rect.right;
      let translate_y = target_rect.bottom - card_rect.top;

      this.style.transform =
        "translateY(" + translate_y + "px) translateX(" + translate_x + "px)";
    }
  }
}

function render_bids() {
  var bids = document.querySelector(".bids");
  var the_bids = bids.querySelector(".the-bids");

  [...the_bids.childNodes].forEach(function (bid) {
    bid.remove();
  });
  STATE.bids.forEach(function (bid, index) {
    var the_bid = htmlToElement(`
    <div class="quarter the-bid">
      ${bid}
    </div>
  `);
    the_bids.appendChild(the_bid);
  });
}

function update_bid_panel() {
  var bid_buttons = document.querySelectorAll(".bid");
  var legal_bids = STATE.get_legal_bids();

  bid_buttons.forEach(function (button, index) {
    if (legal_bids.includes(button.getAttribute("value"))) {
      button.disabled = false;
      button.addEventListener("click", handle_bid);
    } else {
      button.disabled = true;
      button.removeEventListener("click", handle_bid);
    }
  });
}

function handle_bid(event) {
  bid_value = this.getAttribute("value");
  last_bid = STATE.latest_bid();

  if (SUITS.includes(bid_value)) {
    STATE.bids.pop();
    STATE.bids.push(last_bid + bid_value);
  } else {
    STATE.bids.push(bid_value);
  }

  render_bids();
  update_bid_panel();

  if (!STATE.bid_stage()) {
    console.log("bidding is over");
    hide_bids();
  }
}

function hide_bids() {
  document.querySelector(".bids").classList.add("hidden");
}

function init() {
  build_hands();
  render_bids();
  update_bid_panel();
}

init();

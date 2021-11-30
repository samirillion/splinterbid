/**
 * Constants, including the STATE machine
 */
// Matrix to hack array rotation
const TOP_SEAT = {
  top: ["north", "east", "south", "west"],
  right: ["east", "south", "west", "north"],
  bottom: ["south", "west", "north", "east"],
  left: ["west", "north", "east", "south"],
};
const CARDS = [
  ["2", "clubs"],
  ["3", "clubs"],
  ["4", "clubs"],
  ["5", "clubs"],
  ["6", "clubs"],
  ["7", "clubs"],
  ["8", "clubs"],
  ["9", "clubs"],
  ["10", "clubs"],
  ["jack", "clubs"],
  ["queen", "clubs"],
  ["king", "clubs"],
  ["ace", "clubs"],
  ["2", "diamonds"],
  ["3", "diamonds"],
  ["4", "diamonds"],
  ["5", "diamonds"],
  ["6", "diamonds"],
  ["7", "diamonds"],
  ["8", "diamonds"],
  ["9", "diamonds"],
  ["10", "diamonds"],
  ["jack", "diamonds"],
  ["queen", "diamonds"],
  ["king", "diamonds"],
  ["ace", "diamonds"],
  ["2", "hearts"],
  ["3", "hearts"],
  ["4", "hearts"],
  ["5", "hearts"],
  ["6", "hearts"],
  ["7", "hearts"],
  ["8", "hearts"],
  ["9", "hearts"],
  ["10", "hearts"],
  ["jack", "hearts"],
  ["queen", "hearts"],
  ["king", "hearts"],
  ["ace", "hearts"],
  ["2", "spades"],
  ["3", "spades"],
  ["4", "spades"],
  ["5", "spades"],
  ["6", "spades"],
  ["7", "spades"],
  ["8", "spades"],
  ["9", "spades"],
  ["10", "spades"],
  ["jack", "spades"],
  ["queen", "spades"],
  ["king", "spades"],
  ["ace", "spades"],
];

const NUMBERS = ["1", "2", "3", "4", "5", "6", "7"];
const SUITS = ["C", "D", "H", "S", "NT"];

const STATE = {
  latest_bid: function () {
    return STATE.bids.at(-1);
  },
  bid_stage() {
    if (STATE.passes() < 3) {
      return true;
    } else {
      return false;
    }
  },
  passes() {
    var passes = 0;
    STATE.bids.forEach(function (bid) {
      if (bid == "pass") {
        passes += 1;
      } else {
        passes = 0;
      }
    });
    return passes;
  },
  get_legal_bids() {
    var legal_bids = [];
    var highest_bid = STATE.highest_bid();
    var latest_bid = STATE.latest_bid();

    // if there is no "high bid"
    if (STATE.bid_stage()) {
      if (!highest_bid) {
        legal_bids = ["pass"].concat(NUMBERS);
      } else {
        // If the latest bid is just a number, like "2"
        if (NUMBERS.includes(latest_bid)) {
          // if the latest bid is just a number
          if (highest_bid[0] == latest_bid[0]) {
            legal_bids = SUITS.slice(SUITS.indexOf(highest_bid[1]) + 1);
          } else {
            legal_bids = SUITS;
          }
        } else {
          var legal_numbers;
          if ("NT" !== highest_bid[1]) {
            legal_numbers = NUMBERS.slice(NUMBERS.indexOf(highest_bid[0]));
          } else {
            legal_numbers = NUMBERS.slice(NUMBERS.indexOf(highest_bid[0]) + 1);
          }
          legal_bids = ["pass", "double", "redouble"].concat(legal_numbers);
        }
      }
    }
    return legal_bids;
  },
  highest_bid() {
    high_bid = false;
    STATE.bids.forEach(function (bid) {
      if (STATE.get_number_suit(bid)) {
        let number_suit = STATE.get_number_suit(bid);
        let contender = [number_suit[1], number_suit[2]];

        if (!high_bid) {
          high_bid = contender;
        } else {
          if (contender[0] > high_bid[0]) {
            high_bid = contender;
          } else if (SUITS.indexOf(contender[1]) > SUITS.indexOf(high_bid[1])) {
            high_bid = contender;
          }
        }
      }
    });
    return high_bid;
  },
  get_number_suit(bid) {
    bid_regex = /([1-7])(C|S|H|D|(NT))/;
    if (bid_regex.test(bid)) {
      // Tests for bids of the form "1S", "4NT", etc
      let matched = bid.match(bid_regex);
      return matched;
    } else {
      return false;
    }
  },
  to_double() {
    return true;
  },
  to_redouble() {
    return true;
  },
  cardinals: {
    north() {
      return "bottom"
    },
    order() {
      // function to rotate the cardinals relative to player positions
      return TOP_SEAT[STATE.cardinals.north()];
    },
    this_hand() {
      return "north";
    },
    this_dealer() {
      return "north";
    },
  },
  bids: ["1NT", "2C", "2H", "double", "pass", "3C", "3H"],
  players: {
    north: {
      hand: [
        [1, 0],
        [4, 0],
        [6, 0],
        [9, 1],
        [11, 1],
        [2, 2],
        [4, 2],
        [8, 2],
        [9, 2],
        [7, 3],
        [8, 3],
        [10, 3],
        [12, 3],
      ],
    },
    east: {
      hand: [
        [0, 0],
        [9, 0],
        [12, 0],
        [0, 1],
        [2, 1],
        [3, 1],
        [6, 1],
        [8, 1],
        [3, 2],
        [5, 2],
        [6, 2],
        [7, 2],
        [9, 3],
      ],
    },
    south: {
      hand: [
        [3, 0],
        [8, 0],
        [10, 0],
        [4, 1],
        [5, 1],
        [7, 1],
        [10, 2],
        [1, 3],
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
        [11, 3],
      ],
    },
    west: {
      hand: [
        [2, 0],
        [5, 0],
        [7, 0],
        [11, 0],
        [1, 1],
        [10, 1],
        [12, 1],
        [0, 2],
        [1, 2],
        [11, 2],
        [12, 2],
        [0, 3],
        [2, 3],
      ],
    },
  },
  gameID: 0,
  numConnectedUsers: 4,
};

/**
 * Helpers
 */

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
}

/**
 * Application Code
 */

function render_hands() {
  Object.keys(TOP_SEAT).forEach(function (seat, index) {
    build_hand(seat, index);
  });
}

function build_hand(seat, index) {
  var hand_wrapper = document.getElementById(seat);
  var ordered_cardinals = STATE.order_cardinals();
  var cardinal_dir = ordered_cardinals[index];

  STATE.players[cardinal_dir].hand.forEach(function (element) {
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
    card.className = "card " + generate_card_classes(element);

    // Add an event listener for a first click
    card.addEventListener("click", card_click);

    element[2] = card;
    hand_wrapper.appendChild(card);
  });
}

function generate_card_classes(card_data) {
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

  // Handle if you get just a "1" as the start of a bid
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
    minimize_bids();
  }
}

function minimize_bids() {
  var bids = document.getElementById("bids");
  var bottom_left = document.getElementById("bottom-left");
  bottom_left.appendChild(bids);
  bids.classList.add("minimized");
}

function init() {
  render_hands();
  render_bids();
  update_bid_panel();
}

init();

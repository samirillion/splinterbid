const CARDINAL_ORDER = ["north", "east", "south", "west"];

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
/**
 * 0 == 'clubs'
 * 1 == 'diamonds'
 * 2 == 'hearts'
 * 3 == 'spades'
 *
 * denominations count from 2-A, starting with 0
 *
 * bids count from 1-7, starting with 1
 *
 * bids and denominations precede
 */
const STATE = {
  latest_bid: function () {
    return STATE.bids.at(-1);
  },
  get_legal_bids() {
    var legal_bids = [];
    var highest_bid = STATE.highest_bid();
    var latest_bid = STATE.latest_bid();

    // if there is no "high bid"
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
  to_double() {
    return true;
  },
  to_redouble() {
    return true;
  },
  dealer: "north",
  your_position: "east",
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

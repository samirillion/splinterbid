const STATE = {
    bid: {
      bids: ["1NT", "2C", "2H", "double", "pass", "3C", "3H"],
      latest() {
        return STATE.bid.bids.at(-1);
      },
      highest() {
        high_bid = false;
        STATE.bid.bids.forEach(function (bid) {
          if (STATE.bid.get_number_suit(bid)) {
            let number_suit = STATE.bid.get_number_suit(bid);
            let contender = [number_suit[1], number_suit[2]];
  
            if (!high_bid) {
              high_bid = contender;
            } else {
              if (contender[0] > high_bid[0]) {
                high_bid = contender;
              } else if (
                SUITS.indexOf(contender[1]) > SUITS.indexOf(high_bid[1])
              ) {
                high_bid = contender;
              }
            }
          }
        });
        return high_bid;
      },
      is_bid_stage() {
        if (STATE.bid.passes() < 3) {
          return true;
        } else {
          return false;
        }
      },
      passes() {
        var passes = 0;
        STATE.bid.bids.forEach(function (bid) {
          if (bid == "pass") {
            passes += 1;
          } else {
            passes = 0;
          }
        });
        return passes;
      },
      get_legals() {
        var legal_bids = [];
        var highest_bid = STATE.bid.highest();
        var latest_bid = STATE.bid.latest();
  
        // if there is no "high bid"
        if (STATE.bid.is_bid_stage()) {
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
                legal_numbers = NUMBERS.slice(
                  NUMBERS.indexOf(highest_bid[0]) + 1
                );
              }
              legal_bids = ["pass", "double", "redouble"].concat(legal_numbers);
            }
          }
        }
        return legal_bids;
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
      offset() {
        return Object.keys(CARDINAL_MATRIX).indexOf(STATE.cardinal.first_bidder())
      },
      to_double() {
        return true;
      },
      to_redouble() {
        return true;
      },
    },
    cardinal: {
      first_bidder() {
        for (const property in CARDINAL_MATRIX) {
          if (CARDINAL_MATRIX[property][1] == STATE.cardinal.this_dealer()) {
            return property;
          }
        }
      },
      north() {
        for (const property in CARDINAL_MATRIX) {
          if (CARDINAL_MATRIX[property][2] == STATE.cardinal.this_hand()) {
            return property;
          }
        }
      },
      order() {
        // function to rotate the cardinals relative to player positions
        return CARDINAL_MATRIX[STATE.cardinal.north()];
      },
      this_hand() {
        // get from an async call
        return "west";
      },
      this_dealer() {
        // get from an async call
        return "north";
      },
    },
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
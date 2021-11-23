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
const gameState = {
  bids: [
    [1, 1],
    [1, 3],
    "pass",
    [2, 3],
    "pass",
    [4, 3],
    "pass",
    "pass",
    "pass",
  ],
  currentTrick: {
    firstPlayer: "None",
    isTrumped: "False",
    ledSuit: "None",
    trick: {},
    trumpSuit: 3,
  },
  lastTrick: {
    firstPlayer: "None",
    isTrumped: "False",
    ledSuit: "None",
    trick: {},
    trumpSuit: 3,
  },
  your_position: "2",
  players: {
    "0": {
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
    "1": {
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
    "2": {
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
    "3": {
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

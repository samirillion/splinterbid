/**
 * Super cool description - Socket Code
 */
 var socket = io.connect('http://' + document.domain + ':' + location.port);
 var playerNum = null;
 
 socket.on('connect', function() {
     console.log('Websocket connected!');
 });
 
 socket.on('error', function(msg) {
     console.error(msg['error']);
 });
 
 socket.on('room_made', function(msg) {
     var gameID = msg['gameID'];
     createButton('Join Room ' + gameID, makeJoinRoomFunction(gameID));
 });
 
 socket.on('player_num', function(msg) {
     playerNum = msg['playerNum'];
     console.log('Received player num: ' + playerNum);
 });
 
 socket.on('initial_connection', function(msg) {
     var gameIDs = msg['gameIDs'];
     console.log(msg)
     createButton('Make Room!', createRoom);
     for (i=0; i < gameIDs.length; i++){
         var gameID = gameIDs[i];

         createButton('Join Room ' + gameID, makeJoinRoomFunction(gameID));
     }
 });
 
 socket.on('game_state', function(msg) {
     var gameState = JSON.parse(msg);
     console.log('Message received.');
     console.log(gameState);
 });
 
 function makeJoinRoomFunction(gameID) {
     return function () {
         socket.emit('join_game', {'gameID': gameID});
     }
 }
 
 function createRoom() {
     socket.emit('create_room', {});
 }



/**
 * Application Code
 */
function render_hands() {
  Object.keys(CARDINAL_MATRIX).forEach(function (seat, index) {
    build_hand(seat, index);
  });
}

function build_hand(seat, index) {
  var hand_wrapper = document.getElementById(seat);
  var ordered_cardinals = STATE.cardinal.order();
  var cardinal_pointer = ordered_cardinals[index];

  hand_wrapper.classList.add(cardinal_pointer);
  if (cardinal_pointer == STATE.cardinal.this_dealer()) {
    hand_wrapper.classList.add("dealer");
  }

  STATE.players[cardinal_pointer].hand.forEach(function (card_data) {
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
    card.className = "card " + generate_card_classes(card_data);

    // Add an event listener for a first click
    card.addEventListener("click", card_click);

    card_data[2] = card;
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
  if (!STATE.bid.is_bid_stage()) {
    var clicked_once = this.className.search("once");

    if (-1 == clicked_once) {
      this.classList.add("once");
    } else {
      this.classList.add("twice");

      var card_rect = this.getBoundingClientRect();
      var target_rect = document
        .querySelector(".target")
        .getBoundingClientRect();

      var translate_x = target_rect.right - card_rect.right;
      var translate_y = target_rect.bottom - card_rect.top;

      var location = this.parentNode.id;
      if (location == "top") {
        translate_y -= 250;
      } else if (location == "left") {
        translate_x -= 120;
        translate_y -= 150;
      } else if (location == "right") {
        translate_x += 120;
        translate_y -= 150;
      } else {
        translate_y -= 50;
      }

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

  STATE.bid.bids.forEach(function (bid, index) {
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
  var legal_bids = STATE.bid.get_legals();

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
  last_bid = STATE.bid.latest();

  // Handle if you get just a "1" as the start of a bid
  if (SUITS.includes(bid_value)) {
    STATE.bid.bids.pop();
    STATE.bid.bids.push(last_bid + bid_value);
  } else {
    STATE.bid.bids.push(bid_value);
  }

  render_bids();
  update_bid_panel();

  if (!STATE.bid.is_bid_stage()) {
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

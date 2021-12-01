/**
 * Super cool description
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
     createButton('Join Room' + gameID, makeJoinRoomFunction(gameID));
 });
 
 socket.on('player_num', function(msg) {
     playerNum = msg['playerNum'];
     console.log('Received player num: ' + playerNum);
 });
 
 socket.on('initial_connection', function(msg) {
     var gameIDs = msg['gameIDs'];
     createButton('Make Room!', createRoom);
     for (i=0; i < gameIDs.length; i++){
         var gameID = gameIDs[i];
         createButton('Join Room' + gameID, makeJoinRoomFunction(gameID));
     }
 });
 
 socket.on('game_state', function(msg) {
     var gameState = JSON.parse(msg);
     console.log('Message receieved.');
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
 
 function createButton(text, clickEvent) {
     var button = document.createElement("BUTTON");
     var textField = document.createTextNode(text);
     button.onclick = clickEvent;
     button.appendChild(textField);
     document.body.appendChild(button);
 }
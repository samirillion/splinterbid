import '@babel/polyfill'
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import io from 'socket.io-client'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#00F064',
    secondary: '#408A5E',
    info: '#5B75F0',
    error: '#F8F1F9',
    success: '#00F064',
    warning: '#F6F2F0'
  }
})

/**
 * Super cool description
 */
var socket = io.connect('http://localhost:5000');
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
    for (let i=0; i < gameIDs.length; i++){
        var gameID = gameIDs[i];
        createButton('Join Room' + gameID, makeJoinRoomFunction(gameID));
    }
});

// for debugging purposes
socket.on('message', function(msg) {
    console.log('Message receieved');
    var obj = JSON.parse(msg);
    console.log(obj);
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

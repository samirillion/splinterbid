from flask import Flask, render_template, send_from_directory, request
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from GameCode import GameRoom


# Initialize Flask
app = Flask(__name__)
socketio = SocketIO(app)
ACTIVE_GAMES = {}  # dict to track active Games


def updateAllUsersInRoom(gameID):
    game = ACTIVE_GAMES[gameID]
    send(game.serializeGameState(), json=True, room=gameID)


def whichGameIsUserIn(userID):
    for gameID, game in ACTIVE_GAMES.iteritems():
        if game.isUserConnected(userID):
            return gameID

    return None


def leaveGame(userID):
    for gameID, game in ACTIVE_GAMES.iteritems():
        if game.isUserConnected(userID):
            game.leave(userID)
            updateAllUsersInRoom(gameID)


# Returns False if join failed, along with the failure message
def joinGame(userID, gameID):
    game = ACTIVE_GAMES.get(gameID)
    if game is None:
        error = 'Tried to join game which does not exist.'

    activeGame = whichGameIsUserIn(userID)
    if activeGame is not None:
        error = 'Failed to join game. Already in one.'

    error = game.join(userID)
    if error is None:
        join_room(gameID)

        # Send the whole room the game state
        emit(player_num, game.getPlayerNum(userID))
        send(game.serializeGameState(), room=gameID)

        return None

    return error




@app.route('/')
def index():
    """Serve the index HTML"""
    return render_template('index.html')


@app.route('/client.js')
def serveJavascript():
    return send_from_directory('../BridgeClient', 'client.js')


@socketio.on('play_card')
def on_play_card(data):
    suit = data['suit']
    value = data['value']
    gameID = int(data['gameID'])

    game = ACTIVE_GAMES.get(gameID)
    error = None
    if game is not None:
        success, possibleError = game.playCard(request.sid, suit, value)
        if success:
            updateAllUsersInRoom(gameID)
        else:
            error = possibleError
    else:
        error = 'gameID is invalid'

    if error is not None:
        emit('error', {'error': error})


@socketio.on('create_room')
def on_create_room(data):
    print('User %s is making a room' % request.sid)

    game = GameRoom(updateAllUsersInRoom)
    gameID = game.getGameID()
    ACTIVE_GAMES[gameID] = game
    emit('room_made', {'gameID': gameID}, broadcast=True)


@socketio.on('join_game')
def on_join(data):
    gameID = data['gameID']
    userID = request.sid

    print('User %s is trying to join game %s' % (userID, gameID))

    error = joinGame(userID, gameID)
    if error is not None:
        emit('error', {'error': error})
        print('Failure!')
    else:
        print('Success!')


@socketio.on('connect')
def connect():
    print('Client %s connected!' % request.sid)  # TODO: Create a better association, in case user disconnects
    gameIDs = []
    for room in ACTIVE_GAMES:
        gameIDs.append(room)
    ret = {
        'gameIDs': gameIDs,
    }
    emit('initial_connection', ret)


@socketio.on('disconnect')
def disconnect():
    userID = request.sid
    print('Client %s disconnected!' % (userID,))
    leaveGame(userID)


if __name__ == '__main__':
    socketio.run(app, debug=True, use_reloader=False)
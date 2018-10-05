import json
from constants import PLAYERS
from functools import partial
from game import Game


def uniqueIDGenerator():
    uniqueID = 0
    while True:
        yield uniqueID
        uniqueID += 1


class GameRoom(object):
    ID_GENERATOR = uniqueIDGenerator()

    def __init__(self, updateAllUsersFunction):
        self.__id = next(GameRoom.ID_GENERATOR)
        self.__connectedUsers = set()
        self.__updateAllUsers = partial(updateAllUsersFunction, self.__id)
        self.__game = game.Game()

    def getGameID(self):
        return self.__id

    def serializeGameState(self):
        ret = {
            'gameID': self.__id,
            'numConnectedUsers': len(self.__connectedUsers),
            'game': self.__game.getGameState()
        }

        return json.dumps(ret)

    def join(self, userID):
        error = self.__game.addPlayer(userID)
        if error is None:
            self.__connectedUsers.add(userID)

        return None

    def getPlayerNum(self, userID):
        playerNum = self.__game.getPlayerNumByUserID(userID)
        assert playerNum is not None
        return playerNum

    def leave(self, userID):
        self.__connectedUsers.remove(userID)
        self.__game.removePlayer(userID)

    def isUserConnected(self, userID):
        return userID in self.__connectedUsers

    def isGameFull(self):
        return len(self.__connectedUsers) >= PLAYERS.TOTAL_PLAYERS

    def playCard(self, userID, suit, value):
        return self.__game.playCard(userID, suit, value)

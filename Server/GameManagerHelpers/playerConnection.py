from socket import socket, gethostname, AF_INET, SOCK_STREAM
from Common.constants import SERVER_TO_CLIENT_MESSAGE_TYPE, PLAYER_INPUT
from threading import Thread
from pprint import pprint
import json

from Common.constants import PLAYERS, CONNECTION_SETTINGS


class ConnectionManager(object):
    class PlayerConnection(object):
        def __init__(self, playerNumber, connectionManager):
            self.__playerNumber = playerNumber
            self.__connectionManager = connectionManager

            self.__client = None

        def giveClient(self, client):
            self.__client = client
            Thread(target=self.__handleClient).start()

        def __handleClient(self):
            while True:
                message = self.__client.recv(CONNECTION_SETTINGS.BUFFER_SIZE)
                try:
                    message = json.loads(message)
                except:  # TODO: figure out the actual exception we want here
                    print('Error, client sent invalid json blob')
                    continue
                self.__connectionManager.messageReceived(self.__playerNumber, message)

        def sendToClient(self, msg):
            # TODO: remove this print once it's not kinda useful
            #print('Sending to client', self.__playerNumber, msg)
            self.__client.send(msg)

    def __init__(self):
        self.__connectedPlayers = []
        self.__connection = socket(AF_INET, SOCK_STREAM)
        self.__connection.bind((gethostname(), CONNECTION_SETTINGS.PORT))
        self.__connection.listen(10)  # TODO, what should this be?
        self.__messageHandlers = {}

    def sendMessageToPlayer(self, playerNumber, message, messageType):
        assert messageType in SERVER_TO_CLIENT_MESSAGE_TYPE.ALL_MESSAGE_TYPES
        message['messageType'] = messageType
        message = json.dumps(message)
        self.__connectedPlayers[playerNumber].sendToClient(message)

    def connect(self):
        for playerNumber in xrange(PLAYERS.TOTAL_PLAYERS):
            print('Waiting for player %d to connect' % playerNumber)
            client, clientAddress = self.__connection.accept()
            newPlayerConnection = ConnectionManager.PlayerConnection(playerNumber, self)
            newPlayerConnection.giveClient(client)
            self.__connectedPlayers.append(newPlayerConnection)

        print('All players connected')

    def registerForMessage(self, messageType, callback):
        assert callable(callback)
        assert messageType in PLAYER_INPUT.INPUT_TO_SERVER
        self.__messageHandlers.setdefault(messageType, []).append(callback)

    def messageReceived(self, playerNumber, message):
        message['playerNumber'] = playerNumber
        messageType = message.get('messageType', None)
        if messageType in self.__messageHandlers:
            for handler in self.__messageHandlers[messageType]:
                handler(message)
        else:
            print('ERROR unhandled message:')
            pprint(message)

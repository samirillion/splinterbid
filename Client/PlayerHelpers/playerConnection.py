from socket import socket, gethostname, AF_INET, SOCK_STREAM
from threading import Thread
from pprint import pprint
from Common.constants import SERVER_TO_CLIENT_MESSAGE_TYPE, PLAYER_INPUT
import json

from Common.constants import CONNECTION_SETTINGS


class ServerConnection(object):
    def __init__(self):
        self.__messageHandlers = {}
        self.__unhandledMessages = {}
        self.__connection = socket(AF_INET, SOCK_STREAM)
        self.__connection.connect((gethostname(), CONNECTION_SETTINGS.PORT))
        Thread(target=self.receive).start()

    def sendMessageToServer(self, messageType, message):
        assert messageType in PLAYER_INPUT.INPUT_TO_SERVER
        message['messageType'] = messageType
        #print('Sending message', message)
        self.__connection.send(json.dumps(message))

    def registerForMessageType(self, messageType, callback):
        assert callable(callback)
        assert messageType in SERVER_TO_CLIENT_MESSAGE_TYPE.ALL_MESSAGE_TYPES

        self.__messageHandlers.setdefault(messageType, []).append(callback)

        # Flush unhandled messages, now that there's a handler
        for message in self.__unhandledMessages.get(messageType, []):
            for handler in self.__messageHandlers[messageType]:
                handler(message)

    def handleMessage(self, message, messageType):
        assert messageType in SERVER_TO_CLIENT_MESSAGE_TYPE.ALL_MESSAGE_TYPES

        # TODO: delete this once we no longer sometimes need it
        #pprint(message)

        if messageType in self.__messageHandlers:
            for handler in self.__messageHandlers[messageType]:
                handler(message)
        else:
            self.__unhandledMessages.setdefault(messageType, []).append(message)

    def receive(self):
        while True:
            try:
                message = self.__connection.recv(CONNECTION_SETTINGS.BUFFER_SIZE).decode("utf8")
                message = json.loads(message)
                messageType = message['messageType']

                self.handleMessage(message, messageType)
            except OSError:
                print('OSError Exception, stopping.')
                break

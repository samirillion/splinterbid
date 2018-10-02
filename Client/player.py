from Client.PlayerHelpers.playerConnection import ServerConnection
from Client.PlayerHelpers.state import StateTracker
from Client.PlayerHelpers.inputHandler import InputHandler
from Common.constants import SERVER_TO_CLIENT_MESSAGE_TYPE, PLAYER_INPUT, SUIT


class Player(object):
    def __init__(self):
        self.__stateTracker = StateTracker()
        self.__connection = ServerConnection()
        self.__inputHandler = InputHandler()
        self.__connection.registerForMessageType(SERVER_TO_CLIENT_MESSAGE_TYPE.ALL_DATA, self.__stateUpdate)
        self.__connection.registerForMessageType(SERVER_TO_CLIENT_MESSAGE_TYPE.YOUR_TURN, self.__takeTurn)
        self.__connection.registerForMessageType(SERVER_TO_CLIENT_MESSAGE_TYPE.ERROR_MESSAGE, self.__handleErrorMessage)

    def __stateUpdate(self, message):
        self.__stateTracker.updateState(message)

    @staticmethod
    def __handleErrorMessage(message):
        print('Server error says: %s' % message['error'])

    # TODO: This assumes what state we're in. Is that OK?
    # Should the message contain anything?
    def __takeTurn(self, message):
        while True:
            playerInput, card = self.__inputHandler.getInput()
            assert playerInput in PLAYER_INPUT.ALL_INPUTS
            currentState = self.__stateTracker.getState()
            if playerInput == PLAYER_INPUT.SHOW_MY_HAND:
                myHand = currentState.getMyHand()
                if myHand is None:
                    print('ERROR, haven\'t received our hand yet')
                    continue
                myHand.display()
            elif playerInput == PLAYER_INPUT.SHOW_DUMMY_HAND:
                dummyHand = currentState.getDummyHand()
                if dummyHand is None:
                    print('Haven\'t received dummy hand yet')
                    continue
                dummyHand.display()
            elif playerInput == PLAYER_INPUT.SHOW_CURRENT_TRICK:
                currentTrick = currentState.getCurrentTrick()
                if currentTrick is None:
                    print('ERROR Haven\'t received current trick yet')
                    continue
                currentTrick.display()
            elif playerInput == PLAYER_INPUT.SHOW_LAST_TRICK:
                lastTrick = currentState.getLastTrick()
                if lastTrick is None:
                    print('ERROR Haven\'t received last trick yet')
                    continue
                lastTrick.display()
            elif playerInput == PLAYER_INPUT.SHOW_TRUMP_SUIT:
                trumpSuit = currentState.getTrumpSuit()
                print('Trump suit: %s' % SUIT.STRING_REPR[trumpSuit])
            elif playerInput == PLAYER_INPUT.PLAY_CARD:
                self.__connection.sendMessageToServer(PLAYER_INPUT.PLAY_CARD, {'card': card.serializeOut()})
                break
            else:
                print('ERROR unhandled input: %s' % playerInput)



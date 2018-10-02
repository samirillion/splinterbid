from Common import Bid, Trick, Hand
from Common.constants import GAME_PHASE
from pprint import pprint


class State(object):
    def __init__(self):
        pass

    def getGamePhase(self):
        assert False  # Needs to be overridden in child class

    def sendStateUpdate(self, message):
        assert False  # Needs to be overridden in child class


class BidState(State):
    def getGamePhase(self):
        return GAME_PHASE.BID


class PlayState(State):
    def __init__(self):
        super(PlayState, self).__init__()
        self.__bid = None
        self.__currentPlayer = None
        self.__currentTrick = None
        self.__dummyHand = None
        self.__dummyPlayer = None
        self.__hands = None
        self.__lastTrick = None
        self.__players = None
        self.__playerNumber = None
        self.__myHand = None
        self.__takingPlayer = None
        self.__trumpSuit = None

    def getGamePhase(self):
        return GAME_PHASE.PLAY

    def sendStateUpdate(self, message):
        self.__bid = Bid(data=message['bid'])
        self.__currentPlayer = message['currentPlayer']
        self.__currentTrick = Trick(data=message['currentTrick'])
        self.__dummyPlayer = message['dummyPlayer']
        self.__lastTrick = Trick(data=message['lastTrick'])
        self.__playerNumber = message['playerNumber']
        self.__takingPlayer = message['takingPlayer']
        self.__trumpSuit = message['trumpSuit']
        self.__dummyHand = None
        self.__myHand = None
        self.__hands = {}

        for playerNumber, handData in message['players'].iteritems():
            playerNumber = int(playerNumber)

            if self.__playerNumber == playerNumber:
                self.__myHand = Hand(data=handData['hand'])

            # The only other hand we should have data on is the dummy player
            elif 'hand' in handData:
                self.__dummyHand = Hand(data=handData['hand'])

            self.__hands[playerNumber] = {
                'handSize': handData['handSize'],
                'isTaker': handData['isTaker'],
            }

    def getDummyHand(self):
        return self.__dummyHand

    def getMyHand(self):
        return self.__myHand

    def getCurrentTrick(self):
        return self.__currentTrick

    def getLastTrick(self):
        return self.__lastTrick

    def getTrumpSuit(self):
        return self.__trumpSuit


class ScoreState(State):
    def getGamePhase(self):
        return GAME_PHASE.SCORE


class StateTracker(object):
    def __init__(self):
        self.__state = None

    def getState(self):
        return self.__state

    def updateState(self, message):
        gamePhase = message['gamePhase']
        assert gamePhase in GAME_PHASE.ALL_GAME_PHASES

        # If we're not in the right state, set us to the right state
        if self.__state is None or self.__state.getGamePhase() != gamePhase:
            if gamePhase == GAME_PHASE.BID:
                self.__state = BidState()
            elif gamePhase == GAME_PHASE.PLAY:
                self.__state = PlayState()
            elif gamePhase == GAME_PHASE.SCORE:
                self.__state = ScoreState()

        self.__state.sendStateUpdate(message)

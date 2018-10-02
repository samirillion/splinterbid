from Common import Deck, Trick, Card
from Common.constants import PLAYERS, SERVER_TO_CLIENT_MESSAGE_TYPE, PLAYER_INPUT, GAME_PHASE, TOTAL_TRICKS
from Server.player import Player


class Manager(object):
    def start(self):
        assert False


class BidManager(Manager):
    pass


class PlayManager(Manager):
    def __init__(self, info):
        self.__currentPlayer = (info['takingPlayer'] - 1) % PLAYERS.TOTAL_PLAYERS
        self.__takingPlayer = info['takingPlayer']
        self.__dummyPlayer = (self.__takingPlayer + 2) % PLAYERS.TOTAL_PLAYERS
        self.__leadingPlayer = self.__currentPlayer
        self.__isFirstPlay = True
        self.__takenTricks = []
        self.__trumpSuit = info['trumpSuit']
        self.__bid = info['bid']
        self.__connectionManager = info['connectionManager']
        self.__lastTrick = Trick(self.__trumpSuit)
        self.__currentTrick = Trick(self.__trumpSuit)
        self.__deck = Deck()
        self.__deck.shuffle()
        self.__waitingForPlayer = None

        self.__allPlayers = []
        for x in xrange(PLAYERS.TOTAL_PLAYERS):
            isTakingPlayer = x == self.__takingPlayer
            self.__allPlayers.append(Player(x, self.__deck.getStartingHand(x), isTakingPlayer, self))

    def __getCurrentState(self, playerNumberToGetStateFor):
        ret = {
            'playerNumber': playerNumberToGetStateFor,
            'dummyPlayer': self.__dummyPlayer,
            'lastTrick': self.__lastTrick.serializeOut(),
            'currentTrick': self.__currentTrick.serializeOut(),
            'currentPlayer': self.__currentPlayer,
            'takingPlayer': self.__takingPlayer,
            'bid': self.__bid.serializeOut(),
            'trumpSuit': self.__trumpSuit,
            'gamePhase': GAME_PHASE.PLAY,
        }

        players = {}

        for playerNumber, player in enumerate(self.__allPlayers):
            fullSerialize = False
            if playerNumber == playerNumberToGetStateFor:
                fullSerialize = True
            elif playerNumber == self.__dummyPlayer and not self.__isFirstPlay:
                fullSerialize = True

            players[playerNumber] = player.serializeOut(fullSerialize)

        ret['players'] = players

        return ret

    def start(self):
        print('PlayManager Starting')
        self.__updateAllPlayers()

        # TODO: We need to find a way to unregister for this...
        self.__connectionManager.registerForMessage(PLAYER_INPUT.PLAY_CARD, self.__handlePlayerPlayedCard)
        while self.__takenTricks != TOTAL_TRICKS:
            if self.__waitingForPlayer is not None:
                continue
            if self.__currentPlayer == self.__dummyPlayer:
                self.__waitingForPlayer = self.__takingPlayer
            else:
                self.__waitingForPlayer = self.__currentPlayer
            self.__tellPlayerItsTheirTurn(self.__waitingForPlayer)

    def __moveToNextPlayer(self):
        self.__currentPlayer += 1
        self.__currentPlayer = self.__currentPlayer % PLAYERS.TOTAL_PLAYERS

    def __updateAllPlayers(self):
        for playerNumber, player in enumerate(self.__allPlayers):
            self.__connectionManager.sendMessageToPlayer(playerNumber, self.__getCurrentState(playerNumber),
                                                         SERVER_TO_CLIENT_MESSAGE_TYPE.ALL_DATA)

    def __tellPlayerItsTheirTurn(self, playerNumber):
        self.__connectionManager.sendMessageToPlayer(playerNumber, {},
                                                     SERVER_TO_CLIENT_MESSAGE_TYPE.YOUR_TURN)

    def __handleTrickEnded(self):
        self.__takenTricks.append(self.__currentTrick)
        self.__currentPlayer = self.__currentTrick.whichPlayerTookTrick()
        self.__lastTrick = self.__currentTrick
        self.__currentTrick = Trick(self.__trumpSuit)

    def __handlePlayerPlayedCard(self, message):
        playerNumber = message['playerNumber']
        handPlayed = self.__currentPlayer  # This might be different than playerNumber because it might be the dummy
        card = message.get('card', None)
        if playerNumber != self.__waitingForPlayer:
            self.__sendErrorToClient(playerNumber, 'Not your turn')
            return
        if card is None:
            self.__sendErrorToClient(playerNumber, 'No card sent')
            self.__tellPlayerItsTheirTurn(playerNumber)
            return
        card = Card(data=card)
        if not self.__allPlayers[handPlayed].isValidPlay(card, self.__currentTrick.getLedSuit()):
            self.__sendErrorToClient(playerNumber, 'Invalid play')
            self.__tellPlayerItsTheirTurn(playerNumber)
            return

        self.__allPlayers[handPlayed].removeCard(card)
        self.__currentTrick.addPlay(handPlayed, card)
        if self.__currentTrick.isTrickFinished():
            print('Trick finished. Moving on')
            self.__handleTrickEnded()
        else:
            self.__moveToNextPlayer()
        self.__isFirstPlay = False
        self.__updateAllPlayers()
        self.__waitingForPlayer = None

    def __sendErrorToClient(self, playerNumber, errorMessage):
        self.__connectionManager.sendMessageToPlayer(playerNumber, {'error': errorMessage},
                                                     SERVER_TO_CLIENT_MESSAGE_TYPE.ERROR_MESSAGE)

    def getCurrentTrick(self):
        return self.__currentTrick

    def getLastTrick(self):
        return self.__lastTrick

    def getTrumpSuit(self):
        return self.__trumpSuit

    @staticmethod
    def __displayResults():
        print('Finished!')


class ScoreManager(Manager):
    pass

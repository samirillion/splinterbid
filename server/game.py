from constants import PLAYERS, SUIT, VALUE
from player import Player
from Structures import Deck, Card, Trick


class Game(object):
    def __init__(self):
        self.__deck = Deck()
        self.__players = {}
        self.__userToPlayerMapping = {}
        self.__trumpSuit = SUIT.SPADES
        self.__currentTrick = Trick(self.__trumpSuit)
        self.__lastTrick = Trick(self.__trumpSuit)
        self.__turn = PLAYERS.NORTH
        for x in xrange(PLAYERS.TOTAL_PLAYERS):
            self.__players[x] = Player(self.__deck.getStartingHand(x))
            self.__userToPlayerMapping[x] = None

    def getPlayerNumByUserID(self, userID):
        for playerNum, user in self.__userToPlayerMapping.items():
            if user == userID:
                return playerNum

        return None

    # Returns game state as a dict
    def getGameState(self):
        players = {}
        for playerNum, player in self.__players.items():
            players[playerNum] = player.getPlayerState()

        ret = {
            'players': players,
            'currentTrick': self.__currentTrick.serializeOut(),
            'lastTrick': self.__lastTrick.serializeOut(),
        }

        return ret

    def addPlayer(self, userID):
        playerNum = self.getPlayerNumByUserID(userID)
        error = None
        if playerNum is not None:
            error = 'Already a player in here'

        for playerNum, user in self.__userToPlayerMapping.items():
            if user is None:
                self.__userToPlayerMapping[playerNum] = userID
                break
        else:
            error = 'Room is full!'

        return error

    def removePlayer(self, userID):
        for playerNum, user in self.__userToPlayerMapping.items():
            if user == userID:
                self.__userToPlayerMapping[playerNum] = None

    def playCard(self, userID, suit, value):
        error = None
        try:
            suit = int(suit)
        except ValueError:
            error = 'Invalid (non integer) suit'

        try:
            value = int(value)
        except ValueError:
            error = 'Invalid (non integer) value'

        if suit not in SUIT.RANGE:
            error = 'Suit out of range'

        if value not in VALUE.RANGE:
            error = 'Value out of range'

        if error is None:
            card = Card(suit, value)
            playerNum = self.getPlayerNumByUserID(userID)
            if playerNum == self.__turn:
                player = self.__players[playerNum]
                playableCards = player.getPlayableCards(self.__currentTrick)

                if card in playableCards:
                    # Card passed validations, play it
                    player.playCard(card)
                    self.__currentTrick.addPlay(playerNum, card)
                    if self.__currentTrick.isTrickFinished():
                        self.__turn = self.__currentTrick.whichPlayerTookTrick()
                        self.__lastTrick = self.__currentTrick
                        self.__currentTrick = Trick(self.__trumpSuit)
                    else:
                        self.__turn = (self.__turn + 1) % PLAYERS.TOTAL_PLAYERS
                else:
                    error = 'Card is not allowed to be played'
            else:
                error = 'Not your turn'

        return bool(error is None), error

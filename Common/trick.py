from Common.constants import PLAYERS
from Common import Card


class Trick(object):
    def __init__(self, trumpSuit=None, data=None):
        self.__trick = {}
        self.__trumpSuit = trumpSuit
        self.__firstPlayer = None
        self.__ledSuit = None
        self.__isTrumped = False

        # If we were passed a jsonString, we will use that to override our data
        if data is not None:
            self.__serializeIn(data)

    def __serializeIn(self, data):
        self.__trumpSuit = data['trumpSuit']
        self.__firstPlayer = data['firstPlayer']
        self.__ledSuit = data['ledSuit']
        self.__isTrumped = data['isTrumped']

        self.__trick = {}
        for playerNumber, cardData in data['trick'].iteritems():
            self.__trick[int(playerNumber)] = Card(data=cardData)

    def serializeOut(self):
        trickOut = {}
        for playerNumber, card in self.__trick.iteritems():
            trickOut[playerNumber] = card.serializeOut()

        info = {
            'trick': trickOut,
            'trumpSuit': self.__trumpSuit,
            'firstPlayer': self.__firstPlayer,
            'ledSuit': self.__trumpSuit,  # TODO: This can be reconstructed from already existing information
            'isTrumped': self.__isTrumped,  # TODO: This can be reconstructed from already existing information
        }

        return info

    def addPlay(self, playerNumber, card):
        assert playerNumber not in self.__trick
        if self.__firstPlayer is None:
            self.__firstPlayer = playerNumber
            self.__ledSuit = card.getSuit()

        if card.isSameSuit(self.__trumpSuit):
            self.__isTrumped = True

        self.__trick[playerNumber] = card

    def getLedSuit(self):
        return self.__ledSuit

    def display(self):
        for x in sorted(PLAYERS.STRING_REPR):
            if x == self.__firstPlayer:
                line = '* '
            else:
                line = '  '
            line += PLAYERS.STRING_REPR[x]

            if x in self.__trick:
                line += self.__trick[x].toString()

            print(line)

    def isTrickFinished(self):
        return len(self.__trick) == PLAYERS.TOTAL_PLAYERS

    def whichPlayerTookTrick(self):
        assert self.isTrickFinished()

        if self.__isTrumped:
            takingSuit = self.__trumpSuit
        else:
            takingSuit = self.__ledSuit

        viableCards = []
        for player, card in self.__trick.iteritems():
            if card.isSameSuit(takingSuit):
                viableCards.append((player, card))

        assert len(viableCards) > 0

        maxCard = None
        winningPlayer = None
        for player, card in viableCards:
            if maxCard is None or card > maxCard:
                maxCard = card
                winningPlayer = player

        return winningPlayer

    def whichTeamTookTrick(self):
        assert self.isTrickFinished()

        winningPlayer = self.whichPlayerTookTrick()
        if winningPlayer in PLAYERS.TEAM_ONE:
            return PLAYERS.TEAM_ONE
        elif winningPlayer in PLAYERS.TEAM_TWO:
            return PLAYERS.TEAM_TWO

        assert False

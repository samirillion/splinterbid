from random import shuffle as randomShuffle

from constants import SUIT, VALUE, PLAYERS
from Structures.card import Card
from Structures.hand import Hand


class Deck(object):
    HAND_SIZE = 13

    def __init__(self, toShuffle=True):
        self.__deck = []

        for suit in SUIT.RANGE:
            for value in VALUE.RANGE:
                self.__deck.append(Card(suit, value))

        if toShuffle:
            self.shuffle()

    def shuffle(self):
        randomShuffle(self.__deck)

    def getStartingHand(self, playerNumber):
        assert playerNumber < PLAYERS.TOTAL_PLAYERS

        hand = Hand()
        startingCard = self.HAND_SIZE * playerNumber
        endingCard = startingCard + self.HAND_SIZE
        for x in range(startingCard, endingCard):
            hand.addCard(self.__deck[x])

        return hand

    def getAllStartingHands(self):
        allHands = []
        for x in range(PLAYERS.TOTAL_PLAYERS):
            allHands.append(self.getStartingHand(x))

        return allHands

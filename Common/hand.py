from Common import Card


class Hand(object):
    def __init__(self, data=None):
        self.__hand = []

        if data is not None:
            self.__serializeIn(data)

    def addCard(self, card):
        self.__hand.append(card)
        self.__sort()

    def __serializeIn(self, data):
        for card in data:
            self.__hand.append(Card(data=card))

        self.__sort()

    def serializeOut(self):
        ret = []

        for card in self.__hand:
            ret.append(card.serializeOut())

        return ret

    def __sort(self):
        self.__hand = sorted(self.__hand)

    def getHandSize(self):
        return len(self.__hand)

    def removeCard(self, card):
        self.__hand.remove(card)

    def display(self):
        for card in self.__hand:
            print(card.toString())

    def getValidPlays(self, ledSuit):
        if ledSuit is None:
            return self.__hand

        cardsMatchingLedSuit = []
        for card in self.__hand:
            if card.getSuit() == ledSuit:
                cardsMatchingLedSuit.append(card)

        if len(cardsMatchingLedSuit) == 0:
            return self.__hand
        else:
            return cardsMatchingLedSuit

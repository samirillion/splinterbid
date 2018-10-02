from Common.constants import SUIT, VALUE


class Card(object):
    def __init__(self, suit=None, value=None, data=None):
        self.__suit = suit
        self.__value = value

        if data is None:
            assert suit in SUIT.RANGE
            assert value in VALUE.RANGE
        else:
            self.__serializeIn(data)

    def __serializeIn(self, data):
        self.__value = data[0]
        self.__suit = data[1]

        assert self.__value in VALUE.RANGE
        assert self.__suit in SUIT.RANGE

    def serializeOut(self):
        return [self.__value, self.__suit]

    # Sort by suit first, then value
    def getSortRank(self):
        return self.__suit * 100 + self.__value

    def getSuit(self):
        return self.__suit

    def isSameSuit(self, trumpSuit):
        return self.__suit == trumpSuit

    def toString(self):
        return VALUE.STRING_REPR[self.__value] + SUIT.STRING_REPR[self.__suit]

    def __cmp__(self, other):
        return self.getSortRank() - other.getSortRank()

    def __eq__(self, other):
        if other is None:
            return False

        return self.getSortRank() - other.getSortRank() == 0

    def __repr__(self):
        return self.toString()

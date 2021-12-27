from constants import SUIT, VALUE


class Card(object):
    def __init__(self, suit, value):
        self.__suit = suit
        self.__value = value

        assert suit in SUIT.RANGE
        assert value in VALUE.RANGE
    
    def __lt__(self, other):
        return self.getSortRank() < other.getSortRank()

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

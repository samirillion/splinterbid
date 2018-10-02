class Bid(object):
    def __init__(self, value=None, suit=None, data=None):
        self.__value = value
        self.__suit = suit

        if data is None:
            assert value is not None
            assert suit is not None
        else:
            self.__serializeIn(data)

    def __serializeIn(self, data):
        self.__value = data['value']
        self.__suit = data['suit']

    def serializeOut(self):
        ret = {
            'value': self.__value,
            'suit': self.__suit,
        }

        return ret

    def getValue(self):
        return self.__value

    def getSuit(self):
        return self.__suit

    # Sort by suit first, then value
    def getSortRank(self):
        return self.__suit + self.__value * 100

    def __cmp__(self, other):
        return self.getSortRank() - other.getSortRank()

    def __eq__(self, other):
        if self.getValue() == other.getValue() and self.getSuit() == other.getSuit():
            return True

        return False

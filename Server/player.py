class Player(object):
    def __init__(self, playerNumber, hand, tookBid, manager):
        self.__playerNumber = playerNumber
        self.__hand = hand
        self.__manager = manager
        self.__isTaker = tookBid

    def getHand(self):
        return self.__hand

    def __getHandSize(self):
        return self.__hand.getHandSize()

    def serializeOut(self, full):
        ret = {
            'handSize': self.__getHandSize(),
            'isTaker': self.__isTaker,
        }

        if full:
            ret['hand'] = self.__hand.serializeOut()

        return ret

    def sendGameStateToClient(self, gameState):
        pass

    def isValidPlay(self, card, ledSuit):
        validPlays = self.__hand.getValidPlays(ledSuit)
        return card in validPlays

    def removeCard(self, card):
        self.__hand.removeCard(card)

    def playCard(self, ledSuit):
        pass

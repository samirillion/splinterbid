class Player(object):
    def __init__(self, hand):
        self.__hand = hand        

    def getPlayerState(self):
        ret = {
            'hand': self.__hand.serializeOut(),
        }

        return ret

    def getPlayableCards(self, currentTrick):
        return self.__hand.getValidPlays(currentTrick.getLedSuit())

    def playCard(self, card):
        self.__hand.removeCard(card)
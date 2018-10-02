from GameManagerHelpers.managers import PlayManager, BidManager, ScoreManager
from GameManagerHelpers.playerConnection import ConnectionManager
from Common import Bid
from Common.constants import GAME_PHASE, PLAYERS, SUIT, BID_NUMBER


class GameManager(object):
    def __init__(self):
        self.__phase = None
        self.__connectionManager = ConnectionManager()
        self.__currentGameManager = None

    def __getPlayManagerInformation(self):
        ret = {
            'takingPlayer': PLAYERS.NORTH,  # Should come from BidManager
            'trumpSuit': SUIT.SPADES,  # Should come from BidManager
            'bid': Bid(BID_NUMBER.ONE, SUIT.SPADES),  # Should come from BidManager
            'connectionManager': self.__connectionManager,  # Should come from BidManager
        }

        return ret

    def __setPhase(self, phase):
        if phase == GAME_PHASE.BID:
            self.__currentGameManager = BidManager()
        elif phase == GAME_PHASE.PLAY:
            self.__currentGameManager = PlayManager(self.__getPlayManagerInformation())
        elif phase == GAME_PHASE.SCORE:
            self.__currentGameManager = ScoreManager()
        else:
            assert False

        self.__phase = phase

    def start(self):
        # Wait for four players to connect
        self.__connectionManager.connect()
        self.__setPhase(GAME_PHASE.PLAY)  # For now, start us at the game phase
        self.__currentGameManager.start()

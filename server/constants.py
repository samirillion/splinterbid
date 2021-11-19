class PLAYERS(object):
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3

    TOTAL_PLAYERS = 4
    STRING_REPR = {
        NORTH: 'North: ',
        EAST: 'East:  ',
        SOUTH: 'South: ',
        WEST: 'West:  ',
    }

    TEAM_ONE = (NORTH, SOUTH)
    TEAM_TWO = (EAST, WEST)


class SUIT(object):
    CLUBS = 0
    DIAMONDS = 1
    HEARTS = 2
    SPADES = 3
    NO_TRUMP = 4

    MIN_SUIT = CLUBS
    MAX_SUIT = SPADES
    RANGE = (CLUBS, DIAMONDS, HEARTS, SPADES)
    VALID_BIDS = (CLUBS, DIAMONDS, HEARTS, SPADES, NO_TRUMP)
    STRING_REPR = {
        CLUBS: 'C',
        DIAMONDS: 'D',
        HEARTS: 'H',
        SPADES: 'S',
    }
    STRING_TO_SUIT = {key: val for val, key in STRING_REPR.items()}


class BID_NUMBER(object):
    ONE = 0
    TWO = 1
    THREE = 2
    FOUR = 3
    FIVE = 4
    SIX = 5
    SEVEN = 6

    RANGE = (ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN)
    STRING_REPR = {
        ONE: '1',
        TWO: '2',
        THREE: '3',
        FOUR: '4',
        FIVE: '5',
        SIX: '6',
        SEVEN: '7',
    }


class VALUE(object):
    TWO = 0
    THREE = 1
    FOUR = 2
    FIVE = 3
    SIX = 4
    SEVEN = 5
    EIGHT = 6
    NINE = 7
    TEN = 8
    JACK = 9
    QUEEN = 10
    KING = 11
    ACE = 12

    MIN_VALUE = TWO
    MAX_VALUE = ACE
    RANGE = [TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE]
    STRING_REPR = {
        TWO: '2',
        THREE: '3',
        FOUR: '4',
        FIVE: '5',
        SIX: '6',
        SEVEN: '7',
        EIGHT: '8',
        NINE: '9',
        TEN: 'T',
        JACK: 'J',
        QUEEN: 'Q',
        KING: 'K',
        ACE: 'A',
    }
    STRING_TO_VALUE = {key: val for val, key in STRING_REPR.items()}


class PLAYER_INPUT(object):
    SHOW_MY_HAND = 0
    SHOW_DUMMY_HAND = 1
    SHOW_CURRENT_TRICK = 2
    SHOW_LAST_TRICK = 3
    SHOW_TRUMP_SUIT = 4
    PLAY_CARD = 5

    INPUT_TO_SERVER = (PLAY_CARD,)
    ALL_INPUTS = (SHOW_MY_HAND, SHOW_DUMMY_HAND, SHOW_CURRENT_TRICK, SHOW_LAST_TRICK, SHOW_TRUMP_SUIT, PLAY_CARD)


class SERVER_TO_CLIENT_MESSAGE_TYPE(object):
    ALL_DATA = 0
    YOUR_TURN = 1
    ERROR_MESSAGE = 2

    ALL_MESSAGE_TYPES = (ALL_DATA, YOUR_TURN, ERROR_MESSAGE)


# TODO Unused
class CLIENT_TO_SERVER_TYPES(object):
    ALL_DATA = 0


# TODO still needed?
class CONNECTION_SETTINGS(object):
    PORT = 12345
    BUFFER_SIZE = 1024


class GAME_PHASE(object):
    BID = 0
    PLAY = 1
    SCORE = 2

    ALL_GAME_PHASES = (BID, PLAY, SCORE)


TOTAL_TRICKS = 13

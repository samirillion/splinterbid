from Common.constants import PLAYER_INPUT, SUIT, VALUE
from Common.card import Card


class InputHandler(object):
    HANDLED_INPUTS = {
        'MH': PLAYER_INPUT.SHOW_MY_HAND,
        'DH': PLAYER_INPUT.SHOW_DUMMY_HAND,
        'CT': PLAYER_INPUT.SHOW_CURRENT_TRICK,
        'LT': PLAYER_INPUT.SHOW_LAST_TRICK,
        'ST': PLAYER_INPUT.SHOW_TRUMP_SUIT,
    }

    def __init__(self):
        pass

    @staticmethod
    def warnInvalidInput(playerInput, errorMessage='Invalid input'):
        print('%s: "%s"\n'
              'Please:\n'
              'MH: Show my hand\n'
              'DH: Show dummy hand\n'
              'CT: Show current trick\n'
              'LT: Show last trick\n'
              '2D: play two of diamonds\n' % (errorMessage, playerInput))

    @staticmethod
    def getInput():
        while True:
            playerInput = raw_input('Your turn. Input: ')
            playerInput = playerInput.upper().strip()
            if playerInput in InputHandler.HANDLED_INPUTS:
                return InputHandler.HANDLED_INPUTS[playerInput], None
            else:  # Try handling as a played card
                if len(playerInput) != 2:
                    InputHandler.warnInvalidInput(playerInput, 'Wrong input length')
                    continue
                value = playerInput[0]
                suit = playerInput[1]
                if value not in VALUE.STRING_TO_VALUE:
                    InputHandler.warnInvalidInput(value, 'Invalid card value')
                    continue
                if suit not in SUIT.STRING_TO_SUIT:
                    InputHandler.warnInvalidInput(suit, 'Invalid card suit')
                    continue
                card = Card(SUIT.STRING_TO_SUIT[suit], VALUE.STRING_TO_VALUE[value])
                # TODO Check that this is a valid play...

                return PLAYER_INPUT.PLAY_CARD, card

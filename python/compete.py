#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe Compete
Competition between models
"""

from modules.players import AIPlayer, RandomPlayer, HumanPlayer, DLPlayer
from modules.functions import compete

import sys

print( "Choose Players from: Rand, Q, DL" )
P1_Label = input( "P1: " )
P2_Label = input( "P2: " )

if P1_Label == 'Rand':
    P1 = RandomPlayer()
elif P1_Label == 'Q':
    P1 = AIPlayer()
elif P1_Label == 'DL':
    P1 = DLPlayer()
else:
    print( "Choice for P1 not allowed" )
    sys.exit()

if P2_Label == 'Rand':
    P2 = RandomPlayer()
elif P2_Label == 'Q':
    P2 = AIPlayer()
elif P2_Label == 'DL':
    P2 = DLPlayer()
else:
    print( "Choice for P2 not allowed" )
    sys.exit()

ep = int( input( "Number of Epochs: " ) )

compete( P1, P2, epochs=ep )

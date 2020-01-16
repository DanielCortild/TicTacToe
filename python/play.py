#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: daniel

Functions
"""
from modules.players import AIPlayer, RandomPlayer, HumanPlayer, DLPlayer
from modules.functions import play

import sys

print( "Choose Players from: Human, Rand, Q, DL" )
P1_Label = input( "P1: " )
P2_Label = input( "P2: " )

if P1_Label == 'Human':
    P1 = HumanPlayer()
elif P1_Label == 'Rand':
    P1 = RandomPlayer()
elif P1_Label == 'Q':
    P1 = AIPlayer()
elif P1_Label == 'DL':
    P1 = DLPlayer()
else:
    print( "Choice for P1 not allowed" )
    sys.exit()

if P2_Label == 'Human':
    P2 = HumanPlayer()
elif P2_Label == 'Rand':
    P2 = RandomPlayer()
elif P2_Label == 'Q':
    P2 = AIPlayer()
elif P2_Label == 'DL':
    P2 = DLPlayer()
else:
    print( "Choice for P2 not allowed" )
    sys.exit()

play( P1, P2 )

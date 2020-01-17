#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe Train
Trains the model
"""

from modules.players import AIPlayer, RandomPlayer, HumanPlayer, DLPlayer
from modules.functions import train

print( "Choose Players from: Q, DL" )
P1_Label = input( "P1: " )
P2_Label = input( "P2: " )

if P1_Label == 'Q':
    P1 = AIPlayer(exp=0.1)
elif P1_Label == 'DL':
    P1 = DLPlayer(exp=0.1)
else:
    print( "Choice for P1 not allowed" )
    sys.exit()

if P2_Label == 'Q':
    P2 = AIPlayer(exp=0.1)
elif P2_Label == 'DL':
    P2 = DLPlayer(exp=0.1)
else:
    print( "Choice for P2 not allowed" )
    sys.exit()

ep = int( input( "Number of Epochs: " ) )

train( P1, P2, epochs=ep )

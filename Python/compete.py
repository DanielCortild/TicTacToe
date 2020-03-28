#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe Compete
Competition between models
"""
import warnings
warnings.filterwarnings("ignore")

from modules.players import AIPlayer, RandomPlayer, HumanPlayer, DLPlayer
from modules.functions import compete

import sys

print( "Choose Agents from: Rand, Q, DL" )
P1_Label = input( "P1: (Q)" )
P2_Label = input( "P2: (Q)" )
Ep_Label = input( "Number of Epochs: (1000)" )
loadModel1 = input( "Name of P1's Model file: (model1)" )
loadModel2 = input( "Name of P2's Model file: (model2)" )

if P1_Label == 'Rand':
    P1 = RandomPlayer()
elif P1_Label == 'Q' or P1_Label == '':
    P1 = AIPlayer()
elif P1_Label == 'DL':
    P1 = DLPlayer()
else:
    print( "Choice for P1 not allowed" )
    sys.exit()

if P2_Label == 'Rand':
    P2 = RandomPlayer()
elif P2_Label == 'Q' or P2_Label == '':
    P2 = AIPlayer()
elif P2_Label == 'DL':
    P2 = DLPlayer()
else:
    print( "Choice for P2 not allowed" )
    sys.exit()

if Ep_Label == '':
    Epochs = 1000
else:
    Epochs = int( input( "Number of Epochs: " ) )

if loadModel1 == '':
    loadModel1 = 'model1'

if loadModel2 == '':
    loadModel2 = 'model2'

compete( P1, P2, epochs=Epochs, loadP1 = loadModel1, loadP2 = loadModel2 )

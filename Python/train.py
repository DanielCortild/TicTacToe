#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe Train
Trains the model
"""
import warnings
warnings.filterwarnings("ignore")

from modules.players import AIPlayer, RandomPlayer, HumanPlayer, DLPlayer
from modules.functions import train
import sys

print( "Choose Players from: Q, DL" )
P1_Label = input( "P1: (Q)" )
P2_Label = input( "P2: (Q)" )
Ep_Label = input( "Number of Epochs: (1000)" )
saveModel1 = input( "Name of P1's Model file: (model1)" )
saveModel2 = input( "Name of P2's Model file: (model2)" )

if P1_Label == 'Q' or  P1_Label == '':
    P1 = AIPlayer(exp=0.1)
elif P1_Label == 'DL':
    P1 = DLPlayer(exp=0.1)
else:
    print('ERROR: Choice for P1 not allowed')
    sys.exit()

if P2_Label == 'Q' or P2_Label == '':
    P2 = AIPlayer(exp=0.1)
elif P2_Label == 'DL':
    P2 = DLPlayer(exp=0.1)
else:
    print('ERROR: Choice for P2 not allowed')
    sys.exit()

if Ep_Label == '':
    Epochs = 1000
else:
    Epochs = int(Ep_Label)

if saveModel1 == '':
    saveModel1 = 'model1'

if saveModel2 == '':
    saveModel2 = 'model2'

train( P1, P2, epochs=Epochs, saveP1=saveModel1, saveP2=saveModel2 )

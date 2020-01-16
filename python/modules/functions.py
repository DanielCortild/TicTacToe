#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: daniel

Functions
"""
import numpy as np
from modules.progress import progress
from modules.judger import Judger
from modules.players import AIPlayer, RandomPlayer, HumanPlayer, DLPlayer

def train ( P1, P2, epochs = 500 ):

    judger = Judger( P1, P2, learning = True )

    P1Win = 0.0
    P2Win = 0.0
    Draws = 0.0

    for i in range(epochs):

        winner = judger.play( show = False )

        if winner == 1:
            P1Win += 1
        if winner == -1:
            P2Win += 1
        if winner == 0:
            Draws += 1

        judger.reset()

        progress( count = i+1, total = epochs,
                 status1 = 'Game %s/%s' % ( str(i+1).zfill(int(np.ceil(np.log10(epochs+1)))), epochs),
                 status2 = 'P1Wins: %.2f, P2Wins: %.2f, Draws: %.2f' % (
                     P1Win/(i+1), P2Win/(i+1), Draws/(i+1) ) )

    print()
    P1.savePolicy()
    P2.savePolicy()

def compete ( P1, P2, epochs = 500 ):

    judger = Judger( P1, P2, learning = False )

    P1.loadPolicy()
    P2.loadPolicy()

    P1Win = 0.0
    P2Win = 0.0
    Draws = 0.0

    for i in range(epochs):

        winner = judger.play( show = False )

        if winner == 1:
            P1Win += 1
        if winner == -1:
            P2Win += 1
        if winner == 0:
            Draws += 1

        judger.reset()

        progress( count = i+1, total = epochs,
                 status1 = 'Game %s/%s' % ( str(i+1).zfill(int(np.ceil(np.log10(epochs+1)))), epochs),
                 status2 = 'P1Wins: %.2f, P2Wins: %.2f, Draws: %.2f' % (
                     P1Win/(i+1), P2Win/(i+1), Draws/(i+1) ) )
    print()

def play ( P1, P2 ):

    judger = Judger( P1, P2, learning = False )

    P1.loadPolicy()
    P2.loadPolicy()

    winner = judger.play( show = True )

    if winner == 1:
        print( "Player 1 (X) wins" )
    elif winner == -1:
        print( "Player 2 (O) wins" )
    else:
        print( "Tie!" )

    print()

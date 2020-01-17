#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe State Module
"""

import numpy as np

class State:

    def __init__ ( self ):

        self.board = np.zeros( (3, 3) )

        self.winner = None
        self.hash = None
        self.end = False

    def getHash ( self ):

        if self.hash is None:
            self.hash = 0

            for i in self.board.reshape( 9 ):
                self.hash = self.hash * 3 + (i%3)

        return self.hash

    def isEnd ( self ):

        if self.end == True:
            return self.end

        sums = []
        diag1, diag2 = 0, 0

        for i in range( 3 ):

            sums.append( np.sum( self.board[i, :] ) )
            sums.append( np.sum( self.board[:, i] ) )

            diag1 += self.board[i, i]
            diag2 += self.board[ i, 2-i ]

        sums.append( diag1 )
        sums.append( diag2 )

        for s in sums:

            if np.abs( s ) == 3:

                self.winner = np.abs( s ) / s
                self.end = True
                return self.end

        if np.prod( self.board ) == 1:

            self.winner = 0
            self.end = True
            return self.end

        return self.end

    def nextState ( self, i, j, player ):

        newState = State()
        newState.board = np.copy( self.board )
        newState.board[i, j] = player
        return newState

    def show ( self ):

        for i in range(3):

            print( '-------------' )

            out= '| '

            for j in range(3):

                if self.board[i, j] == 1:
                    token = 'X'
                if self.board[i, j] == 0:
                    token = ' '
                if self.board[i, j] == -1:
                    token = 'O'

                out += token + ' | '
            print( out )

        print( '-------------')

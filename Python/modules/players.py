#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe Players Module
Available Players: AIPlayer, DLPlayer, RandomPlayer, HumanPlayer
"""

import numpy as np
import pickle
import json
import os
from os import path
import pathlib

import keras
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout
from keras.backend import reshape
from keras.utils.np_utils import to_categorical

from modules.state import State

class AIPlayer:

    def __init__ ( self, stepSize = 0.3, exp = 0 ):

        self.allStates = self.getAllStates()
        self.estimations = dict()

        self.stepSize = stepSize
        self.exploreRate = exp

        self.states = []

    def getAllStatesImpl ( self, currentState, currentSymbol, allStates ):
        for i in range(3):
            for j in range(3):
                if currentState.board[i][j] == 0:

                    newState = currentState.nextState( i, j, currentSymbol )
                    newHash = newState.getHash()

                    if newHash not in allStates.keys():

                        isEnd = newState.isEnd()
                        allStates[ newHash ] = ( newState, isEnd )
                        if not isEnd:
                            self.getAllStatesImpl( newState, -currentSymbol, allStates )

    def getAllStates ( self ):
        currentSymbol = 1
        currentState = State()

        allStates = dict()
        allStates[ int(currentState.getHash()) ] = ( currentState, False )

        self.getAllStatesImpl( currentState, currentSymbol, allStates )

        return allStates

    def reset ( self ):
        self.states = []

    def setSymbol ( self, symbol ):

        self.symbol = symbol

        for hash in self.allStates.keys():

            (state, isEnd) = self.allStates[hash]

            if isEnd:
                if state.winner == self.symbol:
                    self.estimations['H'+str(hash)] = 1.0
                else:
                    self.estimations['H'+str(hash)] = 0
            else:
                self.estimations['H'+str(hash)] = 0.5

    def feedState ( self, state ):
        self.states.append( state )

    def feedReward ( self, reward ):

        if len( self.states ) == 0:
            return

        self.states = [ state.getHash() for state in self.states ]

        target = reward

        for latestState in reversed(self.states):

            value = self.estimations[ 'H'+str(latestState) ] + self.stepSize * ( target - self.estimations[ 'H'+str(latestState) ] )
            self.estimations[ 'H'+str(latestState) ] = value
            target = value

        self.states = []

    def takeAction(self):

        state = self.states[-1]

        nextStates = []
        nextPositions = []

        for i in range(3):
            for j in range(3):
                if state.board[i, j] == 0:
                    nextPositions.append( [i, j] )
                    nextStates.append( state.nextState( i, j, self.symbol ).getHash() )

        if np.random.binomial(1, self.exploreRate):

            np.random.shuffle( nextPositions )
            self.states = []
            action = nextPositions[0]
            action.append( self.symbol )

            return action

        values = []

        bestEst = -999

        for hash, pos in zip( nextStates, nextPositions ):
            if self.estimations['H'+str(hash)] > bestEst:
                bestEst = self.estimations['H'+str(hash)]
                bestAction = pos

        bestAction.append( self.symbol )

        return bestAction

    def savePolicy(self, filename):

        if not path.exists( "models" ):
            os.mkdir("models")

        if path.exists( "models/"+filename+".json" ):
            os.remove("models/"+filename+".json")

        open('models/'+filename+'.json', 'a').close()

        with open('models/'+filename+'.json', 'w') as fp:
            json.dump(self.estimations, fp)

    def loadPolicy(self, filename):

        file = open( 'models/'+filename+'.json', 'rb' )
        self.estimations = json.load( file )
        file.close()

class DLPlayer:

    def __init__ ( self, stepSize = 0.3, exp = 0 ):

        self.stepSize = stepSize
        self.exploreRate = exp

        self.states = []

        model = Sequential()

        model.add( Dense( 27, activation='relu', input_shape = (9, ) ) )
        model.add( Dense( 18, activation='relu' ) )
        model.add( Dense( 1, activation='linear' ) )

        model.compile( loss = 'mean_absolute_error', optimizer = 'adam', metrics = ['accuracy'] )

        self.model = model

    def reset ( self ):
        self.states = []

    def setSymbol ( self, symbol ):
        self.symbol = symbol

    def feedState ( self, state ):
        self.states.append( state )

    def feedReward ( self, reward ):

        if len( self.states ) == 0:
            return

        self.states = [ state.board.flatten() for state in self.states ]

        target = reward

        for i, latestState in enumerate( reversed( self.states ) ):

            v_s = self.model.predict( np.array( [latestState] ) )

            if i == len(self.states)-1:
                v_s_tag = 0
            else:
                v_s_tag = self.model.predict( np.array( [self.states[i+1]] ) )

            target = np.array( v_s + self.stepSize * ( reward + v_s_tag - v_s ) )

            #target = ( 1 - self.stepSize ) * self.model.predict( np.array( [latestState] ) ) + self.stepSize * target

            self.model.fit( np.array( [latestState] ), target, verbose = 0 )

        self.states = []

    def takeAction(self):

        state = self.states[-1]

        nextStates = []
        nextPositions = []

        for i in range(3):
            for j in range(3):
                if state.board[i, j] == 0:
                    nextPositions.append( [i, j] )
                    nextStates.append( state.nextState( i, j, self.symbol ).board.flatten() )

        if np.random.binomial(1, self.exploreRate):

            np.random.shuffle( nextPositions )
            self.states = []
            action = nextPositions[0]
            action.append( self.symbol )

            return action

        max = -999
        bestPos = -1

        for board, pos in zip( nextStates, nextPositions ):

            if max < self.model.predict( np.array( [board] ) ):
                max = self.model.predict( np.array( [board] ) )
                bestPos = pos

        action = bestPos
        action.append( self.symbol )

        return action

    def savePolicy(self):

        if not path.exists( "Optimal_Policy" ):
            os.mkdir("Optimal_Policy")

        self.model.save( 'Optimal_Policy/DL' + str(self.symbol) + '.h5' )

    def loadPolicy(self):

        if path.exists( 'Optimal_Policy/DL' + str(self.symbol) ):
            self.model = keras.models.load_model( 'Optimal_Policy/DL' + str(self.symbol) )

class RandomPlayer:

    def __init__ ( self ):

        self.symbol = None
        self.currentState = None

    def reset ( self ):
        return None

    def setSymbol ( self, symbol ):
        self.symbol = symbol

    def feedState ( self, state ):
        self.currentState = state

    def feedReward ( self, reward ):
        return None

    def takeAction(self):

        [i, j] = np.random.randint(3, size=2)

        if self.currentState.board[i, j] != 0:
            return self.takeAction()

        return ( i, j, self.symbol )

    def savePolicy(self):
        return

    def loadPolicy(self):
        return

class HumanPlayer:

    def __init__ ( self ):

        self.symbol = None
        self.currentState = None

    def reset ( self ):
        return None

    def setSymbol ( self, symbol ):
        self.symbol = symbol

    def feedState ( self, state ):
        self.currentState = state

    def feedReward ( self, reward ):
        return None

    def takeAction ( self ):

        data = int( input( "Indicate your position:" ) )
        data = data - 1

        i = data // 3
        j = data % 3

        if self.currentState.board[i, j] != 0:
            return self.takeAction()

        return ( i, j, self.symbol )

    def savePolicy ( self ):
        return

    def loadPolicy ( self ):
        return

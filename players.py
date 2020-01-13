import numpy as np
import pickle
import os
from os import path

from state import State

class AIPlayer:
    
    def __init__ ( self, stepSize = 0.1, exp = 0 ):
        
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
        allStates[ currentState.getHash() ] = ( currentState, False )

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
                    self.estimations[hash] = 1.0
                else:
                    self.estimations[hash] = 0
            else:
                self.estimations[hash] = 0.5

    def feedState ( self, state ):
        
        self.states.append( state )

    def feedReward ( self, reward ):
        
        if len( self.states ) == 0:
            return
        
        self.states = [ state.getHash() for state in self.states ]
        
        target = reward
        
        for latestState in reversed(self.states):
            
            value = self.estimations[ latestState ] + self.stepSize * ( target - self.estimations[ latestState ] )
            self.estimations[ latestState ] = value
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
        
        for hash, pos in zip( nextStates, nextPositions ):
            values.append( ( self.estimations[hash], pos ) )
            
        np.random.shuffle(values)
        
        values.sort( key=lambda x: x[0], reverse=True )
        
        action = values[0][1]
        action.append( self.symbol )
        
        return action

    def savePolicy(self):
        
        if not path.exists( "Optimal_Policy" ):
            os.mkdir("Optimal_Policy")
        
        file = open( 'Optimal_Policy/P' + str(self.symbol), 'wb' )
        pickle.dump( self.estimations, file )
        file.close()

    def loadPolicy(self):
        
        file = open( 'Optimal_Policy/P' + str(self.symbol),'rb' )
        self.estimations = pickle.load( file )
        file.close()

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
    
    def __init__(self, stepSize = 0.1, exploreRate=0.1):
        
        self.symbol = None
        self.currentState = None
    
    def reset(self):
        return None
    
    def setSymbol(self, symbol):
        self.symbol = symbol
    
    def feedState(self, state):
        self.currentState = state
    
    def feedReward(self, reward):
        return None
    
    def takeAction(self):
        
        data = int( input( "Indicate your position:" ) )
        
        i = data // 3
        j = data % 3
        
        if self.currentState.board[i, j] != 0:
            return self.takeAction()
        
        return ( i, j, self.symbol )
    
    def savePolicy(self):
        return

    def loadPolicy(self):
        return
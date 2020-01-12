from state import State

class Judger:
    
    def __init__ ( self, p1, p2, learning = True ):
        
        self.p1 = p1
        self.p1Symbol = 1
        self.p1.setSymbol( self.p1Symbol )

        self.p2 = p2
        self.p2Symbol = -1
        self.p2.setSymbol( self.p2Symbol )
        
        self.currentPlayer = None
        
        self.learning = learning
        
        self.currentState = State()

    def giveReward ( self ):
        
        if self.currentState.winner == self.p1Symbol:
            
            self.p1.feedReward(1)
            self.p2.feedReward(0)
            
        elif self.currentState.winner == self.p2Symbol:
            
            self.p1.feedReward(0)
            self.p2.feedReward(1)
            
        else:
            
            self.p1.feedReward(0.5)
            self.p2.feedReward(0.5)

    def feedCurrentState ( self ):
        
        self.p1.feedState( self.currentState )
        self.p2.feedState( self.currentState )

    def reset ( self ):
        
        self.p1.reset()
        self.p2.reset()
        
        self.currentState = State()
        self.currentPlayer = None

    def play ( self, show = False ):
        
        self.reset()
        self.feedCurrentState()
        
        while True:
            
            if self.currentPlayer == self.p1:
                self.currentPlayer = self.p2
            else:
                self.currentPlayer = self.p1
                
            if show:
                self.currentState.show()
            
            [i, j, symbol] = self.currentPlayer.takeAction()
            
            self.currentState = self.currentState.nextState( i, j, symbol )
            hashValue = self.currentState.getHash()
            
            self.feedCurrentState()
            
            if self.currentState.isEnd():
                
                if self.learning:
                    self.giveReward()
                    
                return self.currentState.winner
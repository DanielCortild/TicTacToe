/*
Created on: Friday December 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)
*/

function resetGame() {
  mode = document.getElementById("selection").value ;

  document.getElementById("result").style.opacity = 0;
  document.getElementById("game").style.opacity = 1;

  document.getElementById("X_chooser").onclick = '';
  document.getElementById("O_chooser").onclick = '';

  for (var i = 0; i < 9; i++) {
    document.getElementById("c"+i).onclick = function() { squareClick(this.id); };
  }

  mainBoard = [0,0,0,0,0,0,0,0,0];

  for (var i = 0; i < 9; i++) {
    document.getElementById("c"+i).innerHTML = "";
  }

  return mainBoard;
}

function checkGame() {
  if ( getWinner( mainBoard ) === 1 ) {
    endGame( "You lose!" );
    return true;
  }
  if ( getWinner( mainBoard ) === -1 ) {
    endGame( "You win!" );
    return true;
  }
  if ( movesLeft( mainBoard ) === false ) {
    endGame( "Draw!" );
    return true;
  }
}

function movesLeft ( board ) {
  return board.flat().includes(0);
}

function getWinner(board) {
  for ( var i = 0; i < 3; i++ ) {
    if ( board[3*i] === board[3*i+1] && board[3*i+1] === board[3*i+2] ) {
      if ( board[3*i] === AIPlayer ) {
        return +1;
      } else if ( board[3*i] === HumanPlayer ) {
        return -1;
      }
    }
  }

  for ( var i = 0; i < 3; i++ ) {
    if ( board[i] === board[3+i] && board[3+i] === board[6+i] ) {
      if ( board[i] === AIPlayer ) {
        return +1;
      } else if ( board[i] === HumanPlayer ) {
        return -1;
      }
    }
  }

  if ( board[0] === board[4] && board[4] === board[8] ) {
    if ( board[0] === AIPlayer ) {
      return +1;
    } else if ( board[0] === HumanPlayer ) {
      return -1;
    }
  }

  if ( board[2] === board[4] && board[4] === board[6]) {
    if ( board[2] === AIPlayer ) {
      return +1;
    } else if ( board[2] === HumanPlayer ) {
      return -1;
    }
  }

  return 0;
}

function endGame(message) {
  document.getElementById("result").innerHTML = message;
  document.getElementById("result").style.opacity = 1;

  document.getElementById("game").style.opacity = 0.6;

  document.getElementById("X_chooser").style.opacity = 1;
  document.getElementById("O_chooser").style.opacity = 1;

  document.getElementById("X_chooser").onclick = function() { XChoose(); };
  document.getElementById("O_chooser").onclick = function() { OChoose(); };

  for (var i = 0; i < 9; i++) {
    document.getElementById("c"+i).onclick = '';
  }
}

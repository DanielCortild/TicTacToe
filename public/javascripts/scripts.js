/*
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe JS
Only a MinMax model is avaible atm

To use Browserify (Allows usage of 'require'):
browserify js/scripts.js -o js/bundle.js

To transform .h5 file created by the python script:
tensorflowjs_converter --input_format=keras models/PyModels/DL1.h5 models/JSModels/

To start Live-Server using npx:
npx live-server
*/

const modelURL = './models/JSModels/model.json'

var AIPlayer = '';
var HumanPlayer = '';
var mainBoard = '';

window.onload = function() {
  document.getElementById("game").style.opacity = 0;
}

var index = {
  "c0": 0,
  "c1": 1,
  "c2": 2,
  "c3": 3,
  "c4": 4,
  "c5": 5,
  "c6": 6,
  "c7": 7,
  "c8": 8
};

var tokens = {
  "-1": "O",
  "1" : "X"
}


function XChoose() {
  AIPlayer = -1;
  HumanPlayer = 1;

  document.getElementById("O_chooser").style.opacity = 0.6;

  mainBoard = resetGame();
}
window.XChoose = XChoose;

function OChoose() {
  AIPlayer = 1;
  HumanPlayer = -1;

  document.getElementById("X_chooser").style.opacity = 0.6;

  mainBoard = resetGame();

  //AIPlay();
  moveDL();
}
window.OChoose = OChoose;


function resetGame() {
  document.getElementById("result").style.opacity = 0;
  document.getElementById("game").style.opacity = 1;

  document.getElementById("X_chooser").onclick = '';
  document.getElementById("O_chooser").onclick = '';

  for (var i = 0; i < 9; i++) {
    document.getElementById("c"+i).onclick = function() { squareClick(this.id); };
  }

  mainBoard = [0,0,0,0,0,0,0,0,0];

  var keys = Object.keys( index );
  for (var i = 0; i < keys.length; i++) {
    document.getElementById(keys[i]).innerHTML = "";
  }

  return mainBoard;
}

function checkGame() {
  if ( getWinner( mainBoard ) === 10 ) {
    endGame( "You lost!" );
    return;
  }
  if ( getWinner( mainBoard ) === -10 ) {
    endGame( "You win!" );
    return;
  }
  if ( movesLeft( mainBoard ) === false ) {
    endGame( "Draw!" );
    return;
  }
}

function movesLeft ( board ) {
  return board.flat().includes(0);
}

function getWinner(board) {
  for ( var i = 0; i < 3; i++ ) {
    if ( board[3*i] === board[3*i+1] && board[3*i+1] === board[3*i+2] ) {
      if ( board[3*i] === AIPlayer ) {
        return +10;
      } else if ( board[3*i] === HumanPlayer ) {
        return -10;
      }
    }
  }

  for ( var i = 0; i < 3; i++ ) {
    if ( board[i] === board[3+i] && board[3+i] === board[6+i] ) {
      if ( board[i] === AIPlayer ) {
        return +10;
      } else if ( board[i] === HumanPlayer ) {
        return -10;
      }
    }
  }

  if ( board[0] === board[4] && board[4] === board[8] ) {
    if ( board[0] === AIPlayer ) {
      return +10;
    } else if ( board[0] === HumanPlayer ) {
      return -10;
    }
  }

  if ( board[2] === board[4] && board[4] === board[6]) {
    if ( board[2] === AIPlayer ) {
      return +10;
    } else if ( board[2] === HumanPlayer ) {
      return -10;
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


function Move() {
  this.row = 0;
  this.col = 0;
}

function minimax(board, depth, isMax) {

  var score = getWinner(board);

  if (score === 10) {
    return score;
  }

  if (score === -10) {
    return score;
  }

  if (movesLeft(board) === false) {
    return 0;
  }

  if (isMax) {
    var best = -1000;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = AIPlayer;

          best = Math.max(best, minimax(board, depth + 1, !isMax));

          board[i][j] = 0;
        }
      }
    }

    return best;
  } else {
    var best = 1000;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = HumanPlayer;

          best = Math.min(best, minimax(board, depth + 1, !isMax));

          board[i][j] = 0;
        }
      }
    }

    return best;
  }

}

function findBestMove(board) {

  var bestVal = -1000;
  var bestMove = new Move();
  bestMove.row = -1;
  bestMove.col = -1;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {

      if (board[i][j] === 0) {
        board[i][j] = AIPlayer;

        var moveVal = minimax(board, 0, false);

        board[i][j] = 0;

        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }

    }
  }
  return bestMove;
}

function AIPlay() {
  var nowMove = findBestMove(mainBoard);
  var newId = 3 * nowMove.row + nowMove.col + 1;
  document.getElementById("c" + newId).innerHTML = AIPlayer;
  mainBoard[nowMove.row][nowMove.col] = AIPlayer;
}


async function squareClick(id) {
  var arr = index[id];
  if( mainBoard[arr] !== 0 ){
   return;
  }
  document.getElementById(id).innerHTML = tokens[HumanPlayer];
  mainBoard[arr] = HumanPlayer;

  if ( getWinner( mainBoard ) === -10 ) {
    endGame( "You win!" );
    return;
  }
  if ( movesLeft( mainBoard ) === false ) {
    endGame( "Draw!" );
    return;
  }

  //AIPlay();
  await moveDL();

  if (getWinner(mainBoard) === 10) {
    endGame( "You lost!" );
    return;
  }
  if ( movesLeft(mainBoard) === false ) {
    endGame( "Draw!" );
    return;
  }
}

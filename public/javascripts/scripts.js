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
  "c1": [0, 0],
  "c2": [0, 1],
  "c3": [0, 2],
  "c4": [1, 0],
  "c5": [1, 1],
  "c6": [1, 2],
  "c7": [2, 0],
  "c8": [2, 1],
  "c9": [2, 2]
};


function XChoose() {
  AIPlayer = "O";
  HumanPlayer = "X";

  document.getElementById("O_chooser").style.opacity = 0.6;

  mainBoard = resetGame();
}
window.XChoose = XChoose;

function OChoose() {
  AIPlayer = "X";
  HumanPlayer = "O";

  document.getElementById("X_chooser").style.opacity = 0.6;

  mainBoard = resetGame();

  //AIPlay();
  moveAI();
}
window.OChoose = OChoose;


function resetGame() {
  document.getElementById("result").style.opacity = 0;
  document.getElementById("game").style.opacity = 1;

  document.getElementById("X_chooser").onclick = '';
  document.getElementById("O_chooser").onclick = '';

  for (var i = 1; i <= 9; i++) {
    document.getElementById("c"+i).onclick = function() { squareClick(this.id); };
  }

  mainBoard = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
  ];

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
  return board.flat().includes("_");
}

function getWinner(board) {
  for ( var row = 0; row < 3; row++ ) {
    if ( board[row][0] === board[row][1] && board[row][1] === board[row][2] ) {
      if ( board[row][0] === AIPlayer ) {
        return +10;
      } else if ( board[row][0] === HumanPlayer ) {
        return -10;
      }
    }
  }

  for ( var col = 0; col < 3; col++ ) {
    if ( board[0][col] === board[1][col] && board[1][col] === board[2][col] ) {
      if ( board[0][col] === AIPlayer ) {
        return +10;
      } else if ( board[0][col] === HumanPlayer ) {
        return -10;
      }
    }
  }

  if ( board[0][0] === board[1][1] && board[1][1] === board[2][2] ) {
    if ( board[0][0] === AIPlayer ) {
      return +10;
    } else if ( board[0][0] === HumanPlayer ) {
      return -10;
    }
  }

  if ( board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if ( board[0][2] === AIPlayer ) {
      return +10;
    } else if ( board[0][2] === HumanPlayer ) {
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

  for (var i = 1; i <= 9; i++) {
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
        if (board[i][j] === "_") {
          board[i][j] = AIPlayer;

          best = Math.max(best, minimax(board, depth + 1, !isMax));

          board[i][j] = "_";
        }
      }
    }

    return best;
  } else {
    var best = 1000;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (board[i][j] === "_") {
          board[i][j] = HumanPlayer;

          best = Math.min(best, minimax(board, depth + 1, !isMax));

          board[i][j] = "_";
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

      if (board[i][j] === "_") {
        board[i][j] = AIPlayer;

        var moveVal = minimax(board, 0, false);

        board[i][j] = "_";

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
  if( mainBoard[arr[0]][arr[1]] !== "_" ){
   return;
  }
  document.getElementById(id).innerHTML = HumanPlayer;
  mainBoard[arr[0]][arr[1]] = HumanPlayer;

  if ( getWinner( mainBoard ) === -10 ) {
    endGame( "You win!" );
    return;
  }
  if ( movesLeft( mainBoard ) === false ) {
    endGame( "Draw!" );
    return;
  }

  //AIPlay();
  await moveAI();

  if (getWinner(mainBoard) === 10) {
    endGame( "You lost!" );
    return;
  }
  if ( movesLeft(mainBoard) === false ) {
    endGame( "Draw!" );
    return;
  }
}

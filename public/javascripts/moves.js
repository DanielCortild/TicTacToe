/*
Created on: Friday December 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)
*/

function moveQ() {
  let model;
  if( AIPlayer === 1  ) {
    model = JSON.parse(JSON.stringify( QModels[mode]["P1"] ) );
  } else if ( AIPlayer === -1 ) {
    model = JSON.parse(JSON.stringify( QModels[mode]["P2"] ) );
  }

  [nextBoards, positions] = possibleMoves(AIPlayer);
  maxVal = -999;
  maxMove = -1;
  for(b=0; b<nextBoards.length; b++) {
    if( model[ 'H'+toHash(nextBoards[b]) ] > maxVal ) {
      maxVal = model[ 'H'+toHash(nextBoards[b]) ];
      maxMove = positions[b];
    }
  }
  document.getElementById("c" + maxMove).innerHTML = tokens[AIPlayer];
  mainBoard[maxMove] = AIPlayer;
}

async function moveDL() {
  let model;
  if( AIPlayer === 1  ) {
    model = await tf.loadLayersModel(DLModels[mode]["P1"]);
  } else if ( AIPlayer === -1 ) {
    model = await tf.loadLayersModel(DLModels[mode]["P2"]);
  }

  [nextBoards, positions] = possibleMoves(AIPlayer);
  nextBoardsTensor = tf.tensor(nextBoards);

  predictions = model.predict(nextBoardsTensor);
  predictions = predictions.dataSync();

  maxMove = positions[predictions.indexOf(Math.max(...predictions))];

  document.getElementById("c" + maxMove).innerHTML = tokens[AIPlayer];
  mainBoard[maxMove] = AIPlayer;
}

function moveMM() {
  var bestVal = -999;
  bestMove = -1;
  [possibleBoards, positions] = possibleMoves(AIPlayer);
  for (i in possibleBoards) {
    var moveVal = minmax(possibleBoards[i], 0, false);
    if (moveVal > bestVal) {
      bestMove = positions[i];
      bestVal = moveVal;
    }
  }
  document.getElementById("c" + bestMove).innerHTML = tokens[AIPlayer];
  mainBoard[bestMove] = AIPlayer;
}

function minmax(board, depth, isMax) {
  var score = getWinner(board);
  if (score === 1) {
    return score;
  }
  if (score === -1) {
    return score;
  }
  if (movesLeft(board) === false) {
    return 0;
  }
  if (isMax) {
    var best = -1000;
    for (var i = 0; i < 9; i++) {
      if (board[i] === 0) {
        board[i] = AIPlayer;
        best = Math.max(best, minmax(board, depth + 1, !isMax));
        board[i] = 0;
      }
    }
    return best;
  } else {
    var best = 1000;
    for (var i = 0; i < 9; i++) {
      if (board[i] === 0) {
        board[i] = HumanPlayer;
        best = Math.min(best, minmax(board, depth + 1, !isMax));
        board[i] = 0;
      }
    }
    return best;
  }
}

function moveQ() {
  const data = require('../models/test.json');
  [nextBoards, positions] = possibleMoves(AIPlayer);
  maxVal = -999;
  maxMove = -1;
  for(b=0; b<nextBoards.length; b++) {
    if( data[ 'H'+toHash(nextBoards[b]) ] > maxVal ) {
      maxVal = data[ 'H'+toHash(nextBoards[b]) ];
      maxMove = positions[b];
    }
  }
  document.getElementById("c" + maxMove).innerHTML = tokens[AIPlayer];
  mainBoard[maxMove] = AIPlayer;
}
window.moveQ = moveQ;

async function moveDL() {
  let model = await tf.loadLayersModel(modelURL);

  [nextBoards, positions] = possibleMoves(AIPlayer);
  nextBoardsTensor = tf.tensor(nextBoards);

  predictions = model.predict(nextBoardsTensor);
  predictions = predictions.dataSync();

  maxMove = positions[predictions.indexOf(Math.max(...predictions))];

  document.getElementById("c" + maxMove).innerHTML = tokens[AIPlayer];
  mainBoard[maxMove] = AIPlayer;
}
window.moveDL = moveDL;

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
window.moveMM = moveMM;

function minmax(board, depth, isMax) {
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

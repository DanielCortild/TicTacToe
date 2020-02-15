/*
Created on: Friday 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)
*/

function move(mode) {
  if(mode.includes("Stupid")) {
    moveS();
  }
  if(mode.includes("Q")) {
    moveQ();
  }
  if(mode.includes("DL")) {
    moveDL();
  }
  if(mode.includes("MinMax")) {
    moveMM();
  }
}

function play(position, player) {
  document.getElementById("c" + position).innerHTML = tokens[player];
  mainBoard[position] = player;
}

function moveS() {
  //1. If there is a winning move, take it
  [nextBoards, positions] = possibleMoves(AIPlayer);
  for(board in nextBoards) {
    if(getWinner(nextBoards[board]) === 1) {
      play(positions[board], AIPlayer);
      return;
    }
  }

  //2. If your opponent has a winning move, take the move so he can’t take it
  [nextBoards, positions] = possibleMoves(HumanPlayer);
  for(board in nextBoards) {
    if(getWinner(nextBoards[board]) === -1) {
      play(positions[board], AIPlayer);
      return;
    }
  }

  //3. Take the center square over edges and corners
  if(mainBoard[4] === 0) {
    play(4, AIPlayer);
    return;
  }

  //4. Take corner squares over edges
  if(mainBoard[0] === 0) {
    play(0, AIPlayer);
    return;
  }
  if(mainBoard[2] === 0) {
    play(2, AIPlayer);
    return;
  }
  if(mainBoard[6] === 0) {
    play(6, AIPlayer);
    return;
  }
  if(mainBoard[8] === 0) {
    play(8, AIPlayer);
    return;
  }

  //5. Take edges if they are the only thing available
  if(mainBoard[1] === 0) {
    play(1, AIPlayer);
    return;
  }
  if(mainBoard[3] === 0) {
    play(3, AIPlayer);
    return;
  }
  if(mainBoard[5] === 0) {
    play(5, AIPlayer);
    return;
  }
  if(mainBoard[7] === 0) {
    play(7, AIPlayer);
    return;
  }
}

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
  play(maxMove, AIPlayer);
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

  play(maxMove, AIPlayer);
}

function moveMM() {
  var bestVal = -999;
  bestMove = -1;
  [possibleBoards, positions] = possibleMoves(AIPlayer);
  for (i in possibleBoards) {
    var moveVal = minmax(possibleBoards[i], false);
    if (moveVal > bestVal) {
      bestMove = positions[i];
      bestVal = moveVal;
    }
  }
  play(bestMove, AIPlayer);
}

function minmax(board, isMax) {
  var score = getWinner(board);
  if (score === 1) {
    return score;
  }
  if (score === -1) {
    return score;
  }
  if (board.includes(0) === false) {
    return 0;
  }
  if (isMax) {
    var bestMax = -999;
    for (var i = 0; i<board.length; i++) {
      if (board[i] === 0) {
        board[i] = AIPlayer;
        bestMax = Math.max(bestMax, minmax(board, !isMax));
        board[i] = 0;
      }
    }
    return bestMax;
  } else {
    var bestMin = 999;
    for (var i = 0; i<board.length; i++) {
      if (board[i] === 0) {
        board[i] = HumanPlayer;
        bestMin = Math.min(bestMin, minmax(board, !isMax));
        board[i] = 0;
      }
    }
    return bestMin;
  }
}

function toHash(board) {
  hashVal = 0;
  base = Math.max(BOARD_HEI, BOARD_WID);
  for( i=0; i<board.length; i++ ) {
    hashVal = base*hashVal + ( (board[i]+base) %base );
  }
  return hashVal;
}

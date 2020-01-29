var positions;

async function moveAI() {
  let model = await tf.loadLayersModel(modelURL);

  nextBoards = possibleMoves();
  nextBoardsTensor = tf.tensor(nextBoards);

  nextPredictions = model.predict(nextBoardsTensor);

  arrayPredictions = nextPredictions.dataSync();

  maxMove = positions[arrayPredictions.indexOf(Math.max(...arrayPredictions))];
  newId = maxMove + 1;

  document.getElementById("c" + newId).innerHTML = AIPlayer;
  mainBoard[Math.floor(maxMove/3)][maxMove%3] = AIPlayer;
}

function possibleMoves() {
  possibleBoards = [];
  positions = [];

  let transBoard = JSON.parse(JSON.stringify(mainBoard));

  for( i=0; i<3; i++ ) {
    for( j=0; j<3; j++ ) {
      if(transBoard[i][j] === '_') {
        transBoard[i][j] = 0;
      }
      if(transBoard[i][j] === 'O') {
        transBoard[i][j] = -1;
      }
      if(transBoard[i][j] === 'X') {
        transBoard[i][j] = 1;
      }
    }
  }

  flatBoard = [];

  for( i=0; i<3; i++ ) {
    for( j=0; j<3; j++ ) {
      flatBoard.push(transBoard[i][j]);
    }
  }

  for( i=0; i<9; i++ ) {
    if(flatBoard[i] === 0) {
      let copyBoard = JSON.parse(JSON.stringify(flatBoard));
      if( AIPlayer === 'O' ) {
        copyBoard[i] = -1;
      } else {
        copyBoard[i] = 1;
      }
      positions.push(i);
      possibleBoards.push(copyBoard);
    }
  }
  return possibleBoards;
}

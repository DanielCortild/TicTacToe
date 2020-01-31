var positions;

async function moveDL() {
  let model = await tf.loadLayersModel(modelURL);

  nextBoards = possibleMoves();
  nextBoardsTensor = tf.tensor(nextBoards);

  nextPredictions = model.predict(nextBoardsTensor);

  arrayPredictions = nextPredictions.dataSync();

  maxMove = positions[arrayPredictions.indexOf(Math.max(...arrayPredictions))];

  document.getElementById("c" + maxMove).innerHTML = tokens[AIPlayer];
  mainBoard[maxMove] = AIPlayer;
}

function possibleMoves() {
  possibleBoards = [];
  positions = [];

  for( i=0; i<9; i++ ) {
    if(mainBoard[i] === 0) {
      let copyBoard = JSON.parse(JSON.stringify(mainBoard));
      copyBoard[i] = AIPlayer;
      positions.push(i);
      possibleBoards.push(copyBoard);
    }
  }
  return possibleBoards;
}

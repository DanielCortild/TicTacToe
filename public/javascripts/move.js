function possibleMoves(Player) {
  possibleBoards = [];
  positions = [];

  for( i=0; i<9; i++ ) {
    if(mainBoard[i] === 0) {
      let copyBoard = JSON.parse(JSON.stringify(mainBoard));
      copyBoard[i] = Player;
      positions.push(i);
      possibleBoards.push(copyBoard);
    }
  }
  return [possibleBoards, positions];
}

function toHash(board) {
  hashVal = 0;
  for( i=0; i<board.length; i++ ) {
    hashVal = 3*hashVal + ( (board[i]+3) %3 );
  }
  return hashVal;
}

function move(mode) {
  if(mode === "Q" || mode === "Q400000") {
    moveQ();
  }
  if(mode === "DL") {
    moveDL();
  }
  if(mode === "MM") {
    moveMM();
  }
}

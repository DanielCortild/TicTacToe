/*
Created on: Friday 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)
*/

function resetGame() {
  mode = $("#agent").val() ;

  $("#result").hide();
  $("#game").show();
  $("#game").css("opacity", 1);

  mainBoard = new Array(BOARD_HEI*BOARD_WID).fill(0);

  $(".squares").html("");

  return mainBoard;
}

function checkGame(board) {
  if (getWinner(board) === 1) {
    endGame("You lose!");
    return true;
  }
  if (getWinner(board) === -1) {
    endGame("You win!");
    return true;
  }
  if (board.includes(0) === false) {
    endGame("Draw!");
    return true;
  }
}

function getWinner(board) {

  for (let i=0; i<BOARD_HEI; i++) {
    for(let j=0; j<BOARD_WID-2; j++) {
      if ( board[BOARD_WID*i+j] === board[BOARD_WID*i+j+1] && board[BOARD_WID*i+j+1] === board[BOARD_WID*i+j+2] ) {
        if ( board[BOARD_WID*i+j] === AIPlayer ) {
          return +1;
        } else if ( board[BOARD_WID*i+j] === HumanPlayer ) {
          return -1;
        }
      }
    }
  }

  for (let i=0; i<BOARD_WID; i++) {
    for(let j=0; j<BOARD_HEI-2; j++) {
      if ( board[BOARD_WID*j+i] === board[BOARD_WID*(j+1)+i] && board[BOARD_WID*(j+1)+i] === board[BOARD_WID*(j+2)+i] ) {
        if ( board[BOARD_WID*j+i] === AIPlayer ) {
          return +1;
        } else if ( board[BOARD_WID*j+i] === HumanPlayer ) {
          return -1;
        }
      }
    }
  }

  for (let i=0; i<BOARD_WID-2; i++) {
    for(let j=0; j<BOARD_HEI-2; j++) {
      if ( board[BOARD_WID*j+i] === board[BOARD_WID*(j+1)+i+1] && board[BOARD_WID*(j+1)+i+1] === board[BOARD_WID*(j+2)+i+2] ) {
        if ( board[BOARD_WID*j+i] === AIPlayer ) {
          return +1;
        } else if ( board[BOARD_WID*j+i] === HumanPlayer ) {
          return -1;
        }
      }
    }
  }

  for (let i=0; i<BOARD_WID-2; i++) {
    for(let j=0; j<BOARD_HEI-2; j++) {
      if ( board[BOARD_WID*j+i+2] === board[BOARD_WID*(j+1)+i+1] && board[BOARD_WID*(j+1)+i+1] === board[BOARD_WID*(j+2)+i] ) {
        if ( board[BOARD_WID*j+i+2] === AIPlayer ) {
          return +1;
        } else if ( board[BOARD_WID*j+i+2] === HumanPlayer ) {
          return -1;
        }
      }
    }
  }
  return 0;
}

function endGame(message) {
  $("#result").html(message);
  $("#result").show();

  $("#game").css("opacity", 0.6);
}

function possibleMoves(Player) {
  possibleBoards = [];
  positions = [];

  for( i=0; i<BOARD_HEI*BOARD_WID; i++ ) {
    if(mainBoard[i] === 0) {
      let copyBoard = JSON.parse(JSON.stringify(mainBoard));
      copyBoard[i] = Player;
      positions.push(i);
      possibleBoards.push(copyBoard);
    }
  }
  return [possibleBoards, positions];
}

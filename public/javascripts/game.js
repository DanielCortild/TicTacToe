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

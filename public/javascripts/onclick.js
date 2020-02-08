/*
Created on: Friday December 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)
*/

function XChoose() {
  AIPlayer = -1; HumanPlayer = 1;

  $("#O_chooser").css("border-style", "none");
  $("#X_chooser").css("border-style", "solid");
}

function OChoose() {
  AIPlayer = 1; HumanPlayer = -1;

  $("#X_chooser").css("border-style", "none");
  $("#O_chooser").css("border-style", "solid");
}
function startClick() {
  $("#options").hide();
  $("#game").show();

  mainBoard = resetGame();
}

function reconfigClick() {
  $("#options").show();
  $("#game").hide();
}

async function squareClick(id) {
  var arr = parseInt(id.charAt(1));
  if( mainBoard[arr] !== 0 ){
    return;
  }
  $("#"+id).html(tokens[HumanPlayer]);
  mainBoard[arr] = HumanPlayer;

  if( checkGame(mainBoard) ) {return;}

  await move(mode);

  if( checkGame(mainBoard) ) {return;}
}

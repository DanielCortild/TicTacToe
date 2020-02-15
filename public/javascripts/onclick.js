/*
Created on: Friday 17th of January 2020
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

async function startClick() {
  loadGame();
  GAME_MODE = $("#agent").val();
  $("#options").hide();
  $("#gamecontainer").show();
  $("#description").html(`Playing against <b>${$("#agent").val()}</b> as <b>${tokens[HumanPlayer]}</b>`);
  mainBoard = resetGame();
  if(AIPlayer === 1) {
    await move(GAME_MODE);
  }
}

function config() {
  $("#options").show();
  $("#gamecontainer").hide();
  $("#result").hide();
}

async function squareClick(id) {
  id = parseInt(id.substr(1,id.length+1));
  if(mainBoard[id] !== 0) {return;}
  if(checkGame(mainBoard)) {return;}
  $("#c"+id).html(tokens[HumanPlayer]);
  mainBoard[id] = HumanPlayer;

  if( checkGame(mainBoard) ) {return;}
  await move(GAME_MODE);
  if( checkGame(mainBoard) ) {return;}
}

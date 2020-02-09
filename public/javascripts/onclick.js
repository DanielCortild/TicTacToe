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
function startClick() {
  let GridSize = $("#gridsize").val();
  var BOARD_HEI = GridSize.substr(0, GridSize.indexOf('x'));
  var BOARD_WID = GridSize.substr(GridSize.indexOf('x')+1, GridSize.length+1);

  GAME_MODE = $("#agent").val();

  $("#options").hide();
  $("#gamecontainer").show();
  $("#description").html(`GridSize: ${$("#gridsize").val()} <br>
                          Oppenent: ${$("#agent").val()} <br>
                          Your Color: ${tokens[HumanPlayer]}`);


  mainBoard = resetGame();
}

function reconfigClick() {
  $("#options").show();
  $("#gamecontainer").hide();
  $("#result").hide();
}

async function squareClick(id) {
  id = parseInt(id.substr(1,id.length+1));
  if( mainBoard[id] !== 0 ){
    return;
  }
  $("#c"+id).html(tokens[HumanPlayer]);
  mainBoard[id] = HumanPlayer;

  if( checkGame(mainBoard) ) {return;}

  await move(GAME_MODE);

  if( checkGame(mainBoard) ) {return;}
}

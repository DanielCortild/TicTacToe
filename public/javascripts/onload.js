/*
Created on: Friday 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)
*/

var AIPlayer, HumanPlayer, mainBoard, GAME_MODE;
var tokens = {
  "-1": "O",
  "1" : "X"
}
var BOARD_HEI = 3;
var BOARD_WID = 3;

$(function(){
  $("#gamecontainer").hide();
  loadGrids();
  loadAgents();
  loadGame();

  XChoose();
});

function loadGrids () {
  modeSelect = document.getElementById('gridsize');
  modeSelect.options[modeSelect.options.length] = new Option("Grid 3x3", "3x3");
}

function loadAgents () {
  modeSelect = document.getElementById('agent');
  modeSelect.options[modeSelect.options.length] = new Option("MinMax Agent", "MM");
  for(key in QModels) {
    modeSelect.options[modeSelect.options.length] = new Option(key, key);
  }
  for(key in DLModels) {
    modeSelect.options[modeSelect.options.length] = new Option(key, key);
  }
}

function loadGame () {
  let k=0;
  for(i=0; i<BOARD_HEI; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for(j=0; j<BOARD_WID; j++) {
      let square = document.createElement("button");
      square.setAttribute("class", "squares");
      square.setAttribute("id", "c"+(i*BOARD_WID+j) );
      square.setAttribute("onclick", "squareClick(this.id)");

      if(i*BOARD_WID+j === 0) {square.style = "border-top-left-radius: 10px;"}
      if(i*BOARD_WID+j === BOARD_WID-1) {square.style = "border-top-right-radius: 10px;"}
      if(i*BOARD_WID+j === (BOARD_WID)*(BOARD_HEI-1)) {square.style = "border-bottom-left-radius: 10px;"}
      if(i*BOARD_WID+j === BOARD_HEI*BOARD_WID-1) {square.style = "border-bottom-right-radius: 10px;"}

      row.appendChild(square);
    }
    document.getElementById("game").appendChild(row);
  }
}

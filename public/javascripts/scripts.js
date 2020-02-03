/*
Created on: Friday December 17th of January 2020

Author: Daniel Cortild (https://github.com/DanielCortild)

TicTacToe JS
Only a MinMax model is avaible atm

To use Browserify (Allows usage of 'require'):
browserify js/scripts.js -o js/bundle.js

To transform .h5 file created by the python script:
tensorflowjs_converter --input_format=keras models/PyModels/DL1.h5 models/JSModels/

To start Live-Server using npx:
npx live-server
*/

var AIPlayer, HumanPlayer, mainBoard, mode;

window.onload = function() {
  loadModels();
}

var tokens = {
  "-1": "O",
  "1" : "X"
}

function loadModels () {
  for(key in QModels) {
    modeSelect = document.getElementById('selection');
    modeSelect.options[modeSelect.options.length] = new Option(key, key);
  }
  for(key in DLModels) {
    modeSelect = document.getElementById('selection');
    modeSelect.options[modeSelect.options.length] = new Option(key, key);
  }
}


function XChoose() {
  AIPlayer = -1;
  HumanPlayer = 1;

  document.getElementById("O_chooser").style.opacity = 0.6;
  mainBoard = resetGame();
}

function OChoose() {
  AIPlayer = 1;
  HumanPlayer = -1;

  document.getElementById("X_chooser").style.opacity = 0.6;
  mainBoard = resetGame();

  move(mode);

}

async function squareClick(id) {
  var arr = parseInt(id.charAt(1));
  if( mainBoard[arr] !== 0 ){
   return;
  }
  document.getElementById(id).innerHTML = tokens[HumanPlayer];
  mainBoard[arr] = HumanPlayer;

  if( checkGame() ) {return;}

  await move(mode);

  if( checkGame() ) {return;}
}

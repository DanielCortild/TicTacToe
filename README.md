# TicTacToe

TicTacToe Application developped for our Travail de Fin d'Etudes in Mathematics at Centre Scolaire Saint-Michel. The do this, we developped a python script training an AI model which learns to play perfectly. We developped a RandomAgent, a MinMaxAgent, a QAgent and a DLAgent. The MinMaxAgent is the most efficient in this case, but the least generalizable. The DLAgent is the one taking the longest to train of the 3 trainable models, but is the most generalizable.

This Repo is the Web-visuablisation of this program. You may choose which agent you want to play against and even how much it is trained, and then play against it. The visualisation is hosted on https://cssm-tictactoe.herokuapp.com/

On install, install all dependencies:
npm install

To launch website:
npm start

To run heroku locally:
heroku local

To run heroku online:
heroku open

When Website is running locally, go to:
http://localhost:5000/

Models:

MinMax - BruteForce, 0% LR

Q1 - Unknown Epochs, ..% LR

Q2 - 400000 Epochs, 0% LR

DL - Unknown Epochs, ..% LR

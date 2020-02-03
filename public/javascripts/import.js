/*
Created on: Friday December 17th of January 2020
Author: Daniel Cortild (https://github.com/DanielCortild)

To transform this file to readable file by server:
In ./public/javascripts, launch
browserify import.js -o import_bundle.js

To transform .h5 file created by the python script:
tensorflowjs_converter --input_format=keras path/to/.h5 path/to/new/file
*/
var QModels = {};

QModels["Q-Agent #1"] = {};
QModels["Q-Agent #1"]["P1"] = require('../models/QModels/Q1/Player1/model.json');
QModels["Q-Agent #1"]["P2"] = require('../models/QModels/Q1/Player2/model.json');

QModels["Q-Agent #2"] = {};
QModels["Q-Agent #2"]["P1"] = require('../models/QModels/Q2/Player1/model.json');
QModels["Q-Agent #2"]["P2"] = require('../models/QModels/Q2/Player2/model.json');

window.QModels = QModels;

var DLModels = {};

DLModels["DL Agent #1"] = {};
DLModels["DL Agent #1"]["P1"] = '../models/DLModels/DL1/Player1/model.json';
DLModels["DL Agent #1"]["P2"] = '../models/DLModels/DL1/Player2/model.json';

window.DLModels = DLModels;

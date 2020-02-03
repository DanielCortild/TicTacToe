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

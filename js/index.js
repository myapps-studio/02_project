'use strict';
/*zmienne*/
var output = document.getElementById('output');
var btn_paper = document.getElementById('btn-paper');
var btn_stone = document.getElementById('btn-stone');
var btn_scissors = document.getElementById('btn-scissors');
var resultCounter = document.getElementById('result');
var newGame = document.getElementById('btn-newGame');
var roundInf = document.getElementById('roundInf');
var PlayerTurn
var CompTurn
var turn
var PlayerTurnTxt
var CompTurnTxt
var X
var Y
var RoundNum /*liczba wygranych gracza potrzbna wygrania gry*/
var RoundNumTotal
var blockGame /*wywolanie: "Game over, please press the new game button!"*/
var gameOverCheck

var playerMove = function(turn){
  CompTurn = CompTurnFunc();
  var Result = ResultTxtFunc(turn, CompTurn);
  return Result;
}

var CompTurnFunc = function(){
  var NumRandom = Math.floor((Math.random() * 3) + 1);
  return NumRandom;
}

var ResultTxtFunc = function(PlayerTurn, CompTurn){
    if (PlayerTurn == 1) { 
      var PlayerTurnTxt = 'PAPER';
  } else if (PlayerTurn == 2) {
      var PlayerTurnTxt = 'STONE';
  } else {
      var PlayerTurnTxt = 'SCISSORS';
  }
     if (CompTurn == 1) { 
      var CompTurnTxt = 'PAPER';
  } else if (CompTurn == 2) {
      var CompTurnTxt = 'STONE';
  } else {
      var CompTurnTxt = 'SCISSORS';
  }
    if (PlayerTurn == CompTurn) {
     var Txt = 'It is a DRAW!';
  } else if ((PlayerTurn == 1 && CompTurn == 2) || (PlayerTurn == 2 && CompTurn == 3) || (PlayerTurn == 3 && CompTurn == 1)) {
     var Txt = 'You WON. You played: ' + PlayerTurnTxt + ', Computer played: ' + CompTurnTxt + '.';
     X = X + 1;
     RoundNum = RoundNum - 1;
  } else {
     var Txt = 'You LOST. You played: ' + PlayerTurnTxt + ', Computer played: ' + CompTurnTxt + '.';
     Y = Y + 1;
  }
  return Txt; 
}

var endGameFunc = function(X, Y, RoundNumTotal) {
  if (X == RoundNumTotal) {
    var endGameTxt = 'YOU WON THE ENTIRE GAME!!!' + '<br>';
    blockGame = blockGame + 1;
  } else if (Y == RoundNumTotal) {
    var endGameTxt = 'YOU LOST THE ENTIRE GAME!!!' + '<br>';
    blockGame = blockGame + 1;
  } else {
    var endGameTxt = '';
    blockGame = 0;
  }
  return endGameTxt
}

/*~~~~~~*/

newGame.addEventListener('click', function(){
  RoundNum = window.prompt('How many wins you want to play [number]?');
  RoundNum = parseInt(RoundNum);
  RoundNumTotal = RoundNum;
  blockGame = 0;
  roundInf.innerHTML = 'You need ' + RoundNumTotal + ' wins to win the entire game!';
  output.innerHTML = '';
  X = 0;
  Y = 0;
  resultCounter.innerHTML = '/SCORE:/ Player-> '+ X +'-'+ Y +' <-Computer';
})

/* X to wygrane gracza, a Y to wygrane komputera */
X = 0;
Y = 0;

/* 1 -> paper */
btn_paper.addEventListener('click', function(){
  if (blockGame == 0){
      output.innerHTML = playerMove(1) + '<br>' + endGameFunc(X, Y, RoundNumTotal) + '<br>' + output.innerHTML;
      resultCounter.innerHTML = '/SCORE:/ Player-> '+ X +'-'+ Y +' <-Computer';
      roundInf.innerHTML = 'You need ' + RoundNum + ' wins to win the entire game!';
  } else {
      output.innerHTML = 'Game over, please press the new game button!'
  }
})

/* 2 -> stone */
btn_stone.addEventListener('click', function(){
  if (blockGame == 0){
    output.innerHTML = playerMove(2) + '<br>' + endGameFunc(X, Y, RoundNumTotal) + '<br>' + output.innerHTML;
    resultCounter.innerHTML = '/SCORE:/ Player-> '+ X +'-'+ Y +' <-Computer';
    roundInf.innerHTML = 'You need ' + RoundNum + ' wins to win the entire game!';
  } else {
    output.innerHTML = 'Game over, please press the new game button!'
  }
})

/* 3 -> scissors */
btn_scissors.addEventListener('click', function(){
  if (blockGame == 0){
    output.innerHTML = playerMove(3) + '<br>' + endGameFunc(X, Y, RoundNumTotal) + '<br>' + output.innerHTML;
    resultCounter.innerHTML = '/SCORE:/ Player-> '+ X +'-'+ Y +' <-Computer';
    roundInf.innerHTML = 'You need ' + RoundNum + ' wins to win the entire game!';
  } else {
    output.innerHTML = 'Game over, please press the new game button!'
  }
})
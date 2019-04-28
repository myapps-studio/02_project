var debug_output = document.getElementById('debug_output');

'use strict';
/*zmienne*/
var output = document.getElementById('output');
var resultCounter = document.getElementById('result');
var newGame = document.getElementById('btn-newGame');
var roundInf = document.getElementById('roundInf');
var turn
var PlayerTurnTxt
var CompTurnTxt
var RoundNum
var blockGame /*wywolanie: "Game over, please press the new game button!"*/
var gameOverCheck
var PlayerTurn
var CompTurn
var RoundNumTotal
var Y
var X

/*
var params {
  X
};
*/

var playerMove = function(turn){
  var CompTurn = CompTurnFunc();

  var Result = ResultTxtFunc(turn, CompTurn);
  return Result;
}

var CompTurnFunc = function(){
  var NumRandom = Math.floor((Math.random() * 3) + 1);
  return NumRandom;
}

var ResultTxtFunc = function(PlayerTurn, CompTurn){

  var PlayerTurnTxt = String(PlayerTurn);
  
  /* debug_output.innerHTML = PlayerTurnTxt; */

     if (CompTurn == 1) { 
      var CompTurnTxt = 'paper';
  } else if (CompTurn == 2) {
      var CompTurnTxt = 'stone';
  } else {
      var CompTurnTxt = 'scissors';
  }
    if (PlayerTurn == CompTurnTxt) {
     var Txt = 'It is a DRAW!';
  } else if ((PlayerTurn == 'paper' && CompTurn == 'stone') || (PlayerTurn == 'stone' && CompTurn == 'scissors') || (PlayerTurn == 'scissors' && CompTurn == 'paper')) {
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

var GameInfo = function(event) {
  
  var TurnTxt = event.target.getAttribute('data-move');

  if (blockGame == 0){
      output.innerHTML = playerMove(TurnTxt) + '<br>' + endGameFunc(X, Y, RoundNumTotal) + '<br>' + output.innerHTML;
      resultCounter.innerHTML = '/SCORE:/ Player-> '+ X +'-'+ Y +' <-Computer';
      roundInf.innerHTML = 'You need ' + RoundNum + ' wins to win the entire game!';
  } else {
      output.innerHTML = 'Game over, please press the new game button!'
  }
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

var ActBtn = document.querySelectorAll('.player-move');
var BtnCounter = ActBtn.length;

for(var i = 0; i < BtnCounter; i++){
  ActBtn[i].addEventListener('click', GameInfo);
}
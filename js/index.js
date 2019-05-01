'use strict';

var debug_output = document.getElementById('debug_output');

/*zmienne*/
var ModalContent = document.getElementById('ModalContent');
var output = document.getElementById('output');
var resultCounter = document.getElementById('result');
var newGame = document.getElementById('btn-newGame');
var roundInf = document.getElementById('roundInf');
var turn;
var PlayerTurnTxt;
var CompTurnTxt;
var RoundNum;
var blockGame; /*wywolanie: "Game over, please press the new game button!"*/
var gameOverCheck;
var PlayerTurn;
var CompTurn;
var RoundNumTotal;
var Y;
var X;

/*
var params {
  test1: 'aaa',
  test2: 'sss'
};

debug_output.innerHTML = params.test1;
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

     if (CompTurn == 1) { 
      var CompTurnTxt = 'paper';
  } else if (CompTurn == 2) {
      var CompTurnTxt = 'stone';
  } else {
      var CompTurnTxt = 'scissors';
  }
    if (PlayerTurnTxt == CompTurnTxt) {
     var Txt = 'It is a DRAW!';
  } else if ((PlayerTurnTxt == 'paper' && CompTurnTxt == 'stone') || (PlayerTurnTxt == 'stone' && CompTurnTxt == 'scissors') || (PlayerTurnTxt == 'scissors' && CompTurnTxt == 'paper')) {
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
    ModalContent.innerHTML = endGameTxt;
    blockGame = blockGame + 1;
  } else if (Y == RoundNumTotal) {
    var endGameTxt = 'YOU LOST THE ENTIRE GAME!!!' + '<br>';
    ModalContent.innerHTML = endGameTxt;
    blockGame = blockGame + 1;
  } else {
    var endGameTxt = '';
    blockGame = 0;
  }
  return endGameTxt;
}

var GameInfo = function(event) {
  
  var TurnTxt = event.target.getAttribute('data-move');

  if (blockGame == 0){
      output.innerHTML = playerMove(TurnTxt) + '<br>' + endGameFunc(X, Y, RoundNumTotal) + '<br>' + output.innerHTML;
      resultCounter.innerHTML = '/SCORE:/ Player-> '+ X +'-'+ Y +' <-Computer';
      roundInf.innerHTML = 'You need ' + RoundNum + ' wins to win the entire game!';
  } else {
      output.innerHTML = 'Game over, please press the new game button!';
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

/* Js-modal */

(function(){ 

  /* otwarcie modalu */
  
	var showModal = function(event){
		event.preventDefault();
   
    if (X == RoundNumTotal) {
		document.querySelector('#modal-overlay').classList.remove('show');  /* <- Usuwało klasę show ze wszystkich modali */
    document.querySelector('#modal').classList.add('show');
    document.querySelector('#modal-overlay').classList.add('show');  
    } else if (Y == RoundNumTotal){
    document.querySelector('#modal-overlay').classList.remove('show');  /* <- Usuwało klasę show ze wszystkich modali */
    document.querySelector('#modal').classList.add('show');
    document.querySelector('#modal-overlay').classList.add('show');
    }
    
	};
  
	var modalBtn = document.querySelectorAll('.player-move');             
	for(var i = 0; i < modalBtn.length; i++){
      modalBtn[i].addEventListener('click', showModal);
  }
  
  /* funkcja zamykająca modal */
  
	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
    
    var ModalCounter = document.querySelectorAll('.modal');
    var a = ModalCounter.length;
    
    for(var i =0; i < a; i++){
      ModalCounter[i].classList.remove('show');
    }
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
  /* zamykania modala poprzez kliknięcie w overlay */
  
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
   /* zablokowanie propagacji kliknięć z samego modala */
  
	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
})();
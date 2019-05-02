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
var blockGame; /* wywolanie: "Game over, please press the new game button!" */
var gameOverCheck;
var PlayerTurn;
var CompTurn;
var RoundNumTotal;
var Y;
var X;
var Round;

var params = {
  RoundsToWin: RoundNumTotal, 
  RoundsLeft: RoundNum,
  RoundCounter: Round,
  PlayerScore: X, 
  CompScore: Y,
  progress: []
};

var playerMove = function(turn){
  params.RoundCounter = params.RoundCounter + 1;

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
     params.PlayerScore = params.PlayerScore + 1;
     params.RoundsLeft = params.RoundsLeft - 1;
  } else {
     var Txt = 'You LOST. You played: ' + PlayerTurnTxt + ', Computer played: ' + CompTurnTxt + '.';
     params.CompScore = params.CompScore + 1;
  }
 
 /*
 debug_output.innerHTML = ' RoundsToWin: ' + params.RoundsToWin;
 debug_output.innerHTML = debug_output.innerHTML + ' RoundsLeft: ' + params.RoundsLeft;
 debug_output.innerHTML = debug_output.innerHTML + ' RoundCounter: ' + params.RoundCounter;
 debug_output.innerHTML = debug_output.innerHTML + ' PlayerScore: ' + params.PlayerScore;
 debug_output.innerHTML = debug_output.innerHTML + ' CompScore: ' + params.CompScore;
*/
  var PushIt = {RoundsToWin: params.RoundsToWin, RoundsLeft: params.RoundsLeft, RoundCounter: params.RoundCounter, PlayerScore: params.PlayerScore, CompScore: params.CompScore};
  params.progress.push(PushIt);

  return Txt; 
}

var endGameFunc = function(X, Y, RoundNumTotal) {
  if (params.PlayerScore == params.RoundsToWin) {
    var endGameTxt = 'YOU WON THE ENTIRE GAME!!!' + '<br>';
    ModalContent.innerHTML = endGameTxt;
    blockGame = blockGame + 1;

    /* create table*/
    createTable(

      params.progress
      ,
        ['RoundsToWin', 'RoundsLeft', 'RoundCounter', 'PlayerScore', 'CompScore'], 
        ['RoundsToWin', 'RoundsLeft', 'RoundCounter', 'PlayerScore', 'CompScore']
      );
    /* end */

  } else if (params.CompScore == params.RoundsToWin) {
    var endGameTxt = 'YOU LOST THE ENTIRE GAME!!!' + '<br>';
    ModalContent.innerHTML = endGameTxt;
    blockGame = blockGame + 1;

    /* create table*/
    createTable(

      params.progress
      ,
        ['RoundsToWin', 'RoundsLeft', 'RoundCounter', 'PlayerScore', 'CompScore'], 
        ['RoundsToWin', 'RoundsLeft', 'RoundCounter', 'PlayerScore', 'CompScore']
      );
    /* end */

  } else {
    var endGameTxt = '';
    blockGame = 0;
  }
  return endGameTxt;
}

var GameInfo = function(event) {
  
  var TurnTxt = event.target.getAttribute('data-move');

  if (blockGame == 0){
      output.innerHTML = playerMove(TurnTxt) + '<br>' + endGameFunc(X, Y, params.RoundsToWin) + '<br>' + output.innerHTML;
      resultCounter.innerHTML = '/SCORE:/ Player-> '+ params.PlayerScore +'-'+ params.CompScore +' <-Computer';
      roundInf.innerHTML = 'You need ' + params.RoundsLeft + ' wins to win the entire game!';
  } else {
      output.innerHTML = 'Game over, please press the new game button!';
  }
}
/*~~~~~~*/
params.RoundCounter = 0;

newGame.addEventListener('click', function(){
  params.RoundsLeft = window.prompt('How many wins you want to play [number]?');
  params.RoundsLeft = parseInt(params.RoundsLeft);
  params.RoundsToWin = params.RoundsLeft;
  blockGame = 0;
  roundInf.innerHTML = 'You need ' + params.RoundsToWin + ' wins to win the entire game!';
  output.innerHTML = '';
  params.PlayerScore = 0;
  params.CompScore = 0;
  resultCounter.innerHTML = '/SCORE:/ Player-> '+ params.PlayerScore +'-'+ params.CompScore +' <-Computer';
});

/* X to wygrane gracza, a Y to wygrane komputera */
params.PlayerScore = 0;
params.CompScore = 0;

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
   
    if (params.PlayerScore == params.RoundsToWin) {
		document.querySelector('#modal-overlay').classList.remove('show');  /* <- Usuwało klasę show ze wszystkich modali */
    document.querySelector('#modal').classList.add('show');
    document.querySelector('#modal-overlay').classList.add('show');  
    } else if (params.CompScore == params.RoundsToWin){
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

/*~~~~~~ end ~~~~~~*/

/* Create Func Table */

function createTable(objectArray, fields, fieldTitles) {
  
  let table = document.getElementById('table');
  /* debug_output.innerHTML = table; */
  let tbl = document.createElement('table');
  let thead = document.createElement('thead');
  let thr = document.createElement('tr');
  
  fieldTitles.forEach((fieldTitle) => {
    let th = document.createElement('th');
    th.appendChild(document.createTextNode(fieldTitle));
    thr.appendChild(th);
  });

  thead.appendChild(thr);
  tbl.appendChild(thead);

  let tbdy = document.createElement('tbody');
  let tr = document.createElement('tr');
  objectArray.forEach((object) => {
    let tr = document.createElement('tr');
    fields.forEach((field) => {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(object[field]));
      tr.appendChild(td);
    });
    tbdy.appendChild(tr);    
  });
  tbl.appendChild(tbdy);
  table.appendChild(tbl)
  return tbl;
}

/*~~~~~~ KONIEC ~~~~~~*/
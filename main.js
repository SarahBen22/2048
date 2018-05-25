$(function() {

	newGame();
var score=0;
var textscore= document.getElementById('score');

	$(document).keydown(function(e) {
		if(lockMove || has2048) return;
		lockMove = true;
		hasMove = false;
		switch(e.which) {
			case 37: // left
				moveAllLeft();
			break;
			case 38: // up
				moveAllUp();
			break;
			case 39: // right
				moveAllRight();
			break;
			case 40: // down
				moveAllDown();
			break;

			default: lockMove = false;return;
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});
});

function newGame(){
	initTable();
	addValue();
	addValue();
	lockMove = false;
	has2048 = false;
	drawTable();
}

function initTable(){
	table2048 = Array.apply(null, Array(size*size)).map(Number.prototype.valueOf,0);
}

function drawTable() {
	var table = $("#2048");
	table.empty();

	var value;
	var ligne;
	var td;
	var bgcolor, color;
	for(var j = 0; j < size; j++){
		ligne = $("<tr/>");
		for(var i = 0; i < size; i++){
			td = $("<td/>")
			value = getValue(i,j);
			if(value !== 0){
				td.append(value);
			}
			if(has2048){
				td.css("background-color" , "green");
			}else{


				bgcolor = 237  - (Math.log2(value) / nbEtape * 237);
				color = bgcolor > 125 ? 0:255;
				td.css("background-color" , "rgb(100,149,"+bgcolor+")");
				td.css("color" , "rgb("+color+","+color+","+color+")")
			}
			ligne.append(td);
		}
		table.append(ligne);
	}
}

function addValue(){
	var arrayEmpty =  new Array();
	table2048.forEach(function(element, index) {
		if(element === 0)
			arrayEmpty.push(index);
	});

	if(arrayEmpty.length > 0){
		table2048[arrayEmpty[Math.floor(Math.random()* arrayEmpty.length)]] = 2;
	}



}

function moveAllRight(){
	var hasMoveLocal = false;
	for(var j = size-1; j >= 0; j--){
		for(var i = size-1; i >= 0; i--){
			hasMoveLocal |= moveRight(i, j);
		}
	}
	drawTable();
	if(hasMoveLocal){
		hasMove = true;
		setTimeout(moveAllRight, 100);
	}else{
		endMove();
	}
}

function moveAllLeft(){
	var hasMoveLocal = false;
	for(var j = size-1; j >= 0; j--){
		for(var i = 0; i < size; i++){
			hasMoveLocal |= moveLeft(i, j);
		}
	}
	drawTable();
	if(hasMoveLocal){
		hasMove = true;
		setTimeout(moveAllLeft, 100);
	}else{
		endMove();
	}
}

function moveAllUp(){
	var hasMoveLocal = false;
	for(var j = 0; j < size; j++){
		for(var i = size-1; i >= 0; i--){
			hasMoveLocal |= moveUp(i, j);
		}
	}
	drawTable();
	if(hasMoveLocal){
		hasMove = true;
		setTimeout(moveAllUp, 100);
	}else{
		endMove();
	}
}

function moveAllDown(){
	var hasMoveLocal = false;
	for(var j = size-1; j >= 0; j--){
		for(var i = size-1; i >= 0; i--){
			hasMoveLocal |= moveDown(i, j);
		}
	}
	drawTable();
	if(hasMoveLocal){
		hasMove = true;
		setTimeout(moveAllDown, 100);
	}else{
		endMove();
	}
}

function moveRight(x, y){
	var hasMove = true;
	var value = getValue(x,y);
	if(value === 0 || x+1 >= size){
		return false;
	}
	var valueLocal = getValue(x+1,y);
	if(valueLocal === 0 || valueLocal === value){
		setValue(x+1,y,valueLocal === 0 ? value : value*2);
		if(value*2 === finalValue){
			has2048 = true;
		}
		removeValue(x,y);
		return true;
	}
	return false;
}

function moveLeft(x, y){
	var hasMove = true;
	var value = getValue(x,y);
	if(value === 0 || x-1 < 0){
		return false;
	}
	var valueLocal = getValue(x-1,y);
	if(valueLocal === 0 || valueLocal === value){
		setValue(x-1,y,valueLocal === 0 ? value : value*2);
		if(value*2 === finalValue){
			has2048 = true;
		}
		removeValue(x,y);
		return true;
	}
	return false;
}

function moveDown(x, y){
	var hasMove = true;
	var value = getValue(x,y);
	if(value === 0 || y+1 >= size){
		return false;
	}
	var valueLocal = getValue(x, y+1);
	if(valueLocal === 0 || valueLocal === value){
		setValue(x,y+1,valueLocal === 0 ? value : value*2);
		if(value*2 === finalValue){
			has2048 = true;
		}
		removeValue(x,y);
		return true;
	}
	return false;
}

function moveUp(x, y){
	var hasMove = true;
	var value = getValue(x,y);
	if(value === 0 || y-1 < 0 ){
		return false;
	}
	var valueLocal = getValue(x, y-1);
	if(valueLocal === 0 || valueLocal === value){
		setValue(x,y-1,valueLocal === 0 ? value : value*2);
		if(value*2 === finalValue){
			has2048 = true;
		}
		removeValue(x,y);
		return true;
	}
	return false;
}


function endMove(){
	if(hasMove){
		addValue();
		drawTable();
	}
	lockMove = false;
}

function getValue(x,y){
	return table2048[y*size+x];
}

function setValue(x,y, value){
	table2048[y*size+x] = value;
}

function removeValue(x,y){
	table2048[y*size+x] = 0;
}


  var size = 4;
  var finalValue = 2048;
  var nbEtape = Math.log2(finalValue);
  var table2048;
  var has2048;
  var lockMove;
  var hasMove;

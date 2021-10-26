console.log('hello 2world');

var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');
var aObjects = [];
var aUnderfoot = [];
var keyUp = false, keyDown = false, keyLeft = false, keyRight = false;
var gravity;
var bounce;
console.log('json data', DATA);

cnv.setAttribute('width', DATA.windowWidth);
cnv.setAttribute('height', DATA.windowHeight);

///////////////////////
var enemy = new Image(30, 30);
enemy.onload = mainLoop;
enemy.src = './img/goust.png';

//////////////////////

var clear = function() {
	ctx.fillStyle = "#E3E3E3";
	ctx.fillRect(0,0,DATA.windowWidth,DATA.windowHeight);
}
var draw = function(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h,color);
} 

function onStartGame() {
}

clear();
function getCam() {
	var x = DATA.mainHero.x - DATA.windowWidth/2 > 1 ? DATA.mainHero.x - DATA.windowWidth/2 : 1;
	var y = DATA.mainHero.y - DATA.windowHeight/2 > 1 ? DATA.mainHero.y - DATA.windowHeight/2 : 1;
	return {x : x, y: y}
}
function drawUI(){
	ctx.fillStyle = "#000000";
	ctx.strokeText(DATA.mainHero.points,  DATA.windowWidth - 20, 20);
}
var mainLoop = function() {
	clear();
	ctx.drawImage(enemy, 150 - getCam().x, 745 - getCam().y, enemy.width, enemy.height);
	aObjects.forEach(calcObjects);
	aObjects.forEach(function(obj){
		draw(obj.x - getCam().x,obj.y - getCam().y, obj.w,obj.h,obj.color);
	})
	DATA.roomOne.obstacles.forEach(function (obj) {
		draw(obj.x - getCam().x, obj.y - getCam().y, obj.w, obj.h, obj.color);
	})
}
aObjects.push(DATA.mainHero);


//скомпоновать keyup и keydown
document.addEventListener('keydown', function (event) {
	let hero = DATA.mainHero;
	let actions = DATA.actions;
	let action = actions.filter(action => action.key === event.code);
	if (action[0]){
		hero.actions[action[0].name] = true;
		console.log('action',action);
	}
}.bind(this));

document.addEventListener('keyup', function (event) {
	let hero = DATA.mainHero;
	let actions = DATA.actions;
	let action = actions.filter(action => action.key === event.code);
	if (action[0]){
		hero.actions[action[0].name] = false;
		console.log('action',action);
	}
}.bind(this));

function calcObjects(Obj){
	var actions = Obj.actions;

	if (actions.moveRight) {
		if (checkMoveRight(Obj))
		// Obj.x = Obj.x + Obj.speed;
		Obj.x = Obj.x + checkMoveRight(Obj);
	}

	if (actions.moveLeft) {
		if (checkMoveLeft(Obj))
		Obj.x = Obj.x - checkMoveLeft(Obj);
	}

	if (!actions.jump) {
		if (checkMoveDown(Obj))
		Obj.y = Obj.y + DATA.gravity;
	}

	if (actions.moveUp) {
		if (checkJump(Obj)) {
			console.log('moveUp');
			actions.jump = true;
			actions.jumpTime = Obj.jumpHeight;
		}
	}

	if (actions.jump) {
		if (actions.jumpTime) {
			actions.jumpTime = actions.jumpTime - 1
			if (checkMoveUp(Obj) && actions.jumpTime > 5) {
				Obj.y = Obj.y - Obj.jumpSpeed;
			}
		} else {
			actions.jump = false;
		} 
	}
}
function checkJump(Obj){
	return !checkMoveDown(Obj)
}
function checkMoveRight(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.speed, temp;

	var bResult =  aObs.every(function (oObs){
		if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h && Obj.x < oObs.x) {// проверка по высоте, и, я слева
			temp = Math.abs((Obj.x + Obj.w) - oObs.x); 
			nMove = oObs.block ? Math.min(nMove,temp) : nMove;
			if (!nMove && oObs.action) {
				oObs.action(Obj);
			}
			return  nMove
		} else return true
	})
	return nMove;
}
// function checkMoveLeft(Obj){ 
// 	var aObs = DATA.roomOne.obstacles;
// 	var bResult =  aObs.every(function (oObs){
// 		if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h) {// проверка по y
// 			return Obj.x - Obj.speed > oObs.x + oObs.w || Obj.x - Obj.speed < oObs.x
// 		} else return true
// 	})
// 	return bResult;
// }

function checkMoveLeft(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var nMove = Obj.speed, temp;
	var bResult =  aObs.every(function (oObs){
		if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h && Obj.x > oObs.x) {// проверка по y
			temp = Math.abs((oObs.x + oObs.w) - Obj.x);
			console.log(temp);
			nMove = oObs.block ? Math.min(nMove,temp) : nMove;
			if (!nMove && oObs.action) {
				oObs.action(Obj);
			}
			console.log('moe',nMove);
			return  nMove
		} else return true
	})
	return nMove;
}

function checkMoveUp(Obj) {
	var aObs = DATA.roomOne.obstacles;
	var bResult =  aObs.every(function (oObs){
		if (Obj.x + Obj.w > oObs.x && Obj.x < oObs.x + oObs.w) {// проверка по x
			console.log('chek up', Obj, oObs);
			return Obj.y < oObs.y || Obj.y - Obj.jumpSpeed  > oObs.y + oObs.h
		} else return true
	})
	return bResult;
}
function checkMoveDown(Obj){ 
	var aObs = DATA.roomOne.obstacles;
	var bResult =  aObs.every(function (oObs){
		if (Obj.x + Obj.w > oObs.x && Obj.x < oObs.x + oObs.w) {// проверка по x
			return Obj.y + Obj.h + DATA.gravity < oObs.y  || Obj.y > oObs.y + oObs.h
		} else return true
	})
	return bResult;
}
//Попытка универсальной функции, но что то пошло не так
// function checkMove(a1x,a1y,a2x,a2y,b1x,b1y,b2x,b2y, speed) {
// 	if (Obj.y + Obj.h > oObs.y && Obj.y < oObs.y + oObs.h) {
// 			return Obj.x + Obj.w + Obj.speed < oObs.x
// 		} else return true
// }


document.addEventListener('mousedown', function (event) {
}.bind(this));

setInterval(mainLoop,1000/60);
// mainLoop();


console.log('hello 2world');

var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');
var aObjects = [];
var aUnderfoot = [];
var keyUp = false, keyDown = false, keyLeft = false, keyRight = false;
var gravity;
var bounce;

var clear = function() {
	ctx.fillStyle = "#E3E3E3";
	ctx.fillRect(0,0,500,500);
}
var draw = function(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h,color);
} 

function onStartGame() {
	gravity = setInterval(fGravity, 1000 / 60);
}

function fBounce() {
	
	this.mainObj.y = this.mainObj.y - 120;
	this.onStartGame();
}

function fGravity(e) {
	if (aUnderfoot[0].y - 40 == this.mainObj.y && this.mainObj.x <= aUnderfoot[0].w || this.mainObj.y >= 455) {
		clearInterval(gravity);
	} else {
		this.mainObj.y = this.mainObj.y + 4;
	}
	if (aUnderfoot[1].y - 40 == this.mainObj.y && this.mainObj.x >= aUnderfoot[1].x || this.mainObj.y >= 455) {
		clearInterval(gravity);
	}
	if (aUnderfoot[0].w -2 == this.mainObj.x) {
		this.onStartGame();
    }
}

function onButton() {
	console.log('123');
	
	aObjects.push({
	x: 10,
	y: 20,
	w: 30,
	h: 40,
	color :"#ff7f50"
});
}
// var drawEl = function() {
// 	drawMain(20,20,10,10,'#DD5656');
// }
clear();
draw(20,20,10,10,'#DD5656');
var mainLoop = function() {
	clear();
	aObjects.forEach(function(obj){
		draw(obj.x,obj.y,obj.w,obj.h,obj.color);
	})
	aUnderfoot.forEach(function (obj) {
		draw(obj.x, obj.y, obj.w, obj.h, obj.color);
	})
	console.log('refresh');
}
this.mainObj = {
	x: 10,
	y: 20,
	w: 30,
	h: 40,
	
	color :"#0979db"
};
this.underfootOne = {
	x: 0,
	y: 300,
	w: 150,
	h: 5,
	color: "#964b00"
};
this.underfootTwo = {
	x: 250,
	y: 400,
	w: 150,
	h: 5,
	color: "#964b00"
};
this.underfoot = {
	x: 0,
	y: 495,
	w: 495,
	h: 5,
	color: "#964b00"
};
aObjects.push(this.mainObj);
aUnderfoot.push(this.underfootOne);
aUnderfoot.push(this.underfootTwo);
aUnderfoot.push(this.underfoot);

document.addEventListener('keydown', function (event) {
	this.fGravity();
	if (event.code == 'KeyW' && this.mainObj.y >= 2) {
		this.fBounce();
    }
	if (event.code == 'KeyS' && this.mainObj.y <= 460) {
		//this.mainObj.y = this.mainObj.y + 3;
	} 
	if (event.code == 'KeyA' && this.mainObj.x >= 2) this.mainObj.x = this.mainObj.x - 3;
	if (event.code == 'KeyD' && this.mainObj.x <= 466) this.mainObj.x = this.mainObj.x + 3;
}.bind(this));


document.addEventListener('mousedown', function (event) {

}.bind(this));

setInterval(mainLoop,1000/60);
// mainLoop();


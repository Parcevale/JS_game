console.log('hello 2world');

var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');
var aObjects = [];

var clear = function() {
	ctx.fillStyle = "#E3E3E3";
	ctx.fillRect(0,0,500,500);
}
var draw = function(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h,color);
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
	console.log('refresh');
}
this.mainObj = {
	x: 10,
	y: 20,
	w: 30,
	h: 40,
	
	color :"#0979db"
};
aObjects.push(this.mainObj);

document.addEventListener('keydown', function(event) {
	console.log('key pressed', event.code); 
	if (event.code == 'KeyW') this.mainObj.y = this.mainObj.y - 3;
	if (event.code == 'KeyS') this.mainObj.y = this.mainObj.y + 3;
	if (event.code == 'KeyA') this.mainObj.x = this.mainObj.x - 3;
	if (event.code == 'KeyD') this.mainObj.x = this.mainObj.x + 3;
}.bind(this));

setInterval(mainLoop,1000/60);
// mainLoop();


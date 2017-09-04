var btn = document.getElementById("btn");
var tc = document.getElementById("tc");
var tck = document.getElementById("tck");
btn.onclick = function(){
	console.log("我被点击了");
	tc.style.display="block";
	tck.style.display="block";
}
var red = document.getElementById("red");
var yellow = document.getElementById("yellow");
var blue = document.getElementById("blue");
var w1 = document.getElementById("w1");
var w2 = document.getElementById("w2");
var w3 = document.getElementById("w3");
var h1 = document.getElementById("h1");
var h2 = document.getElementById("h2");
var h3 = document.getElementById("h3");
var box = document.getElementById("box");
red.onclick = function(){
	 box.style.background="red";
}
yellow.onclick = function(){
	 box.style.background="yellow";
}
blue.onclick = function(){
	 box.style.background="blue";
}
w1.onclick = function(){
	 box.style.width="200px";
}
w2.onclick = function(){
	 box.style.width="300px";
}
w3.onclick = function(){
	 box.style.width="400px";
}
h1.onclick = function(){
	 box.style.height="200px";
}
h2.onclick = function(){
	 box.style.height="300px";
}
h3.onclick = function(){
	 box.style.height="400px";
}
var hf = document.getElementById("hf");
var ok = document.getElementById("ok");
hf.onclick = function(){
	 box.style.width="100px";
	 box.style.height="100px";
	 box.style.background="#fff";
}
ok.onclick = function(){
	console.log("我被点击了");
	tc.style.display="none";
	tck.style.display="none";
}
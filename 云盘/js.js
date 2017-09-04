var glq=document.querySelector(".box .left");//获取导航栏界面
var bh2=document.getElementsByClassName("wjj");//获取操作界面文件夹
var bh3=document.getElementsByClassName("bh3");//获取操作界面上地址栏
var xz=document.getElementsByClassName("xz")[0];//获取全选按钮
var h2=glq.getElementsByTagName("h2");//获取导航栏
var b;//声明点击导航栏
var html="";//初始化结构
var arrcho=[];//声明选中操作界面文件id集合
function hs(x){//渲染导航栏
	html+=`<ul>`;
	for(var attr in data){
		if(data[attr].pid == x){
			var j=data[attr].id;
			html+=`<li><h2 bh=${data[attr].id}><span><i></i></span><span><i class="fa fa-folder-o"></i></span><b>${data[attr].title}</b></h2>`
			for(var attr in data){//寻找是否有子文件夹
				if(data[attr].pid == j){
					hs(j);//回调生成子文件夹导航栏
					break;//避免多次生成同意父文件的子文件导航
				}
			}
			html+="</li>"
		}
	}
	html+=`</ul>`;

}
function xr(){//渲染
	html="";
	hs(-1);
	glq.innerHTML=html;
	b=document.querySelectorAll(".left h2 b");
	glq=document.querySelector(".box .left");
	for(var i=0;i<b.length;i++){
		if(h2[i].nextElementSibling){
			h2[i].childNodes[0].childNodes[0].className="fa fa-caret-right";
			h2[i].nextElementSibling.kg=false;
		}
		b[i].onclick=function(){//导航栏文件名点击事件
			n=0;
			xz.style.background="";
			xz.kg=false;
			dz.innerHTML="<b class='bh3' bh="+this.parentNode.getAttribute("bh")+">"+this.innerHTML+"</b>";
			hddz(this.parentNode.getAttribute("bh"));
			box.innerHTML="";
			var arr=getDataPid(this.parentNode.getAttribute("bh"));
			if(arr.length!=0){	
				arr.forEach(function(x){
					bg.style.display="";
					box.innerHTML+='<div class="wjj" bh="'+x.id+'"><div class="xz"></div><span class="name"><i>'+x.title+'</i><input type="text"/></span></div>'
				})
			}else{
				bg.style.display="block";
			}
			xz.onclick=function(){//全选点击事件
				xz.kg=!xz.kg;
				this.classList.toggle("xz1");
				for(var i=0;i<bh2.length;i++){
					if(xz.kg){
						bh2[i].kg=true;
						bh2[i].children[0].className="xz xz1";
					}else{
						bh2[i].kg=false;
						bh2[i].children[0].className="xz";
					}
				}
			}
			for(var i=0;i<bh2.length;i++){//操作界面事件生成
				bh2[i].ondblclick=function(){//操作界面双击进入
					Array.from(h2).forEach(function(x){
						if(x.getAttribute("bh")==this.getAttribute("bh")){
							x.children[2].onclick();
							return;
						}
					},this)
				}
				bh2[i].kg=false;//初始选中赋值
				bh2[i].onclick=function(ev){//界面选中事件
					(this.kg=!this.kg)?n++:n--;
					this.children[0].classList.toggle("xz1");
					if(n==bh2.length){
						xz.className="xz xz1 fl";
						xz.kg=true;
					}else{
						xz.className="xz fl";
						xz.kg=false;
					}
				}
			}
			for(var i=0;i<bh3.length;i++){
				bh3[i].onclick=function(){//地址栏选中事件
					Array.from(h2).forEach(function(x){
						if(x.getAttribute("bh")==this.getAttribute("bh")){
							x.children[2].onclick();
							return;
						}
					},this)
				}
			}
		}						
		function hddz(x){//寻找父级地址
			if(getDataId(x)&&x!=0){
				var n=getDataId(x).pid;
				dz.innerHTML='<b class="bh3" bh="'+getDataId(n).id+'">'+getDataId(n).title+'</b><span><i class="fa fa-angle-right"></i></span>'+dz.innerHTML;
				hddz(n);//回调寻找父级地址
			}
		}
	}
	var zk=document.querySelectorAll(".left h2 i");
	for(var i=0;i<zk.length;i++){//地址栏展开事件
		zk[i].onclick=function(ev){
			if(this.parentNode.parentNode.nextElementSibling){
				if(!this.parentNode.parentNode.nextElementSibling.kg){
					this.parentNode.parentNode.nextElementSibling.style.display="block";
					this.parentNode.parentNode.childNodes[0].childNodes[0].className="fa fa-caret-down";
					this.parentNode.parentNode.childNodes[1].childNodes[0].className="fa fa-folder-open-o";
					this.parentNode.parentNode.nextElementSibling.kg=true;
					arrcho.push(this.parentNode.parentNode.getAttribute("bh"))//记录点击过的展开导航
				}else{
					this.parentNode.parentNode.nextElementSibling.style.display="none";
					this.parentNode.parentNode.childNodes[0].childNodes[0].className="fa fa-caret-right";
					this.parentNode.parentNode.childNodes[1].childNodes[0].className="fa fa-folder-o";
					this.parentNode.parentNode.nextElementSibling.kg=false;
					arrcho.splice(arrcho.indexOf(this.parentNode.parentNode.nextElementSibling.getAttribute("bh")),1)
				}
			}
		}
	}
}
xr();//渲染初始结构
b[0].onclick();//渲染初始界面
function getDataId(x){//寻找结构中拥有相同id的文件或地址导航
	for(attr in data)
		if(data[attr].id==x){
				return data[attr]
		}
	return null;
}
function getDataPid(x){//寻找结构中拥有相同Pid的文件或地址导航
	var arr=[];
	for(attr in data)
		if(data[attr].pid==x){
				arr.push(data[attr])
		}
	return arr;
}
box.onmousedown=function(ev){//框选函数
	var x1=ev.clientX;
	var y1=ev.clientY;
	document.onmousemove=function(ev){
		if(Math.abs(ev.clientX-x1)>20){
			xz.onclick();
			if(xz.kg){
				xz.onclick();
			}
			console.log(x1,ev.clientX)
			tz.style.width=Math.abs(ev.clientX-x1)+"px";
			tz.style.height=Math.abs(ev.clientY-y1)+"px";
			tz.style.left=Math.min(ev.clientX,x1)+"px";
			tz.style.top=Math.min(ev.clientY,y1)+"px";
			var divrect=tz.getBoundingClientRect();
			for(var x=0;x<bh2.length;x++){
	 			var div2rect=bh2[x].getBoundingClientRect(); 
		 		if(divrect.bottom<div2rect.top||divrect.top>div2rect.bottom||divrect.left>div2rect.right||divrect.right<div2rect.left){
		 			bh2[x].style.background=""
		 			
		 		}else{
		 			bh2[x].style.backgroundColor="#fff";
		 		}
		 	}
		}	
	}
	document.onmouseup=function(){
		var divrect=tz.getBoundingClientRect();
	 		for(var x=0;x<bh2.length;x++){
	 			var div2rect=bh2[x].getBoundingClientRect(); 
		 		if(divrect.bottom<div2rect.top||divrect.top>div2rect.bottom||divrect.left>div2rect.right||divrect.right<div2rect.left){
		 		}else{
		 			if(bh2[x].kg==false){
		 				bh2[x].onclick();
		 			}
		 			bh2[x].style.background="";
		 		}
	 		}
	 	document.onmousemove=null;
	 	tz.style="";
	}
	ev.preventDefault()
}
var inp=document.getElementsByTagName("input");
for(var i=0;i<inp.length;i++){
	inp[i].addEventListener("mousedown",function(ev){
		console.log(1);
		ev.stopPropagation();
	})
	inp[i].addEventListener("mouseup",function(ev){
		console.log(1);
		ev.stopPropagation();
	})
}
ccm.kg=false;
ccm.onclick=function(ev){//重命名
	ccm.kg=true;
	var arr=hqxz(bh2);
	if(arr.length==1){
		var mm=box.getElementsByClassName("xz1")[0];
		mm.parentNode.children[1].children[1].style.display="block";
		mm.parentNode.children[1].children[1].focus();
		mm.parentNode.children[1].children[1].value=mm.parentNode.children[1].childNodes[0].innerHTML;
		mm.parentNode.children[1].children[1].select();
		qczt(mm.parentNode.children[1].children[1]);
	}else{
		alert("请选择一个重命名的文件！")
	}
	ev.stopPropagation(ev);
}
del.onclick=function(ev){//删除
	var arr=hqxz(bh2);
	arr.forEach(function(x){
		for(var attr in data){
			if(data[attr].id==x){
				delete data[attr];
				break;
			}
		}			
	});
	xr();
	zkxz();
}
function hqxz(x){//获取选中界面文件
	if(!x.length){
		return x.parentNode.getAttribute("bh")
	}
	arr=[];
	Array.from(x).forEach(function(x){
		if(x.kg){arr.push(x.getAttribute("bh"))};
		
	})
	return arr;
}
function zkxz(){//获取选中导航栏开关并打开
	var arrcho2=[];
	arrcho.forEach(function(n){
		Array.from(h2).forEach(function(x){
			if(x.getAttribute("bh")==n){
				x.children[0].children[0].onclick();
				arrcho2.push(x.getAttribute("bh"));
			}
		})
	})
	arrcho=arrcho2;
	if(bh2.length==0){
		bg.style.display="block";
	}
	bh3[bh3.length-1].onclick();
}
var idbh=25;
xjwjj.kg=false;
xjwjj.onclick=function(ev){//新建文件夹
		xjwjj.kg=true;
		box.innerHTML=`<div class="wjj" bh="'+x.id+'"><div class="xz"></div><span class="name"><input type="text" style="display:block;"/></span></div>${box.innerHTML}`;
		var k=box.getElementsByTagName("input")[0];
		k.focus();
		bg.style="";
		qczt(k);
		ev.stopPropagation();
	}
function qczt(k){
	document.addEventListener("mousedown",function x(ev){
		document.onmouseup();
		if(k.value.trim()==""){
			alert("请输入文件名")
			k.focus;
			return;
		}else{
			for(var i=0;i<bh2.length;i++){
				if(k.value==bh2[i].children[1].childNodes[0].innerHTML){
					alert("不要输入重复的文件名");
					k.focus;
					return;
				}
			}
			if(xjwjj.kg){
				data[idbh]={
			        "id": idbh,
			        "pid":bh3[bh3.length-1].getAttribute("bh"),
			        "title":k.value
			    }
			    idbh++;
				xr();
				zkxz();
				xjwjj.kg=false;
			}else if(ccm.kg){
				ccm.kg=false;
				getDataId(k.parentNode.parentNode.getAttribute("bh")).title=k.value;
				xr();
				zkxz();
			}
			console.log(1);
			document.removeEventListener("mousedown",x)
		}
		
	})
}
var lef=document.getElementsByClassName("left")[0];
function xr2(){
	box2.innerHTML=lef.innerHTML;
	var zk2=document.querySelectorAll("#box2 h2 i");
	var b2=document.querySelectorAll("#box2 h2 b");
	for(var i=0;i<zk2.length;i++){//地址栏展开事件
		zk2[i].kg=true;
		zk2[i].onclick=function(ev){
			if(this.kg){
				if(this.parentNode.parentNode.nextElementSibling){
					this.parentNode.parentNode.nextElementSibling.style.display="block";
				}
				this.parentNode.parentNode.childNodes[0].childNodes[0].className="fa fa-caret-down";
				this.parentNode.parentNode.childNodes[1].childNodes[0].className="fa fa-folder-open-o";
				this.kg=false;
			}else{
				this.parentNode.parentNode.nextElementSibling.style.display="none";
				this.parentNode.parentNode.childNodes[0].childNodes[0].className="fa fa-caret-right";
				this.parentNode.parentNode.childNodes[1].childNodes[0].className="fa fa-folder-o";
				this.kg=true;
			}
		}	
	}
	for(var i=0;i<b2.length;i++){
		b2[i].onclick=function(){
			for(var x=0;x<b2.length;x++){
				b2[x].className="";
			}
			this.classList.toggle("cho");
		}
	}
}
xr2();
ydd.onclick=function(){//渲染移动到
	var arr=hqxz(bh2);
	xr2();
	if(!arr.length){
		alert("请选择至少一个文件")
		return;
	}
	tc.style.display="block";
	qd.onclick=function(){//渲染确定
		var ydd2=tc.querySelector(".cho");
		if(!ydd2){
			alert("请选择一个文件");
			return;
		}
		var ob=hqxz(ydd2);
		console.log(ob);
		arr2=childs(ob);
		for(var i=0;i<arr.length;i++){				
			for(var x=0;x<arr2.length;x++){
				if(data[arr2[x]].id==data[arr[i]].id){
					alert("不能将文件移动到他的子文件中")
					return;
				}	
			}	
		}
		arr3=child(ob);
		a:for(var i=0;i<arr.length;i++){
			for(var j=0;j<arr3.length;j++){
				if(data[arr[i]].title==data[arr3[j]].title){
					alert("命名出错")
					continue a;
				}
			}
			console.log(data[arr[i]])
			data[arr[i]].pid=Number(ob);
			console.log(data[arr[i]])	
		}
		xr();
		zkxz();		
		tc.style.display="none";
	}
	qx.onclick=function(){
		tc.style.display="none";
	}
}
function childs(x){
	var arr=[x];
	for(attr in data){
		if(data[x].pid==data[attr].id){
			arr.push(attr);
			if(data[attr].pid!=-1){
				arr=arr.concat(childs(data[attr].id))
			}
		}
	}
	return arr;
}
function child(x){
	var arr=[];
	for(attr in data){
		if(data[x].id==data[attr].pid){
			arr.push(attr);
		}
	}
	return arr;
}
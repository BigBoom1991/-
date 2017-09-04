function $(selector,context){
	selector=selector.trim();//去除前后空格
	if(!context){// 如果context没有接受任何值，contex为document
		context=document;
	};
	if(selector.indexOf(" ") !== -1){  // 判断是有空格，交给querySelectorAll处理
		return context.querySelectorAll(selector);
	};
	
	if(selector.charAt(0)==="#"){// id获取
		return document.getElementById(selector.slice(1))
	}else if(selector.charAt(0)==="."){//class获取
		return context.context.getElementsByClassName(selector.slice(1))
	}else{//标签名获取
		return context.getElementsByTagName(selector)
	}
}
function css(element,prop,value){
	// 判断argumnets的length
	if(arguments.length>2){
		// 设置
		element.style[prop] = value;
	}else{
		// 获取
		return parseFloat(getComputedStyle(element)[prop]);
	}
}
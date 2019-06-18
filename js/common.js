//简写引入id
function $id(id){
    return document.getElementById(id);
}
//随机数，m - n   m < n;
function rand(m,n){
    var num = parseInt(Math.random() * (n - m + 1) + m);
    return num;
}


//获取数组中的最大值  arr传递的数组
function getMax(arr){
    var maxNum = arr[0];
    for(var i = 1 ; i < arr.length ; i++){
        if(maxNum < arr[i]){
            maxNum = arr[i];
        }
    }
    return maxNum;
}

//获取数组中的最小值  arr传递的数组
function getMin(arr){
    var minNum = arr[0];
    for(var i = 1 ; i < arr.length ; i++){
        if(minNum > arr[i]){
            minNum = arr[i];
        }
    }
    return minNum;
}

//冒泡排序  arr 传递的数组.
function arrOrder(arr){
    //几轮
    for(var i = 0 ; i < arr.length - 1 ; i++){
        //每一轮进来之后开始比较
        for(var k = 0 ; k < arr.length - 1 - i ; k++){
            if(arr[k] > arr[k + 1]){
                var temp = arr[k];
                arr[k] = arr[k + 1];
                arr[k + 1] = temp;
            }
        }
    }
    return arr;
}

//选择排序
function choiceOrder(arr){
    for(var i = 0 ; i < arr.length - 1 ; i++){
        for(var k = i + 1 ; k < arr.length ; k++){
            if(arr[i] > arr[k]){
                var temp = arr[i];
                arr[i] = arr[k];
                arr[k] = temp;
            }
        }
    }
    return arr;
}


//数组去重
function noRepeaet(arr){
    //确定几轮
    for(var i = 0 ; i < arr.length - 1 ; i++){
        for(var k = i + 1 ; k < arr.length ; k++){
            if(arr[i] == arr[k]){
                arr.splice(k,1);    //splice截取完成之后，整数组长度减小
                k--;             //相同的下标再次进行比较
            }
        }
    }
    return arr;
}


//将一个数按照原有排列顺序。添加到数组
function insert(arr,num){
    var tempArr = arrOrder(arr);
    //22, 33, 100, 444, 555, 777
    var flag = true;
    for(var i = 0 ; i < tempArr.length ; i++){
    //让num  和 数组中的每一项比较，如果num < tempArr[i] 
        if(num < tempArr[i]){
            tempArr.splice(i,0,num);
            flag = false;
            break;
        }
    }
    if(flag){
        tempArr.push(num);
    }
    return tempArr;
}


//随机颜色
function getColor(){
    var 
        r = rand(0,255),
        g = rand(0,255),
        b = rand(0,255);
    return '#' + systemChange(r,g,b);
}
//转16进制颜色值
function systemChange(r,g,b){
    r = r.toString(16).length < 2 ? '0' + r.toString(16) : r.toString(16);
    g = g.toString(16).length < 2 ? '0' + g.toString(16) : g.toString(16);
    b = b.toString(16).length < 2 ? '0' + b.toString(16) : b.toString(16);
    return '' + r + g + b;
}



//时间转成字符串格式
function dateStr(d,sign){
    //如果没有传递符号，给一个默认的符号
    if(!sign){
        sign = "-";
    }else{
        sign = sign;
    }

//获取d里面年月日时分秒
    var
        year = d.getFullYear(),
        month = d.getMonth() + 1,
        sun = d.getDate(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();
    return year + sign + mendZero(month) + sign + mendZero(sun) + ' ' + mendZero(hours) + ":" + mendZero(minutes) + ":" + mendZero(seconds);
}

//字符串补零
function mendZero(num){
    return num = num < 10 ? '0' + num : num;
}

// 阻止事件冒泡
function stopPropagation(e){
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}

// 封装函数 阻止浏览器默认行为
function preventDefault(e){
    e.preventDefault ? e.preventDefault() : e.returnvalue = false;
}

// 事件监听
function addEventListener(ele,eventType,fn){
    return ele.addEventListener ? ele.addEventListener(eventType,fn) : ele.attachEvent("on" + eventType,fn );
}


// 动态添加class名
function addClass(ele,classN){
    var strClass = ele.documentAttribute("class");
    var reg = new RegExp("(^|\\b)" + classN + "(\\s|$)",g);
    if(!reg.test(classN)){
        strClass.className += "" + classN;
    }
}

// 获取非行间样式
function curren(ele,attr){
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele,null)[attr];
}
//支持缓冲和多物体运动  链式运动
//obj代表运动的元素  target目标值  attr 运动的样式    callback 代表一个函数
function move(obj,target,attr,callback){
	//为每一个定时器添加一个定时器属性，确保定时器是独立的，多个物体运动时不干扰
	clearInterval( obj.timer );
	obj.timer = setInterval( ()=>{
		//定义一个变量。获取当前操作元素的实际样式值
		var current = 0;
		//判断当前操作的样式是否是透明度，由于透明度是小数 需要单独操作
		if( attr == "opacity" ){
			current = getStyle(obj,attr)*100;
		}else{
			current = parseInt(getStyle(obj,attr));
		}
		//速度的设置
		var speed = (target-current)/10;
		speed = speed>0 ?　Math.ceil(speed) : Math.floor(speed);
		if( current == target ){
			//达到目标值后停止运动
			clearInterval( obj.timer );
			//上一个动作完成后,再进入到下一个动作
			//调用下一个功能 先判断是否传递callback值
			if( callback ){
				callback();
			}
		}else{
			//根据speed的变化改变样式
			if( attr == "opacity" ){
				//改变透明度
				obj.style["opacity"] = (current + speed)/100;
			}else{
				//改变带有px单位的样式值
				obj.style[attr] = current + speed + "px";
			}
		}
	},30 )
}
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
// url :请求路径
// callback :  该参数是一个函数，回调函数
// data :  接口的参数
function ajaxGet(url,callback,data){
	var ajax = null;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(arguments.length == 3){//表示传递的参数有三个  
		url = url + "?" + data;
	}
	ajax.open("GET",url,true);
	ajax.onreadystatechange = function(){
		if( ajax.readyState == 4 && ajax.status == 200 ){
			if(callback){
				callback(ajax.responseText);//通过函数的调用将服务器处理的结果以参数形式传递给前端
			}	 
		}
	}
	ajax.send(); 
}

function ajaxPost(url,callback,data){
	var ajax = null;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	ajax.open("POST",url);
	
	//设置请求头：
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText);
		}
	}	
	ajax.send(data);//向服务器端发送数据 用户名
}

//obj 操作的元素
//json 参数为 要操作的属性和目标值   键--属性    值--目标值
//callback 回调函数
var flag;//开关变量  当值为true时，表示 所有的动作都执行完毕 ，可以关掉定时器 ，也可以进入下一个动作
function startMove(obj,json,callback){//attr表示要操作的属性
		
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		flag = true;
		
		
		var current = 0;
		
		for(var attr in json){
			
			if( attr =="opacity" ){//操作透明度
				//获取透明度的样式值
				current =parseFloat( getStyle(obj,attr) )*100; 
				
			}else{
				current =parseInt( getStyle(obj,attr)  ) ;//接收当前元素的样式值
			}
			
			
			var speed = (json[attr] - current)/10;
			
			
			speed = speed>0?Math.ceil(speed) :Math.floor(speed);
			
			
			if( current != json[attr] ){//动作完成后的条件  
				flag = false;//当目标值和当前的样式值 不相等时  ， 将开关变量值关闭 false 
			}
				
			//定时器开启时  不停的改变元素的样式
			if( attr == "opacity" ){
				obj.style.opacity = (current+speed)/100;
			}else{
				obj.style[attr] = current + speed + "px";
			}
	
		}
		
		//循环结束后判断flag的值，当值为true时，表示 所有的动作都执行完毕 ，可以关掉定时器 ，也可以进入下一个动作
		if( flag ){
			clearInterval(obj.timer);
			//上一个动作完成后 就开启下一个动作的执行    调用callback
			//判断 callback是否存在 存在就调用
			if( callback ){
				callback();
			}
		}
		
	},30)
}

//获取样式值函数
function getStyle(obj,attr){
	if( window.getComputedStyle ){
 		return window.getComputedStyle( obj,false )[attr];
 	}else{
 		return obj.currentStyle[attr];
 	}
}
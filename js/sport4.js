//支持缓冲和多物体运动  链式运动 完美运动
//obj代表运动的元素  json对象中存储多个属性和目标值   callback 代表一个函数
function move(obj,json,callback){
	//为每一个定时器添加一个定时器属性，确保定时器是独立的，多个物体运动时不干扰
	clearInterval( obj.timer );
	obj.timer = setInterval( ()=>{
		var flag = true;//假设值为true时  可以停止定时器并且进入下一个动作
		for( var attr in json ){
			//定义一个变量。获取当前操作元素的实际样式值
			var current = 0;
			//判断当前操作的样式是否是透明度，由于透明度是小数 需要单独操作
			if( attr == "opacity" ){
				current = getStyle(obj,attr)*100;
			}else{
				current = parseInt(getStyle(obj,attr));
			}
			//速度的设置
			var speed = (json[attr]-current)/10;
			speed = speed>0 ?　Math.ceil(speed) : Math.floor(speed);
			if( current != json[attr] ){
				//如果某个样式没有达到目标值 
				flag = false; //假设不成立
			}
			
			//根据speed的变化改变样式
			if( attr == "opacity" ){
				//改变透明度
				obj.style["opacity"] = (current + speed)/100;
			}else{
				//改变带有px单位的样式值
				obj.style[attr] = current + speed + "px";
			}
		}
	
	
		//json对象遍历结束后,如果flag的值是true ,可以停止定时器了--假设成立
		if( flag ){
			//达到目标值后停止运动
			clearInterval( obj.timer );
			//上一个动作完成后,再进入到下一个动作
			//调用下一个功能 先判断是否传递callback值
			if( callback ){
				callback();
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
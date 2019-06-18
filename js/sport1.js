//支持缓冲和多物体运动
//obj代表运动的元素  target目标值  attr 运动的样式
function move(obj,target,attr){
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
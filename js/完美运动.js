function move(obj,json,callback){
    clearInterval( obj.timer );
    obj.timer = setInterval(function(){
        let flag = true;
        for( var attr in json ){
            var count = 0;
            if( attr == "opacity" ){
                current = getStyle(obj,attr)*100;
            }else{
                current = parseInt(getStyle(obj,attr));
            }
            var speed = (json[attr]-current)/10;
            speed = speed>0 ?　Math.ceil(speed) : Math.floor(speed);
            if( current != json[attr] ){
                flag = false;
            }
            if( attr == "opacity" ){
                obj.style["opacity"] = (current + speed)/100;
            }else{
                obj.style[attr] = current + speed + "px";
            }
            if(flag){
                clearInterval( obj.timer );
                if( callback ){
                    callback();
                }
            }
        }
    },30)
}
function getStyle(){
    if( window.getComputedStyle ){
        return window.getComputedStyle(obj)[attr];
    }else{
        return obj.currentStyle[attr];
    }
}
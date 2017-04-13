var itcast={
    tap: function (obj,callback) {
        var startTime=0;
        var isMove=false;
        if(typeof obj=="object"){
            obj.addEventListener("touchstart", function () {
                startTime=Date.now();
            })
            obj.addEventListener("touchmove", function () {
                isMove=true;
            })
            obj.addEventListener("touchend", function (e) {
                if(!isMove&&Date.now()-startTime<150){
                    callback&&callback(e)
                }
                isMove=false;
                startTime=0;
            })
        }
    }
}
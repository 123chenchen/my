window.onload= function () {
    setHeader();
    downTime();
    banner();
}
/*
 * 当页面滚动式 header变色
 *  当页面滚动的高度小于banner高度是，header透明度发生改变
 *  当页面滚动的高度大于banner高度是 透明度是固定的
 *  透明的取值=页面滚动/banner的高度
 * */
function setHeader(){
    var banner=document.querySelector(".jd-banner");
    var H=banner.offsetHeight; //获取banner的高度
    var headerIn=document.querySelector(".header-in");
    var opacity=0;

    window.onscroll= function () {
        var top=document.body.scrollTop;//页面头部滚出去的高度
        opacity=top/H;
        // 保证透明度不超过0.85
        if(opacity>0.85){
            opacity=0.85;
        }
        //把透明度设置给header-in
        headerIn.style.background=" rgba(201, 21, 35, "+opacity+")";
    };
};


//倒计时
function downTime(){
    var time=5*60*60;
    var spans=document.querySelectorAll(".sk-time span");

    var timer=setInterval(function () {
        time--;
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);

        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=Math.floor(h%10);
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=Math.floor(m%10);
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=Math.floor(s%10);

        if(timer<0){
            clearInterval(timer);
        }
    },1000)
}

//轮播图
/*
 *  需求：
 *  1、定时器切换轮播图
 *  2、实现无缝滚动
 *  3、角标同步
 *  4、滑屏切换轮播图
 * */

function banner(){
    var ul=document.querySelector('.jd-banner ul');
    var banner=document.querySelector('.jd-banner');
    var W=banner.offsetWidth;
    var index=1;

    //--------------------复用代码---------------------
    //给ul添加过渡方法

    var addTransition= function () {
        ul.style.transition='transform 0.2s';
        ul.style.webkitTransition='transform 0.2s';
    }
    //给ul删除过渡方法
    var removeTransition= function () {
        ul.style.transition='none';
        ul.style.webkitTransition='none';
    }
    //让ul位移的方法
    var setTranslateX= function (translatex) {
        ul.style.transform='translateX('+translatex+'px)';
        ul.style.webkitTransform='translateX('+translatex+'px)';
    }

    //-----------------1、定时器切换轮播图-----------------

    var timer=setInterval(function () {
        index++;
        addTransition();
        var x=-index*W;
        setTranslateX(x);

    },1500);

    //----------------  2、实现无缝滚动-------------------
    ul.addEventListener('transitionend', function () {
        if(index>=9){
            index=1;
            removeTransition();
            var x=-index*W;
            setTranslateX(x);
        }
        if(index<=0){
            index=8;
            removeTransition();
            var x=-index*W;
            setTranslateX(x);
        }
        setPoints(index);
    });

    ul.addEventListener('webkitTransitionEnd', function () {
        if(index>=9){
            index=1;
            removeTransition();
            var x=-index*W;
            setTranslateX(x);
        }
        if(index<=0){
            index=8;
            removeTransition();
            var x=-index*W;
            setTranslateX(x);
        }
        setPoints(index);
    });


    //----------------------- 3、角标同步--------------------
    function setPoints(index){
        var points=document.querySelectorAll('.jd-banner ol li');
        for(var i=0;i<points.length;i++){
            points[i].classList.remove('active');
        }
        points[index-1].classList.add('active');
    }



    //-------------------4、滑屏切换轮播图--------------------
    /*
     * 1、触屏开始，记录触屏的起始数据
     * 2、触屏移动，记录移动的数据，并且让ul跟随鼠标移动
     * 3、触屏结束，判断移动的距离差，决定是否切换图片
     *    3-1：如果distanceX>w/3 切换图片
     *          distanceX>0  上一张 index--
     *          distanceX<0   下一张 index++
     *    3-2:否则不切换图片
     */

    var startX=0;
    var moveX=0;
    var distanceX=0;
    banner.addEventListener('touchstart', function (e) {
        startX= e.targetTouches[0].clientX;//获取起始数据
        clearInterval(timer);//清除定时器
    })
    banner.addEventListener('touchmove', function (e) {
        moveX= e.targetTouches[0].clientX;
        distanceX=moveX-startX;
        removeTransition();
        setTranslateX(-index*W+distanceX);
    })
    banner.addEventListener('touchend', function (e) {
        if(Math.abs(distanceX)>W/3){
            if(distanceX>0){
                index--;
            }
            if(distanceX<0){
                index++;
            }
        }else{

        }

        addTransition();
        setTranslateX(-index*W);

        startX=0;
        moveX=0;
        distanceX=0;

        timer=setInterval(function () {
            index++;
            addTransition();
            var x=-index*W;
            setTranslateX(x);
        },1500)
    })



}



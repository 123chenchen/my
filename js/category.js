window.onload= function () {
    //左侧导航滑动
    swipeLeft();

    swipeRight()

}
//左侧导航滑动
/*
 *  1、导航的li被点击后，
 *     1-1当前被点击的li变色，
 *     1-2并且滚动到页面的顶部
 * 2、触屏操作时：
 *    2-1：触屏滑动时ul跟随滑动
 *    2-2：触屏结束后ul吸附回去
 */

function swipeLeft() {
    var leftBox = document.querySelector('.body-left');
    var ul = leftBox.querySelector('ul');
    var lis = ul.querySelectorAll('li');
    var currentY = 0;
    //------------------临界值------------------------
    /*定位临界值*/
    var maxTop=0;
    var minTop=leftBox.offsetHeight-ul.offsetHeight;

    //滑动临界值
    var swipeMax=maxTop+150;
    var swipeMin=minTop-150;
    //-------------封装复用代码------------------------
    /* 添加过渡*/
    var addTransition = function () {
        ul.style.transition = "transform 0.3s";
        ul.style.webkitTransition = "transform 0.3s";
    }
    /*删除过渡*/
    var removeTransition = function () {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }
    /*ul位移*/
    var setTranslateY = function (y) {
        ul.style.transform = "translateY(" + y + "px)";
        ul.style.webkitTranform = "translateY(" + y + "px)";

    }

    //----------------1、 导航被点击的事件-------------------------
    itcast.tap(leftBox, function (e) {
        var target= e.target.parentNode;
        // 1-1当前被点击的li变色  排他操作，让当前的li有特殊样式
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove("current");
            lis[i].index=i;
        }
        target.classList.add("current");
        //算出ul 移动的距离
        var top=-target.index*50;
        if(top>maxTop){
            top=maxTop;
        }
        if(top<minTop){
            top=minTop;
        }
        addTransition();
        setTranslateY(top);
        currentY=top;

    });

    //----------------2、触屏操作时 ----------------------

    var startY=0;
    var moveY=0;
    var distanceY=0;

    leftBox.addEventListener("touchstart", function (e) {
        startY= e.targetTouches[0].clientY;
    })
    //2-1：触屏滑动时ul跟随滑动
    leftBox.addEventListener("touchmove", function (e) {
        moveY= e.targetTouches[0].clientY;
        distanceY=moveY-startY;
        removeTransition();
        var y=currentY+distanceY;
        //边界检测 验证数据合理性
        if(y>swipeMax){
            y=swipeMax;
        }
        if(y<swipeMin){
            y=swipeMin;
        }
        setTranslateY(y);
    })
    //2-2：触屏结束后ul吸附回去

    leftBox.addEventListener("touchend", function (e) {
        currentY=currentY+distanceY;
        //判断ul的位置是否越界（maxTop,minTop）
        if(currentY<=minTop){
            currentY=minTop;
        }
        if(currentY>=maxTop){
            currentY=maxTop;

        }
        addTransition();
        setTranslateY(currentY);


        startY=0;
        moveY=0;
        distanceY=0;
    })
}

function swipeRight(){
    var leftBox=document.querySelector('.body-right');
    var ul =leftBox.querySelector('.right-in');

    var currentY=0;
    //------------------临界值------------------------
    /*定位临界值*/
    var maxTop=0;
    var minTop=leftBox.offsetHeight-ul.offsetHeight;

    //滑动临界值
    var swiprMax=maxTop+150;
    var swiprMin=minTop-150;

    //-------------封装复用代码------------------------
    /* 添加过渡*/

    var addTransition= function () {
        ul.style.transition="transform 0.3s";
        ul.style.webkitTransition="transform 0.3s";
    }
    var removeTransition= function () {
        ul.style.transition="none";
        ul.style.webkitTransition="none";
    }
    var setTransition= function (y) {
        ul.style.transform="translateY("+y+"px)";
        ul.style.webkitTransform="translateY("+y+"px)";
    }

    //----------------触屏操作时 ------------------------

    var startY=0;
    var moveY=0;
    var distanceY=0;

    leftBox.addEventListener('touchstart', function (e) {
        startY=  e.targetTouches[0].clientY;
    })
    leftBox.addEventListener('touchmove', function (e) {
        moveY=  e.targetTouches[0].clientY;
        distanceY=moveY-startY;

        removeTransition();
        var y=currentY+distanceY;
        if(y>swiprMax){
            y=swiprMax;
        }
        if(y<swiprMin){
            y=swiprMin;
        }
        setTransition(y);
    })


    leftBox.addEventListener('touchend', function (e) {
        currentY=currentY+distanceY;
        if(currentY<=minTop){
            currentY=minTop;
        }
        if(currentY>=maxTop){
            currentY=maxTop;
        }
        addTransition();
        setTransition(currentY);

        startY=0;
        moveY=0;
        distanceY=0;
    })



}
window.onload= function () {
    //��ർ������
    swipeLeft();

    swipeRight()

}
//��ർ������
/*
 *  1��������li�������
 *     1-1��ǰ�������li��ɫ��
 *     1-2���ҹ�����ҳ��Ķ���
 * 2����������ʱ��
 *    2-1����������ʱul���滬��
 *    2-2������������ul������ȥ
 */

function swipeLeft() {
    var leftBox = document.querySelector('.body-left');
    var ul = leftBox.querySelector('ul');
    var lis = ul.querySelectorAll('li');
    var currentY = 0;
    //------------------�ٽ�ֵ------------------------
    /*��λ�ٽ�ֵ*/
    var maxTop=0;
    var minTop=leftBox.offsetHeight-ul.offsetHeight;

    //�����ٽ�ֵ
    var swipeMax=maxTop+150;
    var swipeMin=minTop-150;
    //-------------��װ���ô���------------------------
    /* ��ӹ���*/
    var addTransition = function () {
        ul.style.transition = "transform 0.3s";
        ul.style.webkitTransition = "transform 0.3s";
    }
    /*ɾ������*/
    var removeTransition = function () {
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }
    /*ulλ��*/
    var setTranslateY = function (y) {
        ul.style.transform = "translateY(" + y + "px)";
        ul.style.webkitTranform = "translateY(" + y + "px)";

    }

    //----------------1�� ������������¼�-------------------------
    itcast.tap(leftBox, function (e) {
        var target= e.target.parentNode;
        // 1-1��ǰ�������li��ɫ  �����������õ�ǰ��li��������ʽ
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove("current");
            lis[i].index=i;
        }
        target.classList.add("current");
        //���ul �ƶ��ľ���
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

    //----------------2����������ʱ ----------------------

    var startY=0;
    var moveY=0;
    var distanceY=0;

    leftBox.addEventListener("touchstart", function (e) {
        startY= e.targetTouches[0].clientY;
    })
    //2-1����������ʱul���滬��
    leftBox.addEventListener("touchmove", function (e) {
        moveY= e.targetTouches[0].clientY;
        distanceY=moveY-startY;
        removeTransition();
        var y=currentY+distanceY;
        //�߽��� ��֤���ݺ�����
        if(y>swipeMax){
            y=swipeMax;
        }
        if(y<swipeMin){
            y=swipeMin;
        }
        setTranslateY(y);
    })
    //2-2������������ul������ȥ

    leftBox.addEventListener("touchend", function (e) {
        currentY=currentY+distanceY;
        //�ж�ul��λ���Ƿ�Խ�磨maxTop,minTop��
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
    //------------------�ٽ�ֵ------------------------
    /*��λ�ٽ�ֵ*/
    var maxTop=0;
    var minTop=leftBox.offsetHeight-ul.offsetHeight;

    //�����ٽ�ֵ
    var swiprMax=maxTop+150;
    var swiprMin=minTop-150;

    //-------------��װ���ô���------------------------
    /* ��ӹ���*/

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

    //----------------��������ʱ ------------------------

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
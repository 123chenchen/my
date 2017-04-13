window.onload= function () {
    setHeader();
    downTime();
    banner();
}
/*
 * ��ҳ�����ʽ header��ɫ
 *  ��ҳ������ĸ߶�С��banner�߶��ǣ�header͸���ȷ����ı�
 *  ��ҳ������ĸ߶ȴ���banner�߶��� ͸�����ǹ̶���
 *  ͸����ȡֵ=ҳ�����/banner�ĸ߶�
 * */
function setHeader(){
    var banner=document.querySelector(".jd-banner");
    var H=banner.offsetHeight; //��ȡbanner�ĸ߶�
    var headerIn=document.querySelector(".header-in");
    var opacity=0;

    window.onscroll= function () {
        var top=document.body.scrollTop;//ҳ��ͷ������ȥ�ĸ߶�
        opacity=top/H;
        // ��֤͸���Ȳ�����0.85
        if(opacity>0.85){
            opacity=0.85;
        }
        //��͸�������ø�header-in
        headerIn.style.background=" rgba(201, 21, 35, "+opacity+")";
    };
};


//����ʱ
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

//�ֲ�ͼ
/*
 *  ����
 *  1����ʱ���л��ֲ�ͼ
 *  2��ʵ���޷����
 *  3���Ǳ�ͬ��
 *  4�������л��ֲ�ͼ
 * */

function banner(){
    var ul=document.querySelector('.jd-banner ul');
    var banner=document.querySelector('.jd-banner');
    var W=banner.offsetWidth;
    var index=1;

    //--------------------���ô���---------------------
    //��ul��ӹ��ɷ���

    var addTransition= function () {
        ul.style.transition='transform 0.2s';
        ul.style.webkitTransition='transform 0.2s';
    }
    //��ulɾ�����ɷ���
    var removeTransition= function () {
        ul.style.transition='none';
        ul.style.webkitTransition='none';
    }
    //��ulλ�Ƶķ���
    var setTranslateX= function (translatex) {
        ul.style.transform='translateX('+translatex+'px)';
        ul.style.webkitTransform='translateX('+translatex+'px)';
    }

    //-----------------1����ʱ���л��ֲ�ͼ-----------------

    var timer=setInterval(function () {
        index++;
        addTransition();
        var x=-index*W;
        setTranslateX(x);

    },1500);

    //----------------  2��ʵ���޷����-------------------
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


    //----------------------- 3���Ǳ�ͬ��--------------------
    function setPoints(index){
        var points=document.querySelectorAll('.jd-banner ol li');
        for(var i=0;i<points.length;i++){
            points[i].classList.remove('active');
        }
        points[index-1].classList.add('active');
    }



    //-------------------4�������л��ֲ�ͼ--------------------
    /*
     * 1��������ʼ����¼��������ʼ����
     * 2�������ƶ�����¼�ƶ������ݣ�������ul��������ƶ�
     * 3�������������ж��ƶ��ľ��������Ƿ��л�ͼƬ
     *    3-1�����distanceX>w/3 �л�ͼƬ
     *          distanceX>0  ��һ�� index--
     *          distanceX<0   ��һ�� index++
     *    3-2:�����л�ͼƬ
     */

    var startX=0;
    var moveX=0;
    var distanceX=0;
    banner.addEventListener('touchstart', function (e) {
        startX= e.targetTouches[0].clientX;//��ȡ��ʼ����
        clearInterval(timer);//�����ʱ��
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



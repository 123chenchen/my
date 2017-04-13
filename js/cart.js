window.onload= function () {
    var dels=document.querySelectorAll('.option .del');
    var winBox=document.querySelector(".winBox");
    var delBox=document.querySelector('.delBox');
    var cancel=document.querySelector('.cancel');
    //给页面中所有桶绑定点击事件
    for(var i=0;i<dels.length;i++){
        dels[i].onclick= function () {
            this.classList.add('open');//桶盖打开
            winBox.style.display='block';
            delBox.classList.add('animated');
            delBox.classList.add('bounceInDown');
        }
    }
    //当取消被点击  模态框消失， 桶盖关闭 ，动画类名去掉
    cancel.onclick= function () {
        winBox.style.display='none';
        delBox.classList.remove('animated');
        delBox.classList.remove('bounceInDown');
        // 找到有open类名的盒子 删除open类名
        document.querySelector('.open').classList.remove('open');
    }
}

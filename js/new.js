var sliderLocation = 0;
var n = 0;
var sliderTimer = null;
var isAutoPlay = 1;
var slideOrder = 1;
var allSlider = 5;
var animateTime = 1000;
var transObject = ['Book', 'Bamboo', 'Money', 'Music', 'Computer'];
var slideTime = 3000;

$(document).ready(function() {
    var myRand = Math.round(Math.random() * 5);
    if(myRand == 5) myRand = 0;
    myRand *= -100;
    sliderLocation = myRand;
    // document.getElementById("imgWrap").style.left = myRand + '%';
    // document.getElementById("textWrap").style.left = myRand + '%';
    // document.getElementById("textWrap2").style.left = myRand + '%';
    // document.getElementById("myBar").style.left = myRand / -100 * 20 + '%';

    var screenWidthRate = parseFloat($(document).width()) / 1920.0;
    $("body").css("zoom", screenWidthRate + "");

    $(window).load(function() {
        $("#slideContainer").fadeIn();
        $("#afterSlider").fadeIn();
        $("#commingSoon").fadeIn();
        $("#loading").fadeOut();
        
        $("#slideRight").click(nextSlide);
        setTimeout(slideAuto, slideTime);
        debrisAnimation();

        $('.mySort').click(commingSoon);
        
        window.addEventListener('scroll', throttle(lazyload, 500, 1000));
        lazyload();
    });
});

function slideAuto() {
    nextSlide();
    setTimeout(slideAuto, slideTime);
}

function commingSoon() {
    $('#commingSoon').animate(
        {top: '50%', opacity: '1'},
        "faster",
        "swing"
    );
    setTimeout(disCcommingSoon, 1500);
}

function disCcommingSoon() {
    $('#commingSoon').animate(
        {top: '0%', opacity: '0'},
        "faster",
        "swing"
    );
}

//debris floating animation
function debrisAnimation() {
    $('#slideObject').animate(
        {top: '+=' + '3%'},
        animateTime,
        "swing"
    ).animate(
        {top: '-=' + '3%'},
        animateTime,
        "swing"
    );
    for(var i = 1; i < 6; i++) {
        debrisAnimationAddRand($('#debris' + i));
    }
}

function debrisAnimationAddRand(myDebris) {
    randTime = parseInt(Math.random() * 2000 + 2000);
    randDis = parseInt(Math.random() * 60 + -30);
    myDebris.animate(
        {top: "+=" + randDis},
        randTime / 2,
        "swing",
    ).animate(
        {top: "-=" + randDis},
        randTime / 2,
        "swing",
    );
}

function nextSlide() {
    debrisAnimation();
    var temp = slideOrder;
    if(slideOrder == allSlider) slideOrder = 1;
    else slideOrder++;
    posSlider((slideOrder - 1) * -100);
    $('#slideObject').removeClass('slide' + transObject[temp - 1]).addClass('slide' + transObject[slideOrder - 1]);
}

function posSlider(myPos) {
    $("#briefWrap").animate(
        {top: myPos + '%', opacity: "-3.5"},
        animateTime / 2,
        "swing"
    ).animate(
        {opacity: "1"},
        animateTime / 2,
        "swing"
    );

    $("#titleWrap").animate(
        {top: myPos + '%', opacity: '-3'},
        animateTime / 2,
        "swing"
    ).animate(
        {opacity: "1"},
        animateTime / 2,
        "swing"
    )
}

// 简单的节流函数
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次
function throttle(fun, delay, time) {
    var timeout, startTime = new Date();

    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function lazyload(event) {
    var imgNum = $("img").length;
    var img = $('img');
    for (var i = n; i < imgNum; i++) {
        if (img.eq(i).offset().top - 500 < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
            if (img.eq(i).attr("src") == "img/blog-image/default.jpg") {
                var src = img.eq(i).attr("data-src");
                img.eq(i).attr("src", src);
                n = i + 1;
            }
            if (img.eq(i).attr("src") == "img/blog-image/default1.png") {
                var src = img.eq(i).attr("data-src");
                //alert("战术暂停");
                img.eq(i).attr("src", src);
                n = i + 1;
            }
        }
    }
}
// 采用了节流函数
var n = 0;
var sliderTimer = null;
var contentListDisplay = 0;
var slideOrder = 1;
var allSlider = 5;
var animateTime = 800;
var blogLink = [0, 1, 9, 16, 24];
var slideTime = 4000;

$(document).ready(function() {
    var myRand = Math.round(Math.random() * 5);
    if(myRand == 0) myRand = 5;
    slideOrder = myRand;
    $("#bar" + myRand).css("color", "#666").css("font-size", "30px");
    $('#wraps').css("top", (slideOrder - 1) * -100 + '%');

    var screenWidthRate = parseFloat($(document).width()) / 1920.0;
    $("body").css("zoom", screenWidthRate + "");

    $(function() {
        $("#slideContainer").fadeIn();
        $("#afterSlider").fadeIn();
        $("#commingSoon").fadeIn();
        $("#loading").fadeOut();

        $('.cates').click(commingSoon);

        $(".slideReadmore").click(function() {
            window.open("blog/" + blogLink[slideOrder - 1] + ".html");
        });

        $("#contentListID").click(function() {
            if(contentListDisplay == 0) {
                contentListDisplay = 1;
                $("#contentListID").addClass("contentList1").removeClass("contentList");
                $("#contentLisText").fadeIn();
            }
            else {
                contentListDisplay = 0;
                $("#contentListID").addClass("contentList").removeClass("contentList1");
                $("#contentLisText").fadeOut();
            }
        });

        $(".bars").click(function () {
            clearInterval(sliderTimer);
            if($(this).text() == '↑') {
                var temp = slideOrder;
                if(slideOrder == 1) slideOrder = 5;
                else slideOrder--;
                slidePosition(temp, slideOrder);
            }
            else if($(this).text() == '↓') {
                nextSlide();
            }
            else {
                slidePosition(slideOrder, $(this).text()[1]);
                slideOrder = $(this).text()[1];
            }
        });
        sliderTimer = setInterval(nextSlide, slideTime);
        
        // window.addEventListener('scroll', throttle(lazyload, 500, 1000));
        // lazyload();
    });
});

function nextSlide() {
    var temp = slideOrder;
    if(slideOrder == 5) slideOrder = 1;
    else slideOrder++;
    slidePosition(temp, slideOrder);
}

function slidePosition(last, order) {
    var slidePos = (order - 1) * -100;
    $('#wraps').animate(
        {opacity: "0"},
        animateTime / 2,
        "swing"
    ).animate(
        {top: slidePos + '%'},
        1,
        "swing"
    ).animate(
        {opacity: "1"},
        animateTime / 2,
        "swing"
    );
    $("#bar" + order).css("color", "#666").css("font-size", "30px");
    $("#bar" + last).css("color", "#aaa").css("font-size", "20px");
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

// 简单的节流函数
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次

/*
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
*/

// 采用了节流函数

var sliderLocation = 0;
var n = 0;
var sliderTimer = null;
var isAutoPlay = 1;

$(document).ready(function() {
    var myRand = Math.round(Math.random() * 5);
    if(myRand == 5) myRand = 0;
    myRand *= -100;
    sliderLocation = myRand;
    document.getElementById("imgWrap").style.left = myRand + '%';
    // document.getElementById("imgWrap2").style.left = myRand + '%';
    document.getElementById("textWrap").style.left = myRand + '%';
    document.getElementById("textWrap2").style.left = myRand + '%';
    document.getElementById("myBar").style.left = myRand / -100 * 20 + '%';

    var screenWidthRate = parseFloat($(document).width()) / 1920.0;
    $("body").css("zoom", screenWidthRate + "");

    $(window).load(function() {
        $("#sliderContainer").fadeIn();
        $("#afterSlider").fadeIn();
        $("#commingSoon").fadeIn();
        $("#loading").fadeOut();
        
        $('#sliderContainer').click(function() {
            if($('#sliderPlay').is(':hover')) {
                if(isAutoPlay == 0) {
                    sliderAutoPlay();
                }
                else {
                    sliderStopPlay();
                }
            }
            else {
                sliderStopPlay();
            }
        });
        $('.slierReadmoreSmallBox').mouseenter(sliderStopPlay);

        $('#sliderNex').click(sliderNext);
        $('#sliderPre').click(sliderPrev);

        $('.mySort').click(commingSoon);
        
        window.addEventListener('scroll', throttle(lazyload, 500, 1000));
        lazyload();
        
        sliderAutoPlay();
    });
});

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

function sliderAutoPlay() {
    $('#sliderPlay').children('.sliderButtonSymbol').text('| |');
    $('#sliderPlay').children('.sliderButtonSymbol').css('line-height', '43px');
    isAutoPlay = 1;
    sliderTimer = setInterval(function() {
        sliderNext();
    }, 3000);
}

function sliderStopPlay() {
    isAutoPlay = 0;
    $('#sliderPlay').children('.sliderButtonSymbol').text('▷');
    $('#sliderPlay').children('.sliderButtonSymbol').css('line-height', '45px');
    clearInterval(sliderTimer);
}

function sliderNext() {
    sliderLocation -= 100;
    if(sliderLocation == -500) {
        sliderLocation = 0;
    }
    sliderLocate();
}

function sliderPrev() {
    sliderLocation += 100;
    if(sliderLocation == 100) {
        sliderLocation = -400;
    }
    sliderLocate();
}

function sliderLocate() {
    $('#imgWrap').animate(
        {left: sliderLocation + '%'},
        "1000",
        "linear"
    );
    $('#imgWrap2').animate(
        {left: sliderLocation + '%'},
        "1000",
        "linear"
    );
    $('#textWrap').animate(
        {left: sliderLocation + '%'},
        "slow",
        "swing"
    );
    $('#textWrap2').animate(
        {left: sliderLocation + '%'},
        "slow",
        "swing"
    );
    $('#myBar').animate(
        {left: sliderLocation / -100 * 20 + '%'},
        "slow",
        "swing"
    );
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
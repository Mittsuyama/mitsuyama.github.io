var screenWidthRate;
var nowSlider = 1;
var sliderSpeed = 3000;
var sliderPlay;
var inSelectBox = 0;
var n = 0;

$(document).ready(function() {
    $(window).load(function() {
        //让幻灯片滚动起来
        sliderPlay = setInterval(nextPage, sliderSpeed);

        //优化小屏幕
        if($(document.body).width() < 2000 && $(document.body).width() > 1900) {
            screenWidthRate = 1;
        }
        else {
            screenWidthRate = parseFloat($(document.body).width() / 1920.0);
        }
        $('body').css("zoom", screenWidthRate);    

        //鼠标放在幻灯片停止播放
        $('#slider').mouseenter(function() {
            clearInterval(sliderPlay);
        });
        $('#slider').mouseleave(function() {
            sliderPlay = setInterval(nextPage, sliderSpeed);
        });
        $('#slider').click(function() {
            if(inSelectBox == 0) {
                window.location.href = $('#sliderText' + nowSlider).children('a').attr("href");
            }
        });

        $('.subSelectBox').mouseenter(function() {
            inSelectBox = 1;
        });
        $('.subSelectBox').mouseleave(function() {
            inSelectBox = 0;
        });
        $('.subSelectBox').click(function() {
            var id = $(this).children('div').attr("id");
            locationPage(id[id.length - 1]);
        });

        window.addEventListener('scroll', throttle(lazyload, 500, 1000));
        lazyload();
    });
});

function locationPage(ord) {
    $('#sliderImg' + nowSlider).fadeOut();
    $('#sliderImg' + ord).fadeIn();
    $('#sliderText' + nowSlider).animate({opacity: '0'}, "fast");
    $('#sliderText' + ord).animate({opacity: '1'}, "fast");
    $('#selecter' + nowSlider).animate({opacity: '0.4'}, "fast");
    $('#selecter' + ord).animate({opacity: '1'}, "fast");
    nowSlider = ord;   
}

function nextPage() {
    locationPage(nowSlider % 5 + 1);
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
                //alert("战术暂停");
                img.eq(i).attr("src", src);
                n = i + 1;
            }
        }
    }
}
// 采用了节流函数
var sliderLocation = 0

$(document).ready(function() {
    $(window).load(function() {
        $('#sliderNex').click(sliderNext);
        $('#sliderPre').click(sliderPrev);

        window.addEventListener('scroll', throttle(lazyload, 500, 1000));
        lazyload();
    });
});


function sliderNext() {
    sliderLocation -= 100;
    sliderLocate();
}

function sliderPrev() {
    sliderLocation += 100;
    sliderLocate();
}

function sliderLocate() {
    $('#imgWrap').animate(
        {left: sliderLocation + '%'},
        "linear"
    );
    $('#imgWrap2').animate(
        {left: sliderLocation + '%'},
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
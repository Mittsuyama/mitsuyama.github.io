var screenWidthRate = parseFloat($(document.body).width()) / 1920.0;
var imgWidth = 0;
var tempTime = 300;
var minScrollTop = 430;
var contentIsFade = true;

$(document).ready(function() {
    if($(window).scrollTop() > minScrollTop) {
        $('.contentListOut').show();
    }
    $("body").css("zoom", screenWidthRate + "");
});

$("img.blogImg").click(function() {
    imgSrc = $(this).attr("src");
    Dis = $(this).offset().top;
    $("<img/>").attr("src", imgSrc).load(function() {
        imgWidth = this.width;
        imgHeight = this.height;
        $('.imgBack').css("height", $(document.body).height() + 2000 + 'px');
        $('.imgBack').html('<img src = ' + imgSrc + ' class = "biggerImg"></img>');
        //alert($('.imgBack').scrollTop());
        if(imgHeight < $(window).height()) {
            $('.biggerImg').css("top", parseFloat($(window).scrollTop()) / screenWidthRate + parseFloat(($(window).height() - imgHeight)) / 2.0 + 'px');
        }
        else {
            $('.biggerImg').css("top", parseFloat($(window).scrollTop()) / screenWidthRate + 'px');
        }
        shWitdh = Math.min($(window).width() * 0.8, imgWidth) + 'px';
        $('.biggerImg').animate({width: shWitdh}, tempTime);
    });
});

function getOffset(Node, offset) {
    if (!offset) {
        offset = {};
        offset.top = 0;
        offset.left = 0;
    }

    if (Node == document.body) {//当该节点为body节点时，结束递归
        return offset;
    }

    offset.top += Node.offsetTop;
    offset.left += Node.offsetLeft;

    return getOffset(Node.parentNode, offset);//向上累加offset里的值
}

$('.contentListCon').click(function() {
    var pos = $($.attr(this, 'href')).offset().top - 50;
    var myST = $(window).scrollTop();
    var deriv = (myST - pos) / 113 / (screenWidthRate * screenWidthRate);
    //alert(deriv);
    $('html, body').animate ({
        scrollTop: pos + deriv
    }, 400, "swing");
    return false;
});

$(".contentTitile").click(function() {
    /*if(contentIsFade) {
        $(".contentList").slideToggle(400);
        $(".contentTitile").html("▽  目录");
        contentIsFade = false;
    }
    else {
        $(".contentList").slideToggle(400);
        $(".contentTitile").html("△  目录");
        contentIsFade = true;
    }*/
    $(".contentList").slideToggle(400);
});

$(window).scroll(function(event){
    if($(window).scrollTop() > minScrollTop) {
        $('.contentListOut').show();
    }
    else {
        $('.contentListOut').hide();
    }
});

function imgRemove() {
    $('.biggerImg').remove();
    $(".imgBack").css("height", "0%");
}

$(".imgBack").click(function() {
    $('.biggerImg').animate({width: 0}, tempTime);
    setTimeout(imgRemove, tempTime)
});
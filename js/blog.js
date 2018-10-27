﻿var screenWidthRate = parseFloat($(document.body).width() / 1920.0);
var imgWidth = 0;
var tempTime = 300;
var minScrollTop = 530;
var contentIsFade = true;
var lastScroll = $(window).scrollTop();
var homeShow = true;

$(document).ready(function() {
    if($(window).scrollTop() > minScrollTop) {
        $('.contentListOut').show();
    }
    $("body").css("zoom", screenWidthRate + "");
    $(".articleContext").css("zoom", 1 / screenWidthRate + '');
    $(".contentListOut").css("zoom", 1 / screenWidthRate + '');
    $(window).load(function(){
        //图片放大
        $("img.blogImg").click(function() {
            imgSrc = $(this).attr("src");
            Dis = $(this).offset().top;
            $("<img/>").attr("src", imgSrc).load(function() {
                imgWidth = this.width;
                imgHeight = this.height;
                $('.imgBack').css("height", $(document.body).height() + 2000 + 'px');
                $('.imgBack').html('<img src = ' + imgSrc + ' class = "biggerImg"></img>');
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
        
        //隐藏目录
        $('.contentListCon').click(function() {
            var pos = $($.attr(this, 'href')).offset().top - 50;
            var myST = $(window).scrollTop();
            var deriv =  (myST - pos) / 113;
            $('html, body').animate ({
                scrollTop: pos + deriv
            }, 400, "swing");
            return false;
        });

        //收起目录
        $(".contentTitile").click(function() {
            $(".contentList").slideToggle(400);
        });
        
        //监视滚动
        $(window).scroll(function(event){
            if($(window).scrollTop() > minScrollTop) {
                var nowScroll = $(window).scrollTop();
                if(nowScroll > lastScroll + 20 && homeShow) {
                    homeShow = false;
                    $(".nevigation").slideUp(400);
                }
                if(nowScroll < lastScroll - 20 && !homeShow) {
                    homeShow = true;
                    $(".nevigation").slideDown(400);
                }
                setTimeout(function(){
                    lastScroll = nowScroll;
                }, 0);                  
                $('.contentListOut').show();
            }
            else {
                $('.contentListOut').hide();
                $(".nevigation").slideDown(400);
            }
        });
        
        //取消图片放大
        $(".imgBack").click(function() {
            $('.biggerImg').animate({width: 0}, tempTime);
            setTimeout(function() {
                $('.biggerImg').remove();
                $(".imgBack").css("height", "0%");
            }, tempTime)
        });
    });
});

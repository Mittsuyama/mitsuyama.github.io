//var screenWidthRate = parseFloat($(document.body).width() / 1903.0);
var screenWidthRate = 1;
var imgWidth = 0;
var tempTime = 300;
var minScrollTop = 500;
var contentIsFade = true;
var lastScroll = $(window).scrollTop();
var homeShow = true;
var titleList = new Array();

function cmp(a, b) {
    return a > b;
}

$(document).ready(function() {
    /*
    var title2s = document.getElementsByClassName("h2");
    var title3s = document.getElementsByClassName("h3");
    for(var i = 0; i < title2s.length; i++) {
        titleList.push($(title2s[i]).offset().top);
    }
    for(var i = 0; i < title3s.length; i++) {
        titleList.push($(title3s[i]).offset().top);
    }
    titleList.sort(cmp);
    for(var i = 0; i < titleList.length; i++) {
        alert(titleList[i]);
    }
    */

    if($(window).scrollTop() > minScrollTop) {
        $('.funButtonBox').show();
        $('.contentListOut').show();
    }

    $('#funUp').click(function() {
        $('html, body').animate ({
            scrollTop: 0
        }, 1000, "swing");
    });

    $('#funCom').click(function() {
        $('html, body').animate ({
            scrollTop: $("body").height()
        }, 1000, "swing");
    });

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

        (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://mitsuyama.disqus.com/embed.js';
        s.setAttribute('data-timestamp', + new Date());
        (d.head || d.body).appendChild(s);
        })();
        
        //目录跳转
        $('.contentListCon').click(function() {
            var pos = $($.attr(this, 'href')).offset().top;
            var myST = $(window).scrollTop();
            var deriv = (myST - pos) * (1 - screenWidthRate);
            $('html, body').animate ({
                scrollTop: pos + deriv
            }, 500, "swing");
            return false;
        });

        //收起目录
        $("#funList").click(function() {
            $(".contentBorder").slideToggle(400);
        });
        
        //监视滚动
        $(window).scroll(function(event){
            if($(window).scrollTop() > minScrollTop) {
                /*
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
                */
                $('.contentListOut').show();
                $('.funButtonBox').show();
            }
            else {
                $('.contentListOut').hide();
                $('.funButtonBox').hide();
                //$(".nevigation").slideDown(400);
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

//var screenWidthRate = parseFloat($(document.body).width() / 1903.0);
var screenWidthRate;
if($(document.body).width() < 2000 && $(document.body).width() > 1900) {
    screenWidthRate = 1;
}
else if($(document.body).width() < 1900) {
    screenWidthRate = parseFloat($(document.body).width() / 1920.0) + (1920 - $(document.body).width()) / 1920 * 0.5;
}
else {
    screenWidthRate = parseFloat($(document.body).width() / 1920.0);
}

var imgWidth = 0;
var tempTime = 300;
var minScrollTop = 500;
var contentIsFade = true;
var lastScroll = $(window).scrollTop();
var homeShow = true;
var titleList = new Array();
var shareBoxShow = 0;

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

    $('#shareBigBox').hide();
    shareBoxShow = 0;
    $('body').css("zoom", screenWidthRate);
    if($(window).scrollTop() > minScrollTop) {
        $('.funButtonBox').show();
        $('.contentListOut').show();
    }

    $('#funUp').click(function() {
        $('html, body').animate ({
            scrollTop: 0
        }, 1000);
    });

    $('#funCom').click(function() {
        $('html, body').animate ({
            scrollTop: $("body").height()
        }, 1000);
    });

    $('#funShare').click(function() {
        if(shareBoxShow == 0) {
            $('#shareBigBox').fadeIn();
            shareBoxShow = 1;
        }
        else {
            $('#shareBigBox').fadeOut();
            shareBoxShow = 0;
        }
    });

    $('#shareClose').click(function() {
        $('#shareBigBox').fadeOut();
        shareBoxShow = 0;
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
                var shWitdh = 0;
                //alert(imgWidth + ' & ' + $(window).width() * 0.8);
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

//一键分享
var $config = {
    url                 : window.location.href,// 网址，默认使用 window.location.href
    source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
    title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
    description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
    image               : '', // 图片, 默认取网页中第一个img标签
    sites               : ['qzone', 'qq', 'weibo','wechat'], // 启用的站点
    disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
    wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
    wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
    target : '_blank' //打开方式
};
$('.social-share').share($config);
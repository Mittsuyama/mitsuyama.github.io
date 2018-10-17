var screenWidthRate = parseFloat($(document.body).width()) / 1920.0;
$("body").css("zoom", screenWidthRate + "");
var imgWidth = 0;
var tempTime = 300;

$("img.blogImg").click(function() {
    imgSrc = $(this).attr("src");
    Dis = $(this).offset().top;
    $("<img/>").attr("src", imgSrc).load(function() {
        imgWidth = this.width;
        imgHeight = this.height;
        $('.imgBack').css("height", $(document.body).height() + 'px');
        $('.imgBack').html('<img src = ' + imgSrc + ' class = "biggerImg"></img>');
        //alert($('.imgBack').scrollTop());
        if(imgHeight < $(window).height()) {
            $('.biggerImg').css("top", $(window).scrollTop() + ($(window).height() - imgHeight) / 2 + 'px');
        }
        else {
            $('.biggerImg').css("top", $(window).scrollTop() + 'px');
        }
        shWitdh = Math.min($(window).width() * 0.8, imgWidth) + 'px';
        $('.biggerImg').animate({width: shWitdh}, tempTime);
    });
});

function imgRemove() {
    $('.biggerImg').remove();
    $(".imgBack").css("height", "0%");
}

$(".imgBack").click(function() {
    $('.biggerImg').animate({width: 0}, tempTime);
    setTimeout(imgRemove, tempTime)
});
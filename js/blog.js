var screenWidthRate = parseFloat($(document.body).width()) / 1920.0;
$("body").css("zoom", screenWidthRate + "");
var imgWidth = 0;

$("img.blogImg").click(function() {
    imgSrc = $(this).attr("src");
    $("<img/>").attr("src", imgSrc).load(function() {
        imgWidth =  Math.min($(document.body).width() * 0.8, this.width);
        $('.imgBack').css("height", "100%");
        $('.imgBack').css("top", $(window).scrollTop() + 'px');
        //$('.imgBack').html('<img src = ' + imgSrc + ' class = "biggerImg"></img>');
    });
});

$("img.biggerImg").click(function() {
    $('.imgBack').css("height", "0%");
    $(this).remove();
});
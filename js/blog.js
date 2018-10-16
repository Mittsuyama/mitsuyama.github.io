var screenWidthRate = parseFloat($(document.body).width()) / 1920.0;
$("body").css("zoom", screenWidthRate + "");

$("img.blogImg").click(function() {
    var large_image = '<img src= ' + $(this).attr("src") + '></img>';
    $('#blog_large_image').html($(large_image).animate({ height: '100%', width: '100%' }, 500));
});
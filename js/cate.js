$(document).ready(function() {
    var screenWidthRate = parseFloat($(document).width()) / 1920.0;
    $("body").css("zoom", screenWidthRate + "");

    $(window).load(function() {
        var temp = $("#webTitle").css("height");
        var navigationHeight = parseFloat(temp[0] + temp[1] + temp[2]) * screenWidthRate;
        $(window).scroll(function(event) {
            if($(window).scrollTop() >= navigationHeight) {
                $("#nav").css("position", "fixed");
                $("#nav").css("top", "0px");
                $("#leftBox").css("position", "fixed");
                $("#leftBox").css("top", "110px");
            }
            else {
                $("#nav").css("position", "relative");
                $("#leftBox").css("position", "absolute");
                $("#leftBox").css("top", "50px");
            }
        });
    });
});

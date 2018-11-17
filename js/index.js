var nowSlider = 1;
var sliderSpeed = 3000;
var sliderPlay;

$(document).ready(function() {
    sliderPlay = setInterval(nextPage, sliderSpeed);
    $(window).load(function() {
        $('#slider').mouseenter(function() {
            clearInterval(sliderPlay);
        });
        $('#slider').mouseleave(function() {
            sliderPlay = setInterval(nextPage, sliderSpeed);
        });
        $('#slider').click(function() {
            window.location.href = $('#sliderText' + nowSlider).children('a').attr("href");
        });
    });
});

function nextPage() {
    $('#sliderImg' + nowSlider).fadeOut();
    $('#sliderImg' + (nowSlider % 5 + 1)).fadeIn();
    $('#sliderText' + nowSlider).animate({opacity: '0'}, "fast");
    $('#sliderText' + (nowSlider % 5 + 1)).animate({opacity: '1'}, "slow");
    nowSlider = nowSlider % 5 + 1;
}
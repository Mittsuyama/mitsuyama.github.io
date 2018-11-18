var nowSlider = 1;
var sliderSpeed = 3000;
var sliderPlay;
var inSelectBox = 0;

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
            if(inSelectBox == 0) {
                window.location.href = $('#sliderText' + nowSlider).children('a').attr("href");
            }
        });
        $('.subSelectBox').mouseenter(function() {
            inSelectBox = 1;
        });
        $('.subSelectBox').mouseleave(function() {
            inSelectBox = 0;
        });
        $('.subSelectBox').click(function() {
            var id = $(this).children('div').attr("id");
            locationPage(id[id.length - 1]);
        });
    });
});

function locationPage(ord) {
    $('#sliderImg' + nowSlider).fadeOut();
    $('#sliderImg' + ord).fadeIn();
    $('#sliderText' + nowSlider).animate({opacity: '0'}, "fast");
    $('#sliderText' + ord).animate({opacity: '1'}, "fast");
    $('#selecter' + nowSlider).animate({opacity: '0.4'}, "fast");
    $('#selecter' + ord).animate({opacity: '1'}, "fast");
    nowSlider = ord;   
}

function nextPage() {
    locationPage(nowSlider % 5 + 1);
}
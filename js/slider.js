var slideOrder = 1;
var allSlider = 5;
var animateTime = 1000;
var transObject = ['Book', 'Bamboo', 'Money', 'Music', 'Computer'];

$(document).ready(function() {
    //优化小屏幕
    if($(document.body).width() < 2000 && $(document.body).width() > 1900) screenWidthRate = 1;
    else screenWidthRate = parseFloat($(document.body).width() / 1920.0);
    $('body').css("zoom", screenWidthRate);

    $(window).load(function() {
        $("#slideRight").click(nextSlide);
        debrisAnimation();
    });
});

//debris floating animation
function debrisAnimation() {
    $('#slideObject').animate(
        {top: '+=' + '3%'},
        animateTime,
        "swing"
    ).animate(
        {top: '-=' + '3%'},
        animateTime,
        "swing"
    );
    for(var i = 1; i < 6; i++) {
        debrisAnimationAddRand($('#debris' + i));
    }
}

function debrisAnimationAddRand(myDebris) {
    randTime = parseInt(Math.random() * 2000 + 2000);
    randDis = parseInt(Math.random() * 60 + -30);
    myDebris.animate(
        {top: "+=" + randDis},
        randTime / 2,
        "swing",
    ).animate(
        {top: "-=" + randDis},
        randTime / 2,
        "swing",
    );
}

function nextSlide() {
    debrisAnimation();
    var temp = slideOrder;
    if(slideOrder == allSlider) slideOrder = 1;
    else slideOrder++;
    posSlider((slideOrder - 1) * -100);
    $('#slideObject').removeClass('slide' + transObject[temp - 1]).addClass('slide' + transObject[slideOrder - 1]);
}

function posSlider(myPos) {
    $("#briefWrap").animate(
        {top: myPos + '%', opacity: "-3.5"},
        animateTime / 2,
        "swing"
    ).animate(
        {opacity: "1"},
        animateTime / 2,
        "swing"
    );

    $("#titleWrap").animate(
        {top: myPos + '%', opacity: '-3'},
        animateTime / 2,
        "swing"
    ).animate(
        {opacity: "1"},
        animateTime / 2,
        "swing"
    )
}
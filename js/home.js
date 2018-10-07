var iterms = document.getElementsByClassName("box")
var boxUp = document.getElementsByClassName("boxUp");
var boxDown = document.getElementsByClassName("boxDown");
var itermWidth = iterms[0].offsetWidth;
var infoText = document.getElementsByClassName("infoText");

/*
function setOp(obj, oP) {
    obj.getElementsByClassName("briefIntroContext")[0].style.opacity = parseFloat(100 - oP) / 100.0 + "";
    obj.getElementsByClassName("sawNumBox")[0].style.opacity = parseFloat(100 - oP) / 100.0 + "";
    obj.getElementsByClassName("boxDown")[0].style.opacity = parseFloat(100 - oP) / 100.0 + "";
    obj.getElementsByClassName("boxInter")[0].style.opacity = parseFloat(100 - oP) / 100.0 + "";
    //obj.getElementsByClassName("briefIntroContextMore")[0].style.opacity = parseFloat(oP) / 100.0 + "";
}

function anotherSet(obj, oP) {
    obj.getElementsByClassName("briefIntroContextMore")[0].style.opacity = parseFloat(oP) / 100.0 + "";
}

function mouseOnButton(obj) {
    for(var i = 0; i <= 100; i += 25) {
        setTimeout(setOp, i * 2, obj, i);
    }
    for(var i = 0; i <= 100; i += 10) {
        setTimeout(anotherSet, i * 2, obj, i);
    }
}

function mouseOutButton(obj) {
    for(var i = 0; i <= 100; i += 25) {
        setTimeout(setOp, i * 2, obj, 10 - i);
    }
    for(var i = 0; i <= 100; i += 10) {
        setTimeout(anotherSet, i * 2, obj, 10 - i);
    }
}*/

function pageLoading() {
    for(var i = 0; i < iterms.length; i++) {
        var boxImg = boxUp[i].getElementsByClassName("boxUpImg");
        if(boxImg.length > 0) {
            iterms[i].style.height = boxImg[0].offsetHeight + 200 + "px";
        }
        else {
            var randHeight = Math.floor(Math.random() * 100) + 350;
            iterms[i].style.height = randHeight + "px";
        }
    }
 
    var boxDownHeight = 100;
    var boxInterHeight = 1;
    for(var i = 0; i < boxDown.length; i++) {
        boxUp[i].style.height = iterms[i].offsetHeight - boxDownHeight - boxInterHeight + "px";
    }

    waterfall();

    function waterfall() {
        var pageWidth = document.getElementsByClassName("text_container")[0].offsetWidth;
        var gap = 19;
        var columns = parseInt(pageWidth / (itermWidth + gap));
        var arr = [];
        var maxHeight = 0;
        for(var i = 0; i < iterms.length; i++) {
            if(i < columns) {
                iterms[i].style.top = gap + "px";
                iterms[i].style.left = i * (itermWidth + gap) + "px";
                arr.push(iterms[i].offsetHeight + gap);
                if(maxHeight < iterms[i].offsetHeight + gap) {
                    maxHeight = iterms[i].offsetHeight + gap
                }
            }
            else {
                var index = 0;
                var minHeight = arr[0];
                for(var j = 0; j < arr.length; j++) {
                    if(minHeight > arr[j]) {
                        index = j;
                        minHeight = arr[j];
                    }
                }
                iterms[i].style.top = arr[index] + gap + "px";
                iterms[i].style.left = iterms[index].offsetLeft + "px";
                arr[index] = arr[index] + iterms[i].offsetHeight + gap;
                for(var j = 0; j < arr.length; j++) {
                    if(maxHeight < arr[j]) {
                        maxHeight = arr[j];
                    }
                }
            }
        }
        for(var i = 0; i < infoText.length; i++) {
            if(infoText[i].offsetHeight < 60) {
                infoText[i].style.top = 13 + "px";
            }
        }
        document.getElementsByClassName("home_background")[0].style.height = maxHeight + 100 + "px";
    }

    window.onresize = function() {
        waterfall();
    };
}

$(document).ready(function(){
    $("#homeBackground").hide();
    $(".nevigation").hide();
    $(".home_background").hide();
    $(window).load(function(){
        $("#homeBackground").fadeIn();
        $(".nevigation").fadeIn();
        $(".home_background").fadeIn();
        $(".loading").fadeOut();
        pageLoading();
    });
});

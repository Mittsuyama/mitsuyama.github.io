var iterms = document.getElementsByClassName("box")
var boxUp = document.getElementsByClassName("boxUp");
var boxDown = document.getElementsByClassName("boxDown");
var itermWidth = iterms[0].offsetWidth;
var infoText = document.getElementsByClassName("infoText");
var presentHeight = 0;
var xmlhttp;
var titleList = new Array();
var timeList = new Array();
var briefList = new Array();
var orderList = new Array();

function waterfall() {
    var pageWidth = document.getElementsByClassName("text_container")[0].offsetWidth;
    var gap = 30;
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
            infoText[i].style.top = 17 + "px";
        }
    }
    document.getElementsByClassName("home_background")[0].style.height = maxHeight + 100 + "px";
    presentHeight = Math.max(presentHeight, maxHeight);
}

function pageLoading() {
    var screenWidthRate = parseFloat($(document).width()) / 1920.0;
    $("body").css("zoom", screenWidthRate + "");
    for(var i = 0; i < iterms.length; i++) {
        var boxImg = boxUp[i].getElementsByClassName("boxUpImg");
        if(boxImg.length > 0) {
            iterms[i].style.height = boxImg[0].offsetHeight + 220 + "px";
        }
        else {
            var randHeight = Math.floor(Math.random() * 100) + 350;
            iterms[i].style.height = randHeight + "px";
        }
    }

    var boxDownHeight = 110;
    var boxInterHeight = 1;
    for(var i = 0; i < boxDown.length; i++) {
        boxUp[i].style.height = iterms[i].offsetHeight - boxDownHeight - boxInterHeight + "px";
    }

    waterfall();
}

window.onresize = function() {
    waterfall();
};

$(window).scroll(function(event){
    if($(window).scrollTop() + $(window).height() > presentHeight) {

    }
});

/*
function loadXML(){
    var xmlDoc;

    xmlhttp = null;
    if (window.XMLHttpRequest) { // code for all new browsers
        xmlhttp = new XMLHttpRequest();
    } 
    else if (window.ActiveXObject) { // code for IE5 and IE6
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.open("GET", "xml/waterfall.xml", true);
        alert(xmlhttp.status);
        //xmlhttp.send(null);
        xmlDoc = xmlhttp.responseXML;
    }

    return xmlDoc;
}

function loadXml() {
    var xmlDoc = loadXML();
    //alert(xmlDoc);
}
*/

$(document).ready(function() {
    $("#homeBackground").hide();
    $(".nevigation").hide();
    $(".home_background").hide();
    $(window).load(function(){
        //loadXml();
        $("#homeBackground").fadeIn();
        $(".nevigation").fadeIn();
        $(".home_background").fadeIn();
        $("#loading").fadeOut();
        pageLoading();
    });
});

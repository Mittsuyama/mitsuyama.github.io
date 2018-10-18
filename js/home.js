var iterms = document.getElementsByClassName("box")
var boxUp = document.getElementsByClassName("boxUp");
var boxDown = document.getElementsByClassName("boxDown");
var itermWidth = iterms[0].offsetWidth;
var infoText = document.getElementsByClassName("infoText");
var presentHeight = 0;
var titleList = new Array();
var timeList = new Array();
var briefList = new Array();
var orderList = new Array();

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
 
    var boxDownHeight = 100;
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

function loadXML(){
    var xmlDoc;
    try { //IE
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        }
    catch(e) { //firefox,opera
        xmlDoc = document.implementation.createDocument("", "", null);
    }
    try {
        xmlDoc.asyc = false; //是否异步调用
        xmlDoc.load("../xml/waterfall.xml"); //文件路径
    }
    catch(e) { //chrome
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", "../xml/waterfall.xml", false); //创建一个新的http请求，并指定此请求的方法、URL以及验证信息
        xmlDoc = xmlhttp.responseXML;
    }
    return xmlDoc;
}

function loadXml() {
    var xmlDoc = loadXML();
    alert(xmlDoc);
}

$(document).ready(function(){
    $("#homeBackground").hide();
    $(".nevigation").hide();
    $(".home_background").hide();

    $(window).load(function(){
        loadXml();
        $("#homeBackground").fadeIn();
        $(".nevigation").fadeIn();
        $(".home_background").fadeIn();
        $(".loading").fadeOut();
        pageLoading();
    });
});

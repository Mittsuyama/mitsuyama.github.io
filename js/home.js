var iterms = document.getElementsByClassName("box")
var boxUp = document.getElementsByClassName("boxUp");
var boxDown = document.getElementsByClassName("boxDown");
var itermWidth = iterms[0].offsetWidth;

window.onload = function() {
    for(var i = 0; i < iterms.length; i++) {
        var boxImg = boxUp[i].getElementsByClassName("boxUpImg");
        if(boxImg.length > 0) {
            boxImg[0].style.width = "100%";
            iterms[i].style.height = boxImg[0].offsetHeight + 200 + "px";
        }
        else {
            var randHeight = Math.floor(Math.random() * 100) + 350;
            iterms[i].style.height = randHeight + "px";    
        }
    }
 
    var boxDownHeight = 100;
    var boxInterHeight = 3;
    for(var i = 0; i < boxDown.length; i++) {
        boxUp[i].style.height = iterms[i].offsetHeight - boxDownHeight - boxInterHeight + "px";
    }

    waterfull();

    function waterfull() {
        var pageWidth = document.getElementsByClassName("text_container")[0].offsetWidth;
        var gap = 15;
        var columns = parseInt(pageWidth / (itermWidth + gap));
        var arr = [];
        for(var i = 0; i < iterms.length; i++) {
            if(i < columns) {
                iterms[i].style.top = gap + "px";
                iterms[i].style.left = i * (itermWidth + gap) + "px";
                arr.push(iterms[i].offsetHeight + gap);
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
            }
        }
    }

    window.onresize = function() {
        waterfull();
    };
};
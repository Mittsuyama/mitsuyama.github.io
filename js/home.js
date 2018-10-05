var iterms = document.getElementsByClassName("box")

window.onload = function() {
    waterfull();
    function waterfull() {
        var pageWidth = document.getElementsByClassName("text_container")[0].offsetWidth;
        var itermWidth = iterms[0].offsetWidth;
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
        window.onresize = function() {
            waterFall();
        };
    }
}
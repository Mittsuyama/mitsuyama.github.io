var container = document.getElementsByClassName("blogMainBlock");
var subContainer = document.getElementsByClassName("articleContext");

window.onload = function() {
    subContainer[0].style.height = container[0].offsetHeight + 100 + "px";
};
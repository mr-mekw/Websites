poppinator = function(element){
    if (element.classList.contains("unpopped")){
        element.classList.remove("unpopped");
        element.classList.add("popped");
    }else {
        element.classList.remove("popped");
        element.classList.add("unpopped");
    }
}


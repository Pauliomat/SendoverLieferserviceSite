function showLoadingAnimation() {
    var content = document.getElementById("searchcontentID");
    var b = document.getElementById("b")
    content.setAttribute("style","-webkit-filter:blur(10px)");

    if(document.getElementsByClassName("loader").length >= 1) {
        return
    } else {
        var loader = document.createElement("div");
        loader.id = "loader"
        loader.classList.add("loader");
        b.appendChild(loader);
    }
}


function stopLoadingAnimation() {
    var content = document.getElementById("searchcontentID");
    var b = document.getElementById("b")
    content.setAttribute("style","-webkit-filter:blur(0px)");

    var loader = document.getElementById("loader");
    loader.remove();
}
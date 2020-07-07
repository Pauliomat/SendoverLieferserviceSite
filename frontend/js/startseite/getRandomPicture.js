$(document).ready( async function(){
    var pic = await getRandompicture();
    showPicture(pic);
});

async function getRandompicture() {
    var response = await fetch("/gallery", {method:"GET"});
    var pic = await response.json();
    return pictureToBase64(pic[0]["data"]["data"]);
}

function showPicture(pic) {
    var pic_id = document.getElementById("backgroundpicture");
    $(pic_id).attr("src","data:image/png;base64,"+pic);
}

pictureToBase64 = function(pic) {
    var binary = '';
    var bytes = new Uint8Array(pic);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}



function getCookie(){
    var cookie = document.cookie;
    while(cookie.includes("|")){
        cookie = cookie.replace("|","");
    }
    cookie = cookie.substr(6);
    //return cookie;
    return "afn214214jajwkrhnwir123";
}
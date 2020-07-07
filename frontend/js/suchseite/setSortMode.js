function setSortMode(n){
    var sortierbutton = document.getElementsByClassName("sortbutton")[0];
    var text = "";
    switch (n) {
        case 1:
            text = "günstigste";
            break;
        case 2:
            text = "teuerste";
            break;
    }
    sortierbutton.innerText = "Sortieren nach "+text;
    fetchData();
}
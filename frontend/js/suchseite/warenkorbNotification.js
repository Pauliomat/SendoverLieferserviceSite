function warenkorbNotification(item_id) {
    try {
        removeOldNotification();
    } catch {}

    var fadeTime = 7000;
    var notification_p = document.createElement("p");
    notification_p.id = "notification_p_"+item_id;
    notification_p.classList.add("notification_p");

    var bezeichnung = document.getElementById("ID-"+item_id+"-legend").innerText;
    var menge = document.getElementById("ID-"+item_id+"-anzahl").value;
    var preis = document.getElementById("ID-"+item_id+"-preis").innerText;

    notification_p.innerText = menge+"x "+bezeichnung + " á "+ preis+" hinzugefügt";

    var navbar = document.getElementById("navbar");
    navbar.appendChild(notification_p);
    $(notification_p).fadeOut(fadeTime, () =>  { notification_p.remove();});
}
function removeOldNotification() {
    var navbar = document.getElementById("navbar");
    navbar.children[2].remove();
}

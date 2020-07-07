async function updateWarenkorb(cookie) {
    var getQuery = "/warenkorb?session_id="+cookie;
    var response = await fetch(getQuery, {method:"GET"});
    var data = await response.json();
    data = JSON.parse(data);
    var pPreis = document.getElementById("warenkorb_preis");
    var pAnzahl = document.getElementById("warenkorb_anzahl");
    if(data.length > 0) {
        pPreis.innerText = parseFloat(data[0]["preis"]).toFixed(2)+"€";
        pAnzahl.innerText = data[0]["menge"] + " Elemente";
    } else {
        pPreis.innerText = "0,00€";
        pAnzahl.innerText = "0 Elemente";
    }
}


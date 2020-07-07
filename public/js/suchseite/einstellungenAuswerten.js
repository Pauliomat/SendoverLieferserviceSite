async function fetchData() {
    var parameter = einstellungenAuswerten();
    var query = "/gerichte?"+parameter;
    const response = await fetch(query);
    const data = await response.json();
    printData(JSON.parse(data))
}

function einstellungenAuswerten(){
    //checkboxes
    var parameterString = "";
    var inputs = document.getElementsByTagName("input");
    var checkboxes = [];
    var nGaenge = 5;
    var nVeggie = 2;
    var nHerkunft = 3;

    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox"){
            checkboxes.push(inputs[i]);
        }
    }
    //gang
    for(var i = 0; i < 5; i++) {
        if(checkboxes[i].checked ) {
            parameterString += "gang="+checkboxes[i].id+"&" ;
        }  
    }
    //veggie
    for(var i = nGaenge; i < nGaenge+nVeggie; i++) {
        if(checkboxes[i].checked ) {
            parameterString += checkboxes[i].id +"=true&";
        }  
    }
    //herkunft
    for(var i = nGaenge+nVeggie; i < nGaenge+nVeggie+nHerkunft; i++) {
        if(checkboxes[i].checked ) {
            parameterString += "herkunft="+checkboxes[i].id+"&";
        }  
    }

    //preisslider
    var preis_von = document.getElementById("von_preis").value;
    var preis_bis = document.getElementById("bis_preis").value;
    parameterString += "min="+preis_von+"&";
    parameterString += "max="+preis_bis+"&";

    //suchfeld
    var suchfeld = document.getElementById("searchbar");
    parameterString += "text="+suchfeld.value+"&";
    //sortierbutton
    var sortierbutton = document.getElementsByClassName("sortbutton")[0];
    var text = sortierbutton.innerText.substr(15);

    switch (text) {
        case "günstigste":
            text = "ASC";
            break;
    
        case "teuerste":
            text = "DESC";
            break;
    }

    parameterString += "sort="+text;
    console.log(parameterString);
    return parameterString;
}
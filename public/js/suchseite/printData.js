function clearTable() {
    var doc = document.getElementById("searchcontentID");
    doc.innerText = "";
}


function printData(data) { 
    clearTable(); //lösche das ganze div damit keine duplikate entstehen
    var len = Object.keys(data).length;
    var searchDoc = document.getElementById("searchcontentID");
    var pResultDiv = document.getElementById("result_div");
    pResultDiv.innerText = "";
    //searchresult
    var pResult = document.createElement("p");
    pResult.innerText = len + " Treffer gefunden";
    pResult.id = "searchresult";
    pResultDiv.appendChild(pResult);
    
    
    //Erstelle dynamisch alle HTML Elemente 
    for(var i = 0; i < len; i++){

        //Übergeordnetes div
        var searchItems = document.createElement("div");
        searchItems.classList.add("searchitems");
        searchDoc.appendChild(searchItems);

        //fieldset pro gericht
        var fieldset = document.createElement("fieldset");
        searchDoc.appendChild(fieldset);

        //überschrift pro gericht
        var legend = document.createElement("legend");
        legend.innerText = data[i]["bezeichnung"];
        legend.id = ("ID-"+data[i]["gericht_id"]+"-legend").replace(" ","-");
        fieldset.appendChild(legend);

        //img
        var img = document.createElement("img");
        img.src = "./pics/"+data[i]["bezeichnung"]+".png";
        img.id = "item_img";
        img.width = "250";
        img.height = "155"
        fieldset.appendChild(img);

        //beschreibung pro gericht
        var pDescription = document.createElement("p");
        pDescription.id = "description";
        pDescription.innerText = data[i]["beschreibung"];
        fieldset.appendChild(pDescription);


        //div für preis,anzahl,warenkorb
        var class_preis_anzahl_warenkorb = document.createElement("div");
        class_preis_anzahl_warenkorb.classList.add("preis_anzahl_warenkorb");
        fieldset.appendChild(class_preis_anzahl_warenkorb);

        //form für preis,anzahl,warenkorb
        var form_preis_anzahl_warenkorb = document.createElement("form");
        class_preis_anzahl_warenkorb.appendChild(form_preis_anzahl_warenkorb);

        //label preis
        var label_preis = document.createElement("label");
        label_preis.classList.add("preis");
        label_preis.id = "ID-"+ data[i]["gericht_id"]+"-preis";
        label_preis.for = "anzahl";
        label_preis.innerText = "€ " + data[i]["preis"].toFixed(2);

        //number counter
        var input_number = document.createElement("input");
        input_number.type = "number";
        input_number.classList.add("anzahl");
        input_number.id = "ID-"+data[i]["gericht_id"]+"-anzahl"
        input_number.value = "1";
        input_number.step = "1";
        input_number.min = "1";
        input_number.max = "10";

        var br = document.createElement("br");

        //in den warenkorb knopf
        var input_submit = document.createElement("input");
        input_submit.classList.add("indenwarenkorb");
        input_submit.id = "ID-"+data[i]["gericht_id"]+"-button"
        input_submit.type = "button";
        input_submit.value = "In den Warenkorb";

        // "In den Warenkorb" knopf in jedem Element; sende POST zur DB und schicke cookie,artikel id,anzahl, danach update Warenkorb
        input_submit.addEventListener("click" , async function() {
            var id = this.id.split("-")[1];
            var anzahl = document.getElementById("ID-"+id+"-anzahl").value;
            var cookie = getCookie();
            var parameter = "session_id="+cookie+"&id="+id+"&anzahl="+anzahl;
            console.log(parameter);
            var sendQuery = "/warenkorb?"+parameter;
            fetch(sendQuery, {method:"POST"});
            updateWarenkorb(cookie)
            warenkorbNotification(id);
        });

        form_preis_anzahl_warenkorb.appendChild(label_preis);
        form_preis_anzahl_warenkorb.appendChild(input_number);
        form_preis_anzahl_warenkorb.appendChild(br);
        form_preis_anzahl_warenkorb.appendChild(input_submit);
    }
    console.log("Printed.")
}
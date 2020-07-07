 async function addArtikel() {


    var name = document.getElementById("bezeichnung").value;
    var preis = document.getElementById("price").value;
    var herkunft = document.getElementById("origin").value;
    var gang = document.getElementById("course").value;
    var beschreibung = document.getElementById("description_ta").value;
    var vegetarisch = document.getElementById("vegetarian").checked;
    var vegan = document.getElementById("vegan").checked;
    var pic = document.getElementById("image").files[0];

    var options = [name, preis, herkunft, beschreibung, pic];
    var veggie = [vegetarisch, vegan];

    for (let i = 0; i < options.length; i++) {
        if(options[i] == "") {
            alert("Ein oder mehrere Felder sind leer");
            return;
        }
    }

    var preis_converted = preis.replace(",",".");

    var img = await readFile(pic);

    var parameter = "?bezeichnung="+name+"&preis="+ preis_converted+"&beschreibung="+beschreibung;
    parameter    += "&herkunft="+herkunft+"&vegetarisch="+vegetarisch+"&vegan="+vegan+"&gang="+gang;
    console.log(parameter)

    fetch("/add"+parameter, {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"pic":img}) 
    });
}

const readFile = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
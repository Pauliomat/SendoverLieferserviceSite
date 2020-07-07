$(document).ready(async function() {
    var data= await showwarenkorb();
    console.log(data);
    createTableRows(data);
    console.log(data);
    calcSumwarenkorb();
    checkIfWarenkorbLeer();
});
async function checkIfWarenkorbLeer(){
    var parameter = "/warenkorb?show=true";
   var und = "&session_id=";
   var cookie = getCookie();
   //var cookie = "afn214214jajwkrhnwir123"
   var ergebnis = parameter+ und + cookie;
   console.log(ergebnis);
   var response = await fetch(ergebnis,{method:"GET"});
   var data = await response.json();
   data= JSON.parse(data);
   var length = Object.keys(data).length;
   console.log(length);
   if(length==0){
    document.getElementById("weiter").remove();
   }
   
}

async function calcSumwarenkorb() {
    var parameter = "/warenkorb?show=true";
   var und = "&session_id=";
   var cookie = getCookie();
   //var cookie = "afn214214jajwkrhnwir123"
   var ergebnis = parameter+ und + cookie;
   console.log(ergebnis);
   var response = await fetch(ergebnis,{method:"GET"});
   var data = await response.json();
   data= JSON.parse(data);
   console.log("aaa");
   console.log(data);
   console.log("aaa");
    var sum =0.00;
    var length = Object.keys(data).length;
    for(i=0;i<length ;i++){
        console.log("ababab");
        sum+=data[i]["menge"]*data[i]["preis"];
    }
    var tdsumme = document.getElementById("gesamtprice");
    tdsumme.innerText = "€"+sum.toFixed(2);
}

async function showwarenkorb() {
   var parameter = "/warenkorb?show=true";
   var und = "&session_id=";
   var cookie = getCookie();
   //var cookie = "afn214214jajwkrhnwir123"
   var ergebnis = parameter+ und + cookie;
   console.log(ergebnis);
   var response = await fetch(ergebnis,{method:"GET"});
   var data = await response.json();
   return JSON.parse(data);
}
function createTableRows(data){
    var length = Object.keys(data).length;
    var tbody = document.getElementById("tbody");
    for(i=0;i<length;i++){
        console.log("aaaa");
        var tr=document.createElement("tr");
        var tdname=document.createElement("td");
        tdname.innerText=data[i]["bezeichnung"];
        var tdloeschbutton=document.createElement("td");
        var buttonloeschen=document.createElement("input");
        buttonloeschen.type="button";
        buttonloeschen.value="Loeschen";
        buttonloeschen.classList.add("delete");
        buttonloeschen.id="ID-"+data[i]["gericht_id"]+"-delete";
        buttonloeschen.addEventListener("click" , function() {
          var id=this.id.split("-")[1]; 
          var postQuery="/warenkorb?delete="+id;
          fetch(postQuery,{method:"POST"});
          $(this.parentNode.parentNode).remove();
          calcSumwarenkorb();
          checkIfWarenkorbLeer()    
        });
        tdloeschbutton.appendChild(buttonloeschen);
        var tdmenge=document.createElement("td");
        var nummer=document.createElement("input");
        nummer.type="number";
        nummer.size="3";
        nummer.min="1";
        nummer.max="1000";
        nummer.value=data[i]["menge"];
        nummer.step="1";
        nummer.classList.add("pricemod");
        nummer.id = "ID-"+data[i]["gericht_id"]+"-menge";
        nummer.addEventListener("change" , function() {
            var menge=this.value;
            var id=this.id.split("-")[1];
            console.log(id);
            var postQuery= "/warenkorb?change="+menge+"&";
            console.log(postQuery);
            postQuery+="idblabla="+ id;
            fetch(postQuery,{method:"POST"});
            calcSumwarenkorb();
        });
        tdmenge.appendChild(nummer);
        var tdprice = document.createElement("td");
        tdprice.classList.add("price");
        tdprice.innerText = "€"+data[i]["preis"].toFixed(2);
        tr.appendChild(tdname);
        tr.appendChild(tdloeschbutton);
        tr.appendChild(tdmenge);
        tr.appendChild(tdprice);
        tbody.appendChild(tr);
    }
}
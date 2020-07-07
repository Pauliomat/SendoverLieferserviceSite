$(document).ready(function() {
    setDefaultValuesCheckbox();
    updateWarenkorb(getCookie());
    fetchData();
});

$(".checkboxside").click( () => {
    fetchData();
});

function setDefaultValuesCheckbox() {
    var nGaenge = 5;
    var iGetraenke = 1;
    var checkboxes = document.getElementsByClassName("checkboxside");
    for(var i = 0; i < checkboxes.length; i++) {
       checkboxes[i].checked = i < nGaenge && i != iGetraenke;
    }
}
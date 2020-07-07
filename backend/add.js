var express = require("express");
var add = express();
var sql = require("sqlite3").verbose();

var db = new sql.Database("DBsendover.db");

addItem = function(p) {
    var keys = Object.keys(p.query);
    var img = p.body["pic"];
    
    var DBquery = "INSERT  INTO gerichte (bezeichnung, preis, beschreibung, herkunft, vegetarisch, vegan, gang, bild) VALUES (";
    
    for (let i = 0; i < keys.length; i++) {
        DBquery += "\""+p.query[keys[i]] + "\", ";
    }

    DBquery += "\""+ img + "\")";
    
    db.all(DBquery,  function (err, pic) {
        if(err){
            return console.error(err.message);
        } return;
    });
}
module.exports = add;

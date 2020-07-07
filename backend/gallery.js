var express = require("express");
var gallery = express();
var sql = require("sqlite3").verbose();
var db = new sql.Database("DBsendover.db");

getMaximumId = async function() {
    return new Promise((resolve, reject) => {
        db.all("SELECT MAX(id) as max FROM gallery;",  function (err, rows) {
            if(err){
                return console.error(err.message);
            } 
            resolve(rows[0]["max"]);
        });
    });
}

getPicture = async function(max) {
    var r = parseInt(Math.random() * (max - 1) + 1);
    return new Promise((resolve, reject) => {
        db.all("SELECT data FROM gallery WHERE id="+r,  function (err, pic) {
            if(err){
                return console.error(err.message);
            } resolve(pic);
        });
    });
}


module.exports = gallery;
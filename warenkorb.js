var express = require("express");
var database = express();
var sql = require("sqlite3").verbose();
var db = new sql.Database("./db/DBsendover.db");

setData =  function (req) {
    var keys = Object.keys(req.query);
    var queryDB = "INSERT INTO warenkorb(user_id, artikel_id, menge)VALUES (";
    for (let i = 0; i < 3; i++) {
        if(i == 0){
            queryDB += "\"" +req.query[keys[i]] + "\" ,";
        }
        else if(i == 1){
            queryDB += req.query[keys[i]] + " ,";
        } else {
            queryDB += req.query[keys[i]] + ")";
        }
    }
    console.log("--"+queryDB);
		db.run(queryDB,  function (err, rows) {
			if(err){
				return console.error(err.message);
			}
        });
}

getData = async function (params) {
    var queryDB = "SELECT sum(gerichte.preis * warenkorb.menge) as preis, sum(warenkorb.menge) as menge FROM gerichte, warenkorb WHERE gerichte.gericht_id=warenkorb.artikel_id AND warenkorb.user_id=" ;
    var param = "\""+params.query["session_id"] + "\"";
    queryDB += param;
    queryDB += "GROUP BY warenkorb.user_id";
    console.log(queryDB);
    return new Promise(function (resolve, reject) {
        db.all(queryDB, async function (err, rows) {
            if(err){
                return console.error(err.message);
            }
            resolve(JSON.stringify(rows));
        })
    })
};

setWarenkorb =  function (req) {
	setData(req);
};

getWarenkorb = async function(req) {
    var data =  await getData(req);
    return data;
}

module.exports = database;

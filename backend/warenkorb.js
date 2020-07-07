var express = require("express");
var database = express();
var sql = require("sqlite3").verbose();
var db = new sql.Database("DBsendover.db");
getItemsForWarenkorbSite =  async function(req) {
    var dbQuery="SELECT gericht_id,bezeichnung,menge,preis FROM gerichte,warenkorb WHERE gerichte.gericht_id=warenkorb.artikel_id AND warenkorb.user_id="
    dbQuery+= "\""+req.query["session_id"]+"\"";
    dbQuery+= " ORDER BY Bezeichnung";
    console.log(dbQuery);

    return new Promise(function (resolve, reject) {
        db.all(dbQuery, async function (err, rows) {
            if(err){
                return console.error(err.message);
            }
            console.log(JSON.stringify(rows));
            resolve(JSON.stringify(rows));
        })
    })
}

deleteFromWarenkorb = function(req) {
    var dbQuery= "DELETE FROM warenkorb WHERE artikel_id="
    
    var id = req.query["delete"];
    dbQuery+= id;
    db.all(dbQuery,  function (err, rows) {
        if(err){
            return console.error(err.message);
        }
    });

}
changeFromWarenkorb = function(req) {
    var dbQuery= "UPDATE warenkorb SET menge="
    
    var id = req.query["idblabla"];
    var menge = req.query["change"];
    dbQuery+=menge;
    dbQuery+=" WHERE artikel_id=";
    dbQuery+= id;
    
    
    db.all(dbQuery,  function (err, rows) {
        if(err){
            return console.error(err.message);
        }
    });

}


setData =  function (params) {
    var keys = Object.keys(params.query);
    var queryDB = "INSERT INTO warenkorb(user_id, artikel_id, menge)VALUES (";
    var user_id = params.query[keys[0]];
    var artikel_id = params.query[keys[1]]
    var menge = params.query[keys[2]]
    queryDB += "\"" +user_id + "\" ,";
    queryDB += artikel_id + " ,";
    queryDB += menge + ")";
    
	db.run(queryDB,  function (err, rows) {
		if(err){
            //falls item bereits in warenkorb, addiere nur die menge
			addToMenge(user_id, artikel_id, menge);
		}
    });
}


addToMenge = function(user_id, artikel_id, menge) {
    var queryDB = "UPDATE warenkorb SET menge=menge+"+menge+" WHERE user_id="+"\""+user_id+"\""+" AND artikel_id="+artikel_id;
    db.all(queryDB,  function (err, rows) {
        if(err){
            return console.error(err.message);
        }
    });
}


//data warenkorb von suchseite
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
    var operation = Object.keys(req.query)[0];
    switch(operation){
    case "update":
        updateMenge(req);    
        break;
    case "delete":
        deleteFromWarenkorb(req);
        break;
    case "change":
        changeFromWarenkorb(req);
        break;
    default:
        setData(req);
    }
    /*
    if(operation == "update") {
		console.log("setWarenkorbupdate");
        updateMenge(req);
    } else {
        setData(req);
    }
    if(operation == "delete"){
		console.log("setWarenkorbdelete");
        deleteFromWarenkorb(req);
    }else {
        setData(req);
    }
    if(operation == "change"){
		console.log("setWarenkorbchange");
        changeFromWarenkorb(req);
    }else {
        setData(req);
    }
    */
    
};


getWarenkorb = async function(req) {
    var options= Object.keys(req.query)[0];
    console.log(options);
    if(options=="show"){
        return await getItemsForWarenkorbSite(req)
    }
    else{
        return await getData(req)}
}


module.exports = database;

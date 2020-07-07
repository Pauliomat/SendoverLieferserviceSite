var express = require("express");
var database = express();
var sql = require("sqlite3").verbose();
var DBquery;

var db = new sql.Database("DBsendover.db");

getQuery = async function (params) {
	DBquery = "SELECT * FROM gerichte WHERE (";
	var keys = Object.keys(params.query);
	console.log(params.query);

	for (let i = 0; i < keys.length - 4; i++) {
		var para = params.query[keys[i]];
		for (let j = 0; j < para.length; j++) {
			if(Array.isArray(para)){
				DBquery += " "+keys[i] + "=\"" + para[j] + "\"";
			} else {
				DBquery += " "+keys[i] + "=\"" + para + "\"";
				break;
			}
			if(j < params.query[keys[i]].length - 1){
				DBquery += " OR"
			}
		}
		if(i < keys.length - 4){
			DBquery += ") AND ("
		}
	}

	DBquery += "preis >= " + params.query[keys[keys.length - 4]];
	DBquery += " AND preis <= " + params.query[keys[keys.length - 3]];


	if (params.query[keys[keys.length - 2]] != "") {
		DBquery += ") AND bezeichnung LIKE \"%" + params.query[keys[keys.length - 2]] + "%\" ";
		DBquery += "ORDER BY preis " + params.query[keys[keys.length - 1]];
	} else {
		DBquery += ") ORDER BY preis " + params.query[keys[keys.length - 1]];
	}
	console.log(DBquery);
	return new Promise(function (resolve, reject) {
		db.all(DBquery, async function (err, rows) {
			if(err){
				reject(err.message)
			}
			resolve(JSON.stringify(rows));
		})
    });
}

getDBdata = async function (req) {
	var data = await getQuery(req);
	return data;
};

module.exports = database;

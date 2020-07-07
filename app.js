var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var router = express.Router();
var app = express();
var gerichte = require("./gerichte");
var warenkorb = require("./warenkorb");
var startseiteRouter = require("./startseiteRouter")

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
   extended: false
}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.set("views", __dirname + "/public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", startseiteRouter);
app.use("/gerichte", gerichte)
app.use("/warenkorb", warenkorb);
app.listen(3000);


app.get("/gerichte", async (req, res) => {
   let data = await getDBdata(req);
   res.json(data);
});

app.post("/warenkorb", (req, res) => {
   setWarenkorb(req);
});

app.get("/warenkorb", async (req, res) => {
   var data = await getWarenkorb(req);
   res.json(data);
});
module.exports = app;
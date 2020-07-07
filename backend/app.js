var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
var gerichte = require("./gerichte");
var warenkorb = require("./warenkorb");
var startseiteRouter = require("./startseiteRouter");
var gallery = require("./gallery");
var add = require("./add");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
   extended: false
}));

app.use(cookieParser());
app.use(express.static(__dirname + '/../frontend'));
app.set("views", __dirname + "/../frontend");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", startseiteRouter);
app.use("/gerichte", gerichte)
app.use("/warenkorb", warenkorb);
app.use("/gallery", gallery);
app.use("/add", gallery);

app.listen(3000);


app.get("/gerichte", async (req, res) => {
   let data = await getDBdata(req);
   res.json(data);
   res.end();
});

app.post("/warenkorb", (req, res) => {
   setWarenkorb(req);
   res.end()
});

app.get("/warenkorb", async (req, res) => {
   var data = await getWarenkorb(req);
   res.json(data);
   res.end()
});

app.get("/gallery", async (req, res) => {
   var id = await getMaximumId();
   var data = await getPicture(id);
   res.json(data);
   res.end();
});

app.post("/add", (req, res) => {
   addItem(req);
   res.end()
});
module.exports = app;
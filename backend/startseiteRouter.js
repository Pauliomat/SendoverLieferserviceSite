var express = require("express");
var router = express.Router();

router.get("/",function(req,res) {
    res.render('startseite.html');
});
module.exports = router;
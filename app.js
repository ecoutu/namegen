var express = require("express");
var fs = require("fs");

var app = express();

app.listen(3000);

var wordList = fs.readFileSync("words").toString().split("\n");
var wordListLength = wordList.length;

app.get("/", function(request, response) {
    var num = 1;
    var words = 2;
    var bandName = "";

    if ("words" in request["query"]) {
        words = parseInt(request["query"]["words"]);
    }

    if ("num" in request["query"]) {
        num = parseInt(request["query"]["num"]);
    }

    for (var i = 0; i < words; i++) {
        bandName += " " + wordList[Math.floor(Math.random() * wordListLength)];
    }

    response.send(bandName);
});

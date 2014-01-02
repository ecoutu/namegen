var express = require("express");
var fs = require("fs");

var app = express();

app.listen(80);

var wordList = fs.readFileSync("words").toString().split("\n");
var wordListLength = wordList.length;

app.get("/bandname", function(request, response) {
    var num = 1;
    var words = 2;
    var bandNames = "";

    if ("words" in request["query"]) {
        words = parseInt(request["query"]["words"]);
    }

    if ("num" in request["query"]) {
        num = parseInt(request["query"]["num"]);
    }

    for (var i = 0; i < num; i++) {
        for (var j = 0; j < words; j++) {
            bandNames += " " + wordList[Math.floor(Math.random() * wordListLength)];
        }
        bandNames += "<br />";
    }

    html = "<html><body>" + bandNames + "</body></html>"

    response.send(bandNames);
});

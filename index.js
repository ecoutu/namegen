var _ = require("underscore");
var express = require("express");
var fs = require("fs");

var wordListPath = "words";
var wordList = fs.readFileSync(wordListPath).toString().split("\n");
var wordListLength = wordList.length;
console.log("Read " + wordListLength + " words from file " + wordListPath);

var app = express();

app.use(express.logger("dev"));
app.listen(8080);

app.get("/bandname", function(request, response) {
    var num = parseInt(request["query"]["num"]) || 1;
    var words = parseInt(request["query"]["words"]) || 2;
    var bandNames = "";

    for (var i = 0; i < num; i++) {
        var name = "";
        for (var j = 0; j < words; j++) {
            name += " " + wordList[Math.floor(Math.random() * wordListLength)];
        }
        bandNames += name.trim() + "<br />";
    }

    html = "<html><body>" + bandNames + "</body></html>"

    response.send(html);
});

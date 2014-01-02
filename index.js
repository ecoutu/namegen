var config = require("./config.json")[process.env.ENV]
    , argv = require("optimist")
    , express = require("express")
    , fs = require("fs")
    ;

argv =  argv.usage("Random name generator")
    .default("c", config.defaultCount)
    .alias("c", "count")
    .describe("c", "Number of words / name")
    .default("f", "words")
    .alias("f", "wordfile")
    .describe("f", "Path to the wordlist file")
    .default("n", config.defaultNum)
    .alias("n", "numnames")
    .describe("n", "Default number of names to generate")
    .default("p", process.env.PORT || config.port || 7677)
    .alias("p", "port")
    .describe("p", "Port to listen on")
    .argv;

var wordList = fs.readFileSync(argv.wordfile).toString().split("\n");
var wordListLength = wordList.length;
console.log("Read " + wordListLength + " words from file " + argv.wordfile);

var app = express();

console.log("Using port " + argv.port);
app.use(express.logger("dev"));
app.listen(argv.port);

app.get("/namegen", function(request, response) {
    var num = parseInt(request["query"]["num"]) || argv.numnames;
    var words = parseInt(request["query"]["words"]) || argv.count;
    var bandNames = "";

    if (num * words > config.maxWords) {
        response.send(403, "You requested " + num * words + " total words, maximum allowed is " + config.maxWords + ".");
    }

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

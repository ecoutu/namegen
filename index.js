var config = require("./config.json")[process.env.ENV]
    , express = require("express")
    , fs = require("fs")
    , optimist = require("optimist")
    ;

var defaultPort = process.env.PORT || config.port || 7677;

// Command line arguments
argv =  optimist.usage("Random name generator")
    .default("c", config.defaultCount)
        .alias("c", "count")
        .describe("c", "Number of words / name")
    .default("f", "words")
        .alias("f", "file")
        .describe("f", "Path to the wordlist file")
    .default("n", config.defaultNum)
        .alias("n", "numnames")
        .describe("n", "Default number of names to generate")
    .default("p", defaultPort)
        .alias("p", "port")
        .describe("p", "Port to listen on")
    .default("r", config.defaultRoute)
        .alias("r", "route")
        .describe("r", "Route for the name generator")
    .argv
    ;

if (argv.help) {
    optimist.showHelp();
    process.exit(code=0);
}

if (process.env.ENV != "prod") {
    console.log("Default words / name: " + argv.count);
    console.log("Using word file: " + argv.file);
    console.log("Default number of names: " + argv.numnames);
    console.log("Using port: " + argv.port);
    console.log("Using route: " + argv.route);
}

// Load the wordlist
var wordList = fs.readFileSync(argv.file).toString().split("\n");
var wordListLength = wordList.length;
console.log("Read " + wordListLength + " words from file " + argv.file);

// Setup and configure express
var app = express();

app.use(express.logger("dev"));
app.listen(argv.port);

// Routes
app.get(argv.route, function(request, response) {
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

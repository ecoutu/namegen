var config = require("./config.json")[process.env.ENV]
  , express = require("express")
  , fs = require("fs")
  , optimist = require("optimist")
  , util = require("util")
  ;

var defaultPort = process.env.PORT || config.port || 7677;

// Command line arguments
var argv =  optimist.usage("Random name generator")
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
    .describe("r", "HTTP route for the name generator")
  .argv;

if (argv.help) {
  optimist.showHelp();
  process.exit(0);
}

util.log("Default words / name:   \t" + argv.count);
util.log("Using word file:        \t" + argv.file);
util.log("Default number of names:\t" + argv.numnames);
util.log("Using port:             \t" + argv.port);
util.log("Using route:            \t" + argv.route);

// Load the wordlist
var wordList = fs.readFileSync(argv.file).toString().split("\n");
var wordListLength = wordList.length;
util.log(util.format("Read %d words from file %s.", wordListLength, argv.file));

// Setup and configure express
var app = express();
app.use(express.logger("dev"));
app.listen(argv.port);

// Routes
app.get(argv.route, function (request, response) {
  var num = parseInt(request.query.num, 10) || argv.numnames;
  var words = parseInt(request.query.words, 10) || argv.count;
  var bandNames = "";

  if (num * words > config.maxWords) {
    response.send(403, util.format("You requested %d total words, maximum allowed is %d.", num * words, config.maxWords));
  }

  for (var i = 0; i < num; i++) {
    var name = "";
    for (var j = 0; j < words; j++) {
      name += " " + wordList[Math.floor(Math.random() * wordListLength)];
    }
    bandNames += name.trim() + "<br />";
  }

  response.send("<html><body>" + bandNames + "</body></html>");
});

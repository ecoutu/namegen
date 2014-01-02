Name Generator
==============

I was working doing some testing that required generating short strings of random English words. When I discovered the Linux word list, the random results amused me to no end, so: this simple Express app selects a random series of words from a word list (about 99 000 words), often resulting in very intersting and amusing names.

If you are looking for a name for you're new band, look no further!

## Usage

    Random name generator

    Options:
      -c, --count     Number of words / name               [default: 2]
      -f, --file      Path to the wordlist file            [default: "words"]
      -n, --numnames  Default number of names to generate  [default: 1]
      -p, --port      Port to listen on                    [default: 8080]
      -r, --route     Route for the name generator         [default: "/namegen"]

## Query parameters

* num: The number of names to generate
* words: The number of words that comprise each name

## Example

#### URL:

    http://localhost:8080/namegen?num=10&words=2

#### Results:

    polishing trickery
    patine apartheid
    imminent inhalator's
    trig blockhead's
    envisaging omelet's
    Sulla's beforehand
    wastrel illuminating
    reappoint rapprochement
    worms unhand
    nappies rearing

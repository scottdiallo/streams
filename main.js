var Alphabet = require('./alphabet');
var alpha = new Alphabet();
alpha.on('data', function(chunk) {
    console.log(chunk.toString());
});
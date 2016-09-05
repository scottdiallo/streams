var stream = require('stream');
var Alphabet = require('./alphabet');
var Cache = require('./cache');
var alpha = new Alphabet();
var cache = new Cache('alpha1');

alpha.pipe(cache);

cache.on('finish', function() {
    console.log('Cache store:');
    for (var key in Cache.store) {
        console.log(key, ':', Cache.store[key]);
    }
});
function Alphabet(options) {
    stream.Readable.call(this, options);
    this._start = 'a';
    this._end = 'z';
    this._curr = this._start.charCodeAt(0);
};
Alphabet.prototype = Object.create(stream.Readable.prototype);
Alphabet.prototype.constructor = Alphabet;

Alphabet.prototype._read = function() {
    var letter = String.fromCharCode(this._curr);
    var buf = new Buffer(letter, 'utf8');
    this.push(buf);
    this._curr++;
    if (letter === this._end) {
        this.push(null);
    }
};

module.exports = Alphabet;
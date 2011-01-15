
var sys = require('sys');
var log = function (x) {
  sys.puts('config: ' + x);
};
var fs = require('fs');

exports.readFileSync = function (filename) {
  log(filename);
  return JSON.parse(fs.readFileSync(filename));
};


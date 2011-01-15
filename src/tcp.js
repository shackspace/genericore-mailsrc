
var Server = function (config) {
  var net = require('net');
  var parse = require('./email').parse;
  var sys = require('sys');
  var log = function (x) {
    sys.puts('TCP server: ' + x);
  };
  this.serve = function (callback) {
    net.createServer(function (stream) {
      var data;
      stream.setEncoding('utf8');
      stream.on('connect', function () {
        data = '';
      });
      stream.on('data', function (chunk) {
        data += chunk;
        //log("chunk: [35m" + chunk + "[m$");
      });
      stream.on('end', function () {
        stream.end();
        callback(data);
      });
    }).listen(config.listen.port, config.listen.host, function () {
      log(JSON.stringify(config.listen));
    });
  };
};

exports.createServer = function (config) {
  return new Server(config);
};

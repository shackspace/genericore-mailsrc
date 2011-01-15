
var Client = function (config) {
  var sys = require('sys');
  var amqp = require('amqp');
  var log = function (x) {
    sys.puts('AMQP client: ' + x);
  };
  log("config = " + JSON.stringify(config));
  this.connect = function (callback) {
    var that = this;
    var reconnect = function () {
      log('connecting...');
      var connection = amqp.createConnection(config.connection);
      connection.on('error', function (err) {
        // TODO only retry on ETIMEDOUT?
        // TODO do we have to clean up something here?
        var timeout = config.reconnect_timeout;
        setTimeout(reconnect, timeout);
        log('error: ' + err.message + '; retrying in ' + timeout + 'ms');
      });
      connection.on('ready', function () {
        log('connected');
        var exchange = connection.exchange(
          config.queue.name,
          config.exchange.options);
        exchange.on('open', function () {
          that.publish = function (message) {
            exchange.publish(config.queue.name, message);
          };
          log('ready');
          callback();
        });
      });
    };
    // initialize reconnect-loop
    reconnect();
  };
};

exports.createClient = function (config) {
  return new Client(config);
};

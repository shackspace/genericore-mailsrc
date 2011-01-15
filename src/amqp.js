
var sys = require('sys');
var log = sys.puts;
var amqp = require('amqp');

var Client = function (config) {
  this.connect = function (callback) {
    log('AMQP connecting...');
    //var save_publish = publish;

    var connection = amqp.createConnection(config.connection);

    connection.on('error', function (err) {
      //if (save_publish !== publish) {
      //  publish = save_publish;
      //}
      var timeout = config.reconnect_timeout;
      setTimeout(AMQP_client, timeout);
      log('AMQP: ' + err);
      //log('AMQP client: ' + err + '; retrying in ' + timeout + 'ms');
    });

    connection.on('ready', function () {
      log('AMQP: connected');
      var exchange = connection.exchange(
        config.queue.name,
        config.exchange.options);

        exchange.on('open', function () {
          this.publish = function (message) {
            exchange.publish(config.queue.name, message);
          };
          log('AMQP: ready');
          callback();
      });
    });
  };
};

exports.createClient = function (config) {
  return new Client(config);
};

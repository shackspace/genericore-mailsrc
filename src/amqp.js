
var Client = function (config) {
  var sys = require('sys');
  var amqp = require('amqp');
  var log = function (x) {
    sys.puts('AMQP client: ' + x);
  };
  this.connect = function (callback) {
    log('connecting...');
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
      log('connected');
      var exchange = connection.exchange(
        config.queue.name,
        config.exchange.options);

        exchange.on('open', function () {
          this.publish = function (message) {
            exchange.publish(config.queue.name, message);
          };
          log('ready');
          callback();
      });
    });
  };
};

exports.createClient = function (config) {
  return new Client(config);
};

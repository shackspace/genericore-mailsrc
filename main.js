//
//
//

var config = {
  listen: {
    port: 3232,
    host: 'localhost'
  },
  amqp: {
    reconnect_timeout: 10000,
    connection: {
      host: '10.42.1.73',
      port: 5672,
      login: 'guest',
      password: 'guest',
      vhost: '/'
    },
    exchange: {
      type: 'fanout'
    },
    queue: {
      name: 'mailsrc',
      options: { autoDelete: false }
    }
  }
};

;(function () {
  var sys = require('sys');
  var log = sys.puts;

  //var log_message = function (message) {
  //  log('====> [31;1m' + sys.inspect(message) + '[m');
  //};
  //var publish = log_message;
  var publish = function () {
    throw new Error('publish() not initialized');
  };

  var TCP_server = function () {
    var net = require('net');
    var parse = require('./email').parse;

    net.createServer(function (stream) {
      var data;
      stream.setEncoding('utf8');
      stream.on('connect', function () {
        data = '';
      });
      stream.on('data', function (chunk) {
        data += chunk;
      });
      stream.on('end', function () {
        stream.end();
        //log('>> [32;1m' + sys.inspect(parse(data)) + '[m');
        var ret = publish({
          type: 'mail',
          subtype: 0,
          data: parse(data)
        });
        //log('====> [32;1m' + JSON.stringify(ret) + '[m');
      });
    }).listen(config.listen.port, config.listen.host);
    //, function () {
    //  log('TCP server: ' + JSON.stringify(config.listen));
    //});
  };

  var AMQP_client = function () {
    var amqp = require('amqp');
    //var save_publish = publish;

    var connection = amqp.createConnection(config.amqp.connection);

    //connection.on('error', function (err) {
    //  //if (save_publish !== publish) {
    //  //  publish = save_publish;
    //  //}
    //  var timeout = config.amqp.reconnect_timeout;
    //  setTimeout(AMQP_client, timeout);
    //  log('AMQP: ' + err);
    //  //log('AMQP client: ' + err + '; retrying in ' + timeout + 'ms');
    //});

    connection.on('ready', function () {
      var exchange = connection.exchange(
        config.amqp.queue.name,
        config.amqp.exchange.options);

      exchange.on('open', function () {
        publish = function (message) {
          exchange.publish(config.amqp.queue.name, message);
        };
      });
    });
  };

  // init
  TCP_server();
  AMQP_client();
})();

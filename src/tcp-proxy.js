var config = require('./lib/config').readFileSync(process.argv[2]);
var connect = require('genericore').connect;
var parse = require('./lib/email').parse;
var tcp = require('./lib/tcp').createServer(config.tcp);

connect(config.amqp, {
  debug: function (message) {
    console.log('AMQP: ' + message);
  },
  ready: function (client) {
    var publish = client.publish;
    tcp.serve(function (message) {
      var data = parse(message);
      console.log('publishing: ' + data['Header-Fields'].From);
      publish(JSON.stringify({ type: 'mail', subtype: 0, data: data }));
    });
  }
});

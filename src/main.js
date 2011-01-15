//
//
//

var config = require('./lib/config').readFileSync(process.argv[2]);
var parse = require('./lib/email').parse;
var amqp = require('./lib/amqp').createClient(config.amqp);
var tcp = require('./lib/tcp').createServer(config.tcp);

amqp.connect(function () {
  tcp.serve(function (message) {
    var data = parse(message);
    console.log('publishing: ' + data['Header-Fields'].From);
    amqp.publish({ type: 'mail', subtype: 0, data: data });
  });
});

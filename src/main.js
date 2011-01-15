//
//
//

var config = require('./config').readFileSync(process.argv[2]);
var parse = require('./email').parse;
var amqp = require('./amqp').createClient(config.amqp);
var tcp = require('./tcp').createServer(config.tcp);

amqp.connect(function () {
  tcp.serve(function (message) {
    var data = parse(message);
    console.log('publishing: ' + data['Header-Fields'].From);
    amqp.publish({ type: 'mail', subtype: 0, data: data });
  });
});

var config = require('./lib/config').readFileSync(process.argv[2]);
var connect = require('genericore').connect;
var parse = require('./lib/email').parse;

// TODO log to 'log'-exchange
var log = function (message) {
  console.log('mailsrc: ' + message);
};

connect(config.amqp, {
  debug: function (x) {
    log('AMQP: ' + x);
  },
  ready: function (client) {
    var publish = function (message) {
      var mail = parse(message);
      //  log('publishing: ' + data['Header-Fields'].From);
      //  publish(JSON.stringify({ type: 'mail', subtype: 0, data: data }));
      log('[35m>>>[m ' + mail['Header-Fields'].From);
      client.publish(JSON.stringify({type:'mail', subtype: 0, data: mail}));
    };

    var boundary = /^\n/m;

    require('net').createServer(function (stream) {
      // Initially there is no last mail.
      var last = '';

      stream.on('data', function (data) {
        var mails = String(data).split(boundary);

        // Combine last mail into current batch.
        mails[0] = last + mails[0];

        // The first mail in a batch may be empty as a mailman archive starts
        // with a boundary (as defined by `re').  Remove that from the batch.
        if (mails[0] === '') {
          mails.shift();
        };

        // Also remove the last mail as that could be incomplete.
        last = mails.pop();

        // message batch
        mails.forEach(publish);
      });
      stream.on('end', function () {
        // Replay the very last mail, if any.
        if (last !== '') {
          publish(last);
        };
      });

    }).listen(config.tcp.listen.port, config.tcp.listen.host, function () {
      log(JSON.stringify(config.tcp.listen));
    });
  }
});

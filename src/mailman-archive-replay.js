
var config = require('./lib/config').readFileSync(process.argv[2]);
var parse = require('./lib/email').parse;
var amqp = require('./lib/amqp').createClient(config.amqp);
var fs = require('fs');

var read_mailman_archive = function (filename, callback) {
  // (Mon|Tue|Wed|Thu|Fri|Sat|Sun)
  // (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)
  console.log('reading: ' + filename);
  fs.readFile(filename, function (err, data) {
    var re = /^\n?From .+ at \S+  ... ... [ 1-2][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9] 2[0-9][0-9][0-9]\n/m;

    var mails = String(data).split(re);
    mails.shift(); // this is the first, empty field before the first mail.

    console.log(mails.length);

    callback(mails);

    //mails.forEach(function (x) {
    //  var mail = parse(x);
    //  //var h = mail['Header-Fields'];
    //  //var s = h.From.split(/^(\S+) at (\S+) \((.*)\)$/);
    //  //h.From = s[3] + ' <' + s[1] + '@' + s[2] + '>';

    //  console.log('>>>>>>>>>>>>>>>>>>\n[32;1m' + JSON.stringify(mail) + '[m');
    //});
  });
};

amqp.connect(function () {
  read_mailman_archive(process.argv[3], function (archive) {
    archive.map(parse).forEach(function (message) {
      console.log('publishing: ' + message['Header-Fields'].From);
      amqp.publish({ type: 'mail', subtype: 0, data: message });
    });
  });
});


var address = require('./email/address'),
    parse_address = address.parse_address,
    parse_address_list = address.parse_address_list;

var parsers = {
  Date: function (string) {
    var date = new Date(string);
    return {
      year:         date.getUTCFullYear(),
      month:        date.getUTCMonth() + 1,
      day:          date.getUTCDate(),
      hour:         date.getUTCHours(),
      minute:       date.getUTCMinutes(),
      second:       date.getUTCSeconds()
    };
  },
  To: parse_address_list,
  From: parse_address
};

exports.parse = function (s) {
  var s_hfs_b = s.split("\n\n");
  var s_hfs = s_hfs_b[0];
  s_hfs_b.shift();
  var b = s_hfs_b.join('\n\n');
  var hfs = {};
  s_hfs.replace(/\n\s+/g, ' ').split(/\n/g).forEach(function (hf_s) {
    var hf = hf_s.split(/:\s*/, 2);
    var name = hf[0];
    var value = [hf[1]].concat(hf_s.split(/:/).splice(2)).join(':');
    hfs[name] = value;
  });
  for (key in parsers) {
    if (hfs.hasOwnProperty(key)) {
      var parser = parsers[key];
      hfs[key] = parser(hfs[key]);
    };
  };
  return { "Header-Fields": hfs, "Body": b };
};


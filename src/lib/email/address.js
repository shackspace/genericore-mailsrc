
var address_pattern_list = [
  [
    // user at host (name) [found in Mailman archives]
    /^(\S+) at (\S+) \(([^)]+)\)$/g,
    '$1@$2/$3'
  ],
  [
    // user@host (name) [found in Mailman archives]
    /^(\S+)\s+\(([^)]+)\)$/g,
    '$1/$2'
  ],
  [
    // "name" <email>
    /^"([^"]+)" <([^@/>]+@[^@/>]+)>$/,
    '$2/$1'
  ],
  [
    // name <email>
    /^(.+) <([^@/>]+@[^@/>]+)>$/,
    '$2/$1'
  ],
  [
    // <email>
    /^<([^@/>]+@[^@/>]+)>$/,
    '$1'
  ],
  [
    // email
    /^([^@/>]+@[^@/>]+)$/,
    '$1'
  ]
];

// parse string into { email: ..., name: ... } or null
var parse_address = function (input) {
  // normalize address to <email> [ "/" <name> ]
  input = normalize_space(trim(input));
  address_pattern_list.forEach(function (pattern) {
    input = input.replace(pattern[0], pattern[1]);
  });
  // parse normalized address
  input = input.split('/');
  var output;
  var keys = ['email', 'name'];
  for (var i = 0; i < keys.length; ++i) {
    if (input.length > i && input[i].length > 0) {
      if (!output) output = {};
      output[keys[i]] = input[i];
    };
  };
  return output;
};

var parse_address_list = function (string) {
  return string.split(';').map(function (email) {
    return parse_address(email);
  });
};

var normalize_space = function (string) {
  return string.replace(/\s+/g, ' ');
};

var trim = function (string) {
  return string.replace(/^\s+|\s+$/g, '');
};

exports.parse_address = parse_address;
exports.parse_address_list = parse_address_list;

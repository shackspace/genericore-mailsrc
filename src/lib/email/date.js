
var parse_date = function (string) {
  var date = new Date(string);
  return {
    year:   date.getUTCFullYear(),
    month:  date.getUTCMonth() + 1,
    day:    date.getUTCDate(),
    hour:   date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds()
  };
};

exports.parse_date = parse_date;

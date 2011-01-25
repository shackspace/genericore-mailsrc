
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
  return { "Header-Fields": hfs, "Body": b };
};



exports.parse = function (s) {
  var s_hfs_b = s.split("\n\n", 2);
  var s_hfs = s_hfs_b[0];
  var b = s_hfs_b[1];
  var hfs = {};
  s_hfs.replace(/\n\s+/g, ' ').split(/\n/g).forEach(function (hf_s) {
    var hf = hf_s.split(/:\s*/, 2);
    var name = hf[0], value = hf[1];
    hfs[name] = value;
  });
  return { "Header-Fields": hfs, "Body": b };
};


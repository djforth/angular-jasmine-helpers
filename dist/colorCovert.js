var _, componentToHex, hexToRgb, rgbToHex;

_ = require('lodash');

componentToHex = function(c) {
  var hex;
  hex = c.toString(16);
  if (hex.length === 1) {
    return "0" + hex;
  } else {
    return hex;
  }
};

rgbToHex = function(css) {
  var b, g, r, rgb;
  rgb = css.match(/^rgb\((\d*).\s(\d*).\s(\d*)/);
  if (_.isNull(rgb)) {
    throw "Not rgb";
  }
  r = parseInt(rgb[1]);
  g = parseInt(rgb[2]);
  b = parseInt(rgb[3]);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

hexToRgb = function(hex) {
  var result, shorthandRegex;
  shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  } else {
    return null;
  }
};

exports.rgbToHex = rgbToHex;

exports.hexToRgb = hexToRgb;

_ = require('lodash')

componentToHex = (c)->
  hex = c.toString(16);
  return if hex.length == 1 then "0#{hex}" else hex;

rgbToHex = (css)->
  rgb = css.match(/^rgb\((\d*).\s(\d*).\s(\d*)/)
  throw "Not rgb" if _.isNull(rgb)
  r = parseInt(rgb[1])
  g = parseInt(rgb[2])
  b = parseInt(rgb[3])
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

hexToRgb = (hex) ->
    ## Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b)->
        return r + r + g + g + b + b;
    )

    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return if result then {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } else null;


exports.rgbToHex = rgbToHex
exports.hexToRgb = hexToRgb

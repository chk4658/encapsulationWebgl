/**
 * hex拆解Rgba
 * @param { string } hex #ccc/#cccccc
 * @param { number } [opacity] 0-1
 * @returns {{a: number, rgba: string, r: number, b: number, g: number}}
 */
const hexToRgba = function (hex, opacity) {
  let UNKNOWN = { r: 204, g: 204, b: 204, a: 1, rgba: "rgba(204, 204, 204, 1)" };
  if (!hex.includes("#")) return UNKNOWN;
  if (!(hex.length === 4 || hex.length === 7)) return UNKNOWN;
  if (hex.length === 4) hex = hex + hex.slice(1, 4);
  const r = parseInt("0x" + hex.slice(1, 3));
  const g = parseInt("0x" + hex.slice(3, 5));
  const b = parseInt("0x" + hex.slice(5, 7));
  const a = opacity || 1;
  return {
    r,
    g,
    b,
    a,
    rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
  };
};

/**
 * 拆解rgba
 * @param { string } rgbaCss rgb(255, 255, 255) / rgba(255, 255, 255, 1)
 * @returns {{a: number, rgba: string, r: number, b: number, g: number}}
 */
const dismantleRgba = function (rgbaCss) {
  let UNKNOWN = { r: 204, g: 204, b: 204, a: 1, rgba: "rgba(204, 204, 204, 1)" };
  if (!rgbaCss.toLowerCase().includes("rgb")) return UNKNOWN;
  const reg = RegExp(/\((.*)\)/);
  const rgbaStr = reg.exec(rgbaCss)[1];
  const rgb = rgbaStr.split(",").map((ele) => parseInt(ele));
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const a = rgb[3] || 1;
  return {
    r,
    g,
    b,
    a,
    rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
  };
};

export { hexToRgba, dismantleRgba };

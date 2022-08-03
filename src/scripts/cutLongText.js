export const cutLongText = (val, max) => {
  if (!val) return ''
  return val.length > max
    ? `${ val.slice(0, max / 2) }...${ val.slice(val.length - max / 2, val.length) }`
    : val
}

function isPhone(val) {
  return val.length > 4 && /^[\d]+$/.test(val);
}
function isEmail(val) {
  // eslint-disable-next-line
  return val.length > 6 && /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(val);
}

export {
  isPhone,
  isEmail
}

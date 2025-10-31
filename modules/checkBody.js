function checkBody(obj, arrayKeys) {

  for (let key of arrayKeys) {
    if (obj[key]== null || String(obj[key]).trim() === "") {
      return false;
    }
  }
  return true;
}

module.exports = {
  checkBody,
};

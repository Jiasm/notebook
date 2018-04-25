Array.prototype.everySync = async function (callback, thisArg) {
  for (let [index, item] of Object.entries(this)) {
    if (!await callback(item, index, this)) return false
  }

  return true
}

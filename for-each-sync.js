Array.prototype.filterSync = async function (callback, thisArg) {
  let filterResult = await Promise.all(this.map(callback))
  // > [true, false, true]

  return this.filter((_, index) => filterResult[index])
}

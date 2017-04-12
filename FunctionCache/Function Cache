function cache(func) {
  var cacheObj = {};
  return function() {
    var a = JSON.stringify(arguments);
    if(!cacheObj.hasOwnProperty(a)) {
      cacheObj[a] = func.apply(func, arguments);
    }
    return cacheObj[a];
  }
}

function createFunctions(n) {
  var fns = [];
  
  var closure = function(v) {
    return function() {
      return v;
    };
  };

  for (var i = 0; i < n; i++) {
    fns.push(closure(i));
  }
  return fns;
}

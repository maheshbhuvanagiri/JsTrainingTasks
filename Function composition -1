function compose(f,g) {
  return function() {
      var idVal = g.apply(this, arguments);
      return f(idVal);
  }
}

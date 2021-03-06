Object.prototype.hash = function(string) {
  var properties = string.split('.'),
      current = this;
  
  while (current && properties.length) {
    current = current[properties.shift()];
  }
  
  return current;
}

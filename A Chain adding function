function add(a){
  // Let the currying begin!
  var sum = a;
  function closure (b){
    sum += b;
    return closure;
  }
  closure.valueOf = function(){ 
    return sum;
  }
  return closure;
}

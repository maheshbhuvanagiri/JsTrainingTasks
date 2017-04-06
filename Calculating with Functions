function number(val){
  return function (func) {
   return func ? func(val) : val;
 }
}

var zero = number(0),
  one = number(1),
  two = number(2),
  three = number(3),
  four = number(4),
  five = number(5),
  six = number(6),
  seven = number(7),
  eight = number(8),
  nine = number(9);

function plus(b) {
  return function(a){return a+b;}
}
function minus(b) {
  return function(a){return a-b;}
}
function times(b) {
  return function(a){return a*b;}
}
function dividedBy(b) {
  return function(a){return a/b;}
}

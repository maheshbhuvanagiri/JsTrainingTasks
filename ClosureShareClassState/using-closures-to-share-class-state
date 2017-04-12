// Let's make a Cat constructor!

var Cat = (function() {
  var allWeights = [];
  
  function Cat(name , weight) {

    if(!name || !weight){
       throw Error("name and weight should have a value");
    }
  
    allWeights.push(weight);

    Object.defineProperty(this, 'weight', {
      get: function() {    
        return weight;
      },
      set: function(value) {
        allWeights.pop(this.weight);
        weight = value;      
      }
    });
  }

  Object.defineProperty(Cat, 'averageWeight', {
    get: function() {
      return function() { 
          var sum = allWeights.reduce((a, b) => a + b, 0);
          return allWeights.length ? (sum / allWeights.length) : 0;
        }
      }
  });
  
  return Cat;
  
})();


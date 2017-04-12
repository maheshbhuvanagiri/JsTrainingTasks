// partition the items array so that all values for which pred returns true are
// at the end, returning the index of the first true value
function partitionOn(pred, items) {
  var falseCollection = items.filter(function(i){ return !pred(i)}),
      truthCollection = items.filter(pred);
   
     items.length = 0; 
     items.push.apply(items,falseCollection.concat(truthCollection));
  
  return falseCollection.length
}

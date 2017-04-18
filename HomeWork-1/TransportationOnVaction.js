function rentalCarCost(d) {
  var dayCost = 40,
      totalCost = (d * dayCost);
  
  if (d >= 7) {
    totalCost -= 50;
  } else if (d >= 3) {
    totalCost -= 20;
  }
  return totalCost;
}

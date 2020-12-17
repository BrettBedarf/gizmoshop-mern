function convertDollarsToCents(num) {
  return num * 100;
}

function convertCentsToDollars(num) {
  return (num / 100).toFixed(2);
}

export { convertDollarsToCents, convertCentsToDollars };

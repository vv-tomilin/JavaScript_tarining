const prices = [15, 54, 53, 89, 3465, 9, 6, 5, 65, 3, 3, 295, 56, 22, 9, 6, 65, 5, 655, 65, 953, 6, 655, 10113];
const prices_2 = [7, 1, 5, 3, 6, 4, 7];
const prices_3 = [7, 6, 4, 3, 1];

const maxProfit = (prices) => {
  let minPrice = prices[0];
  let maxProfit = 0;

  prices.forEach((current) => {
    const profit = current - minPrice;

    if (minPrice > current) {
      minPrice = current;
    }

    if (profit > maxProfit) {
      maxProfit = profit;
    }
  });

  return maxProfit;
};

console.log(maxProfit(prices));
console.log(maxProfit(prices_2));
console.log(maxProfit(prices_3));
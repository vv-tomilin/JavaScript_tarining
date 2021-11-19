//121. Best Time to Buy and Sell Stock

let prices1 = [7, 1, 5, 3, 6, 4]; // 5
let prices2 = [7, 6, 4, 3, 1]; // 0

let maxProfit = function (prices) {
  let result = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      result += prices[i] - prices[i - 1];
    }
  }
  return result;
};
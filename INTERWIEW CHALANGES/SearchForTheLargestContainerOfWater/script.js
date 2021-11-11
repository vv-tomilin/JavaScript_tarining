const input_1 = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const input_2 = [1, 1];
const input_3 = [4, 3, 2, 1, 4];
const input_4 = [1, 2, 1];

const maxArea = (heights) => {
  let maxArea = 0;

  let left = 0;
  let right = heights.length - 1;

  while (left < right) {
    let currentVolume = Math.min(heights[left], heights[right]) * (right - left);

    maxArea = Math.max(maxArea, currentVolume);

    if (heights[left] < heights[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return maxArea;
};

console.log(maxArea(input_1));
console.log(maxArea(input_2));
console.log(maxArea(input_3));
console.log(maxArea(input_4));
export const computePrefixSums = (data: number[]) => {
  const prefixSum = new Array(data.length + 1).fill(0);
  const prefixEvenOdd = new Array(data.length + 1).fill(0);

  for (let i = 0; i < data.length; i++) {
    prefixSum[i + 1] = prefixSum[i] + data[i];
    prefixEvenOdd[i + 1] = prefixEvenOdd[i] + (i % 2 === 0 ? data[i] : -data[i]);
  }

  return { prefixSum, prefixEvenOdd };
};

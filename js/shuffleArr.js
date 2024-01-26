function shuffleArr(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const rndIndex = Math.round(Math.abs(Math.random() * arr.length - i));
    const lastIndex = arr[i];

    arr[i] = arr[rndIndex];
    arr[rndIndex] = lastIndex;
  }

  return arr;
}
export default shuffleArr;

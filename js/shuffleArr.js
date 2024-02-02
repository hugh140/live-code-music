function shuffleArr(arr) {
  const shuffle = [...arr];
  for (let i = shuffle.length - 1; i >= 0; i--) {
    const rndIndex = Math.round(Math.random() * (shuffle.length - i - 1));
    const lastIndex = shuffle[i];

    shuffle[i] = shuffle[rndIndex];
    shuffle[rndIndex] = lastIndex;
  }

  return shuffle;
}
export default shuffleArr;

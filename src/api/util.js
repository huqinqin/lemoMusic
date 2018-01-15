function getMinMax(min,max) {
    return Math.floor(Math.random()*(max - min +1) + min);
}
export function shuffle(arr) {
  for(let i = 0;i<arr.length;i++){
     let j = getMinMax(0,i);
     let t ;
     t = arr[j];
     arr[j] = arr[i];
     arr[i] = t;
  }
  return arr;
}

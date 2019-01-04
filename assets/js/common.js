export function dedupe(array) {
    return Array.from(new Set(array));
}
// 组合数组给 select-ee【1，2，3，4】
export function selectEeArr(array) {
  var arr = [];
  array.forEach((v, k) => {
    arr.push(
      {
        title: v,
        value: v
      }
    )
  })
  return arr;
}

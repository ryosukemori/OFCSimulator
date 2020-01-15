
/**
 * 重複しない乱数生成
 * @param min: 最小値
 * @param max: 最大値
 * @param number: 個数
 */
export const notDuplicateRandom = (min: number, max: number, n: number): number[] => {
  const randoms = [];

  // 個数が乱数パターン個数以下だった場合はエラー
  if (max - min + 1 < n) {
    throw new Error('指定個数分の乱数がない');
  }

  while (randoms.length < n) {
    const random = Math.floor(Math.random() * (max + 1 - min)) + min;
    if (randoms.indexOf(random) === -1) {
      randoms.push(random);
    }
  }
  return randoms;
};

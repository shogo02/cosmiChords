class Util {
  // ランダム数値を返す
  public static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // 配列を渡すとランダムな要素を返す関数
  public static getRandomArrayElement<T>(array: T[]): T {
    return array[Util.getRandomInt(0, array.length - 1)]
  }
}

export default Util

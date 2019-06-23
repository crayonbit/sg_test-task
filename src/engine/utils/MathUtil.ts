export default class MathUtil {

  static getRandomInt(range:number) {
    return Math.round(Math.random() * range);
  }

  static getRandomRangeInt(min:number, max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
}
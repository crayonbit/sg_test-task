import * as PIXI from 'pixi.js';
export default interface IFlatButtonStates<T extends PIXI.DisplayObject> {
  out: T;
  over: T;
  down: T;
  up: T;
  disabled: T;
}
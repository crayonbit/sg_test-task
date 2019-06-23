import IModel from "./IModel";
import IView from "./IView";

export default interface IController {
  model:IModel;
  view:IView;
  initialize():void;
  update(dt:number):void;
  start():void; // start all tweens and animations
  stop():void; // stop all tweens and animations
  
}
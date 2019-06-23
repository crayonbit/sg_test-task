import IModel from './mvc/IModel';
import View from '../../display/View';
import IController from './mvc/IController';

export default interface IScene {

  initialized:boolean;
  
  model:IModel;
  view:View;
  controller:IController;

  initialize():void;
  update(dt:number):void;
  start():void; // start all tweens and animations
  stop():void; // stop all tweens and animations

}
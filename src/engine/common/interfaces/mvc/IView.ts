import Container from '../../../display/Container';
export default interface IView {
  initialize(resources: any):void;
  update(dt:number):void;
  start():void; // start all tweens and animations
  stop():void; // stop all tweens and animations
}
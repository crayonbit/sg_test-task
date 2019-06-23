import IScene from '../../../engine/common/interfaces/IScene';
import FireModel from './model/FireModel';
import FireView from './view/FireView';
import FireController from './controller/FireController';
import { Settings } from '../../Settings';

//import img from '../../images';

export default class MenuScene implements IScene {

  public initialized:boolean;

  public model:FireModel;
  public view:FireView;
  public controller:FireController;

  constructor(resources: any, settings:Settings) {
    this.model = new FireModel(resources, settings);
    this.view = new FireView();
    this.controller = new FireController(this.model, this.view);
  }

  public initialize():void {
    this.controller.initialize();
  }

  public update(dt:number):void {
    this.controller.update(dt);
  }

  public start():void {
    this.controller.start();
  }

  public stop():void {
    this.controller.stop();
  }

}
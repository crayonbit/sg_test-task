import IScene from '../../../engine/common/interfaces/IScene';
import MixerModel from './model/MixerModel';
import MixerView from './view/MixerView';
import MixerController from './controller/MixerController';
import { Settings } from '../../Settings';

//import img from '../../images';

export default class MenuScene implements IScene {

  public initialized:boolean;

  public model:MixerModel;
  public view:MixerView;
  public controller:MixerController;

  constructor(resources: any, settings:Settings) {
    this.model = new MixerModel(resources, settings);
    this.view = new MixerView();
    this.controller = new MixerController(this.model, this.view);
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
//import * as PIXI from 'pixi.js';
//import Container from "../../../engine/display/Container";
//import {TweenMax} from 'gsap';
import IScene from '../../../engine/common/interfaces/IScene';

import StackModel from './model/StackModel';
import StackView from './view/StackView';
import StackController from './controller/StackController';
import { Settings } from '../../Settings';

//import img from '../../images';

export default class MenuScene implements IScene {

  public initialized:boolean;

  public model:StackModel;
  public view:StackView;
  public controller:StackController;

  constructor(resources: any, settings:Settings) {
    this.model = new StackModel(resources, settings);
    this.view = new StackView();
    this.controller = new StackController(this.model, this.view);
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
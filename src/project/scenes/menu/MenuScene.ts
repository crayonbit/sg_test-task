//import * as PIXI from 'pixi.js';
//import Container from "../../../engine/display/Container";
//import {TweenMax} from 'gsap';
import Scene from '../../../engine/common/Scene';

import MenuModel from './model/MenuModel';
import MenuView from './view/MenuView';
import MenuController from './controller/MenuController';
import { Settings } from '../../Settings';

//import img from '../../images';

export default class MenuScene extends Scene {

  public model:MenuModel;
  public view:MenuView;
  public controller:MenuController;

  constructor(resources: any, settings:Settings) {
    super();

    this.model = new MenuModel(resources, settings);
    this.view = new MenuView();
    this.controller = new MenuController(this.model, this.view);
  }

  public initialize():void {
    this.controller.initialize();
    super.initialize();
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
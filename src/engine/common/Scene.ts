//import * as PIXI from 'pixi.js';
//import Container from "../../../engine/display/Container";
//import {TweenMax} from 'gsap';
import IScene from '../../engine/common/interfaces/IScene';

import IModel from './interfaces/mvc/IModel';
import View from '../display/View';
import IController from './interfaces/mvc/IController';

//import img from '../../images';

export default class Scene implements IScene {

  public initialized:boolean = false;

  public model:IModel;
  public view:View;
  public controller:IController;

  constructor() {
    
  }

  public initialize():void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
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
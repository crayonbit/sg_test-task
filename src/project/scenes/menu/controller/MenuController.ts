import IController from "../../../../engine/common/interfaces/mvc/IController";
import MenuModel from "../model/MenuModel";
import MenuView from "../view/MenuView";
import FlatButton from "../../../../engine/display/buttons/flat/FlatButton";
import TextField from "../../../../engine/display/TextField";
import { Graphics } from "pixi.js";
import SceneManager from '../../../../engine/common/SceneManager';
import { SceneID } from '../../../Settings';
import Fullscreen from '../../../../engine/common/Fullscreen';
import DeviceUtil from "../../../../engine/utils/DeviceUtil";

export default class MenuController implements IController {

  public model:MenuModel;
  public view:MenuView;

  constructor(model:MenuModel, view:MenuView) {
    this.model = model;
    this.view = view;
  }
  
  public initialize():void {
    this.view.initialize(this.model);
    this.addListeners();
  }

  private addListeners():void {
    this.view.buttons.forEach((button:FlatButton<TextField, Graphics>) => {
      button.on('pointerdown', () => {
        this.handleClick(button.name);
        if (DeviceUtil.isMobile()) {
          button.on('pointerup', () => Fullscreen.openFullscreen());
        }
      });
    });
  }

  private handleClick(buttonName:string|null):void {
    switch(buttonName) {
      case 'stacks':
        SceneManager.getInstance().switchScene(SceneID.STACK_SCENE);
      break;
      case 'mixed':
        SceneManager.getInstance().switchScene(SceneID.MIXER_SCENE);
      break;
      case 'fire':
        SceneManager.getInstance().switchScene(SceneID.FIRE_SCENE);
      break;
    }
  }

  public update(dt:number):void {
    this.view.update(dt);
  }

  public start():void {
    this.view.start();
  }

  public stop():void {
    this.view.stop();
  }

}
import IController from "../../../../engine/common/interfaces/mvc/IController";
import MixerModel from "../model/MixerModel";
import MixerView from "../view/MixerView";
import SceneManager from '../../../../engine/common/SceneManager';
import { SceneID } from '../../../Settings';

export default class MixerController implements IController {

  public model:MixerModel;
  public view:MixerView;

  constructor(model:MixerModel, view:MixerView) {
    this.model = model;
    this.view = view;
  }
  
  public initialize():void {
    this.view.initialize(this.model.resources);
  }

  private onBackClicked():void {
    SceneManager.getInstance().switchScene(SceneID.MENU_SCENE);
  }

  public update(dt:number):void {
    this.view.update(dt);
  }

  public start():void {
    this.view.start();
    this.view.panelView.backButton.visible = true;
    this.view.panelView.backButton.once('pointerdown', this.onBackClicked.bind(this));
  }

  public stop():void {
    this.view.stop();
  }

}
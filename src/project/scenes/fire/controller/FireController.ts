import IController from "../../../../engine/common/interfaces/mvc/IController";
import IView from "../../../../engine/common/interfaces/mvc/IView";
import FireModel from "../model/FireModel";
import FireView from "../view/FireView";
import SceneManager from '../../../../engine/common/SceneManager';
import { SceneID } from '../../../Settings';

export default class FireController implements IController {

  public model:FireModel;
  public view:FireView;

  constructor(model:FireModel, view:FireView) {
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
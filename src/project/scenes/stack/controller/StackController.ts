import IController from "../../../../engine/common/interfaces/mvc/IController";
import IView from "../../../../engine/common/interfaces/mvc/IView";
import StackModel from "../model/StackModel";
import StackView from "../view/StackView";
import SceneManager from '../../../../engine/common/SceneManager';
import { SceneID } from '../../../Settings';

export default class StackController implements IController {

  public model:StackModel;
  public view:StackView;

  constructor(model:StackModel, view:StackView) {
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
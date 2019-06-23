import View from "../../../../engine/display/View";
import * as PIXI from "pixi.js";
import TextField from "../../../../engine/display/TextField";
import TextStyle from "../../../../engine/display/TextStyle";
import Graphics from "../../../../engine/display/Graphics";
import IFlatButtonStates from "../../../../engine/display/buttons/flat/IFlatButtonStates";
import FlatButton from "../../../../engine/display/buttons/flat/FlatButton";
import MenuModel from '../model/MenuModel';
import PanelView from '../../shared/PanelView';
import {TweenMax} from 'gsap';
import { Settings } from "../../../Settings";

export default class MenuView extends View {

  public buttons:FlatButton<TextField,Graphics>[];
  public panelView:PanelView;
  private initialized:boolean = false;

  constructor() {
    super();
  }

  public initialize(model:MenuModel):void {
    this.panelView = PanelView.getInstance();
    this.panelView.backButton.visible = false;
    this.addChildAt(this.panelView, 0);

    if (this.initialized) {
      return;
    }

    const settings = model.settings;

    this.createTitle('Test Task', 80, settings.designWidth / 2, 200);
    this.createTitle('Dmytro Lobach', 50, settings.designWidth / 2, 300);
    this.buttons = this.createButtons(settings.designWidth / 2, 500, 0, 140);

    this.initialized = true;
  }

  private createTitle(text:string, fontSize:number, posX:number, posY:number) {
    const title:TextField = new TextField(text);
    title.anchor.set(.5, .5);
    title.x = posX;
    title.y = posY;
    title.style.fontSize = fontSize;
    title.style.fill = 0xffffff;
    this.addChild(title);
  }

  private createButtons(startX:number, startY:number, biasX:number, biasY:number):FlatButton<TextField,Graphics>[] {
    const buttons:FlatButton<TextField,Graphics>[] = [];
    ['Stacks', 'Mixed', 'Fire'].forEach((buttonText:string, i:number) => {
      const button:FlatButton<TextField, Graphics> = this.createFlatButton(`${i+1}. ${buttonText}`, 280, 100);
      button.name = buttonText.toLowerCase();
      button.position.set(startX + i * biasX, startY + i * biasY);
      buttons.push(button);
    });
    return buttons;
  }

  private createFlatButton(text:string, width:number = 180, height:number = 50, radius:number = 6):FlatButton<TextField, Graphics> {
    const flatButton:FlatButton<TextField, Graphics> = new FlatButton<TextField, Graphics>(
      new PIXI.Rectangle(-width/2, -height/2, width, height),
      this.createButtonLabels(text),
      this.createButtonBackgrounds(width, height, radius)
    );
    flatButton.position.set(100, 100);
    this.addChild(flatButton);
    return flatButton;
  }

  private createButtonBackgrounds(width:number, height:number, radius:number):IFlatButtonStates<Graphics> {
    const out:Graphics = new Graphics();
    out.beginFill(0x337ab7);
    out.drawRoundedRect(-width/2, -height/2, width, height, radius);

    const down:Graphics = new Graphics();
    down.beginFill(0x337ab7);
    down.drawRoundedRect(-width/2, -height/2 + 1, width, height, radius);

    const over:Graphics = new Graphics();
    over.beginFill(0x216096);
    over.drawRoundedRect(-width/2, -height/2, width, height, radius);

    return {
      out,
      over,
      down,
      up: over,
      disabled: out
    };
  }

  private createButtonLabels(text: string):IFlatButtonStates<TextField> {
    const out:TextField = new TextField(text);
    out.anchor.set(.5, .5);
    out.style.fontSize = 28;
    out.style.fill = 0xffffff;

    return {
      out,
      over: out,
      down: out,
      up: out,
      disabled: out
    };
  }

  public start():void {
  }

  public update(dt:number):void {
    super.update(dt);
  }
}
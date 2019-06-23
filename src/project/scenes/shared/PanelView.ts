import View from "../../../engine/display/View";
import * as PIXI from "pixi.js";
import TextField from "../../../engine/display/TextField";
import Graphics from "../../../engine/display/Graphics";
import IFlatButtonStates from "../../../engine/display/buttons/flat/IFlatButtonStates";
import FlatButton from "../../../engine/display/buttons/flat/FlatButton";
import Fullscreen from "../../../engine/common/Fullscreen";
import DeviceUtil from "../../../engine/utils/DeviceUtil";
import Project from "../../Project";

export default class PanelView extends View {

  private static instance:PanelView;
  public backButton:FlatButton<TextField, Graphics>;
  public fullscreenButton:FlatButton<TextField, Graphics>;

  private constructor() {
    super();
  }

  static getInstance() {
      if (!PanelView.instance) {
        PanelView.instance = new PanelView();
        PanelView.instance.initialize();
      }
      return PanelView.instance;
  }

  public initialize():void {
    if (DeviceUtil.isMobile()) {

      const background:Graphics = new Graphics();
      background.beginFill(0x111112);
      background.drawRect(0,0,1920,1080);
      background.interactive = true;
      this.addChild(background);

      background.on('pointerup', () => Fullscreen.openFullscreen());
    } else {
      this.fullscreenButton = this.createFlatButton('Fullscreen', 180, 100);
      this.fullscreenButton.name = 'fullscreen';
      this.fullscreenButton.position.set(1790, 980);
      
      this.fullscreenButton.on('pointerdown', () => {
        if (!Fullscreen.isInFullscreen()) {
          Fullscreen.openFullscreen();
        } else {
          Fullscreen.closeFullscreen();
        }
      });
    }

    this.backButton = this.createFlatButton('Back', 100, 100);
    this.backButton.name = 'back';
    this.backButton.position.set(100, 980);
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

  public update(dt:number):void {
    super.update(dt);
  }
}
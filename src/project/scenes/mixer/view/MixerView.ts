import View from "../../../../engine/display/View";
import PanelView from '../../shared/PanelView';
import * as PIXI from 'pixi.js';
import particles = require('pixi-particles');
import Container from "../../../../engine/display/Container";
import MixerTool from "../../../items/MixerTool";
import MathUtil from "../../../../engine/utils/MathUtil";
import TextField from "../../../../engine/display/TextField";

interface LooseObject {
  [key: string]: any
}

export default class MixerView extends View {

  public panelView:PanelView;
  private initialized:boolean = false;
  private started:boolean = false;
  private interval:any;
  private mixer:MixerTool;

  constructor() {
    super();
  }

  public initialize(resources: any):void {
    this.panelView = PanelView.getInstance();
    this.panelView.backButton.visible = true;
    this.addChildAt(this.panelView, 0);

    if (this.initialized) {
      return;
    }

    this.createTitle('2. Mixed Text and Sprites', 40, 960, 50);

    this.mixer = new MixerTool();
    this.mixer.position.set(200, 560);
    this.addChild(this.mixer);

    this.mixer.addTexts(['Nice to meet you!', 'Have a good day!', 'awesome...', 'SOFTGAMES']);
    this.mixer.addTextures(this.getTexturesByType('emo', resources));

    this.initialized = true;
  }

  private getTexturesByType(type:string, resources:any):PIXI.Texture[] {
    return Object.entries(resources)
    .filter(([name, resource]) => name.includes(type))
    .map((arr:LooseObject) => {
      return arr[1].texture;
    });
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

  public update(dt:number):void {

  }

  public start():void {
    this.mixer.showMixedElements(3, MathUtil.getRandomRangeInt(40, 60), 2);
    this.interval = setInterval(() => {
      this.mixer.showMixedElements(3, MathUtil.getRandomRangeInt(30, 60), 2);
    }, 2000);

    this.started = true;
  }

  public stop():void {
    clearInterval(this.interval);
    this.mixer.reset();
  }

}
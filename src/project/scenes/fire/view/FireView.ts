import View from "../../../../engine/display/View";
import PanelView from '../../shared/PanelView';
import * as PIXI from 'pixi.js';
import particles = require('pixi-particles');
import Container from "../../../../engine/display/Container";
import TextField from "../../../../engine/display/TextField";

interface LooseObject {
  [key: string]: any
}

export default class FireView extends View {

  public panelView:PanelView;
  private initialized:boolean = false;
  private started:boolean = false;

  private emitter:particles.Emitter;
  private particlesContainer:Container;

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

    this.createTitle('3. Fire', 40, 960, 50);

    this.particlesContainer = new Container();
    this.addChild(this.particlesContainer);

    const textures:PIXI.Texture[] = Object.entries(resources)
      .filter(([name, resource]) => name.includes('fire'))
      .map((arr:LooseObject) => {
        return arr[1].texture;
      });

    this.emitter = new particles.Emitter(
      this.particlesContainer,
      [...textures],
      {
        "alpha": {
          "start": 0.62,
          "end": 0
        },
        "scale": {
          "start": 0.6,
          "end": 2.75
        },
        "color": {
          "start": "ffea5d",
          "end": "ff4f12"
        },
        "speed": {
          "start": 500,
          "end": 500
        },
        "startRotation": {
          "min": 265,
          "max": 275
        },
        "rotationSpeed": {
          "min": 50,
          "max": 50
        },
        "lifetime": {
          "min": 0.1,
          "max": 0.35
        },
        "blendMode": "normal",
        "frequency": 0.002,
        "emitterLifetime": 0,
        "maxParticles": 10,
        "pos": {
          "x": 960,
          "y": 540
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
          "x": 0,
          "y": 0,
          "r": 7
        }
      }
    );

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

  public update(dt:number):void {
    if (!this.started) {
      return;
    }
    const dtSec:number = dt * 1000 / 60;
    this.emitter.update(dtSec * 0.001);
  }

  public start():void {
    

    // Start emitting
    this.emitter.emit = true;
    this.started = true;
  }

  public stop():void {
    this.emitter.emit = false;
    this.started = false;
  }

}
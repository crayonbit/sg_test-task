import * as PIXI from 'pixi.js';
import ISettings from './common/interfaces/ISettings';
import { Settings } from '../project/Settings';
import * as Stats from 'stats.js';

export default class Core {

  private app: PIXI.Application;
  private ticker: PIXI.Ticker;
  private _settings: Settings;
  private _fps:Stats;

  constructor(settings: ISettings) {
    this._settings = settings;

    this.app = new PIXI.Application(
      settings.designWidth, settings.designHeight,
      { antialias: true, backgroundColor: 0x1099bb, autoResize: true }
    );
    //let canvasBox = document.createElement('div');
    //canvasBox.classList.add('canvas-box');
    document.body.appendChild(this.app.view);
    //npmcanvasBox.appendChild(this.app.view);

    this.ticker = PIXI.Ticker.shared;
    this.ticker.autoStart = true;

    this.createFPSCounter();

    // Listen for window resize events
    this.app.renderer.resize(settings.designWidth, settings.designHeight);
    window.onload = () => {
      window.addEventListener('resize', this.resize.bind(this));
      setTimeout(() => {
        this.resize();
      }, 1000);
    }
    this.resize();
  }

  private createFPSCounter():void {
    this._fps = new Stats();
    this._fps.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this._fps.dom);
  }

  private resize():void {
    const ratio = this._settings.designWidth / this._settings.designHeight,
        screenWidth = document.documentElement.clientWidth,
        screenHeight = document.documentElement.clientHeight;
    if (screenWidth / screenHeight >= ratio) {
      var w = screenHeight * ratio;
      var h = screenHeight;
    } else {
      var w = screenWidth;
      var h = screenWidth / ratio;
    }
    
    //console.error('resize', screenWidth, screenHeight, w, h);

    const canvas = this.app.renderer.view;
    canvas.style.display = 'block';
    canvas.style.position = 'absolute';
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = `translate(${-w/2}px, ${-h/2}px)`;
    
    //this.app.renderer.resize(w, h);
  }

  get stage():PIXI.Container {
    return this.app.stage;
  }

  get settings():Settings {
    return this._settings;
  }

  get fps():Stats {
    return this._fps;
  }

  public addMainUpdater(updater: (dt: number) => void) {
    this.ticker.add(updater);
  }

}
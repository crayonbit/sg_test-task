import IScene from './interfaces/IScene';
import * as PIXI from 'pixi.js';
import Container from '../display/Container';
import {TweenMax} from 'gsap';

export default class SceneManager {

  private static instance: SceneManager;

  private stage:PIXI.Container;
  private scenes:IScene[];
  private _currentScene:IScene;

  private constructor() {
    this.scenes = [];
  }

  static getInstance() {
      if (!SceneManager.instance) {
        SceneManager.instance = new SceneManager();
      } else {
        if (!SceneManager.instance.stage) {
          throw new Error('You must initialize first!');
        }
      }
      return SceneManager.instance;
  }

  public initialize(stage:PIXI.Container):SceneManager {
    this.stage = stage;
    return this;
  }

  public add(sceneID:number, scene:IScene):SceneManager {
    this.scenes[sceneID] = scene;
    return this;
  }

  public async switchScene(sceneID: number) {

    this.stopCurrentScene();
    await this.fadeScene(this._currentScene, 0);
    this.removeCurrentScene();
    this.initializeNewScene(this.scenes[sceneID]);
    await this.fadeScene(this.scenes[sceneID], 1);
    
    this.startCurrentScene();
  }

  private initializeNewScene(scene:IScene):void {
    this.stage.addChild<Container>(scene.view);
    scene.view.alpha = 0;
    scene.initialize();
    this._currentScene = scene;
  }

  private removeCurrentScene():void {
    this._currentScene && this.stage.removeChild(this._currentScene.view);
  }

  private stopCurrentScene():void {
    this._currentScene && this._currentScene.stop();
  }

  private startCurrentScene():void {
    this._currentScene && this._currentScene.start();
  }

  private fadeScene(scene:IScene, alpha:number) {
    if (scene) {
      return new Promise(resolve => {
        TweenMax.to(scene.view, 0.2, {alpha}).eventCallback('onComplete', resolve);
      });
    }
  }

  public updateCurrentScene(dt: number):void {
    this._currentScene.update(dt);
  }

  public get currentScene():IScene {
    return this._currentScene;
  }

}
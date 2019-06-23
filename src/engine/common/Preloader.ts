import * as PIXI from 'pixi.js';
import IResources from './interfaces/IResources';
import IResource from './interfaces/IResource';

export default class Preloader {

  private loader: PIXI.Loader;

  constructor() {
    this.loader = new PIXI.Loader();
  }

  public async load(resources: IResources) {
      // Load assets
      return new Promise(resolve => {
        this.loader.add(resources.getImages())
          .load((loader: PIXI.Loader, resources: IResource[]) => {
            resolve(resources);
          });
        }
      );
  }
}
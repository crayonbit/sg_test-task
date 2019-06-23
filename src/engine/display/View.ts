import Container from './Container';
import IView from '../common/interfaces/mvc/IView';

export default class View extends Container implements IView {
  
  constructor() {
    super();
  }

  public initialize(resources: any):void {

  }

  public update(dt:number):void {

  };

  public start():void {
    
  }

  public stop():void {

  }

}
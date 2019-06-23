import * as PIXI from 'pixi.js';
import Container from '../../Container';
import Graphics from '../../Graphics';
import IFlatButtonStates from './IFlatButtonStates';

type State = 'out' | 'over' | 'down' | 'up' | 'disabled';

export default class FlatButton<T extends PIXI.DisplayObject, B extends PIXI.DisplayObject> extends Container {

  private labels:IFlatButtonStates<T>;
  private backgrounds:IFlatButtonStates<B>;
  private listOfStates:State[] = ['out', 'over', 'down', 'up', 'disabled'];
  private currentState:State;

  constructor(hitArea:PIXI.Rectangle, labels:IFlatButtonStates<T>, backgrounds:IFlatButtonStates<B>) {
    super();

    this.labels = labels;
    this.backgrounds = backgrounds;
    this.hitArea = hitArea;

    this.initializeListeners();
    this.changeState('out'); // default state
    this.enable(true);
  }

  private initializeListeners():void {
    this.listOfStates.forEach((state: State) => {
      if (state === 'disabled') {
        return;
      }
      this.on(`pointer${state}`, () => this.changeState(state));
    });
  }

  public enable(bool: boolean):void {
    this.interactive = bool;
    this.buttonMode = bool;
    if (!bool) {
      this.disable();
    }
  }

  private disable() {
    this.changeState('disabled');
  }

  private changeState(newState: State) {
    if (this.currentState === newState) {
      return;
    }
    this.listOfStates.forEach((state: State) => {
      this.backgrounds[state].visible = false,
      this.labels[state].visible = false;
    });

    this.addChild(this.backgrounds[newState]);
    this.backgrounds[newState].visible = true;

    this.addChild(this.labels[newState]);
    this.labels[newState].visible = true;

    this.currentState = newState;
  }

}
import View from "../../../../engine/display/View";
import Sprite from "../../../../engine/display/Sprite";
import Point from "../../../../engine/geom/Point";
import PanelView from '../../shared/PanelView';
import {TweenMax, Linear} from 'gsap';
import ParticleContainer from "../../../../engine/display/PatricleContainer";
import TextField from "../../../../engine/display/TextField";

interface LooseObject {
  [key: string]: any
}

export default class StackView extends View {

  public panelView:PanelView;
  private cards:Sprite[] = [];
  private initialized:boolean = false;

  private startPos:Point = new Point(760, 900);
  private endPos:Point = new Point(1160, 900);
  private cardsBiasY:number = -5;
  private animDelay:number = 1;
  private animDuration:number = 2;
  private particleContainer:ParticleContainer;
  
  constructor() {
    super();
  }

  public initialize(resources: any):void {
    this.panelView = PanelView.getInstance();
    this.panelView.backButton.visible = true;
    this.addChildAt(this.panelView, 0);

    if (!this.initialized) {
      const cardsTextures:PIXI.Texture[] = Object.entries(resources)
      .filter(([name, resource]) => name.includes('card'))
      .map((arr:LooseObject) => {
        return arr[1].texture;
      });
      // we use ParticleContainer to get the maximum performance
      this.particleContainer = new ParticleContainer(144, {position:true, rotation:true});
      this.addChild(this.particleContainer as any);
      this.cards = this.createCards(cardsTextures);

      this.createTitle('1. Stacks', 60, 960, 60);
    }
    this.initialized = true;
    this.resetCardsPositions();
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

  private createCards(cardsTextures:PIXI.Texture[]):Sprite[] {
    const randomIndex:number = Math.round(Math.random() * (cardsTextures.length - 1));
    const texture:PIXI.Texture = cardsTextures[randomIndex];

    const cards:Sprite[] = new Array(144).fill(null).map(() => {  
      const sprite:Sprite = new Sprite(texture);
      sprite.anchor.set(.5, .5);
      sprite.scale.set(1.5, 1.5);
      sprite.rotation = Math.PI / 2;
      this.particleContainer.addChild(sprite);
      return sprite;
    });
    return cards;
  }

  private resetCardsPositions():void {
    this.particleContainer.children.length = 0;
    this.cards.forEach((card:Sprite, i:number) => {
      card.position.set(this.startPos.x, this.startPos.y + i * this.cardsBiasY);
      this.particleContainer.addChild(card);
    });
  }

  private startStackAnimation(startPos:Point, endPos:Point, biasY:number, duration:number, delay:number) {
    this.cards.forEach((card:Sprite, i:number) => {
      const rev_i:number = this.cards.length - i - 1;
      card.position.set(startPos.x, startPos.y + i * biasY);
      TweenMax.to(card.position, duration, {x: endPos.x, y: endPos.y + rev_i * biasY, ease:Linear.easeNone})
        .delay(rev_i*delay)
        .eventCallback('onStart', () => this.particleContainer.addChild(card));
    });
  }

  public update(dt:Number):void {
    
  }

  public start():void {
    this.startStackAnimation(this.startPos, this.endPos, this.cardsBiasY, this.animDuration, this.animDelay);
  }

  public stop():void {
    TweenMax.killAll();
  }

}
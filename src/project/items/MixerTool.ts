import Container from "../../engine/display/Container";
import * as PIXI from "pixi.js";
import TextField from "../../engine/display/TextField";
import MathUtil from "../../engine/utils/MathUtil";
import Sprite from "../../engine/display/Sprite";

export default class MixerTool extends Container {

  private texts:string[] = [];
  private textSequence:string[] = []; // in case of multiple words in one string
  private textures:PIXI.Texture[] = [];
  private textFieldsPool:TextField[] = [];
  private spritesPool:Sprite[] = [];
  private mixedElements:(TextField|Sprite)[] = [];
  private showCount:number;
  private uniqueTexts:string[] = [];

  constructor() {
    super();
  }

  public addTexts(texts:string[]):void {
    this.texts.push(...texts);
  }

  public addTextures(textures:PIXI.Texture[]):void {
    this.textures.push(...textures);
  }

  public showMixedElements(showCount:number, fontSize:number, spaceX:number, texts?:string[], textures?:PIXI.Texture[]):void {
    this.showCount = showCount;
    texts && this.addTexts(texts);
    textures && this.addTextures(textures);
    
    this.reset();

    this.uniqueTexts.push(...this.texts);

    // we need to have at least one textFeild in the pool 
    // to get to know the height of the generated string
    let textField:TextField = this.createTextField(this.texts[0] || 'Dummy', fontSize);
    this.textFieldsPool.push(textField);

    spaceX *= fontSize / 14; // scaling bias X to font size

    const totalHeight:number = textField.height;

    while (this.showCount >= 0 || this.textSequence.length > 0) {
      let isText:boolean = Math.random() < .5,
        prevElement:TextField|Sprite = this.tryGetPrevElement(this.mixedElements),
        nextX:number = prevElement ? prevElement.x + prevElement.width + spaceX : 0;
      
      if (isText) {
        let text = this.generateRandomText(); // generate or get from pool
        if (text) {
          textField = this.createTextField(text, fontSize);
          textField.position.x = nextX;
          this.addChild(textField);
          this.mixedElements.push(textField);
        } else {
          isText = false;
        }
      }

      if (!isText) {
        const sprite:Sprite = this.generateRandomSprite();
        sprite.height = totalHeight;
        sprite.scale.x = sprite.scale.y; // scale the sprite uniformly after applying new height
        sprite.position.x = nextX;
        this.addChild(sprite);
        this.mixedElements.push(sprite);
      }

      this.showCount--;
    }
  }

  public reset():void {
    while (this.mixedElements.length > 0) {
      const element:any = this.mixedElements.pop();
      if (this.children.includes(element)) {
        this.removeChild(element);
      }
      // return elements to pool
      if (element instanceof TextField) {
        if (!this.textFieldsPool.includes(element)) {
          this.textFieldsPool.push(element);
        }
      } else {
        if (!this.spritesPool.includes(element)) {
          this.spritesPool.push(element);
        }
      }
    }
    this.textSequence.length = 0;
    this.uniqueTexts.length = 0;
  }

  //----------------------------------------------------------
  // PRIVATE -------------------------------------------------
  //----------------------------------------------------------

  private tryGetPrevElement(elements:(TextField|Sprite)[]):TextField|Sprite {
    return elements[elements.length - 1];
  }

  private generateRandomText():string {
    let text:string;
    if (this.textSequence.length > 0) {
      text = this.textSequence.shift() as string; // get next text to show
    } else {
      const textIndex = MathUtil.getRandomInt(this.uniqueTexts.length - 1);
      text = this.uniqueTexts.splice(textIndex, 1)[0];
      
      if (text && text.includes(' ')) {
        const textSplit:string[] = text.split(' ');
        text = textSplit[0];
        this.showCount += textSplit.length - 1;
        this.textSequence.push(...textSplit.slice(1));
      }
    }
    return text;
  }

  private generateRandomTextField(fontSize:number):TextField {
    let text:string;
    if (this.textSequence.length > 0) {
      text = this.textSequence.shift() as string; // get next text to show
    } else {
      const textIndex = MathUtil.getRandomInt(this.uniqueTexts.length - 1);
      text = this.uniqueTexts.splice(textIndex, 1)[0];
      
      if (text.includes(' ')) {
        const textSplit:string[] = text.split(' ');
        text = textSplit[0];
        console.error(text);
        this.showCount += textSplit.length - 1;
        console.error(text, textSplit.slice(1));
        this.textSequence.push(...textSplit.slice(1));
      }
    }
    console.error('CURRENT TEXT', text);
    return this.createTextField(text, fontSize);
  }

  private createTextField(text:string, fontSize:number):TextField {
    let textField:TextField = this.textFieldsPool.pop() as TextField;
    if (!textField) {
      textField = new TextField(text, {fontSize});
      textField.style.fill = 0xffffff;
      textField.anchor.set(0, 1);
    } else {
      textField.text = text;
      textField.style.fontSize = fontSize;
    }
    return textField;
  }

  private generateRandomSprite():Sprite {
    const texture:PIXI.Texture = this.textures[MathUtil.getRandomInt(this.textures.length - 1)];
    return this.createSprite(texture);
  }

  private createSprite(texture:PIXI.Texture):Sprite {
    let sprite:Sprite = this.spritesPool.pop() as Sprite;
    if (!sprite) {
      sprite = new Sprite(texture);
      sprite.anchor.set(0, 1);
    } else {
      sprite.texture = texture;
    }
    return sprite;
  }

}
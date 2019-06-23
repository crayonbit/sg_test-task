import * as PIXI from 'pixi.js';

export default class TextField extends PIXI.Text {
    constructor(text: string, style?:any) {
        super(text, style);
    }
}
import * as PIXI from 'pixi.js';

export default class Sprite extends PIXI.Sprite {
    constructor(texture?: PIXI.Texture) {
        super(texture);
    }
}
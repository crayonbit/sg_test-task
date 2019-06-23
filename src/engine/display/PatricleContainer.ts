import * as PIXI from 'pixi.js';

export default class ParticleContainer extends PIXI.ParticleContainer {
    constructor(maxSize?:number, properties?:any) {
        super(maxSize, properties);
    }
}
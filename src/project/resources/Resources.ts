import IResources from "../../engine/common/interfaces/IResources";
import IResource from "../../engine/common/interfaces/IResource";

export default class Resources implements IResources {
  
  getImages():IResource[] {
    return [
      {
        name: 'card_0', 
        url: 'images/cards/a_s.png',
        crossOrigin: ''
      },
      {
        name: 'card_1', 
        url: 'images/cards/k_h.png',
        crossOrigin: ''
      },
      {
        name: 'card_2', 
        url: 'images/cards/k_s.png',
        crossOrigin: ''
      },
      {
        name: 'card_3', 
        url: 'images/cards/q_d.png',
        crossOrigin: ''
      },
      {
        name: 'fire_0', 
        url: 'images/particles/fire_0.png',
        crossOrigin: ''
      },
      {
        name: 'fire_1', 
        url: 'images/particles/fire_1.png',
        crossOrigin: ''
      },
      {
        name: 'emo_1', 
        url: 'images/emoji/emo_1.png',
        crossOrigin: ''
      },
      {
        name: 'emo_2', 
        url: 'images/emoji/emo_2.png',
        crossOrigin: ''
      },
      {
        name: 'emo_3', 
        url: 'images/emoji/emo_3.png',
        crossOrigin: ''
      },
      {
        name: 'emo_4', 
        url: 'images/emoji/emo_4.png',
        crossOrigin: ''
      },
      {
        name: 'emo_5', 
        url: 'images/emoji/emo_5.png',
        crossOrigin: ''
      }
    ]
  }

};
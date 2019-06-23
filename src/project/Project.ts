import SceneManager from '../engine/common/SceneManager';
import MenuScene from './scenes/menu/MenuScene';
import StackScene from './scenes/stack/StackScene';
import FireScene from './scenes/fire/FireScene';
import MixerScene from './scenes/mixer/MixerScene';
import Core from '../engine/Core';
import { SceneID } from './Settings';

export default class Project {

  public static core:Core;

  constructor(core:Core, resources:any) {
    Project.core = core;

    SceneManager.getInstance()
    .initialize(core.stage)
    .add(SceneID.MENU_SCENE, new MenuScene(resources, core.settings))
    .add(SceneID.STACK_SCENE, new StackScene(resources, core.settings))
    .add(SceneID.FIRE_SCENE, new FireScene(resources, core.settings))
    .add(SceneID.MIXER_SCENE, new MixerScene(resources, core.settings))
    .switchScene(SceneID.MENU_SCENE);
  }

  public update(dt: number):void {
    Project.core.fps.begin();
    SceneManager.getInstance().updateCurrentScene(dt);
    Project.core.fps.end();
  }
  
}
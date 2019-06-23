import ISettings from "../engine/common/interfaces/ISettings";

export class Settings implements ISettings  {
  public readonly designWidth: number = 1920;
  public readonly designHeight: number = 1080;
}

export enum SceneID {
  MENU_SCENE,
  STACK_SCENE,
  MIXER_SCENE,
  FIRE_SCENE
}
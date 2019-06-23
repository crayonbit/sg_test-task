import IModel from "../../../../engine/common/interfaces/mvc/IModel";
import { Settings } from "../../../Settings";

export default class MixerModel implements IModel {

  public resources: any;
  public settings: Settings;

  constructor(resources: any, settings:Settings) {
    this.resources = resources;
    this.settings = settings;
  }
}
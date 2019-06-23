import Core from './engine/Core';
import Preloader from './engine/common/Preloader';
import { Settings } from './project/Settings';
import Project from './project/Project';
import Resources from './project/resources/Resources';

async function entryPoint() {
  const core = new Core(new Settings());
  const preloader = new Preloader();
  const resources: any = await preloader.load(new Resources());
  const project = new Project(core, resources);
  core.addMainUpdater(project.update.bind(project));
};

entryPoint();
import Dummy from './Dummy.js';
import Environment from './Environment.js';
import Floor from './Floor.js';

export default class World {
  init() {
    this.environment = new Environment();
    this.dummy = new Dummy();
    this.floor = new Floor();
  }

  resize() {}

  update() {}
}

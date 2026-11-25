import Board from './Board.js';
import Environment from './Environment.js';
import Floor from './Floor.js';

export default class World {
  init() {
    this.environment = new Environment();
    this.board = new Board();
    this.floor = new Floor();
  }

  resize() {}

  update() {}

  async debug(inspector) {
    await this.environment.debug(inspector);
    await this.board.debug(inspector);
    await this.floor.debug(inspector);
  }

  destroy() {
    this.environment?.destroy();
    this.environment = null; // Set to null for garbage collector

    this.board?.destroy();
    this.board = null; // Set to null for garbage collector

    this.floor?.destroy();
    this.floor = null; // Set to null for garbage collector
  }
}

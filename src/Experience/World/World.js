import * as THREE from 'three'

import Experience from "../Experience.js";
import Environment from './Environment.js';
import Floor from './Floor.js';
import Fox from './Fox.js';
import BrainStem from './BrainStem.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.brainStem = new BrainStem()
            this.environment = new Environment()
        })

    }

    update()
    {
        if (this.fox && this.brainStem) {
            this.fox.update()
            this.brainStem.update()
        }
    }
}
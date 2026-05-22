import Experience from "../Experience.js"
import Galaxy from "./Galaxy/Galaxy.js"
import Environment from './Environment.js';
import Erid from "./Erid/Erid.js";
import Ring from "./Erid/Ring.js";

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
            this.erid = new Erid()
            this.ring = new Ring()
            this.environment = new Environment()
        })

        // this.galaxy = new Galaxy()

    }

    update()
    {
        if (this.galaxy)
        {
            // this.galaxy.update()
        }
    }
}
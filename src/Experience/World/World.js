import Experience from "../Experience.js"
import Board from "./Board.js"
import Environment from "./Environment.js"
import Terrain from "./Terrain/Terrain.js"

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
            this.environment = new Environment()
            this.board = new Board()
            this.terrain = new Terrain()
        })

        this.resources.startLoading()
    }

    resize()
    {
        // if (this.particles)
        // {
        //     this.particles.resize()
        // }
    }

    update()
    {
        // if (this.gears)
        // {
        //     this.gears.update()
        // }
    }
}
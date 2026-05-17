import Experience from '../Experience.js'
import Tiles from './Tiles.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()

        // Setup
        this.tiles = new Tiles()
    }

    update()
    {
        
    }

    resize(){
        this.tiles.resize()
    }
}
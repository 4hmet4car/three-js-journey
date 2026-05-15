import Experience from "../Experience.js"
import Test from './Test/Test.js'
import Pattern1 from "./Pattern1/Pattern1.js"
import Pattern2 from "./Pattern2/Pattern2.js"
import Pattern3 from "./Pattern3/Pattern3.js"
import Pattern4 from "./Pattern4/Pattern4.js"
import Pattern5 from "./Pattern5/Pattern5.js"
import Pattern6 from "./Pattern6/Pattern6.js"
import Pattern7 from "./Pattern7/Pattern7.js"
import Pattern8 from "./Pattern8/Pattern8.js"
import Pattern9 from "./Pattern9/Pattern9.js"
import Pattern10 from "./Pattern10/Pattern10.js"
import Pattern11 from "./Pattern11/Pattern11.js"
import Pattern12 from "./Pattern12/Pattern12.js"
import Pattern13 from "./Pattern13/Pattern13.js"
import Pattern14 from "./Pattern14/Pattern14.js"

export default class Tiles
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setTiles()
        this.arrangeTiles()
    }

    setTiles()
    {
        this.tiles = {}
        this.tiles.pattern14 = new Pattern14()
        this.tiles.pattern13 = new Pattern13()
        this.tiles.pattern12 = new Pattern12()
        this.tiles.pattern11 = new Pattern11()
        this.tiles.pattern10 = new Pattern10()
        this.tiles.pattern9 = new Pattern9()
        this.tiles.pattern8 = new Pattern8()
        this.tiles.pattern7 = new Pattern7()
        this.tiles.pattern6 = new Pattern6()
        this.tiles.pattern5 = new Pattern5()
        this.tiles.pattern4 = new Pattern4()
        this.tiles.pattern3 = new Pattern3()
        this.tiles.pattern2 = new Pattern2()
        this.tiles.pattern1 = new Pattern1()
        this.tiles.test = new Test()
    }

    arrangeTiles()
    {
        let index = 0
        for (const tile of Object.values(this.tiles)) {
            tile.mesh.position.x = index % 5
            tile.mesh.position.y = Math.floor(index / 5)
            index++
        }
    }
}
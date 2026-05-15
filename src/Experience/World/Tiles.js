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
import Pattern15 from "./Pattern15/Pattern15.js"
import Pattern16 from "./Pattern16/Pattern16.js"
import Pattern17 from "./Pattern17/Pattern17.js"
import Pattern18 from "./Pattern18/Pattern18.js"
import Pattern19 from "./Pattern19/Pattern19.js"
import Pattern20 from "./Pattern20/Pattern20.js"
import Pattern21 from "./Pattern21/Pattern21.js"
import Pattern22 from "./Pattern22/Pattern22.js"
import Pattern23 from "./Pattern23/Pattern23.js"
import Pattern24 from "./Pattern24/Pattern24.js"

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
        this.tiles.pattern24 = new Pattern24()
        this.tiles.pattern23 = new Pattern23()
        this.tiles.pattern22 = new Pattern22()
        this.tiles.pattern21 = new Pattern21()
        this.tiles.pattern20 = new Pattern20()
        this.tiles.pattern19 = new Pattern19()
        this.tiles.pattern18 = new Pattern18()
        this.tiles.pattern17 = new Pattern17()
        this.tiles.pattern16 = new Pattern16()
        this.tiles.pattern15 = new Pattern15()
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
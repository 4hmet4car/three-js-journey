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
import Pattern25 from "./Pattern25/Pattern25.js"
import Pattern26 from "./Pattern26/Pattern26.js"
import Pattern27 from "./Pattern27/Pattern27.js"
import Pattern28 from "./Pattern28/Pattern28.js"
import Pattern29 from "./Pattern29/Pattern29.js"
import Pattern30 from "./Pattern30/Pattern30.js"
import Pattern31 from "./Pattern31/Pattern31.js"
import Pattern32 from "./Pattern32/Pattern32.js"
import Pattern33 from "./Pattern33/Pattern33.js"
import Pattern34 from "./Pattern34/Pattern34.js"
import Pattern35 from "./Pattern35/Pattern35.js"
import Pattern36 from "./Pattern36/Pattern36.js"
import Pattern37 from "./Pattern37/Pattern37.js"
import Pattern38 from "./Pattern38/Pattern38.js"
import Pattern39 from "./Pattern39/Pattern39.js"
import Pattern40 from "./Pattern40/Pattern40.js"
import Pattern41 from "./Pattern41/Pattern41.js"
import Pattern42 from "./Pattern42/Pattern42.js"
import Pattern43 from "./Pattern43/Pattern43.js"
import Pattern44 from "./Pattern44/Pattern44.js"
import Pattern45 from "./Pattern45/Pattern45.js"
import Pattern46 from "./Pattern46/Pattern46.js"
import Pattern47 from "./Pattern47/Pattern47.js"
import Pattern48 from "./Pattern48/Pattern48.js"
import Pattern49 from "./Pattern49/Pattern49.js"
import Pattern50 from "./Pattern50/Pattern50.js"

export default class Tiles
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setTiles()
        this.arrangeTiles()
    }

    setTiles()
    {
        this.tiles = {}
        this.tiles.pattern50 = new Pattern50()
        this.tiles.pattern49 = new Pattern49()
        this.tiles.pattern48 = new Pattern48()
        this.tiles.pattern47 = new Pattern47()
        this.tiles.pattern46 = new Pattern46()
        this.tiles.pattern45 = new Pattern45()
        this.tiles.pattern44 = new Pattern44()
        this.tiles.pattern43 = new Pattern43()
        this.tiles.pattern42 = new Pattern42()
        this.tiles.pattern41 = new Pattern41()
        this.tiles.pattern40 = new Pattern40()
        this.tiles.pattern39 = new Pattern39()
        this.tiles.pattern38 = new Pattern38()
        this.tiles.pattern37 = new Pattern37()
        this.tiles.pattern36 = new Pattern36()
        this.tiles.pattern35 = new Pattern35()
        this.tiles.pattern34 = new Pattern34()
        this.tiles.pattern33 = new Pattern33()
        this.tiles.pattern32 = new Pattern32()
        this.tiles.pattern31 = new Pattern31()
        this.tiles.pattern30 = new Pattern30()
        this.tiles.pattern29 = new Pattern29()
        this.tiles.pattern28 = new Pattern28()
        this.tiles.pattern27 = new Pattern27()
        this.tiles.pattern26 = new Pattern26()
        this.tiles.pattern25 = new Pattern25()
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
        // this.tiles.test = new Test()
    }

    arrangeTiles()
    {
        let index = 0
        for (const tile of Object.values(this.tiles)) {
            tile.mesh.position.x = index % 5 + this.camera.left + 0.5
            tile.mesh.position.y = Math.floor(index / 5) - 0.5
            index++
        }
    }
}
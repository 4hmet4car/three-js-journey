import * as THREE from 'three'

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
        this.sizes = this.experience.sizes

        this.tileGroup = new THREE.Group()

        this.setTiles()
        this.arrangeTiles()

        // Desktop scroll event listener
        this.desktopScroll()

        // Mobile
        this.mobileScroll()
    }

    setTiles()
    {
        this.tiles = []
        this.tiles.push(new Pattern50().mesh)
        this.tiles.push(new Pattern49().mesh)
        this.tiles.push(new Pattern48().mesh)
        this.tiles.push(new Pattern47().mesh)
        this.tiles.push(new Pattern46().mesh)
        this.tiles.push(new Pattern45().mesh)
        this.tiles.push(new Pattern44().mesh)
        this.tiles.push(new Pattern43().mesh)
        this.tiles.push(new Pattern42().mesh)
        this.tiles.push(new Pattern41().mesh)
        this.tiles.push(new Pattern40().mesh)
        this.tiles.push(new Pattern39().mesh)
        this.tiles.push(new Pattern38().mesh)
        this.tiles.push(new Pattern37().mesh)
        this.tiles.push(new Pattern36().mesh)
        this.tiles.push(new Pattern35().mesh)
        this.tiles.push(new Pattern34().mesh)
        this.tiles.push(new Pattern33().mesh)
        this.tiles.push(new Pattern32().mesh)
        this.tiles.push(new Pattern31().mesh)
        this.tiles.push(new Pattern30().mesh)
        this.tiles.push(new Pattern29().mesh)
        this.tiles.push(new Pattern28().mesh)
        this.tiles.push(new Pattern27().mesh)
        this.tiles.push(new Pattern26().mesh)
        this.tiles.push(new Pattern25().mesh)
        this.tiles.push(new Pattern24().mesh)
        this.tiles.push(new Pattern23().mesh)
        this.tiles.push(new Pattern22().mesh)
        this.tiles.push(new Pattern21().mesh)
        this.tiles.push(new Pattern20().mesh)
        this.tiles.push(new Pattern19().mesh)
        this.tiles.push(new Pattern18().mesh)
        this.tiles.push(new Pattern17().mesh)
        this.tiles.push(new Pattern16().mesh)
        this.tiles.push(new Pattern15().mesh)
        this.tiles.push(new Pattern14().mesh)
        this.tiles.push(new Pattern13().mesh)
        this.tiles.push(new Pattern12().mesh)
        this.tiles.push(new Pattern11().mesh)
        this.tiles.push(new Pattern10().mesh)
        this.tiles.push(new Pattern9().mesh)
        this.tiles.push(new Pattern8().mesh)
        this.tiles.push(new Pattern7().mesh)
        this.tiles.push(new Pattern6().mesh)
        this.tiles.push(new Pattern5().mesh)
        this.tiles.push(new Pattern4().mesh)
        this.tiles.push(new Pattern3().mesh)
        this.tiles.push(new Pattern2().mesh)
        this.tiles.push(new Pattern1().mesh)
        this.tiles.push(new Test().mesh)
    }

    arrangeTiles()
    {
        this.tileGroup.position.y = 0
        const tilesPerRow = 3
        const halfWindowSize = (this.sizes.width / this.sizes.height) * this.camera.zoom
        const tileSize = (halfWindowSize * 2) / tilesPerRow

        const halfTile = tileSize / 2

        let index = 0
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].scale.set(tileSize, tileSize, 1)
            this.tiles[i].position.x = -halfWindowSize + (index % tilesPerRow) * tileSize + halfTile
            this.tiles[i].position.y = -Math.floor(index / tilesPerRow) * tileSize + 1 - halfTile
            this.tileGroup.add(this.tiles[i])
            // tile.material.fragmentShader
            index++
        }

        this.tilesTotalLength = Math.floor(index / tilesPerRow) * tileSize
        this.currentY = 0

        this.scene.add(this.tileGroup)
    }

    desktopScroll(){
        window.addEventListener('wheel', (event) =>
        {
            this.scroll(event.deltaY / 1000)
        })
    }

    mobileScroll(){
        let previousY = 0

        window.addEventListener('touchstart', (event) =>
        {
            previousY = event.touches[0].clientY
        })

        window.addEventListener('touchmove', (event) =>
        {
            const currentY = event.touches[0].clientY
            const deltaY = previousY - currentY

            this.scroll(deltaY / 300)

            previousY = currentY
        }, { passive: false })
    }

    scroll(delta)
    {
        const nextY = this.currentY + delta

        const spaceBelow = this.tilesTotalLength - 2 - this.currentY

        if (0 <= nextY)
        {
            if (nextY < this.tilesTotalLength - 2)
            {
                this.currentY = nextY
                this.tileGroup.position.y += delta
            } else
            {
                this.tileGroup.position.y += spaceBelow
                this.currentY = this.tilesTotalLength - 2
            }
        } else
        {
            this.tileGroup.position.y -= this.currentY
            this.currentY = 0
        }
    }

    resize()
    {
        this.arrangeTiles()
    }
}
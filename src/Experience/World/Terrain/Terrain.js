import * as THREE from 'three'
import Experience from "../../Experience.js"
import { TERRAIN } from '../../constants.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

export default class Terrain
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(
            TERRAIN.GEOMETRY.WIDTH,
            TERRAIN.GEOMETRY.HEIGHT,
            TERRAIN.GEOMETRY.WIDTH_SEGMENTS,
            TERRAIN.GEOMETRY.HEIGHT_SEGMENTS,
        )

        this.geometry.rotateX(TERRAIN.GEOMETRY.ROTATION_X)
    }

    setMaterial()
    {
        this.material = new CustomShaderMaterial({
            //CSM
            baseMaterial: THREE.MeshBasicMaterial,
            
            //MeshBasicMaterial
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

}
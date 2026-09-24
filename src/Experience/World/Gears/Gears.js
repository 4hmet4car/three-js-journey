import * as THREE from 'three'
import Experience from "../../Experience.js"
import { GEARS } from '../../constants.js'
import { gearsParameters } from '../../parameters.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import slicedVertexShader from './shaders/vertex.glsl'
import slicedFragmentShader from './shaders/fragment.glsl'

export default class Gears
{
    constructor()
    {
        this.experience = new Experience()

        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.setModel()
        this.setMaterials()
        this.addModel()
        this.setDebug()
    }

    setModel()
    {
        this.model = this.resources.items.gears.scene
    }

    setMaterials()
    {
        // This is the base material
        this.material = new THREE.MeshStandardMaterial({
            metalness: gearsParameters.material.metalness,
            roughness: gearsParameters.material.roughness,
            envMapIntensity: gearsParameters.material.envMapIntensity,
            color: gearsParameters.material.color,
        })

        // This is the modified material
        this.slicedMaterial = new CustomShaderMaterial({
            // CSM
            baseMaterial: THREE.MeshStandardMaterial,
            vertexShader: slicedVertexShader,
            fragmentShader: slicedFragmentShader,

            // MeshStandardMaterial
            side: THREE.DoubleSide,
            metalness: gearsParameters.material.metalness,
            roughness: gearsParameters.material.roughness,
            envMapIntensity: gearsParameters.material.envMapIntensity,
            color: gearsParameters.material.color,
        })

        this.model.traverse((child) =>
        {
            if (child.isMesh)
            {
                if (child.name === 'outerHull')
                {
                    child.material = this.slicedMaterial
                } else
                {
                    child.material = this.material
                }

                child.castShadow = GEARS.MESH.CAST_SHADOW
                child.receiveShadow = GEARS.MESH.RECEIVE_SHADOW
            }
        })
    }

    addModel()
    {
        this.scene.add(this.model)
    }

    setDebug()
    {

    }

    update()
    {
        // this.model.rotation.y = this.time.secondsElapsed * GEARS.ANIMATION.ROTATION_Y
    }
}
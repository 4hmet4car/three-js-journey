import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import Experience from "../../Experience.js"
import { GEARS } from '../../constants.js'
import { gearsParameters } from '../../parameters.js'
import slicedFragmentShader from './shaders/fragment.glsl'
import slicedVertexShader from './shaders/vertex.glsl'

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
        this.setUniforms()
        this.setMaterials()
        this.addModel()
        this.setDebug()
    }

    setModel()
    {
        this.model = this.resources.items.gears.scene
    }

    setUniforms()
    {
        this.uniforms =
        {
            uSliceStart: new THREE.Uniform(gearsParameters.slicedMaterial.uniforms.uSliceStart),
            uSliceArc: new THREE.Uniform(gearsParameters.slicedMaterial.uniforms.uSliceArc),
        }
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
            uniforms: this.uniforms,

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
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Gear')

            this.debugFolder
                .add(gearsParameters.slicedMaterial.uniforms, 'uSliceStart')
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.001)
                .onChange(() =>
                {
                    this.uniforms.uSliceStart.value = gearsParameters.slicedMaterial.uniforms.uSliceStart
                })

            this.debugFolder
                .add(gearsParameters.slicedMaterial.uniforms, 'uSliceArc')
                .min(0)
                .max(2 * Math.PI)
                .step(0.001)
                .onChange(() =>
                {
                    this.uniforms.uSliceArc.value = gearsParameters.slicedMaterial.uniforms.uSliceArc
                })
        }
    }

    update()
    {
        // this.model.rotation.y = this.time.secondsElapsed * GEARS.ANIMATION.ROTATION_Y
    }
}
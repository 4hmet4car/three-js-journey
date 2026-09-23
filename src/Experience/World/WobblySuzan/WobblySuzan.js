import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { WOBBLY_SUZAN } from '../../constants.js'
import Experience from "../../Experience.js"
import { wobblySuzanParameters } from "../../parameters.js"
import wobbleFragmentShader from './shaders/fragment.glsl'
import wobbleVertexShader from './shaders/vertex.glsl'

export default class WobblySuzan
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources.items
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.setUniforms()
        this.setMaterial()
        this.setDepthMaterial()
        this.setModel()
        this.setDebug()
    }

    setUniforms()
    {
        this.uniforms = 
        {
            uTime: new THREE.Uniform(0),
            
            uPositionFrequency: new THREE.Uniform(wobblySuzanParameters.material.uniforms.uPositionFrequency),
            uTimeFrequency: new THREE.Uniform(wobblySuzanParameters.material.uniforms.uTimeFrequency),
            uStrength: new THREE.Uniform(wobblySuzanParameters.material.uniforms.uStrength),

            uWarpPositionFrequency: new THREE.Uniform(wobblySuzanParameters.material.uniforms.uWarpPositionFrequency),
            uWarpTimeFrequency: new THREE.Uniform(wobblySuzanParameters.material.uniforms.uWarpTimeFrequency),
            uWarpStrength: new THREE.Uniform(wobblySuzanParameters.material.uniforms.uWarpStrength),

            uColorA: new THREE.Uniform(new THREE.Color(wobblySuzanParameters.material.uniforms.uColorA)),
            uColorB: new THREE.Uniform(new THREE.Color(wobblySuzanParameters.material.uniforms.uColorB)),
        }
    }

    setMaterial()
    {
        this.material = new CustomShaderMaterial({
            // CSM
            baseMaterial: THREE.MeshPhysicalMaterial,
            vertexShader: wobbleVertexShader,
            fragmentShader: wobbleFragmentShader,
            uniforms: this.uniforms,

            // MeshPhysicalMaterial
            metalness: wobblySuzanParameters.material.metalness,
            roughness: wobblySuzanParameters.material.roughness,
            color: wobblySuzanParameters.material.color,
            transmission: wobblySuzanParameters.material.transmission,
            ior: wobblySuzanParameters.material.ior,
            thickness: wobblySuzanParameters.material.thickness,
            transparent: WOBBLY_SUZAN.MATERIAL.TRANSPARENT,
            wireframe: wobblySuzanParameters.material.wireframe
        })
    }

    setDepthMaterial()
    {
        this.depthMaterial = new CustomShaderMaterial({
            // CSM
            baseMaterial: THREE.MeshDepthMaterial,
            vertexShader: wobbleVertexShader,
            uniforms: this.uniforms,

            // MeshDepthMaterial
            depthPacking: THREE.RGBADepthPacking,
        })
    }

    setModel()
    {
        this.mesh = this.resources.suzanne.scene.children[0]
        this.mesh.receiveShadow = WOBBLY_SUZAN.MESH.RECEIVE_SHADOW
        this.mesh.castShadow = WOBBLY_SUZAN.MESH.CAST_SHADOW
        this.mesh.material = this.material
        this.mesh.customDepthMaterial = this.depthMaterial
        this.mesh.position.x = WOBBLY_SUZAN.MESH.POSITION_X
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Wobbly Suzan")

            this.debugFolder
                .add(wobblySuzanParameters.material.uniforms, 'uPositionFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uPositionFrequency.value = wobblySuzanParameters.material.uniforms.uPositionFrequency
                })

            this.debugFolder
                .add(wobblySuzanParameters.material.uniforms, 'uTimeFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uTimeFrequency.value = wobblySuzanParameters.material.uniforms.uTimeFrequency
                })

            this.debugFolder
                .add(wobblySuzanParameters.material.uniforms, 'uStrength', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uStrength.value = wobblySuzanParameters.material.uniforms.uStrength
                })

            this.debugFolder
                .add(wobblySuzanParameters.material.uniforms, 'uWarpPositionFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uWarpPositionFrequency.value = wobblySuzanParameters.material.uniforms.uWarpPositionFrequency
                })

            this.debugFolder
                .add(wobblySuzanParameters.material.uniforms, 'uWarpTimeFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uWarpTimeFrequency.value = wobblySuzanParameters.material.uniforms.uWarpTimeFrequency
                })

            this.debugFolder
                .add(wobblySuzanParameters.material.uniforms, 'uWarpStrength', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uWarpStrength.value = wobblySuzanParameters.material.uniforms.uWarpStrength
                })
            
            this.debugFolder
                .addColor(wobblySuzanParameters.material.uniforms, 'uColorA')
                .onChange(() =>
                {
                    this.material.uniforms.uColorA.value.set(new THREE.Color(wobblySuzanParameters.material.uniforms.uColorA))
                })
            
            this.debugFolder
                .addColor(wobblySuzanParameters.material.uniforms, 'uColorB')
                .onChange(() =>
                {
                    this.material.uniforms.uColorB.value.set(new THREE.Color(wobblySuzanParameters.material.uniforms.uColorB))
                })

            this.debugFolder
                .add(wobblySuzanParameters.material, 'metalness', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.metalness = wobblySuzanParameters.material.metalness
                })

            this.debugFolder
                .add(wobblySuzanParameters.material, 'roughness', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.roughness = wobblySuzanParameters.material.roughness
                })

            this.debugFolder
                .add(wobblySuzanParameters.material, 'transmission', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.transmission = wobblySuzanParameters.material.transmission
                })

            this.debugFolder
                .add(wobblySuzanParameters.material, 'ior', 0, 10, 0.001)
                .onChange(() =>
                {
                    this.material.ior = wobblySuzanParameters.material.ior
                })

            this.debugFolder
                .add(wobblySuzanParameters.material, 'thickness', 0, 10, 0.001)
                .onChange(() =>
                {
                    this.material.thickness = wobblySuzanParameters.material.thickness
                })

            this.debugFolder
                .add(wobblySuzanParameters.material, 'wireframe')
                .onChange(() =>
                {
                    this.material.wireframe = wobblySuzanParameters.material.wireframe
                })
        }
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}
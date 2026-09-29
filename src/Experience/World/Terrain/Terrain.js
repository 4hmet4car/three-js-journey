import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import Experience from "../../Experience.js"
import { TERRAIN } from '../../constants.js'
import { terrainParameters } from '../../parameters.js'
import terrainFragmentShader from './shaders/fragment.glsl'
import terrainVertexShader from './shaders/vertex.glsl'

export default class Terrain
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.setGeometry()
        this.setUniforms()
        this.setMaterial()
        this.setDepthMaterial()
        this.setMesh()
        this.setDebug()
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

        this.geometry.deleteAttribute('uv')
        this.geometry.deleteAttribute('normal')
    }

    setUniforms()
    {
        this.uniforms = {
            uTime: new THREE.Uniform(0),
            
            uPositionFrequency: new THREE.Uniform(terrainParameters.customShaderMaterial.uniforms.uPositionFrequency),
            uDetailAmount: new THREE.Uniform(terrainParameters.customShaderMaterial.uniforms.uDetailAmount),
            uStrength: new THREE.Uniform(terrainParameters.customShaderMaterial.uniforms.uStrength),
            uWarpFrequency: new THREE.Uniform(terrainParameters.customShaderMaterial.uniforms.uWarpFrequency),
            uWarpStrength: new THREE.Uniform(terrainParameters.customShaderMaterial.uniforms.uWarpStrength),

            uColorWaterDeep: new THREE.Uniform(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorWaterDeep)),
            uColorWaterSurface: new THREE.Uniform(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorWaterSurface)),
            uColorSand: new THREE.Uniform(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorSand)),
            uColorGrass: new THREE.Uniform(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorGrass)),
            uColorSnow: new THREE.Uniform(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorSnow)),
            uColorRock: new THREE.Uniform(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorRock)),
        }
    }

    setMaterial()
    {
        this.material = new CustomShaderMaterial({
            //CSM
            baseMaterial: THREE.MeshStandardMaterial,
            vertexShader: terrainVertexShader,
            fragmentShader: terrainFragmentShader,
            uniforms: this.uniforms,

            //MeshBasicMaterial
            metalness: TERRAIN.MATERIAL.BASE_MATERIAL.METALNESS,
            roughness: TERRAIN.MATERIAL.BASE_MATERIAL.ROUGHNESS,
            color: TERRAIN.MATERIAL.BASE_MATERIAL.COLOR,
        })
    }

    setDepthMaterial()
    {
        this.depthMaterial = new CustomShaderMaterial({
            //CSM
            baseMaterial: THREE.MeshDepthMaterial,
            vertexShader: terrainVertexShader,
            uniforms: this.uniforms,

            //MeshDepthMaterial
            depthPacking: THREE.RGBADepthPacking,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.customDepthMaterial = this.depthMaterial
        this.mesh.receiveShadow = TERRAIN.MESH.RECEIVE_SHADOW
        this.mesh.castShadow = TERRAIN.MESH.CAST_SHADOW
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Terrain')

            this.debugFolder
                .add(terrainParameters.customShaderMaterial.uniforms, 'uPositionFrequency')
                .min(0)
                .max(1)
                .step(0.001)
                .onChange(() =>
                {
                    this.uniforms.uPositionFrequency.value = terrainParameters.customShaderMaterial.uniforms.uPositionFrequency
                })

            this.debugFolder
                .add(terrainParameters.customShaderMaterial.uniforms, 'uDetailAmount')
                .min(0)
                .max(10)
                .step(1)
                .onChange(() =>
                {
                    this.uniforms.uDetailAmount.value = terrainParameters.customShaderMaterial.uniforms.uDetailAmount
                })

            this.debugFolder
                .add(terrainParameters.customShaderMaterial.uniforms, 'uStrength')
                .min(0)
                .max(10)
                .step(0.1)
                .onChange(() =>
                {
                    this.uniforms.uStrength.value = terrainParameters.customShaderMaterial.uniforms.uStrength
                })

            this.debugFolder
                .add(terrainParameters.customShaderMaterial.uniforms, 'uWarpFrequency')
                .min(0)
                .max(10)
                .step(0.1)
                .onChange(() =>
                {
                    this.uniforms.uWarpFrequency.value = terrainParameters.customShaderMaterial.uniforms.uWarpFrequency
                })

            this.debugFolder
                .add(terrainParameters.customShaderMaterial.uniforms, 'uWarpStrength')
                .min(0)
                .max(10)
                .step(0.1)
                .onChange(() =>
                {
                    this.uniforms.uWarpStrength.value = terrainParameters.customShaderMaterial.uniforms.uWarpStrength
                })

            this.debugFolder
                .addColor(terrainParameters.customShaderMaterial.uniforms, 'uColorWaterDeep')                          
                .onChange(() =>
                {
                    this.uniforms.uColorWaterDeep.value.set(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorWaterDeep))
                })

            this.debugFolder
                .addColor(terrainParameters.customShaderMaterial.uniforms, 'uColorWaterSurface')                          
                .onChange(() =>
                {
                    this.uniforms.uColorWaterSurface.value.set(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorWaterSurface))
                })

            this.debugFolder
                .addColor(terrainParameters.customShaderMaterial.uniforms, 'uColorSand')                          
                .onChange(() =>
                {
                    this.uniforms.uColorSand.value.set(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorSand))
                })

            this.debugFolder
                .addColor(terrainParameters.customShaderMaterial.uniforms, 'uColorGrass')                          
                .onChange(() =>
                {
                    this.uniforms.uColorGrass.value.set(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorGrass))
                })

            this.debugFolder
                .addColor(terrainParameters.customShaderMaterial.uniforms, 'uColorSnow')                          
                .onChange(() =>
                {
                    this.uniforms.uColorSnow.value.set(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorSnow))
                })

            this.debugFolder
                .addColor(terrainParameters.customShaderMaterial.uniforms, 'uColorRock')                          
                .onChange(() =>
                {
                    this.uniforms.uColorRock.value.set(new THREE.Color(terrainParameters.customShaderMaterial.uniforms.uColorRock))
                })
        }
    }

    update()
    {
        this.uniforms.uTime.value = this.time.secondsElapsed
    }

}
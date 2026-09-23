import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { WOBBLY_SPHERE } from '../../constants.js'
import Experience from "../../Experience.js"
import { wobblySphereParameters } from "../../parameters.js"
import wobbleFragmentShader from './shaders/fragment.glsl'
import wobbleVertexShader from './shaders/vertex.glsl'

export default class WobblySphere
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
        this.geometry = new THREE.IcosahedronGeometry(
            WOBBLY_SPHERE.GEOMETRY.RADIUS,
            WOBBLY_SPHERE.GEOMETRY.DETAIL_NUMBER
        )
        // Merge vertices to index vertices
        this.geometry = mergeVertices(this.geometry)
        // You can compute tangents only when the geometry is indexed
        this.geometry.computeTangents()
    }

    setUniforms()
    {
        this.uniforms = 
        {
            uTime: new THREE.Uniform(0),
            
            uPositionFrequency: new THREE.Uniform(wobblySphereParameters.material.uniforms.uPositionFrequency),
            uTimeFrequency: new THREE.Uniform(wobblySphereParameters.material.uniforms.uTimeFrequency),
            uStrength: new THREE.Uniform(wobblySphereParameters.material.uniforms.uStrength),

            uWarpPositionFrequency: new THREE.Uniform(wobblySphereParameters.material.uniforms.uWarpPositionFrequency),
            uWarpTimeFrequency: new THREE.Uniform(wobblySphereParameters.material.uniforms.uWarpTimeFrequency),
            uWarpStrength: new THREE.Uniform(wobblySphereParameters.material.uniforms.uWarpStrength),

            uColorA: new THREE.Uniform(new THREE.Color(wobblySphereParameters.material.uniforms.uColorA)),
            uColorB: new THREE.Uniform(new THREE.Color(wobblySphereParameters.material.uniforms.uColorB)),
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
            metalness: wobblySphereParameters.material.metalness,
            roughness: wobblySphereParameters.material.roughness,
            color: wobblySphereParameters.material.color,
            transmission: wobblySphereParameters.material.transmission,
            ior: wobblySphereParameters.material.ior,
            thickness: wobblySphereParameters.material.thickness,
            transparent: WOBBLY_SPHERE.MATERIAL.TRANSPARENT,
            wireframe: wobblySphereParameters.material.wireframe
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

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = WOBBLY_SPHERE.MESH.RECEIVE_SHADOW
        this.mesh.castShadow = WOBBLY_SPHERE.MESH.CAST_SHADOW
        this.mesh.customDepthMaterial = this.depthMaterial
        this.mesh.position.x = WOBBLY_SPHERE.MESH.POSITION_X
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Wobbly Sphere")

            this.debugFolder
                .add(wobblySphereParameters.material.uniforms, 'uPositionFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uPositionFrequency.value = wobblySphereParameters.material.uniforms.uPositionFrequency
                })

            this.debugFolder
                .add(wobblySphereParameters.material.uniforms, 'uTimeFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uTimeFrequency.value = wobblySphereParameters.material.uniforms.uTimeFrequency
                })

            this.debugFolder
                .add(wobblySphereParameters.material.uniforms, 'uStrength', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uStrength.value = wobblySphereParameters.material.uniforms.uStrength
                })

            this.debugFolder
                .add(wobblySphereParameters.material.uniforms, 'uWarpPositionFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uWarpPositionFrequency.value = wobblySphereParameters.material.uniforms.uWarpPositionFrequency
                })

            this.debugFolder
                .add(wobblySphereParameters.material.uniforms, 'uWarpTimeFrequency', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uWarpTimeFrequency.value = wobblySphereParameters.material.uniforms.uWarpTimeFrequency
                })

            this.debugFolder
                .add(wobblySphereParameters.material.uniforms, 'uWarpStrength', 0, 2, 0.001)
                .onChange(() =>
                {
                    this.material.uniforms.uWarpStrength.value = wobblySphereParameters.material.uniforms.uWarpStrength
                })
            
            this.debugFolder
                .addColor(wobblySphereParameters.material.uniforms, 'uColorA')
                .onChange(() =>
                {
                    this.material.uniforms.uColorA.value.set(new THREE.Color(wobblySphereParameters.material.uniforms.uColorA))
                })
            
            this.debugFolder
                .addColor(wobblySphereParameters.material.uniforms, 'uColorB')
                .onChange(() =>
                {
                    this.material.uniforms.uColorB.value.set(new THREE.Color(wobblySphereParameters.material.uniforms.uColorB))
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'metalness', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.metalness = wobblySphereParameters.material.metalness
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'roughness', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.roughness = wobblySphereParameters.material.roughness
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'transmission', 0, 1, 0.001)
                .onChange(() =>
                {
                    this.material.transmission = wobblySphereParameters.material.transmission
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'ior', 0, 10, 0.001)
                .onChange(() =>
                {
                    this.material.ior = wobblySphereParameters.material.ior
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'thickness', 0, 10, 0.001)
                .onChange(() =>
                {
                    this.material.thickness = wobblySphereParameters.material.thickness
                })

            this.debugFolder
                .add(wobblySphereParameters.material, 'wireframe')
                .onChange(() =>
                {
                    this.material.wireframe = wobblySphereParameters.material.wireframe
                })
        }
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.secondsElapsed
    }
}
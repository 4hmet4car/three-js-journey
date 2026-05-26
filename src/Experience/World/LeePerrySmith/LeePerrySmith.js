import * as THREE from 'three'

import Experience from "../../Experience.js"
import rotationFunctionInjection from './shaderInjections/rotationFunctionInjection.glsl'
import normalRotationInjection from './shaderInjections/normalRotationInjection.glsl'
import rotationInjection from './shaderInjections/rotationInjection.glsl'
import rotationInjectionDepth from './shaderInjections/rotationInjectionDepth.glsl'
import fragmentUniformsInjection from './shaderInjections/fragmentUniformsInjection.glsl'
import fragmentAlphaInjection from './shaderInjections/fragmentAlphaInjection.glsl'

export default class LeePerrySmith
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Setup
        this.resource = this.resources.items.leePerrySmithModel

        this.setMaterial()
        this.setModel()
        this.setTestPlane()
        this.setDebug()

    }

    setMaterial()
    {
        this.mapTexture = this.resources.items.leePerrySmithColorTexture
        this.mapTexture.colorSpace = THREE.SRGBColorSpace

        this.normalTexture = this.resources.items.leePerrySmithNormalTexture

        this.material = new THREE.MeshStandardMaterial({
            map: this.mapTexture,
            normalMap: this.normalTexture,
            transparent: true,
            // wireframe: true
        })

        // You cannot reach to the depth material of a predefined material
        // So you create a custom depth material to be able to modify it
        // and inject to it your own code. Just inject the same stuff you had
        // for the regular material. So the drop shadows work properly.
        this.depthMaterial = new THREE.MeshDepthMaterial({
            depthPacking: THREE.RGBADepthPacking
        })

        // Create reference to the uniform so that you reach it both from
        // tick and the onBeforeCompile
        this.customUniforms = {
            uTime: { value: 0 },
            uFrequency: { value: 0.05 },
            uSpeed: { value: 70 },
            uAlphaSpeed: { value: 0 },
            uAmplitude: { value: 1 }
        }

        // Inject shaders to the material
        this.material.onBeforeCompile = (shader) =>
        {
            // Assign your custom uniform here
            shader.uniforms.uTime = this.customUniforms.uTime
            shader.uniforms.uFrequency = this.customUniforms.uFrequency
            shader.uniforms.uSpeed = this.customUniforms.uSpeed
            shader.uniforms.uAlphaSpeed = this.customUniforms.uAlphaSpeed
            shader.uniforms.uAmplitude = this.customUniforms.uAmplitude

            // Inject the rotation function  definition outside the main()
            // because you do function definitions outside the main, so you hook
            // something outside the main()
            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                rotationFunctionInjection
            )

            shader.vertexShader = shader.vertexShader.replace(
                '#include <beginnormal_vertex>',
                normalRotationInjection
            )

            // Inject the actual rotation inside the main, so you hook
            // something inside the main()
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                rotationInjection
            )

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <common>',
                fragmentUniformsInjection
            )

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <color_fragment>',
                fragmentAlphaInjection
            )
        }

        // Inject shaders to the depth material too
        this.depthMaterial.onBeforeCompile = (shader) =>
        {
            shader.uniforms.uTime = this.customUniforms.uTime
            shader.uniforms.uFrequency = this.customUniforms.uFrequency
            shader.uniforms.uSpeed = this.customUniforms.uSpeed
            shader.uniforms.uAmplitude = this.customUniforms.uAmplitude

            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                rotationFunctionInjection
            )

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                rotationInjectionDepth
            )
        }
    }

    setModel()
    {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                child.material = this.material
                child.customDepthMaterial = this.depthMaterial
                child.rotation.y = Math.PI * 0.5
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    setTestPlane()
    {
        // Test plane
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(15, 15),
            new THREE.MeshStandardMaterial()
        )
        this.plane.rotation.y = Math.PI
        this.plane.position.x = -4
        this.plane.position.y = -3
        this.plane.position.z = 5
        this.plane.receiveShadow = true
        this.scene.add(this.plane)
    }

    setDebug()
    {
        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('LeePerrySmith')

            this.debugFolder
                .add(this.customUniforms.uFrequency, 'value')
                .min(0)
                .max(20)
                .step(0.001)
                .name('uFrequency')

            this.debugFolder
                .add(this.customUniforms.uSpeed, 'value')
                .min(0)
                .max(100)
                .step(0.001)
                .name('uSpeed')

            this.debugFolder
                .add(this.customUniforms.uAmplitude, 'value')
                .min(0)
                .max(100)
                .step(0.001)
                .name('uAmplitude')

            this.debugFolder
                .add(this.customUniforms.uAlphaSpeed, 'value')
                .min(0)
                .max(100)
                .step(0.001)
                .name('uAlphaSpeed')
        }
    }

    update()
    {
        this.customUniforms.uTime.value = this.time.secondsElapsed
    }
}
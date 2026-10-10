import * as THREE from 'three'
import Experience from "../Experience.js"

import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export default class Foo
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources

        this.setCube()
        this.setTorusKnot()
        this.setSphere()
        this.setFloor()
        this.setCubeCluster()
        this.setCubeInstancedCluster()
        this.setShaderObject()
    }

    setCube()
    {
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial()
        )
        this.cube.castShadow = true
        this.cube.receiveShadow = false
        this.cube.position.set(- 5, 0, 0)
        this.scene.add(this.cube)
    }

    setTorusKnot()
    {
        this.torusKnot = new THREE.Mesh(
            new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
            new THREE.MeshStandardMaterial()
        )
        this.torusKnot.castShadow = true
        this.torusKnot.receiveShadow = false
        this.scene.add(this.torusKnot)
    }

    setSphere()
    {
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshStandardMaterial()
        )
        this.sphere.position.set(5, 0, 0)
        this.sphere.castShadow = true
        this.sphere.receiveShadow = false
        this.scene.add(this.sphere)
    }

    setFloor()
    {
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial()
        )
        this.floor.position.set(0, - 2, 0)
        this.floor.rotation.x = - Math.PI * 0.5
        this.floor.castShadow = true
        this.floor.receiveShadow = true
        this.scene.add(this.floor)
    }

    setCubeCluster()
    {
        this.cubeClusterGeometries = []

        for (let i = 0; i < 50; i++)
        {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

            geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
            geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)

            geometry.translate(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            )

            this.cubeClusterGeometries.push(geometry)
        }

        this.cubeClusterGeometry = mergeGeometries(this.cubeClusterGeometries)
        this.cubeClusterMaterial = new THREE.MeshNormalMaterial()

        this.cubeClusterMesh = new THREE.Mesh(this.cubeClusterGeometry, this.cubeClusterMaterial)

        this.scene.add(this.cubeClusterMesh)
    }

    setCubeInstancedCluster()
    {
        this.cubeInstancedGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

        this.cubeInstancedMaterial = new THREE.MeshBasicMaterial({ color: 'orange' })

        this.cubeInstancedMesh = new THREE.InstancedMesh(
            this.cubeInstancedGeometry,
            this.cubeInstancedMaterial,
            50
        )

        // // Set this if you are going to be animating any of the instances
        // this.cubeInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

        this.scene.add(this.cubeInstancedMesh)

        for (let i = 0; i < 50; i++)
        {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            )

            const quaternion = new THREE.Quaternion()
            quaternion.setFromEuler(new THREE.Euler(
                (Math.random() - 0.5) * Math.PI * 2,
                (Math.random() - 0.5) * Math.PI * 2,
                0,
            ))

            const matrix = new THREE.Matrix4()
            matrix.makeRotationFromQuaternion(quaternion)
            matrix.setPosition(position)
            this.cubeInstancedMesh.setMatrixAt(i, matrix)
        }
    }

    setShaderObject()
    {

        this.shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

        this.shaderMaterial = new THREE.ShaderMaterial({
            precision: 'lowp',
            defines:
            {
                DISPLACEMENT_STRENGTH: 1.5    
            },
            uniforms:
            {
                uDisplacementTexture: { value: this.resources.items.displacementMap },
            },
            vertexShader: `
                // #define DISPLACEMENT_STRENGTH 1.5    

                uniform sampler2D uDisplacementTexture;

                varying vec3 vColor;

                void main()
                {
                    // Position
                    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                    float elevation = texture2D(uDisplacementTexture, uv).r;
                    modelPosition.y += max(elevation, 0.5) * DISPLACEMENT_STRENGTH;
                    gl_Position = projectionMatrix * viewMatrix * modelPosition;

                    // Color
                    float colorMix = max(elevation, 0.25);
                    vec3 depthColor = vec3(1.0, 0.1, 0.1);
                    vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
                    vec3 finalColor = mix(depthColor, surfaceColor, colorMix);

                    // Varyings
                    vColor = finalColor;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;

                void main()
                {                 
                    gl_FragColor = vec4(vColor, 1.0);
                }
            `
        })

        this.shaderMesh = new THREE.Mesh(this.shaderGeometry, this.shaderMaterial)
        this.shaderMesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.shaderMesh)
    }

    update()
    {
        this.torusKnot.rotation.y = this.time.secondsElapsed * 0.1
    }

}
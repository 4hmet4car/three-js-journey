import * as THREE from 'three'
import Experience from "../Experience.js"
import parameters from '../parameters.js'

export default class Seagull
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.rayCaster = this.experience.rayCaster
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder("Seagull")
        }

        this.resource = this.resources.items.seagullModel

        this.setModel()
        this.setAnimation()

        // RayCaster raycast event
        this.rayCaster.on('raycast', () =>
        {
            this.updatePosition()
        })
    }

    setModel()
    {
        this.pivot = new THREE.Group()
        this.pivot.rotation.x = 0.2
        this.pivot.position.x = parameters.buoyPositionX
        this.pivot.position.z = parameters.buoyPositionZ
        this.scene.add(this.pivot)

        this.model = this.resource.scene
        this.model.scale.set(0.05, 0.05, 0.05)
        this.model.position.set(0, 0.3, -0.2)
        this.pivot.add(this.model)

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                const oldMaterial = child.material
                child.material = new THREE.MeshToonMaterial({
                    map: oldMaterial.map
                })
                oldMaterial.dispose()
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.play()
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
        this.pivot.rotation.y = this.time.secondsElapsed
        this.pivot.position.y = parameters.buoyPositionY
    }

    updatePosition()
    {
        this.pivot.position.x = parameters.buoyPositionX
        this.pivot.position.z = parameters.buoyPositionZ
    }
}
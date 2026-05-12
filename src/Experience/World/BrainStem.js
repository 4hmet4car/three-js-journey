import * as THREE from 'three'
import Experience from '../Experience.js'

export default class BrainStem
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        //Debug
        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Brain Stem')
        }

        //Setup
        this.resource = this.resources.items.brainStemModel

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene

        this.model.traverse((child) =>
        {
            if (child instanceof THREE.Mesh)
            {
                child.castShadow = true
                // child.receiveShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}
        this.animation.actions.dance = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.dance.play()

        //Debug
        if (this.debug.active) {
            const debugObject = {
                playDance: ()=>{this.addToScene()}
            }
            this.debugFolder.add(debugObject,'playDance')
        }
    }

    update()
    {
        //The mixer works with seconds
        //delta is in miliseconds
        //so we divide delta by 1000
        this.animation.mixer.update(this.time.delta * 0.001)
    }

    addToScene(){
        this.scene.add(this.model)
        this.scene.remove(this.experience.world.fox.model)
    }


}
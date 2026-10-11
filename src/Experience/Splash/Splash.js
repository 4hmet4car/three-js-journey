import * as THREE from 'three'
import Experience from "../Experience.js"

import overlayVertexShader from './shaders/vertex.glsl'
import overlayFragmentShader from './shaders/fragment.glsl'

import { SPLASH } from '../constants.js'

export default class Splash
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.setOverlayGeometry()
        this.setOverlayMaterial()
        this.setOverlay()
        this.setFadeOut()
    }

    setOverlayGeometry()
    {
        this.overlayGeometry = new THREE.PlaneGeometry(
            SPLASH.GEOMETRY.WIDTH,
            SPLASH.GEOMETRY.HEIGHT,
            SPLASH.GEOMETRY.WIDTH_SEGMENTS,
            SPLASH.GEOMETRY.HEIGHT_SEGMENTS,
        )
        this.overlayGeometry.deleteAttribute('uv')
    }

    setOverlayMaterial()
    {
        this.overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            vertexShader: overlayVertexShader,
            fragmentShader: overlayFragmentShader,
            uniforms:
            {
                uAlpha: new THREE.Uniform(1),
            },
        })
    }

    setOverlay()
    {
        this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        this.scene.add(this.overlay)
    }

    setFadeOut()
    {
        this.splashCanFadeOut = false
        this.fadeOutStartTime = 0
        this.resources.on('ready', () =>
        {
            this.fadeOutStartTime = this.time.secondsElapsed
            this.splashCanFadeOut = true
        })
    }

    update()
    {
        if (!this.splashCanFadeOut) return

        const secondsElapsedSinceEverythingWasLoaded = this.time.secondsElapsed - this.fadeOutStartTime
        const remainingAlpha = 1 - secondsElapsedSinceEverythingWasLoaded / SPLASH.ANIMATION.FADE_OUT_DURATION

        this.overlayMaterial.uniforms.uAlpha.value = Math.max(remainingAlpha, 0)

        if (remainingAlpha < 0)
        {
            this.splashCanFadeOut = false
            this.destroy()
        }
    }

    destroy()
    {
        this.scene.remove(this.overlay)
        this.overlayGeometry.dispose()
        this.overlayMaterial.dispose()
    }
}
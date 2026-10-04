import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'

export default [
    {
        name: 'dotScreenPass',
        enabled: false,
        pass: new DotScreenPass()
    },
    {
        name: 'glitchPass',
        enabled: true,
        pass: new GlitchPass()
    },
    {
        name: 'rgbShiftPass',
        enabled: false,
        pass: new ShaderPass(RGBShiftShader)
    },
    {
        name: 'gammaCorrectionPass',
        enabled: true,
        pass: new ShaderPass(GammaCorrectionShader)
    },
]
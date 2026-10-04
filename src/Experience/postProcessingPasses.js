import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

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
]
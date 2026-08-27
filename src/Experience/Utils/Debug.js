import GUI from 'lil-gui'

import * as parameters from '../parameters.js'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if (this.active)
        {
            this.ui = new GUI({ width: 340 })
            // this.ui.close()
        }
    }
}
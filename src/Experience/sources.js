/**
 * This module exports the sources
 * that are utilized in the project.
 * 
 * This module exports an array that
 * has each source as a seperate object.
 * 
 * -----------TYPES-----------
 * --> cubeTexture
 * --> texture
 * --> gltfModel
 */

export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path: [
            '/textures/environmentMap/px.jpg',
            '/textures/environmentMap/nx.jpg',
            '/textures/environmentMap/py.jpg',
            '/textures/environmentMap/ny.jpg',
            '/textures/environmentMap/pz.jpg',
            '/textures/environmentMap/nz.jpg',
        ]
    },
    {
        name: 'dirtColorTexture',
        type: 'texture',
        path: '/textures/dirt/color.jpg'
    },
    {
        name: 'dirtNormalTexture',
        type: 'texture',
        path: '/textures/dirt/normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: '/models/Fox/glTF/Fox.gltf'
    },
]
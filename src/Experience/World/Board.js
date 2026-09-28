import * as THREE from 'three'
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg'
import Experience from "../Experience.js"
import { BOARD } from '../constants.js'

export default class Board
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.setBrushes()
        this.setEvaluator()
        this.subtractGeometries()
    }

    setBrushes()
    {
        this.boardFill = new Brush(new THREE.BoxGeometry(
            BOARD.BOARD_FILL.WIDTH,
            BOARD.BOARD_FILL.HEIGHT,
            BOARD.BOARD_FILL.DEPTH,
        ))
        this.boardHole = new Brush(new THREE.BoxGeometry(
            BOARD.BOARD_HOLE.WIDTH,
            BOARD.BOARD_HOLE.HEIGHT,
            BOARD.BOARD_HOLE.DEPTH,
        ))
        // this.boardHole.position.y = 0.2
        // this.boardHole.updateMatrixWorld()
    }

    setEvaluator()
    {
        this.evaluator = new Evaluator()
    }

    subtractGeometries()
    {
        this.board = this.evaluator.evaluate(this.boardFill, this.boardHole, SUBTRACTION)
        // Since we are not using the information about vertices and materials of
        // brushes, we remove these unused information from groups with clearGroups method.
        this.board.geometry.clearGroups()
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            color: BOARD.MATERIAL.COLOR,
            metalness: BOARD.MATERIAL.METALNESS,
            roughness: BOARD.MATERIAL.ROUGHNESS
        })
    }

    setMesh()
    {
        this.board.material = this.material
        this.board.castShadow = BOARD.MESH.CAST_SHADOW
        this.board.receiveShadow = BOARD.MESH.RECEIVE_SHADOW
        this.scene.add(this.board)
    }
}
import draw from "../scripts/draw.js"
import inputManager from "../scripts/inputManager.js"
import GameObject   from "../scripts/misc scripts/gameObject.js"
import math         from "../scripts/misc scripts/math.js"
const context = document.querySelector("canvas").getContext("2d")

class MousePointer extends (GameObject) {
    constructor() {
        super(100, 100, 0, 0, 2.5, 0)
        this.name = "mouse pointer"
        this.showPointer = inputManager.showMousePoint
    }

    handleInput() {
        super.handleInput()
        this.p              = inputManager.mousePoint
        this.showPointer    = inputManager.showMousePoint
    }

    display() {
        super.display()
        if (this.showPointer) {
            draw.circle(this.p, 1, true, "red")
        }
    }

    toggleVisible() { this.showPointer = !this.showPointer }
}

export default MousePointer
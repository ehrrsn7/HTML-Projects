import debug from "../scripts/misc scripts/debug.js"
import draw from "./draw.js"
import { restart } from "./main.js"
import Point from "./misc scripts/point.js"
import stateManager from "./stateManager.js"

// input keys
class Key {
    constructor(name="unknown key") {
        this.name = name
        this.pressed = false
    }
}

const inputManager = {
    inputKeys: [
        new Key("ArrowUp"),
        new Key("ArrowDown"),
        new Key("ArrowRight"),
        new Key("ArrowLeft"),
        new Key("Enter"),
        new Key(" ")
    ],

    mousePoint: new Point(document.clientX, document.clientY),
    showMousePoint: false,

    keyDown(event) {
        debug.log("keydown: " + event.key)
        
        switch(event.key) {
            case 'd':
                debug.toggleDebug()
                break
            case 'D':
                draw.toggleDarkMode()
                break
            case 'i':
                draw.drawImages = !draw.drawImages
                break
            case 'r':
                debug.display("Restarting game.")
                restart()
                break
            case 'b':
                draw.showBounding = !draw.showBounding
                break
            case 'p':
                var s = stateManager.currentState
                if (s == 2) stateManager.currentState = 0
                if (s == 0) stateManager.currentState = 2
                break

            // handle these in 'game' object
            case 'Enter':
            case ' ':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                debug.display(event.key)
                for (var i in inputManager.inputKeys)
                    if (inputManager.inputKeys[i].name == event.key) {
                        inputManager.inputKeys[i].pressed = true
                        debug.display(event.key)
                        return
                    }
        }
    },

    keyUp(event) {
        for (var i in inputManager.inputKeys) {
            var key = inputManager.inputKeys[i]
            if (key.name == event.key)
                key.pressed = false
        }
    },

    onClick(event) {
        debug.log("Mouse was clicked.")
        inputManager.showMousePoint = !inputManager.showMousePoint
    },

    mouseMove(event) {
        debug.log("Updating mouse position", event.clientX, event.clientY)    
        inputManager.mousePoint.set(
            event.clientX - 41,
            event.clientY - 101
        )
    }

}

export default inputManager
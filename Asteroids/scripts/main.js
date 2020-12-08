// import
import debug from "./misc scripts/debug.js"
import Point from "./misc scripts/point.js"
const canvas = document.querySelector("canvas")

// define
var mousePosition = new Point()
const FPS = 30
export default FPS

/************
 * GAME LOOP
 ************/
import Game from "./asteroids.js"
import draw from "./draw.js"
var asteroids = new Game()
setInterval(() => {
    asteroids.update()
    if (asteroids.restart == true) restart()
})


/****************
 * INPUT MANAGER
 ****************/
import inputManager from "./inputManager.js"

// keyboard input
document.addEventListener("keydown", inputManager.keyDown)

// key up (remove keys)
document.addEventListener("keyup", inputManager.keyUp)

// mouse click
document.addEventListener("mousedown", inputManager.onClick)

// mouse movement
document.addEventListener("mousemove", inputManager.mouseMove)

export function restart() {
    debug.display("Restarting game...")
    asteroids = new Game()
}

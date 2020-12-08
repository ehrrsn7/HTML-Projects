import draw             from "./draw.js"
import Ship             from "../gameobject scripts/ship.js"
import { loadShipLives }     from "./stateManager.js"
import Rock             from "../gameobject scripts/rock.js"
import MousePointer     from "../gameobject scripts/mousePointer.js"
import Image            from "./misc scripts/image.js"
import Dimensions       from "./misc scripts/dimensions.js"
import debug            from "./misc scripts/debug.js"
import time             from "./misc scripts/time.js"
import Point            from "./misc scripts/point.js"
import { FIRING_RATE }  from "../gameobject scripts/laser.js"
import inputManager     from "./inputManager.js"
import stateManager     from "./stateManager.js"
import collisionHandler from "./collisionHandler.js"
import math             from "./misc scripts/math.js"
const canvas = document.querySelector("canvas")

// Asteroids Game
class Game {
    constructor() {
        console.log("Game constructor called.")

        // game objects
        this.ship           = new Ship()
        this.shipLives      = loadShipLives(3) // [n shipLife's]
        this.lasers         = []
        this.rocks          = []
        this.asteroidBelt(6)
        this.mousePointer   = new MousePointer()
    }

    /*********
     * UPDATE
     *********/
    update() {
        this.handleInput()
        this.handleCollisions()
        time.tick()
        // stateManager.states[2].update()
        draw.fillBackground()
        this.mousePointer.update()
        this.ship.update()
        this.rocks.forEach((rock) => rock.update())
        for (var i in this.shipLives) this.shipLives[i].update()
        this.updateLasers()
        this.wrapObjects()
        this.handleDelayTimers()
    }

    /***************
     * HANDLE INPUT
     ***************/
    handleInput() {
        var key = ""
        for (var i in inputManager.inputKeys) {
            key = inputManager.inputKeys[i]
            switch(key.name) {
                case 'Enter':
                    if (key.pressed)
                        if (this.enterDelayTimer <= 0.0) {
                            this.rocks.push(new Rock())
                            this.enterDelayTimer = .175
                        }
                    break
                case ' ':
                    // fire on ' ' (space)
                    if (key.pressed)
                        if (this.laserDelayTimer <= 0.0) {
                            this.lasers.push(this.ship.fire())
                            this.laserDelayTimer = 1 / FIRING_RATE
                        }

                    break
                // accelerate on 'up' arrow key
                case "ArrowUp":
                    if (key.pressed)
                        this.ship.thrust = true
                    else this.ship.thrust = false
                    break
                // brake on 'down' arrow key
                case "ArrowDown":
                    if (key.pressed)
                        this.ship.brake = true
                    else this.ship.brake = false
                    break
                // rotate on arrow keys, respective to which key was pressed
                case "ArrowLeft":
                    if (key.pressed) this.ship.rotateLeft()
                    break
                case "ArrowRight":
                    if (key.pressed) this.ship.rotateRight()
                    break
            }
        }
    }

    /**
     * HANDLE COLLISIONS
     */
    handleCollisions() {
        for (var i in this.rocks) {
            // collisions between ship and rocks
            if (!this.ship.invulnerable)
                if (collisionHandler.distanceBetweenProjectiles(this.ship, this.rocks[i]) < this.ship.r + this.rocks[i].r) {
                    this.ship.hit()
                    this.rocks[i].hit()
                }

            // collisions between lasers and rocks
            for (var j in this.lasers) {
                if (collisionHandler.distanceBetweenProjectiles(this.rocks[i], this.lasers[j]) < this.rocks[i].r + this.lasers[j].r) {
                    this.rocks[i].hit()
                    this.lasers[j].hit()
                }
            }
        }
        this.cleanUpZombies()
    }

    cleanUpZombies() {
        for (var i = 0; i < this.lasers.length; i++) {
            if (!this.lasers[i].alive) {
                this.lasers.splice(i, 1)
                break
            }
        }

        for (var i = 0; i < this.rocks.length; i++) {
            if (!this.rocks[i].alive) {
                debug.display(`Splicing old rock: '${this.rocks[i].name}'`)
                var oldRock = this.rocks[i]
                var newRocks = oldRock.split()
                console.log(newRocks)
                if (oldRock.id < 3)
                    this.rocks.splice(i, 1, newRocks[0], newRocks[1])
                else this.rocks.splice(i, 1)
                break // do NOT delete this, unless you want a nasty bug
            }
        }

        debug.display(this.shipLives.length)
        if (!this.ship.alive) {
            this.ship = new Ship()
            if (this.shipLives.length > 0) this.shipLives.pop()
            else this.restart = true
        }
    }
    restart = false

    /***
     * FIRE
     */
    handleDelayTimers() {
        if (this.laserDelayTimer > 0.0)
            this.laserDelayTimer -= time.deltaTime
        if (this.enterDelayTimer > 0.0)
            this.enterDelayTimer -= time.deltaTime
    }
    laserDelayTimer = 0.0
    enterDelayTimer = 0.0

    /**
     * WRAP
     */
    wrapObjects() {
        this.wrap(this.ship)
        this.lasers.forEach((laser) => this.wrap(laser))
        this.rocks.forEach((rock)   => this.wrap(rock))
    }

    wrap(projectile) {
        var buffer = -projectile.radius
        if      (projectile.p.x < buffer) { projectile.p.x = canvas.width - buffer; return true }
        else if (projectile.p.x > canvas.width - buffer) { projectile.p.x = buffer; return true }

        if      (projectile.p.y < buffer) { projectile.p.y = canvas.height - buffer; return true }
        else if (projectile.p.y > canvas.height - buffer) { projectile.p.y = buffer; return true }

        return false
    }

    /**
     * LASERS
     */
    updateLasers() {
        for (var i = 0; i < this.lasers.length; i++)
            this.lasers[i].update()
    }

    /**
     * ROCKS
     */
    asteroidBelt(n) {
        for (var i = 0; i < n; i++) {
            this.rocks.push(new Rock())
        }
    }

    /**
     * MOUSE POINTER
     */
    updateMousePosition(point) {
        this.mousePointer.p = point
    }
}

export default Game
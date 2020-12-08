// DEFINE

// draw
const LASER_IMAGE               = document.getElementById("laser")
const LASER_SPEED               = 10 // speed of lasers in pixels per second
const LASER_DURATION            = 40
const LASER_MACHINE_GUN_MODE    = true
var   laser_machine_gun_mode    = LASER_MACHINE_GUN_MODE
const LASER_DELAY               = 1 // delay between lasers being shot

// class definition
class Laser extends Projectile {
    constructor() {
        super()
        this.img = LASER_IMAGE
    }

    draw() {
        rotate_and_draw(this.img, this.p.x, this.p.y, this.a, this.img.width, this.img.height)
    }
}
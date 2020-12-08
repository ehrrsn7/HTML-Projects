/*************************
 * SHIP CLASS DEFINITION *
 *************************/
// define constants
const SHIP_FRICTION = true
const SHIP_FRICTION_COEF = 0.9; // friction coefficient of "space" (0 = no friction, 1 = lots of friction)
const SHIP_SIZE = 18; // ship height in pixels
const SHIP_TURN_SPEED = 360; // ship turning speed in degrees/second
const SHIP_THRUST_AMOUNT = 20; // ship acceleration in pixels per second per second
const SHIP_MAX_SPEED = 30; // max speed in pixels per second
const SHIP_EXPLODE_DURATION = 2; // duration of ship's explosion in seconds
const SHIP_BLINK_DURATION = 4; // time ship blinks duration in seconds
const SHIP_BLINK_RATE = .2; // how long the blink duration lasts between moments of blinking in seconds

// define drawing functions and constants
const SHIP_IMAGE = document.getElementById("ship")
const SHIP_WITH_FLAME_IMAGE = document.getElementById("flameShip")
const SHIP_EXPLOSION_IMAGE = document.getElementById("shipExplosion")

function draw_ship(x, y, r, a,
    thrust = false, exploding = false, blinkOn = true,
    outline_color = "slate_gray", fill_color = "slate_gray", no_fill = false) {

    // draw images, not drawing
    if (draw_images) {
        // for images, tweak the angle a little bit..
        a = -a + rad(90)

        if (!exploding) {

            // blinkOn:
            // when ship is temporarily invulnerable after revival,
            // the ship is supposed to be blinking.
            // blinkOn and !blinkOn will be used to represent 
            // this blinking (timing logic determined by ship)
            if (blinkOn) {

                // draw ship
                if (!thrust) {
                    rotate_and_draw(SHIP_IMAGE, x, y, a, SHIP_IMAGE.width, SHIP_IMAGE.height)
                }

                // draw flames if ship.thrust == true
                else {
                    rotate_and_draw(SHIP_WITH_FLAME_IMAGE, x, y, a, SHIP_WITH_FLAME_IMAGE.width, SHIP_WITH_FLAME_IMAGE.height)
                }
            }
        } else {
            // (ship is exploding)
            // draw explosion here
            rotate_and_draw(SHIP_EXPLOSION_IMAGE, x, y, a, SHIP_EXPLOSION_IMAGE.width, SHIP_EXPLOSION_IMAGE.height)
        }

    }

    // don't use images, draw using context
    else {
        if (!exploding) {

            if (blinkOn) {
                // draw a triangular ship
                context.strokeStyle = "white";
                context.lineWidth = SHIP_SIZE / 20;
                context.beginPath();
                context.moveTo(
                    // (jump to) nose of the ship
                    x + (4 / 3) * r * Math.cos(a),
                    y - (4 / 3) * r * Math.sin(a)
                )
                context.lineTo(
                    // (draw to) rear left of the ship
                    x - r * ((2 / 3) * Math.cos(a) + Math.sin(a)),
                    y + r * ((2 / 3) * Math.sin(a) - Math.cos(a))
                )
                context.lineTo(
                    // (draw to) rear right of the ship
                    x - r * ((2 / 3) * Math.cos(a) - Math.sin(a)),
                    y + r * ((2 / 3) * Math.sin(a) + Math.cos(a))
                )
                context.closePath()
                if (!no_fill) { context.fill() }
                context.stroke();

                if (thrust) {
                    // if ship is thrusting, draw flames
                    // rendered as a red triangle at base of ship
                    context.fillStyle = "red";
                    context.strokeStyle = "yellow";
                    context.beginPath();
                    context.moveTo(
                        // back left, touching the ship
                        x - r * (2 /  3 * Math.cos(a) + .5 * Math.sin(a)),
                        y + r * (2 /  3 * Math.sin(a) - .5 * Math.cos(a))
                    );
                    context.lineTo(
                        // tip of the flames at the center behind ship
                        x - r * 6 /  3 * Math.cos(a),
                        y + r * 6 /  3 * Math.sin(a)
                    );
                    context.lineTo(
                        // back right, touching the ship
                        x - r * (2 /  3 * Math.cos(a) - .5 * Math.sin(a)),
                        y + r * (2 /  3 * Math.sin(a) + .5 * Math.cos(a))
                    )
                    context.closePath();
                    context.fill();
                    context.stroke();
                }
            }
        } else {
            draw_exploding_circle(x, y, r)
        }
    }

    // debug("draw_ship() from ship.js called.")
}

// ship definition

class Ship extends Projectile {
    constructor() {
        super();
        this.name = "Ship";
        this.p.x = WIDTH / 2; // x coordinate
        this.p.y = HEIGHT /  2; // y coordinate
        this.r = SHIP_SIZE; // ship radius
        this.a = rad(90); // ship angle
        this.rotate = "none"
        this.outline_color = "white"
        this.fill_color = "white"
        this.explodeTimer = 0
        this.exploded = false
        this.blinkingTimer = 0
        this.dv = new Velocity()
        this.health = 3

        debug("ship constructor called.")
    }

    /********
     * DRAW *
     ********/
    draw() {
        // call parent method to draw the bounding circle if constant is set to true
        super.draw()

        draw_ship(
            this.p.x,
            this.p.y,
            this.r,
            this.a,
            this.thrust,
            this.exploding,
            this.blinkOn
        )

        // debug("ship.draw() called")
    }

    /*********************
     * HANDLE COLLISIONS *
     *********************/
    hit() {
        if (!this.invulnerable) {
            this.explode()
                // debug("ship.hit()")
        }
    }

    get invulnerable() { return this.blinking }
    set invulnerable(boolValue) {
        if (boolValue) { this.blinking = true }
        // else         { this.blinking = false }
    }

    // explode timer
    get exploding() { return (this.explodeTimer > 0); }
    explode() {
        // set timer
        this.explodeTimer = Math.ceil(SHIP_EXPLODE_DURATION * FPS)
        this.exploded = true
            // debug("ship.explode()")
    }

    // blinking timer
    get blinking() { return (this.blinkingTimer > 0) }
    set blinking(boolValue) { if (boolValue) { this.blinkingTimer = Math.ceil(SHIP_BLINK_DURATION * FPS) } }

    get blinkOn() {
        if (this.blinking) { return this.blinkingTimer % (SHIP_BLINK_RATE * FPS * 2) < SHIP_BLINK_RATE * FPS } else { return true }
    }

    /********
     * MOVE *
     ********/
    advance() {
        if (!this.exploding) {
            super.advance();

            // handle ship thrust and acceleration
            this.accelerate()

            // rotate ship
            if (this.rotate == "left") {
                // debug(this.angle_degrees)
                this.a += SHIP_TURN_SPEED / 180 * Math.PI / FPS;
            } else if (this.rotate == "right") {
                // debug(this.angle_degrees)
                this.a -= SHIP_TURN_SPEED / 180 * Math.PI / FPS;
            }
        }

        // handle ship explotion duration
        else {
            this.explodeTimer--
        }

        // handle ship blinking duration
        if (this.blinking) {
            this.blinkingTimer--
                // debug("this.blinkingTimer == " + this.blinkingTimer)
        }
    }

    accelerate() {
        if (this.thrust) {
            this.dv.dx = SHIP_THRUST_AMOUNT * Math.sin(this.a + rad(90)) / FPS
            this.dv.dy = SHIP_THRUST_AMOUNT * Math.cos(this.a + rad(90)) / FPS
            var newVel = new Velocity(this.v.dx + this.dv.dx, this.v.dy + this.dv.dy)

            if (newVel.speed < SHIP_MAX_SPEED) {
                this.v.dx += this.dv.dx
                this.v.dy += this.dv.dy
                    // debug("ship.accelerate() called")
            } else {
                debug("ur breaking the speed limit lol ")
            }
        } else if (SHIP_FRICTION) {
            // TODO: fix this
            this.v.dx -= SHIP_FRICTION_COEF * this.v.dx /  FPS
            this.v.dy -= SHIP_FRICTION_COEF * this.v.dy /  FPS
        }
    }

    /*******
     * FIRE *
     *******/
    fire() {
        var new_laser = new Laser()
        var new_a = -this.a
        new_laser.a = new_a
        new_laser.p.x = this.p.x + (2.1 * this.r * Math.cos(new_a))
        new_laser.p.y = this.p.y + (2.1 * this.r * Math.sin(new_a))
        new_laser.v.dx = this.v.dx
        new_laser.v.dy = this.v.dy
        new_laser.v.dx += LASER_SPEED * Math.cos(new_a)
        new_laser.v.dy += LASER_SPEED * Math.sin(new_a)
        return new_laser
    }
}
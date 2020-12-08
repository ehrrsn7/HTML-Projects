/*********************************
 * ASTEROIDS CLASSES DEFINITIONS *
 *********************************/

// DEFINE
const ROCK_IS_MOVING                = true
const ROCK_INIT_AMNT                = 2 // initial count for asteroids
const ROCK_MAX_AMNT                 = 50 // max count for asteroids
const ROCK_VERTICIES                = 7 // average number of verticies of each rock
const ROCK_SHIP_BUFFER              = 100 // minimum distance in pixels between ship initial position and rocks being spawned
const ROCK_JAGGEDNESS               = .3 // jaggedness of asteroids (0 = none, 1 = lots)
const ROCK_MAX_ROTATION_SPEED       = 3 // max rate of change of angle in degrees per second
const ROCK_LINE_WIDTH               = 1 // stroke size of rocks (when using context drawing methods) in pixels
const ROCK_SPEED                    = 30 // max starting speed in pixels per second

var rock_is_moving                  = ROCK_IS_MOVING

 // Classes
class Asteroid extends Projectile {
    constructor() {
        super()
        this.name           = "unknown asteroid"
        this.img            = BIG_ROCK_IMAGE
        this.r              = BIG_ROCK_SIZE
        this.rotation_speed = (Math.random() * 2 - 1) * rad(ROCK_MAX_ROTATION_SPEED) // random number ranging from (-1 to 1) * rock rotation constant for rate of change
        this.verticies      = 5
        this.vertex_offsets = []
        this.initialize_velocity(BIG_ROCK_SPEED)
        this.initialize_random_point()
        this.initialize_vertecies(ROCK_VERTICIES)
        debug(this.name + " created.")
    }

    initialize_random_point() {
        do {
            this.p.x = Math.random() * canvas.width
            this.p.y = Math.random() * canvas.height
        } while (distance_between_pts(this.p.x, this.p.y, canvas.width/2, canvas.height/2) < ROCK_SHIP_BUFFER);
    }

    initialize_velocity(speed) {
        this.angle_degrees = Math.random() * 360
        this.v.dx = Math.cos(this.a) * speed / FPS * (Math.random() < 0.5 ? 1 : -1);
        this.v.dy = Math.sin(this.a) * speed / FPS * (Math.random() < 0.5 ? 1 : -1);
    }

    initialize_vertecies(verticies) {
        // initialize verticies amount
        this.verticies = Math.floor(Math.random() * (this.verticies + 1) + 2 + this.verticies / 2)

        // initialize vertex offsets
        for (var i = 0; i < this.verticies; i++) {
            this.vertex_offsets.push(Math.random() * ROCK_JAGGEDNESS * 2 + 1 - ROCK_JAGGEDNESS)
        }
    }

    advance() {
        if (rock_is_moving) {
            super.advance()
            this.a += this.rotation_speed
        }
    }

    draw() {
        // call other debugging draw functions in parent method
        super.draw()

        // for debugging purposes, let's draw 
        // a green circle in place of rock to 
        // represent if rock.alive == ALIVE or
        //           if it         == DEAD
        if (this.alive) { show_bounding_circle(this.p.x, this.p.y, this.r, "limeGreen", true); }
        // draw rock
        if (draw_images) {
            // debug("drawing rock via image...")
            rotate_and_draw(this.img, this.p.x, this.p.y, this.a, this.img.width, this.img.height)
        }
        else {
            // debug("not drawing rock via image...")
    
            // update draw info to draw rock
            context.strokeStyle = "slategrey"
            context.lineWidth   = ROCK_LINE_WIDTH
    
            // draw a path
            context.beginPath();
    
            // move to first vertex
            context.moveTo(
                this.p.x + this.r * this.vertex_offsets[0] * Math.cos(this.a),
                this.p.y + this.r * this.vertex_offsets[0] * Math.sin(this.a)
            )
    
            // draw the polygon
            for (var i = 1; i < this.verticies; i++) {
                context.lineTo(
                    this.p.x + this.r * this.vertex_offsets[i] * Math.cos(this.a + i * Math.PI * 2 / this.verticies),
                    this.p.y + this.r * this.vertex_offsets[i] * Math.sin(this.a + i * Math.PI * 2 / this.verticies)
                )
            }
    
            // tell canvas to paint the paths
            context.closePath();
            context.stroke();
    
        }
    }

    hit() {
        super.hit()
        // debug(this.name + ".hit() called.")
    }
}

const BIG_ROCK_SIZE                 = 50 // starting radius of big rock in pixels
const BIG_ROCK_SPEED                = ROCK_SPEED // max starting speed in pixels per second
const BIG_ROCK_IMAGE                = document.getElementById("bigRock")
const BIG_ROCK_VERTICIES            = 6 // average number of verticies in big rock
const BIG_ROCK_ROTATION_SPEED       = ROCK_MAX_ROTATION_SPEED // rate of change of angle of BIG_ROCK in degrees per second

class Big_Asteroid extends Asteroid {
    constructor() {
        super();
        this.alive          = true
        this.name           = "big asteroid"
        this.img            = BIG_ROCK_IMAGE
        this.r              = BIG_ROCK_SIZE
        this.rotation_speed = (Math.random() * 2 - 1) * rad(BIG_ROCK_ROTATION_SPEED) // random number ranging from (-1 to 1) * rock rotation constant for rate of change
        this.initialize_vertecies(BIG_ROCK_VERTICIES)
        this.initialize_velocity(BIG_ROCK_SPEED)
        debug(this.name + " created.")
    }
}

const MEDIUM_ROCK_SIZE              = 30 // starting radius of big rock in pixels
const MEDIUM_ROCK_SPEED             = BIG_ROCK_SPEED + 20 // max starting speed in pixels per second
const MEDIUM_ROCK_IMAGE             = document.getElementById("mediumRock")
const MEDIUM_ROCK_VERTICIES         = 6 // average number of verticies in big rock
const MEDIUM_ROCK_ROTATION_SPEED    = BIG_ROCK_ROTATION_SPEED * 2 // rate of change of angle of MEDIUM_ROCK in degrees per second

class Medium_Asteroid extends Asteroid {
    constructor(x_init=canvas.width/2, y_init=canvas.height/2) {
        super();
        this.name           = "medium asteroid"
        this.img            = MEDIUM_ROCK_IMAGE
        this.r              = MEDIUM_ROCK_SIZE
        this.rotation_speed = (Math.random() * 2 - 1) * rad(MEDIUM_ROCK_ROTATION_SPEED) // random number ranging from (-1 to 1) * rock rotation constant for rate of change
        this.p.x            = x_init
        this.p.y            = y_init
        this.initialize_vertecies(MEDIUM_ROCK_VERTICIES)
        this.initialize_velocity(MEDIUM_ROCK_SPEED)
        debug(this.name + " created.")
    }
}

const SMALL_ROCK_SIZE               = 30 // starting radius of big rock in pixels
const SMALL_ROCK_SPEED              = MEDIUM_ROCK_SPEED + 20 // max starting speed in pixels per second
const SMALL_ROCK_IMAGE              = document.getElementById("bigRock")
const SMALL_ROCK_VERTICIES          = 6 // average number of verticies in big rock
const SMALL_ROCK_ROTATION_SPEED     = MEDIUM_ROCK_ROTATION_SPEED * 2 // rate of change of angle of SMALL_ROCK in degrees per second

class Small_Asteroid extends Asteroid {
    constructor(x_init=canvas.width/2, y_init=canvas.height/2) {
        super();
        this.name           = "small asteroid"
        this.img            = SMALL_ROCK_IMAGE
        this.r              = SMALL_ROCK_SIZE
        this.rotation_speed = (Math.random() * 2 - 1) * rad(SMALL_ROCK_ROTATION_SPEED) // random number ranging from (-1 to 1) * rock rotation constant for rate of change
        this.p.x            = x_init
        this.p.y            = y_init
        this.initialize_vertecies(SMALL_ROCK_VERTICIES)
        this.initialize_velocity(SMALL_ROCK_SPEED)
        debug(this.name + " created.")
    }
}


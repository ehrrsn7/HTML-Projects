function magnitude_of_(x, y) { return Math.sqrt((x ** 2) + (y ** 2)); }

function deg(angle_rad) { return 180 * angle_rad / Math.PI; }

function rad(angle_deg) { return Math.PI * angle_deg /  180; }

function distance_between_pts(x1, y1, x2, y2) { return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2)); }

function distance_between_projs(proj1, proj2) { return distance_between_pts(proj1.p.x, proj1.p.y, proj2.p.x, proj2.p.y) }

/********************
 * POINT / VELOCITY *
 ********************/
class Point {
    constructor(x_init = 0, y_init = 0) {
        this.x = x_init;
        this.y = y_init;
    }
}

class Velocity {
    constructor(dx_init = 0, dy_init = 0) {
        this.dx = dx_init;
        this.dy = dy_init;
    }

    get speed() { return Math.sqrt((this.dx ** 2) + (this.dy ** 2)); }
}

/**************
 * PROJECTILE *
 **************/
const ALIVE = true
const DEAD = false
const PROJ_IMG_DEFAULT = document.getElementById("projImg")

class Projectile {
    constructor() {
        this.name = "projectile"
        this.p = new Point()
        this.v = new Velocity()
        this.a = 0
        this.r = 0
        this.img = PROJ_IMG_DEFAULT
        this.alive = ALIVE
        debug("projectile constructor called")
        this.health = 1;
    }

    initialize_random_point() {
        this.p.x = Math.random() * canvas.width
        this.p.y = Math.random() * canvas.height
    }

    get angle_degrees() { return deg(this.a); }
    set angle_degrees(new_angle) { this.a = new_angle; }

    advance() {
        // update position
        this.p.x += this.v.dx
        this.p.y += this.v.dy
    }

    hit() {
        this.health--;
        debug(this.name + " health: " + this.health);
        if (this.health <= 0) {
            this.alive = DEAD;
        }

        debug(this.name + ".hit()")
        debug(this.name + ".alive == " + this.alive)
    }

    draw() {
        if (this.draw_images) {
            rotate_and_draw(this.img)
        } else {
            this.show_bounding_circle()
        }
        // draw_center_dot()
    }

    show_bounding_circle() {
        if (this.alive) {
            show_bounding_circle(this.p.x, this.p.y, this.r)
        }
    }
}
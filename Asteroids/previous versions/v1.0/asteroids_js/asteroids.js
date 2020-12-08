/**
 * GAME OBJECT
 */
class Game {
    /*******************
     * INITIALIZE GAME *
     *******************/
    // constructor
    constructor() {
        // initialize game objects
        this.ship           = new Ship()
        this.asteroids      = []
        this.create_asteroid_belt();

        this.lasers         = []
        this.laser_timer    = 0
        this.firing         = false

        debug("Game() constructor called.")
    }

    // create asteroid belt
    create_asteroid_belt() {
        for (var i = 0; i < ROCK_INIT_AMNT; i++) {
            var new_rock = new Big_Asteroid();
            this.asteroids.push(new_rock)
        }
    }

    /********
     * DRAW *
     ********/
    draw() {
        // draw space
        draw_background()

        // draw ship
        this.ship.draw()

        // draw asteroids
        for (var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].draw()
        }

        // draw lasers
        for (var i = 0; i < this.lasers.length; i++) {
            this.lasers[i].draw()
        }

        // gamestate
        gamestate.draw_message()
    }

    /***********
     * ADVANCE *
     ***********/
    advance() {
        // debug("game.advance() called.")

        this.ship.advance()
        this.advance_asteroids()
        this.advance_lasers()
        this.handle_wrapping()
    }

    advance_asteroids() {
        // move asteroids
        for (var i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].advance();
        }
    }

    advance_lasers() {
        // debug("game.advance_lasers() called.")

        // move lasers
        for (var i = 0; i < this.lasers.length; i++) {
            this.lasers[i].advance();
        }

        // handle machine gun
        // debug("game.laser_timer == " + this.laser_timer)
        // debug("game.laser_is_firing == " + this.laser_is_firing)
        // if (this.laser_timer > 0) { this.laser_timer-- }
        // if (this.laser_is_firing) { this.fire_machine_gun() }
    }

    /********
     * WRAP *
     ********/
    handle_wrapping() {
        this.wrap(this.ship)
        this.wrap_asteroids()
    }

    wrap_asteroids() { for (var i = 0; i < this.asteroids.length; i++) { this.wrap(this.asteroids[i])}}
    wrap_lasers()    { for (var i = 0; i < this.lasers.length;    i++) { this.wrap(this.lasers[i])}}

    wrap(proj) {
        // debug("game.wrap() called.")
        // handle left / right sides
        var left_x      = 0
        var right_x     = canvas.width

        if      (proj.p.x < left_x   - proj.r) {
            proj.p.x = right_x  + proj.r
            // debug("left side reached, wrapping " + proj.name)
        }
        else if (proj.p.x > right_x  + proj.r) {
            proj.p.x = left_x   - proj.r
            // debug("right side reached, wrapping " + proj.name)
        }
        
        // handle top / bottom sides
        var top_y       = canvas.height
        var bottom_y    = 0

        if      (proj.p.y < bottom_y - proj.r) {
            proj.p.y = top_y    + proj.r
            // debug("bottom edge reached, wrapping " + proj.name)
        }
        else if (proj.p.y > top_y    + proj.r) {
            proj.p.y = bottom_y - proj.r
            // debug("top edge reached, wrapping " + proj.name)
        }
    }

    /**************
     * COLLISIONS *
     **************/
    handle_collisions() {
        var too_close
        var distance_between_projectiles
        var was_hit

        // loop through all asteroids
        for (var i = 0; i < this.asteroids.length; i++) {

            /**************************************************
             * if ship is invulnerable, don't let any asteroids
             * on the screen get destroyed 
             **************************************************/
            if (!this.ship.invulnerable) {
                
                // check for hit
                distance_between_projectiles = distance_between_projs(this.asteroids[i], this.ship)
                too_close = this.ship.r + this.asteroids[i].r
                was_hit = distance_between_projectiles < too_close
                if (was_hit) {

                    debug(this.ship.name + " and " + this.asteroids[i].name + " have been hit")
                    this.ship.hit()
                    this.asteroids[i].hit()

                    // (delete this code, and the screen gets flooded 
                    // with asteroids at a certain point 😬)
                    break;
                }
            }
            else {
                debug(this.ship.name + " was hit, but ship.invulnerable == true")
            }
        }

        //     // don't do anything if ship is exploding
        //     if (!this.ship.exploding) {

        //         // check collisions between ship and rocks

        //         too_close = this.ship.r + this.asteroids[i].r
        //         distance_between_projectiles  = distance_between_projs(this.ship, this.asteroids[i])

        //         if (distance_between_projectiles < too_close) {
        //             debug("hit!")

        //             // hit the ship
        //             this.ship.hit()

        //             // hit the rock at position i
        //             // and split into two smaller rocks
        //             // (if not already a small rock)
        //             this.asteroids[i].hit()

        //             break;
        //         }

        //         // handle case where ship has exploded, 
        //         // but explosion duration has expired
        //         if (!this.ship.exploding && this.ship.exploded) {
        //             debug("!this.ship.exploding && this.ship.exploded")
        //             this.reset_ship()
        //         }

        //         // // debug...
        //         // debug("too_close        == " + too_close)
        //         // debug("distance_between == " + distance_between_projectiles)
        //     }
            
        //     // check colliions between lasers and rocks
        //     for (var i = 0; i < this.lasers.length; i++) {
        //         too_close = this.lasers[i].r + this.asteroids[i].r
        //         distance_between_projectiles = distance_between_projs(this.lasers[i], this.asteroids[i])
        //         // debug...
        //         debug("too_close        == " + too_close)
        //         debug("distance_between == " + distance_between_projectiles)
        //         debug("laser["+i+"].r       == " + this.lasers[i].r)
        //         debug("lasers.length    == " + this.lasers.length)
        //     }

        // delete any rocks/objects where alive == false
        this.clean_up_zombies()
    }

    clean_up_zombies() {

        // split asteroids
        // destroy small rocks [in split()]
        for (var i = this.asteroids.length - 1; i >= 0; i--) {
            if (!this.asteroids[i].alive) {
                // debug("splicing asteroid " + i)
                this.split(i)
            }
        }

        /***********************************************
         * After ship has been hit, it should explode.
         * After ship explodes, ship should be reset
         ***********************************************/
        var make_new_ship = !this.ship.exploding && this.ship.exploded
        if (make_new_ship) {
            this.ship = new Ship()
            this.ship.invulnerable = true
            debug("making new " + this.ship.name + "...")
            debug("this.ship.invulnerable == " + this.ship.invulnerable)
        }
    }

    split(old_rock_i) {
        // split

        var x = this.asteroids[old_rock_i].p.x
        var y = this.asteroids[old_rock_i].p.y

        switch (this.asteroids[old_rock_i].name) {
            case "big asteroid":
                debug("splitting big asteroid into 2 medium asteroids...")

                var new_rock1 = new Medium_Asteroid(x, y)
                var new_rock2 = new Medium_Asteroid(x, y)

                // kill old rock and add both new rocks to array
                this.asteroids.splice(old_rock_i, 1, new_rock1, new_rock2)

                break;

            case "medium asteroid":
                debug("splitting medium asteroid into 2 small asteroids...")

                var new_rock1 = new Small_Asteroid(x, y)
                var new_rock2 = new Small_Asteroid(x, y)

                // kill old rock and add both new rocks to array
                this.asteroids.splice(this.asteroids[old_rock_i], 1, new_rock1, new_rock2)

                break;

            case "small asteroid":
                debug("destroying small asteroid...")

                // kill old rock and add both new rocks to array
                this.asteroids.splice(this.asteroids[old_rock_i], 1)

                break;
        }
    }

    /**************
     * GAME STATE *
     **************/
    // ship
    reset_ship() {
        this.ship = new Ship()
        this.ship.blinking = true
    }

    /********
     * FIRE *
     ********/
    fire_laser() { this.lasers.push(this.ship.fire()) }
    fire_machine_gun() {
        debug("game.fire_laser() called")
        debug("game.laser_is_firing == true")

        if (this.laser_timer > 0) {
            debug("laser is firing")
            this.lasers.push(this.ship.fire())
        }
        else {
            debug("")
            this.laser_timer = LASER_DELAY * FPS
        }
    }

    get laser_is_firing() { return this.firing }
    set laser_is_firing(is_firing) {
        if (is_firing) {
            this.firing = true
            this.laser_timer = LASER_DELAY * FPS
        }
        else {
            this.firing = false
            this.laser_timer = 0
        }
    }
}

function restart_game() {
    game = new Game()
}

/*****************
 * HANDLE EVENTS *
 *****************/
// set up event handlers
document.addEventListener("keydown",  keyDown)
document.addEventListener("keyup",    keyUp  )
document.addEventListener("click",    onClick)

// game state
var pause = false

// toggle
function toggle(conditional) {
    if (conditional)  {  return false;  }
    else              {  return true;   }
}

// handle events where keys are pressed
function keyDown(/** @type {KeyBoardEvent} */ ev) {
    // game.held_keys.push(ev.keyCode)
    switch(ev.keyCode) {
        case SPACE_BAR:
            // fire bullet
            game.laser_is_firing = true
            game.fire_laser()
            debug("space")
            break;
        case ARROW_LEFT:
            // rotate ship left
            // set ship.rotate to "left" and 
            // ship.advance >> ship.handle_rotation
            // in ship object will handle rotation
            game.ship.rotate = "left";
            // debug("left")
            break;
        case ARROW_UP:
            // set ship.thrust to true and 
            // ship.advance >> ship.acceleration
            // in ship object will handle rotation
            game.ship.thrust = true;
            // debug("setting ship.thrust to true...")
            // debug("up")
            break;
        case ARROW_RIGHT:
            // set ship.rotate to right
            // ship object will handle rotation
            game.ship.rotate = "right";
            // debug("right")
            break;
        case A:
            draw_images = toggle(draw_images)
            break;
        case C:
            debug("'c' was pressed")
            show_bounding = toggle(show_bounding)
            break;
        case P:
            debug("'p' was pressed")
            pause = toggle(pause)
            if (!pause) { gamestate.pause() }
            break;
        case M:
            debug("'m' was pressed")
            rock_is_moving = toggle(rock_is_moving)
        case R:
            debug("'h' was pressed")
            restart_game()
            break;
    }
}

// handle events where keys are unpressed
function keyUp(/** @type {KeyBoardEvent} */ ev) {
    // game.held_keys.splice(ev.keyCode)
    switch(ev.keyCode) {
        case SPACE_BAR:
            this.laser_is_firing = false
            break;
        case ARROW_LEFT:
            // stop rotating ship left
            // set 
            game.ship.rotate = "none";
            break;
        case ARROW_UP:
            // stop accelerating ship
            game.ship.thrust = false;
            break;
        case ARROW_RIGHT:
            // stop rotating ship right
            game.ship.rotate = "none";
            break;
    }
}

// handle event where mouse was pressed
function onClick(/** @type {KeyBoardEvent} */ ev) {
    debug("mouse was clicked")
}
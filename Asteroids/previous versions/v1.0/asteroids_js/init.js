// set up canvas/context variables
/** @type {HTMLCanvasElement} **/
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

/**********
 * DEFINE *
 **********/
// frames per second
const FPS   = 60;
const WIDTH = 700;
const HEIGHT = 500;

// include (function)
function include(file) {

    var script   = document.createElement("script");
    script.src   = file;
    script.type  = "text/javascript";
    script.defer = true;

    document.getElementsByTagName("head").item(0).appendChild(script);
}

// printf (function)
// const DEBUG = true;
// function debug(input) { if (DEBUG) {console.log("debug:", input)} }

// set up the game loop using FPS const
setInterval(update, 1000 / FPS);

// once our game object class has been defined, create an instance of it
var game = new Game()

// set um gamestate object
var gamestate = new Gamestate()

/**********
 * UPDATE *
 **********/
function update() {
    // debug("update() called")

    // debug("pause == false")
    game.draw()
    game.advance()
    game.handle_collisions()
}



const TEXT_FADE_TIME    = 2.5; // text fade time in seconds
const TEXT_SIZE         = 40; // text font height in pixels
const MSG_PAUSE         = "Game Paused"
const MSG_MAIN_MENU     = "Main Menu"
var textAlpha           = 1

// gamestates
const RESUME            = 0
const PAUSE             = 1

class Gamestate {
    constructor() {
        this.Gamestate = 0
        this.message = "unknown message"
    }

    // gamestates
    get pause() { return PAUSE }

    pause()     {
        textAlpha = 1
        this.message = MSG_PAUSE
    }
    
    main_menu() {
        textAlpha = 1
        this.message = MSG_MAIN_MENU
    }

    draw_message() {
        if (textAlpha > 0) {
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "rgba(255, 255, 255, " + textAlpha + ")";
            context.font = "small-caps " + TEXT_SIZE + "px dejavu sans mono";
            context.fillText(this.message, canvas.width / 2, canvas.height * 0.75);
            textAlpha -= (1.0 / TEXT_FADE_TIME / FPS);
        }
    }
}
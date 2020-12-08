
/******************
 * DRAW FUNCTIONS *
 ******************/
const DRAW_IMAGES       = true
const SHOW_CENTER_DOT   = true
const SHOW_BOUNDING     = false
const BACKGROUND_IMG    = document.getElementById("backgroundStars")

var draw_images         = DRAW_IMAGES
var show_center_dot     = SHOW_CENTER_DOT
var show_bounding       = SHOW_BOUNDING

function draw_background() {
    if (draw_images) {
        context.drawImage(BACKGROUND_IMG, 0, 0)
    }
    else {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function draw_message() {

}

function rotate_and_draw(img, x, y, a, w, h) {
    // use context save() and restore() to make sure only image is being rotated
    context.save()

    // translate & rotate
    context.translate(x, y)
    context.rotate(a)
    
    // draw image with image center on specified x and y coordinates
    context.drawImage(img, -w/2, -h/2, w, h)
    
    // restore canvas 
    context.translate(-x, -y)
    context.rotate(-a)
    context.restore()
}

function draw_center_dot(x, y, color="red", side_length=2) {
    
    if (SHOW_CENTER_DOT) {
        // draw red rectangle with width/length == 2 pixels
        context.strokeStyle = color
        context.fillStyle = color;
        context.fillRect(x, y, side_length, side_length);
        // debug("drawing center dot.")
    }
}

function show_bounding_circle(x, y, r, color="lime", fill=false) {
    if (show_bounding) {
        if (!fill) {
            context.strokeStyle = color
            context.lineWidth   = r / 50
            context.beginPath()
            context.arc(x, y, r, 0, rad(360), false)
            context.closePath()
            context.stroke()
        }
        else {
            context.fillStyle   = color
            context.strokeStyle = color
            context.lineWidth   = r / 50
            context.beginPath()
            context.arc(x, y, r, 0, rad(360), false)
            context.closePath()
            context.fill()
            context.stroke()
        }
    }
}

function draw_exploding_circle(x, y, r, color="red", fillColor="orange", fillColor2="yellow") {
    if (!draw_images) {
        context.strokeStyle = color
        context.fillStyle   = fillColor
        context.lineWidth   = 1
        context.beginPath()
        context.arc(x, y, r, 0, rad(360), false)
        context.closePath()
        context.fill()
        context.stroke()

        context.strokeStyle = fillColor
        context.fillStyle   = fillColor2
        context.lineWidth   = 1
        context.beginPath()
        context.arc(x, y, r/2, 0, rad(360), false)
        context.closePath()
        context.fill()
        context.stroke()
    }
}
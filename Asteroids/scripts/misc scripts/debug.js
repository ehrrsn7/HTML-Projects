const debugEl = document.getElementById("debug")

const debug = {
    DEBUG: false,
    toggleDebug: function() {
        this.DEBUG = !this.DEBUG
        if (this.DEBUG) console.log("DEBUG enabled.")
        else            console.log("DEBUG disabled.")

        if (this.DEBUG) debugEl.style.visibility = "visible"
        else            debugEl.style.visibility = "hidden"

        if (this.DEBUG) this.display("Debug:", "user feedback")
    },
    log: function(txt, debug_msg=true) {
        var text = " "
        if (debug_msg) text = "debug: "
        text += txt + " "
        if (this.DEBUG) console.warn(text)
    },
    update: function() {

    },
    display: function(text, id="user feedback") {
        if (this.DEBUG) {
            // get element
            let element = document.getElementById(id)

            // if element doesn't exist, create one
            let x = typeof(element)
            if (x == undefined || x == null || x == NaN) {
                console.warn("Creating new element: ", text, id)
                element = document.createElement("h3")
                element.appendChild(document.createTextNode(text))
                document.appendChild(element)
                return
            }

            // display text
            element.innerHTML = text
        }
    }
}

export default debug
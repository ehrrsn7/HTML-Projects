// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/misc scripts/debug.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var debugEl = document.getElementById("debug");
var debug = {
  DEBUG: false,
  toggleDebug: function toggleDebug() {
    this.DEBUG = !this.DEBUG;
    if (this.DEBUG) console.log("DEBUG enabled.");else console.log("DEBUG disabled.");
    if (this.DEBUG) debugEl.style.visibility = "visible";else debugEl.style.visibility = "hidden";
    if (this.DEBUG) this.display("Debug:", "user feedback");
  },
  log: function log(txt) {
    var debug_msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var text = " ";
    if (debug_msg) text = "debug: ";
    text += txt + " ";
    if (this.DEBUG) console.warn(text);
  },
  update: function update() {},
  display: function display(text) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "user feedback";

    if (this.DEBUG) {
      // get element
      var element = document.getElementById(id); // if element doesn't exist, create one

      var x = _typeof(element);

      if (x == undefined || x == null || x == NaN) {
        console.warn("Creating new element: ", text, id);
        element = document.createElement("h3");
        element.appendChild(document.createTextNode(text));
        document.appendChild(element);
        return;
      } // display text


      element.innerHTML = text;
    }
  }
};
var _default = debug;
exports.default = _default;
},{}],"scripts/misc scripts/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("./debug.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point = /*#__PURE__*/function () {
  function Point() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "translate",
    value: function translate(v) {
      var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (debug) console.warn(v);
      this.x += v.dx;
      this.y -= v.dy;
    }
  }, {
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "tostring",
    value: function tostring() {
      return "Point: ".concat(this.x, " ").concat(this.y);
    }
  }, {
    key: "up",
    get: function get() {
      return new Point(0, -1);
    }
  }, {
    key: "down",
    get: function get() {
      return new Point(0, 1);
    }
  }, {
    key: "right",
    get: function get() {
      return new Point(1, 0);
    }
  }, {
    key: "left",
    get: function get() {
      return new Point(-1, 0);
    }
  }]);

  return Point;
}();

var _default = Point;
exports.default = _default;
},{"./debug.js":"scripts/misc scripts/debug.js"}],"scripts/misc scripts/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var math = {
  rad: function rad(angleDegrees) {
    return angleDegrees * Math.PI / 180;
  },
  deg: function deg(angleRadians) {
    return angleRadians * 180 / Math.PI;
  },
  mag: function mag(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  },
  randomrange: function randomrange(a, b) {
    return a + (b - a) * Math.random();
  },
  dist: function dist(p1, p2) {
    return this.mag(p2.x - p1.x, p2.y - p1.y);
  }
};
var _default = math;
exports.default = _default;
},{}],"scripts/draw.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = _interopRequireDefault(require("./misc scripts/math.js"));

var _debug = _interopRequireDefault(require("./misc scripts/debug.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import
var bodyTag = document.querySelector("body");
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d"); // draw module

var draw = {
  drawImages: false,
  darkMode: true,
  // darkMode: ("black" == this.cssGetter(bodyTag, "--color")),
  toggleDarkMode: function toggleDarkMode() {
    this.darkMode = !this.darkMode;

    _debug.default.log("Dark mode set to ".concat(this.darkMode));

    bodyTag.style.color = this.color;
  },
  rotateAndDraw: function rotateAndDraw(img, p, dim, a) {
    console.log("Rotate and draw() called"); // use context save() and restore() to make sure only image is being rotated

    context.save(); // translate & rotate

    context.translate(p.x, p.y);
    context.rotate(a); // draw image with image center on specified x and y coordinates

    context.drawImage(img, p.x, p.y, dim.w, dim.h); // restore canvas 

    context.translate(-p.x, -p.y);
    context.rotate(-a);
    context.restore();
  },
  importImage: function importImage(imageFilename, id, gameobject_dimensions) {
    var imageElement = document.createElement("img");
    imageElement.src = imageFilename;
    imageElement.id = id;
    canvas.appendChild(imageElement);
    return imageElement;
  },
  cssGetter: function cssGetter(element, varName) {
    return getComputedStyle(element).getPropertyValue(varName);
  },
  colorDark: "white",
  colorLight: "black",

  get color() {
    return this.darkMode ? this.colorDark : this.colorLight;
  },

  get canvasColor() {
    return this.darkMode ? this.colorLight : this.colorDark;
  },

  fillBackground: function fillBackground() {
    context.fillStyle = this.canvasColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  },
  triangle: function triangle(p, // point
  sl, // side length
  a // angle (radians)
  ) {
    a += _math.default.rad(90); // p = new Point(canvas.width / 2, canvas.height / 2)
    // draw a triangular ship

    context.strokeStyle = this.color;
    context.lineWidth = sl / 5;
    context.beginPath();
    context.moveTo( // (jump to) nose of the ship
    p.x + 4 / 3 * sl * Math.cos(a), p.y - 4 / 3 * sl * Math.sin(a));
    context.lineTo( // (draw to) rear left of the ship
    p.x - sl * (2 / 3 * Math.cos(a) + Math.sin(a)), p.y + sl * (2 / 3 * Math.sin(a) - Math.cos(a)));
    context.lineTo( // (draw to) rear right of the ship
    p.x - sl * (2 / 3 * Math.cos(a) - Math.sin(a)), p.y + sl * (2 / 3 * Math.sin(a) + Math.cos(a)));
    context.closePath();
    context.stroke();
  },
  circle: function circle(p, r) {
    var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.lineWidth = r;
    context.beginPath();
    context.arc(p.x, p.y, r, 0, _math.default.rad(360), false);
    context.closePath();
    context.stroke();
    context.fill();
  },
  point: function point(x, y) {
    if (x === y === NaN) {
      console.error("In draw.point(): invalid input for 'p'");
      return;
    }

    context.strokeStyle = "black";
    context.fillRect(x, y, 1, 1);
  },
  rock: function rock(x, y, r, a, vertices) {
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "slategrey";
    return function (r) {
      // update draw info to draw rock
      context.strokeStyle = "slategrey";
      context.lineWidth = 1.5; // draw a path

      context.beginPath();
      context.moveTo(x + r * Math.cos(_math.default.rad(a)), y + r * Math.sin(_math.default.rad(a)));
      var r = 75;
      vertices.forEach(function (vertex) {
        context.lineTo(x + vertex.offset * Math.cos(_math.default.rad(vertex.angle + a)), y + vertex.offset * Math.sin(_math.default.rad(vertex.angle + a)));
      }); // tell canvas to paint the paths

      context.closePath();
      context.stroke();
    }(r);
  }
}; // export draw object module

var _default = draw;
exports.default = _default;
},{"./misc scripts/math.js":"scripts/misc scripts/math.js","./misc scripts/debug.js":"scripts/misc scripts/debug.js"}],"scripts/misc scripts/time.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("./debug.js"));

var _main = _interopRequireDefault(require("../main.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Time = {
  currentTime: new Date(),
  deltaTime: 0.0,
  slowRateTimer: 0.0,
  tick: function tick() {
    // update currentTime and deltaTime
    var previousTime = this.currentTime;
    this.currentTime = new Date();
    this.deltaTime = (this.currentTime - previousTime) / 1000; // handle slow rate timer

    if (this.slowRateTimer <= 0.0) this.slowRateTimer = .1;else this.slowRateTimer -= this.deltaTime; // debug

    if (this.slowRateTimer == .1) _debug.default.display("fps = " + _main.default * _main.default * this.deltaTime + " s", "deltaTime");
  }
};
var _default = Time;
exports.default = _default;
},{"./debug.js":"scripts/misc scripts/debug.js","../main.js":"scripts/main.js"}],"scripts/misc scripts/dimensions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dimensions = /*#__PURE__*/function () {
  function Dimensions() {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Dimensions);

    this.w = w;
    this.h = h;
  }

  _createClass(Dimensions, [{
    key: "width",
    get: function get() {
      return this.w;
    },
    set: function set(new_w) {
      this.w = new_w;
    }
  }, {
    key: "height",
    get: function get() {
      return this.h;
    },
    set: function set(new_h) {
      this.h = new_h;
    }
  }]);

  return Dimensions;
}();

var _default = Dimensions;
exports.default = _default;
},{}],"scripts/misc scripts/image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draw = _interopRequireDefault(require("../draw.js"));

var _dimensions = _interopRequireDefault(require("./dimensions.js"));

var _point = _interopRequireDefault(require("./point.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var context = document.querySelector("canvas").getContext("2d");

var Image = /*#__PURE__*/function () {
  function Image() {
    var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "unspecified image";
    var dimensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _dimensions.default(0, 0);
    var load = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Image);

    // empty variables to hold information upon loadImage
    this.filename = filename;
    this.imageElement = undefined;
    this.dim = new _dimensions.default(0, 0); // load if constructor arguments are specified

    if (filename == "") return;
    if (load) this.loadImage(filename, id, dimensions);
  }

  _createClass(Image, [{
    key: "loadImage",
    value: function loadImage(img_filename, id, dimensions) {
      // handle invalid filename
      if (this.filename == "") {
        var errorMsg = "Error: calling Image.loadImage with invalid filename";
        console.error(errorMsg);
        return;
      } // initialize loading info


      console.log("Loading image '".concat(this.filename, "'..."));
      this.filename = img_filename;
      this.dim = dimensions; // use draw.importImage to place image on the screen and save the img element location

      this.imageElement = _draw.default.importImage(this.filename, id, this.dim);
    }
  }, {
    key: "display",
    value: function display() {
      context.drawImage(this.imageElement, 0, 0);
    }
  }, {
    key: "displayAtPoint",
    value: function displayAtPoint() {
      var gameobject_p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _point.default(0, 0);
      var gameobject_a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.p = gameobject_p;
      this.a = gameobject_a;

      _draw.default.rotateAndDraw(this.imageElement, this.p, this.dim, this.a);
    }
  }]);

  return Image;
}();

var _default = Image;
exports.default = _default;
},{"../draw.js":"scripts/draw.js","./dimensions.js":"scripts/misc scripts/dimensions.js","./point.js":"scripts/misc scripts/point.js"}],"scripts/misc scripts/gameObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _point = _interopRequireDefault(require("./point.js"));

var _dimensions = _interopRequireDefault(require("./dimensions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/************
 * @abstract
 ************/
var GameObject = /*#__PURE__*/function () {
  function GameObject() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, GameObject);

    this.name = "unknown GameObject";
    this.p = new _point.default(x, y);
    this.dim = new _dimensions.default(w, h);
    this.r = r;
    this.a = a;
    this.alive = true;
  } // update (advance)


  _createClass(GameObject, [{
    key: "update",
    value: function update() {
      this.display();
    } // display (draw)

  }, {
    key: "display",
    value: function display() {} // fixed update? also implement tick/render if so
    // properties (getters/setters)

  }, {
    key: "point",
    get: function get() {
      return this.p;
    },
    set: function set(new_p) {
      this.p = new_p;
    }
  }, {
    key: "radius",
    get: function get() {
      return this.r;
    },
    set: function set(new_r) {
      this.r = new_r;
    }
  }, {
    key: "angleRadians",
    get: function get() {
      return this.a;
    },
    set: function set(new_a) {
      this.a = new_a;
    }
  }, {
    key: "dimensions",
    get: function get() {
      return this.dim;
    },
    set: function set(new_dim) {
      this.dim = new_dim;
    }
  }]);

  return GameObject;
}();

var _default = GameObject;
exports.default = _default;
},{"./point.js":"scripts/misc scripts/point.js","./dimensions.js":"scripts/misc scripts/dimensions.js"}],"scripts/misc scripts/velocity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = _interopRequireDefault(require("./math.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Velocity = /*#__PURE__*/function () {
  function Velocity() {
    var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Velocity);

    this.dx = dx, this.dy = dy;
  }

  _createClass(Velocity, [{
    key: "add",
    value: function add(dv) {
      this.dx += dv.dx;
      this.dy += dv.dy;
    }
  }, {
    key: "forward",
    value: function forward(angle) {
      var magnitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      if (angle == NaN) angle = Math.atan2(this.dx, this.dy);
      angle += _math.default.rad(90);
      return new Velocity(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }
  }, {
    key: "tostring",
    value: function tostring() {
      return "(".concat(this.dx, ", ").concat(this.dy, ")");
    }
  }, {
    key: "speed",
    get: function get() {
      return _math.default.mag(this.dx, this.dy);
    },
    set: function set(magnitude) {
      var angle = Math.atan2(this.dx, this.dy);
      this.dx = magnitude * Math.cos(angle);
      this.dy = magnitude * Math.sin(angle);
    }
  }]);

  return Velocity;
}();

var _default = Velocity;
exports.default = _default;
},{"./math.js":"scripts/misc scripts/math.js"}],"scripts/misc scripts/projectile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("./debug.js"));

var _gameObject = _interopRequireDefault(require("./gameObject.js"));

var _velocity = _interopRequireDefault(require("./velocity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Projectile = /*#__PURE__*/function (_GameObject) {
  _inherits(Projectile, _GameObject);

  var _super = _createSuper(Projectile);

  function Projectile() {
    var _this;

    _classCallCheck(this, Projectile);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "rotationAmount", .1);

    _this.name = "unknown Projectile object";
    _this.v = new _velocity.default(0, 0);
    _this.rotation = 0;
    _this.friction = true;
    return _this;
  } // properties


  _createClass(Projectile, [{
    key: "update",
    // methods
    value: function update() {
      _get(_getPrototypeOf(Projectile.prototype), "update", this).call(this);

      this.point.translate(this.velocity);
    }
  }, {
    key: "rotate",
    value: function rotate(dr) {
      this.rotation -= dr;
    }
  }, {
    key: "rotateRight",
    value: function rotateRight() {
      this.rotate(this.rotationAmount);
    }
  }, {
    key: "rotateLeft",
    value: function rotateLeft() {
      this.rotate(-this.rotationAmount);
    }
  }, {
    key: "accelerate",
    value: function accelerate(angle, amount, thrust) {
      if (thrust) this.velocity.add(this.velocity.forward(angle, amount));else this.applyFriction(amount / 10);
    }
  }, {
    key: "applyFriction",
    value: function applyFriction(amount) {
      if (this.friction) {
        if (this.velocity.speed > .1) {
          this.velocity.dx -= amount * this.velocity.dx;
          this.velocity.dy -= amount * this.velocity.dy;
        } else this.velocity.speed = 0;
      }
    }
  }, {
    key: "velocity",
    get: function get() {
      return this.v;
    },
    set: function set(new_v) {
      this.v = new_v;
    }
  }]);

  return Projectile;
}(_gameObject.default);

var _default = Projectile;
exports.default = _default;
},{"./debug.js":"scripts/misc scripts/debug.js","./gameObject.js":"scripts/misc scripts/gameObject.js","./velocity.js":"scripts/misc scripts/velocity.js"}],"gameobject scripts/laser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FIRING_RATE = void 0;

var _draw = _interopRequireDefault(require("../scripts/draw.js"));

var _debug = _interopRequireDefault(require("../scripts/misc scripts/debug.js"));

var _math = _interopRequireDefault(require("../scripts/misc scripts/math.js"));

var _time = _interopRequireDefault(require("../scripts/misc scripts/time.js"));

var _projectile = _interopRequireDefault(require("../scripts/misc scripts/projectile.js"));

var _velocity = _interopRequireDefault(require("../scripts/misc scripts/velocity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LASER_SPEED = 7; // laser speed in pixels/second

var LASER_LIFE = .5; // laser expiration time in seconds

var Laser = /*#__PURE__*/function (_Projectile) {
  _inherits(Laser, _Projectile);

  var _super = _createSuper(Laser);

  function Laser(x, y, dx, dy, a, r) {
    var _this;

    _classCallCheck(this, Laser);

    console.log("Laser fired");
    _this = _super.call(this);
    _this.name = "laser";
    _this.angle = a + _math.default.rad(90);
    _this.radius = r / 10;
    _this.timer = LASER_LIFE; // 'fire'

    console.log(a);
    _this.point.x = x + r * Math.cos(_this.angle);
    _this.point.y = y - r * Math.sin(_this.angle);
    _this.v.dx = dx + LASER_SPEED * Math.cos(_this.angle);
    _this.v.dy = dy + LASER_SPEED * Math.sin(_this.angle);
    return _this;
  }

  _createClass(Laser, [{
    key: "update",
    value: function update() {
      this.display();
      this.p.translate(this.v);
      this.timer -= _time.default.deltaTime;
      if (this.timer <= 0) this.alive = false;
    }
  }, {
    key: "display",
    value: function display() {
      _draw.default.circle(this.p, this.r, true);
    }
  }]);

  return Laser;
}(_projectile.default);

var FIRING_RATE = 15;
exports.FIRING_RATE = FIRING_RATE;
var _default = Laser;
exports.default = _default;
},{"../scripts/draw.js":"scripts/draw.js","../scripts/misc scripts/debug.js":"scripts/misc scripts/debug.js","../scripts/misc scripts/math.js":"scripts/misc scripts/math.js","../scripts/misc scripts/time.js":"scripts/misc scripts/time.js","../scripts/misc scripts/projectile.js":"scripts/misc scripts/projectile.js","../scripts/misc scripts/velocity.js":"scripts/misc scripts/velocity.js"}],"gameobject scripts/ship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("../scripts/misc scripts/debug.js"));

var _time = _interopRequireDefault(require("../scripts/misc scripts/time.js"));

var _draw = _interopRequireDefault(require("../scripts/draw.js"));

var _image = _interopRequireDefault(require("../scripts/misc scripts/image.js"));

var _projectile = _interopRequireDefault(require("../scripts/misc scripts/projectile.js"));

var _point = _interopRequireDefault(require("../scripts/misc scripts/point.js"));

var _dimensions = _interopRequireDefault(require("../scripts/misc scripts/dimensions.js"));

var _laser = _interopRequireDefault(require("./laser.js"));

var _velocity = _interopRequireDefault(require("../scripts/misc scripts/velocity.js"));

var _math = _interopRequireDefault(require("../scripts/misc scripts/math.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var canvas = document.querySelector("canvas"); // define

var ACCELERATION_AMOUNT = 20; // ship acceleration amount in pixels/s/s

var FRICTION_AMOUNT = 5; // brake deceleration amount
// ship module

var Ship = /*#__PURE__*/function (_Projectile) {
  _inherits(Ship, _Projectile);

  var _super = _createSuper(Ship);

  function Ship() {
    var _this;

    _classCallCheck(this, Ship);

    console.log("Ship constructor called."); // set GameObject components

    _this = _super.call(this);
    _this.name = "Ship";
    _this.point = new _point.default(canvas.width / 2, canvas.height / 2);
    _this.velocity = new _velocity.default(0, 0);
    _this.r = 15;
    _this.dimensions = new _dimensions.default(1, 1);
    _this.a = 10;
    _this.image = new _image.default("../assets/shipImage.png", "ship image", _this.dim, true); // set ship components

    _this.thrust = false;
    _this.brake = false;
    return _this;
  } // methods


  _createClass(Ship, [{
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(Ship.prototype), "update", this).call(this);

      var dt = _time.default.deltaTime;
      this.accelerate(this.rotation, dt * ACCELERATION_AMOUNT, this.thrust);

      if (this.brake) {
        this.applyFriction(dt * FRICTION_AMOUNT);

        _debug.default.display("Braking...");
      }
    }
  }, {
    key: "display",
    value: function display() {
      _get(_getPrototypeOf(Ship.prototype), "display", this).call(this);

      if (!_draw.default.drawImages) _draw.default.triangle(this.point, this.r, this.rotation);
    }
  }, {
    key: "fire",
    value: function fire() {
      return new _laser.default(this.p.x, this.p.y, this.v.dx, this.v.dy, this.rotation, this.r);
    }
  }]);

  return Ship;
}(_projectile.default); // export module


var _default = Ship;
exports.default = _default;
},{"../scripts/misc scripts/debug.js":"scripts/misc scripts/debug.js","../scripts/misc scripts/time.js":"scripts/misc scripts/time.js","../scripts/draw.js":"scripts/draw.js","../scripts/misc scripts/image.js":"scripts/misc scripts/image.js","../scripts/misc scripts/projectile.js":"scripts/misc scripts/projectile.js","../scripts/misc scripts/point.js":"scripts/misc scripts/point.js","../scripts/misc scripts/dimensions.js":"scripts/misc scripts/dimensions.js","./laser.js":"gameobject scripts/laser.js","../scripts/misc scripts/velocity.js":"scripts/misc scripts/velocity.js","../scripts/misc scripts/math.js":"scripts/misc scripts/math.js"}],"gameobject scripts/rock.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _projectile = _interopRequireDefault(require("../scripts/misc scripts/projectile.js"));

var _draw = _interopRequireDefault(require("../scripts/draw.js"));

var _point = _interopRequireDefault(require("../scripts/misc scripts/point.js"));

var _math = _interopRequireDefault(require("../scripts/misc scripts/math.js"));

var _debug = _interopRequireDefault(require("../scripts/misc scripts/debug.js"));

var _velocity = _interopRequireDefault(require("../scripts/misc scripts/velocity.js"));

var _time = _interopRequireDefault(require("../scripts/misc scripts/time.js"));

var _main = _interopRequireDefault(require("../scripts/main.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var ROCK_SHIP_BUFFER = canvas.height - 50;
var ROCK_SPEED = 60; // rock average speed in pixels / second

var Rock = /*#__PURE__*/function (_Projectile) {
  _inherits(Rock, _Projectile);

  var _super = _createSuper(Rock);

  function Rock() {
    var _this;

    var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

    _classCallCheck(this, Rock);

    _this = _super.call(this);
    _this.name = "unknown asteroid";
    _this.r = _math.default.randomrange(30, 50);
    _this.a = _math.default.randomrange(0, _math.default.rad(360));
    _this.dr = _math.default.randomrange(-1, 1);

    _this.p_init(p);

    _this.v_init();

    _this.vertices = _this.populate_vertecies();
    return _this;
  }

  _createClass(Rock, [{
    key: "p_init",
    value: function p_init(p) {
      if (p != -1) {
        this.p = new _point.default(p.x, p.y);
      }

      do {
        this.p.x = Math.random() * canvas.width;
        this.p.y = Math.random() * canvas.height;
      } while (_math.default.dist(this.p, new _point.default(canvas.width / 2, canvas.height / 2) < ROCK_SHIP_BUFFER));
    }
  }, {
    key: "v_init",
    value: function v_init() {
      this.v = new _velocity.default(ROCK_SPEED * _math.default.randomrange(-1, 1) / _main.default, ROCK_SPEED * _math.default.randomrange(-1, 1) / _main.default);
    }
  }, {
    key: "populate_vertecies",
    value: function populate_vertecies() {
      var vertices = [];
      var offs = this.r;
      var jag = .3;

      for (var a = 0; a < 360; a += 45) {
        offs = this.r * _math.default.randomrange(1 - jag, 1 + jag);
        vertices.push({
          angle: a,
          offset: offs
        });
      }

      console.log(vertices);
      return vertices;
    }
  }, {
    key: "advance",
    value: function advance() {
      _get(_getPrototypeOf(Rock.prototype), "advance", this).call(this);

      console.log("x");
      this.a += this.dr;
    }
  }, {
    key: "display",
    value: function display() {
      _draw.default.rock(this.p.x, this.p.y, this.r, this.a, this.vertices);
    }
  }]);

  return Rock;
}(_projectile.default);

var _default = Rock;
exports.default = _default;
},{"../scripts/misc scripts/projectile.js":"scripts/misc scripts/projectile.js","../scripts/draw.js":"scripts/draw.js","../scripts/misc scripts/point.js":"scripts/misc scripts/point.js","../scripts/misc scripts/math.js":"scripts/misc scripts/math.js","../scripts/misc scripts/debug.js":"scripts/misc scripts/debug.js","../scripts/misc scripts/velocity.js":"scripts/misc scripts/velocity.js","../scripts/misc scripts/time.js":"scripts/misc scripts/time.js","../scripts/main.js":"scripts/main.js"}],"gameobject scripts/mousePointer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draw = _interopRequireDefault(require("../scripts/draw.js"));

var _gameObject = _interopRequireDefault(require("../scripts/misc scripts/gameObject.js"));

var _math = _interopRequireDefault(require("../scripts/misc scripts/math.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var context = document.querySelector("canvas").getContext("2d");

var MousePointer = /*#__PURE__*/function (_GameObject) {
  _inherits(MousePointer, _GameObject);

  var _super = _createSuper(MousePointer);

  function MousePointer() {
    var _this;

    _classCallCheck(this, MousePointer);

    _this = _super.call(this, 100, 100, 0, 0, 2.5, 0);
    _this.showPointer = false;
    return _this;
  }

  _createClass(MousePointer, [{
    key: "display",
    value: function display() {// if (true) {
      //     draw.point(this.p.x, this.p.y)
      // if (this.showPointer) {
      //     context.strokeStyle = "black"
      //     context.fillStyle   = "red"
      //     context.lineWidth   = this.radius
      //     context.beginPath()
      //     context.arc(this.point.x, this.point.y, this.radius, 0, math.rad(180), false)
      //     context.closePath()
      //     context.stroke()
      //     context.fill()
      // }
      // }
    }
  }, {
    key: "toggleVisible",
    value: function toggleVisible() {
      this.showPointer = !this.showPointer;
    }
  }]);

  return MousePointer;
}(_gameObject.default);

var _default = MousePointer;
exports.default = _default;
},{"../scripts/draw.js":"scripts/draw.js","../scripts/misc scripts/gameObject.js":"scripts/misc scripts/gameObject.js","../scripts/misc scripts/math.js":"scripts/misc scripts/math.js"}],"scripts/inputManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// input keys
var Key = function Key() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "unknown key";

  _classCallCheck(this, Key);

  this.name = name;
  this.pressed = false;
};

var inputManager = {
  inputKeys: [new Key("ArrowUp"), new Key("ArrowDown"), new Key("ArrowRight"), new Key("ArrowLeft"), new Key(" ")]
};
var _default = inputManager;
exports.default = _default;
},{}],"scripts/stateManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dimensions = _interopRequireDefault(require("./misc scripts/dimensions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// helper class
var state = function state(name, _state) {
  _classCallCheck(this, state);

  this.name = name;
  this.state = _state;
}; // Asteroids Game States


var Scene = /*#__PURE__*/function () {
  // here, scene is to be the base object for all states 
  // (all states must have a scene to work with)
  function Scene() {
    _classCallCheck(this, Scene);

    this.backgroundImage = new Image("../assets/stars.png", "background image", new _dimensions.default(0, 0), true);
  }

  _createClass(Scene, [{
    key: "update",
    value: function update() {
      this.display();
    }
  }, {
    key: "display",
    value: function display() {
      this.drawBackground();
    }
  }, {
    key: "drawBackground",
    value: function drawBackground() {
      if (draw.drawImages) this.backgroundImage.display();else draw.fillBackground();
    }
  }]);

  return Scene;
}();

var Resume = /*#__PURE__*/function (_Scene) {
  _inherits(Resume, _Scene);

  var _super = _createSuper(Resume);

  function Resume() {
    _classCallCheck(this, Resume);

    return _super.apply(this, arguments);
  }

  return Resume;
}(Scene);

var Pause = /*#__PURE__*/function (_Scene2) {
  _inherits(Pause, _Scene2);

  var _super2 = _createSuper(Pause);

  function Pause() {
    _classCallCheck(this, Pause);

    return _super2.apply(this, arguments);
  }

  return Pause;
}(Scene);

var MainMenu = /*#__PURE__*/function (_Scene3) {
  _inherits(MainMenu, _Scene3);

  var _super3 = _createSuper(MainMenu);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    return _super3.apply(this, arguments);
  }

  return MainMenu;
}(Scene);

var SettingsState = /*#__PURE__*/function (_Scene4) {
  _inherits(SettingsState, _Scene4);

  var _super4 = _createSuper(SettingsState);

  function SettingsState() {
    _classCallCheck(this, SettingsState);

    return _super4.apply(this, arguments);
  }

  return SettingsState;
}(Scene); // state manager module


var stateManager = {
  currentState: 2,

  get state() {
    return this.states[this.currentState];
  },

  states: [new state("resume", new Resume()), new state("pause", new Pause()), new state("main menu", new MainMenu()), new state("settings menu", new SettingsState())]
};
var _default = stateManager;
exports.default = _default;
},{"./misc scripts/dimensions.js":"scripts/misc scripts/dimensions.js"}],"scripts/asteroids.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _draw = _interopRequireDefault(require("./draw.js"));

var _ship = _interopRequireDefault(require("../gameobject scripts/ship.js"));

var _rock = _interopRequireDefault(require("../gameobject scripts/rock.js"));

var _mousePointer = _interopRequireDefault(require("../gameobject scripts/mousePointer.js"));

var _image = _interopRequireDefault(require("./misc scripts/image.js"));

var _dimensions = _interopRequireDefault(require("./misc scripts/dimensions.js"));

var _debug = _interopRequireDefault(require("./misc scripts/debug.js"));

var _time = _interopRequireDefault(require("./misc scripts/time.js"));

var _point = _interopRequireDefault(require("./misc scripts/point.js"));

var _laser = require("../gameobject scripts/laser.js");

var _inputManager = _interopRequireDefault(require("./inputManager.js"));

var _stateManager = _interopRequireDefault(require("./stateManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var canvas = document.querySelector("canvas"); // Asteroids Game

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    _defineProperty(this, "laserDelayTimer", 0.0);

    console.log("Game constructor called."); // game objects

    this.ship = new _ship.default();
    this.lasers = [];
    this.rocks = [];
    this.asteroidBelt(5);
    this.mousePointer = new _mousePointer.default();
  }
  /*********
   * UPDATE
   *********/


  _createClass(Game, [{
    key: "update",
    value: function update() {
      _draw.default.point(new _point.default(10, 10));

      _time.default.tick(); // stateManager.states[2].update()


      _draw.default.fillBackground();

      this.mousePointer.update();
      this.ship.update();
      this.rocks.forEach(function (rock) {
        return rock.update();
      });
      this.updateLasers();
      this.handleInput();
      this.wrapObjects();
      this.handleLaserDelayTimer();
    }
    /***************
     * HANDLE INPUT
     ***************/

  }, {
    key: "handleInput",
    value: function handleInput() {
      var key = "";

      for (var i in _inputManager.default.inputKeys) {
        key = _inputManager.default.inputKeys[i];

        switch (key.name) {
          case ' ':
            // fire on ' ' (space)
            if (key.pressed) if (this.laserDelayTimer <= 0.0) {
              _debug.default.log(this.laserDelayTimer);

              this.lasers.push(this.ship.fire());
              this.laserDelayTimer = 1 / _laser.FIRING_RATE;
            }
            break;

          case "ArrowUp":
            // accelerate on 'up' arrow key
            if (key.pressed) this.ship.thrust = true;else this.ship.thrust = false;
            break;

          case "ArrowDown":
            if (key.pressed) this.ship.brake = true;else this.ship.brake = false;
            break;

          case "ArrowLeft":
            if (key.pressed) this.ship.rotateLeft();
            break;

          case "ArrowRight":
            if (key.pressed) this.ship.rotateRight();
            break;
        }
      }
    }
    /***
     * FIRE
     */

  }, {
    key: "handleLaserDelayTimer",
    value: function handleLaserDelayTimer() {
      if (this.laserDelayTimer > 0.0) this.laserDelayTimer -= _time.default.deltaTime;
    }
  }, {
    key: "wrapObjects",

    /**
     * WRAP
     */
    value: function wrapObjects() {
      var _this = this;

      this.wrap(this.ship);
      this.lasers.forEach(function (laser) {
        return _this.wrap(laser);
      });
      this.rocks.forEach(function (rock) {
        return _this.wrap(rock);
      });
    }
  }, {
    key: "wrap",
    value: function wrap(projectile) {
      var buffer = projectile.radius * 1;

      if (projectile.p.x < buffer) {
        projectile.p.x = canvas.width - buffer;
        return true;
      } else if (projectile.p.x > canvas.width - buffer) {
        projectile.p.x = buffer;
        return true;
      }

      if (projectile.p.y < buffer) {
        projectile.p.y = canvas.height - buffer;
        return true;
      } else if (projectile.p.y > canvas.height - buffer) {
        projectile.p.y = buffer;
        return true;
      }

      return false;
    }
    /**
     * LASERS
     */

  }, {
    key: "updateLasers",
    value: function updateLasers() {
      for (var i = 0; i < this.lasers.length; i++) {
        this.lasers[i].update();
      }

      for (var i = 0; i < this.lasers.length; i++) {
        if (!this.lasers[i].alive) {
          this.lasers.splice(i, 1);
          break;
        }
      }
    }
    /**
     * ROCKS
     */

  }, {
    key: "asteroidBelt",
    value: function asteroidBelt(n) {
      for (var i = 0; i < n; i++) {
        this.rocks.push(new _rock.default());
      }
    }
    /**
     * MOUSE POINTER
     */

  }, {
    key: "updateMousePosition",
    value: function updateMousePosition(point) {
      this.mousePointer.p = point;
    }
  }]);

  return Game;
}();

var _default = Game;
exports.default = _default;
},{"./draw.js":"scripts/draw.js","../gameobject scripts/ship.js":"gameobject scripts/ship.js","../gameobject scripts/rock.js":"gameobject scripts/rock.js","../gameobject scripts/mousePointer.js":"gameobject scripts/mousePointer.js","./misc scripts/image.js":"scripts/misc scripts/image.js","./misc scripts/dimensions.js":"scripts/misc scripts/dimensions.js","./misc scripts/debug.js":"scripts/misc scripts/debug.js","./misc scripts/time.js":"scripts/misc scripts/time.js","./misc scripts/point.js":"scripts/misc scripts/point.js","../gameobject scripts/laser.js":"gameobject scripts/laser.js","./inputManager.js":"scripts/inputManager.js","./stateManager.js":"scripts/stateManager.js"}],"scripts/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("./misc scripts/debug.js"));

var _point = _interopRequireDefault(require("./misc scripts/point.js"));

var _asteroids = _interopRequireDefault(require("./asteroids.js"));

var _draw = _interopRequireDefault(require("./draw.js"));

var _inputManager = _interopRequireDefault(require("./inputManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import
var canvas = document.querySelector("canvas"); // define

var mousePosition = new _point.default();
var FPS = 60;
var _default = FPS;
/************
 * GAME LOOP
 ************/

exports.default = _default;
var asteroids = new _asteroids.default();
setInterval(function () {
  return asteroids.update();
}, 1000 / FPS);
/****************
 * INPUT MANAGER
 ****************/

// keyboard input
document.addEventListener("keydown", keyDown); // key up (remove keys)

document.addEventListener("keyup", keyUp); // mouse click

document.addEventListener("mousedown", onClick); // mouse movement

document.addEventListener("mousemove", mouseMove);

function keyDown(event) {
  _debug.default.log("keydown: " + event.key);

  switch (event.key) {
    case 'd':
      _debug.default.toggleDebug();

      break;

    case 'D':
      _draw.default.toggleDarkMode();

      break;

    case 'i':
      _draw.default.drawImages = !_draw.default.drawImages;
      break;

    case 'r':
      _debug.default.display("Restarting game.");

      asteroids = new _asteroids.default();
      break;

    case ' ':
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      for (var i in asteroids.inputKeys) {
        if (asteroids.inputKeys[i].name == event.key) asteroids.inputKeys[i].pressed = true;
      }

      _debug.default.display(event.key);

      return;
  }
}

function keyUp(event) {
  for (var i in asteroids.inputKeys) {
    var key = asteroids.inputKeys[i];
    if (key.name == event.key) key.pressed = false;
  }
}

function onClick(event) {
  _debug.default.log("click");

  asteroids.mousePointer.toggleVisible();
}

function mouseMove(event) {
  _debug.default.log("Updating mouse position", event.clientX, event.clientY);

  mousePosition.x = event.clientX - 41;
  mousePosition.y = event.clientY - 101;
  asteroids.updateMousePosition(mousePosition);
}
},{"./misc scripts/debug.js":"scripts/misc scripts/debug.js","./misc scripts/point.js":"scripts/misc scripts/point.js","./asteroids.js":"scripts/asteroids.js","./draw.js":"scripts/draw.js","./inputManager.js":"scripts/inputManager.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60014" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { NONAME } from 'dns'

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#0DFF84', '#E8E60C', '#FF7B00', '#E80CA6', '#001EFF'];

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

var ballArray = [];
// Objects
function Circle(x, y, radius, color) {
    var _this = this;

    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5
    };
    this.radius = radius;
    this.color = color;

    this.update = function () {

        _this.drawStroke();

        for (var i = 0; i < ballArray.length; i++) {
            var distanceBetweenTwoObjects = getDistance(_this.x, _this.y, ballArray[i].x, ballArray[i].y) - _this.radius * 2;

            if (distanceBetweenTwoObjects < 0) {
                if (distanceBetweenTwoObjects !== 0 && distanceBetweenTwoObjects !== -(_this.radius * 2)) ballArray[i].color = "pink";
                // console.log("has collided")
                // } else {
                //     if (!isNaN(distanceBetweenTwoObjects))
                // console.log(distanceBetweenTwoObjects)
            }
            if (_this.x + _this.radius >= 0 && _this.x - _this.radius <= innerWidth && _this.y + _this.radius >= 0 && _this.y - _this.radius <= innerHeight) {
                // console.log(ballArray[i])
                // console.log(`${ballArray[i].x}${ballArray[i].y}${Number(i)} exists in the array`)
            } else {
                // console.log(`${ballArray[i].x}${ballArray[i].y} ${Number(i)}touched the end of the map`);
                ballArray.splice(i, 1);
                console.log('' + ballArray[i] + Number(i) + ' does not exist anymore');
            }
        }
        _this.x += _this.velocity.x;
        _this.y += _this.velocity.y;
    };

    this.drawStroke = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    };

    this.drawFill = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };
};

// Implementation
// let circle1;
var circle2 = void 0;

function init() {
    // circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(undefined, undefined, 20, "red");

    // objects = []

    for (var i = 0; i < 20; i++) {
        var x = randomIntFromRange(radius, innerWidth - radius - 2);
        var y = randomIntFromRange(radius, innerHeight - radius);
        var radius = 20;
        var color = randomColor(colors);

        if (i !== 0) {
            for (var j = 0; j < ballArray.length; j++) {
                if (getDistance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, innerWidth - radius - 2);
                    y = randomIntFromRange(radius, innerHeight - radius);
                    j = -1;
                }
            }
        }

        ballArray.push(new Circle(x, y, radius, color));
    }
    console.log(ballArray);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // circle1.update();
    circle2.update();
    circle2.drawStroke();
    circle2.x = mouse.x;
    circle2.y = mouse.y;

    // getDistance(circle1.x, circle1.y, circle2.x, circle2.y)


    ballArray.forEach(function (ball) {
        ball.update(ballArray);
        ball.drawFill();
        // console.log((getDistance(circle2.x, circle2.y, ball.x, ball.y)))
    });
}

init();
animate();

// PH's Function

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map
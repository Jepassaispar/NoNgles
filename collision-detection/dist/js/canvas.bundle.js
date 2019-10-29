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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// JS
var scoreDisplay = document.querySelector("span");
var totalScore = 0;

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

var enemyColor = ['#000000'];

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

function randomIntFromRangeFarFromZero(min, maxOfMin, minOfMax, max) {
    var randomNumber = randomIntFromRange(min, max);
    if (maxOfMin <= randomNumber && randomNumber <= minOfMax) return randomNumber;else if (maxOfMin > randomNumber || randomNumber > minOfMax) {
        randomIntFromRangeFarFromZero(min, maxOfMin, minOfMax, max);
    }
    console.log(randomNumber);
    return randomNumber;
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// OBJECT CIRCLE //
var ballArray = [];

var Circle = function Circle(x, y, radius, color) {
    var _this = this;

    _classCallCheck(this, Circle);

    this.x = x;
    this.y = y;
    this.velocity = {
        x: randomIntFromRangeFarFromZero(-20, -15, 15, 20),
        y: randomIntFromRangeFarFromZero(-20, -15, 15, 20)
    };
    this.radius = radius;
    this.color = color;

    this.drawCircleStroke = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.lineWidth = 2;
        c.stroke();
        c.closePath();
    };

    this.drawCircleFill = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.lineWidth = 2;
        c.fill();
        c.closePath();
    };

    this.update = function (ballArray) {

        for (var i = 0; i < ballArray.length; i++) {
            // RADIUS OF BALLARRAY //
            var radius = 30;

            var color = randomColor(colors);
            var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, ballArray[i].x, ballArray[i].y) - (_this.radius + circle2.radius);

            if (distanceBetweenTwoObjects < 0) {
                if (distanceBetweenTwoObjects !== 0 && distanceBetweenTwoObjects !== -(_this.radius * 2)) ballArray.splice(i, 1);
                totalScore += 100;
                console.log(totalScore);
                scoreDisplay.textContent = totalScore;
                if (circle2.radius <= 300)
                    // HOW FAST THE MOUSE CIRCLE IS INCREASING
                    circle2.radius += .1;
            }
            // DELIMITATE THE INIT SPAWN IN THE SCREEN //
            if (_this.x + _this.radius <= 0 || _this.x - _this.radius >= innerWidth || _this.y + _this.radius <= 0 || _this.y - _this.radius >= innerHeight) {
                ballArray.splice(ballArray.indexOf(_this), 1);
                return;
            }
        }

        _this.x += _this.velocity.x;
        _this.y += _this.velocity.y;
        var x = randomIntFromRange(radius, innerWidth - radius - 2);
        var y = randomIntFromRange(radius, innerHeight - radius);

        if (50 >= circle2.radius) {
            //NUMBER OF BALLS SPAWNING ALL THE TIME
            if (ballArray.length < 10) {
                ballArray.push(new Circle(x, y, radius, color));
            } else if (50 <= circle2.radius <= 200) {
                if (ballArray.length < 5) {
                    ballArray.push(new Circle(x, y, radius, color));
                }
            }
        }
    };
};

;

// OBJECT SQUARE //
var squareArray = [];

var Square = function Square(x, y, size, color) {
    var _this2 = this;

    _classCallCheck(this, Square);

    this.x = x;
    this.y = y;
    this.velocity = {
        x: randomIntFromRangeFarFromZero(-20, -15, 15, 20),
        y: randomIntFromRangeFarFromZero(-20, -15, 15, 20)
    };
    this.size = size;

    this.color = color;
    this.drawSquareStroke = function () {
        c.beginPath();
        c.rect(this.x, this.y, this.size, this.size);
        c.strokeStyle = this.color;
        c.lineWidth = 2;
        c.stroke();
        c.closePath();
    };

    this.drawSquareFill = function () {
        c.beginPath();
        c.rect(this.x, this.y, this.size, this.size);
        c.fillStyle = this.color;
        c.lineWidth = 2;
        c.fill();
        c.closePath();
    };

    this.update = function (squareArray) {

        for (var i = 0; i < squareArray.length; i++) {
            // SIZE OF THE SQUARES //    
            var size = 50;

            var color = randomColor(colors);
            var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, squareArray[i].x, squareArray[i].y) - (size + circle2.radius);

            if (distanceBetweenTwoObjects < 0) {
                if (distanceBetweenTwoObjects !== 0 && distanceBetweenTwoObjects !== -(circle2.radius + size)) squareArray.splice(i, 1);
                // SCORE FOR SQUARES //
                totalScore += 200;
                scoreDisplay.textContent = totalScore;
                if (circle2.radius <= 300)
                    // HOW FAST THE MOUSE CIRCLE IS INCREASING //
                    circle2.radius += .1;
            }
            // DELIMITATE THE INIT SPAWN IN THE SCREEN //
            if (_this2.x + _this2.size <= 0 || _this2.x - _this2.size >= innerWidth || _this2.y + _this2.size <= 0 || _this2.y - _this2.size >= innerHeight) {
                squareArray.splice(squareArray.indexOf(_this2), 1);
                return;
            }
        }

        _this2.x += _this2.velocity.x;
        _this2.y += _this2.velocity.y;
        var x = randomIntFromRange(size, innerWidth - size - 2);
        var y = randomIntFromRange(size, innerHeight - size);

        if (50 >= circle2.radius) {
            //NUMBER OF SQUARE SPAWNING ALL THE TIME
            if (squareArray.length < 10) {
                squareArray.push(new Square(x, y, size, color));
            } else if (50 <= circle2.radius <= 200) {
                if (squareArray.length < 5) {
                    squareArray.push(new Square(x, y, size, color));
                }
            }
        }
    };
};

;

// OBJECTS ENEMIES //
var enemyArray = [];

var Enemy = function Enemy(x, y, size, color) {
    var _this3 = this;

    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.velocity = {
        x: 0.5,
        y: 0.5
    };

    this.color = enemyColor;

    this.drawEnemy = function () {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - 15);
        c.lineTo(this.x + 10, this.y);
        c.lineTo(this.x + 10, this.y - 15);
        c.lineWidth = 5;
        c.strokeStyle = enemyColor;
        c.stroke();
        c.closePath();
    };

    this.size = size;

    this.update = function (enemyArray) {

        for (var i = 0; i < enemyArray.length; i++) {
            // SIZE OF THE ENEMIES //    
            var size = 15;
            var color = randomColor(colors);
            var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, enemyArray[i].x, enemyArray[i].y) - (size + circle2.radius);

            if (distanceBetweenTwoObjects < 0) {
                if (distanceBetweenTwoObjects !== 0 && distanceBetweenTwoObjects !== -(circle2.radius + size)) enemyArray.splice(i, 1);
                // SCORE FOR ENEMIES //
                totalScore += 200;
                scoreDisplay.textContent = totalScore;
                if (circle2.radius <= 300)
                    // HOW FAST THE MOUSE CIRCLE IS INCREASING //
                    circle2.radius += .1;
            }
            // DELIMITATE THE INIT SPAWN IN THE SCREEN //
            if (_this3.x + _this3.size <= 0 || _this3.x - _this3.size >= innerWidth || _this3.y + _this3.size <= 0 || _this3.y - _this3.size >= innerHeight) {
                enemyArray.splice(enemyArray.indexOf(_this3), 1);
                return;
            }
        }

        _this3.x += _this3.velocity.x;
        _this3.y += _this3.velocity.y;
        var x = randomIntFromRange(size, innerWidth - size - 2);
        var y = randomIntFromRange(size, innerHeight - size);

        if (50 >= circle2.radius) {
            //NUMBER OF ENEMIES SPAWNING ALL THE TIME
            if (enemyArray.length < 40) {
                enemyArray.push(new Enemy(x, y, size, color));
            } else if (50 <= circle2.radius <= 200) {
                if (enemyArray.length < 2) {
                    enemyArray.push(new Enemy(x, y, size, color));
                }
            }
        }
    };
};

;

// Implementation

var circle2 = void 0;

function init() {
    circle2 = new Circle(undefined, undefined, 20, "red");
    circle2.velocity = {
        x: 0,
        y: 0

        // NUMBER OF BALLS SPAWNING AT THE START
    };for (var i = 0; i < 10; i++) {
        // SIZE OF THE STARTING ENNEMIES
        var radius = 10;
        var x = randomIntFromRange(radius, innerWidth + radius + 5);
        var y = randomIntFromRange(radius, innerHeight - radius);
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

    // NUMBER OF SQUARES SPAWNING AT THE START //
    for (var _i = 0; _i < 10; _i++) {
        var size = 30;
        var _x = randomIntFromRange(size, innerWidth + size + 2);
        var _y = randomIntFromRange(size, innerHeight - size);
        var color = randomColor(colors);

        if (_i !== 0) {
            for (var _j = 0; _j < squareArray.length; _j++) {
                if (getDistance(_x, _y, squareArray[_j].x, squareArray[_j].y) - radius * 2 < 0) {
                    _x = randomIntFromRange(radius, innerWidth - radius - 2);
                    _y = randomIntFromRange(radius, innerHeight - radius);
                    _j = -1;
                }
            }
        }
        squareArray.push(new Square(_x, _y, size, color));
    }

    // NUMBER OF ENEMIES SPAWNING AT THE START //
    for (var _i2 = 0; _i2 < 10; _i2++) {
        var size = 10;
        var _x2 = randomIntFromRange(size, innerWidth + size + 2);
        var _y2 = randomIntFromRange(size, innerHeight - size);
        var color = randomColor(enemyColor);

        if (_i2 !== 0) {
            for (var _j2 = 0; _j2 < enemyArray.length; _j2++) {
                if (getDistance(_x2, _y2, enemyArray[_j2].x, enemyArray[_j2].y) - size * 2 < 0) {
                    _x2 = randomIntFromRange(size, innerWidth - size - 2);
                    _y2 = randomIntFromRange(size, innerHeight - size);
                    _j2 = -1;
                }
            }
        }
        enemyArray.push(new Enemy(_x2, _y2, size, color));
    }
}

// Animation Loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // circle1.update();
    circle2.update(ballArray);
    circle2.drawCircleFill();
    circle2.x = mouse.x;
    circle2.y = mouse.y;

    // ballArray.forEach(ball => {
    //     ball.update(ballArray);
    //     ball.drawCircleStroke();

    // })

    // squareArray.forEach(square => {
    //     square.update(squareArray);
    //     square.drawSquareStroke();

    // })

    enemyArray.forEach(function (enemy) {
        enemy.update(enemyArray);
        enemy.drawEnemy();
    });
    requestAnimationFrame(animate);
}

init();
animate();

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
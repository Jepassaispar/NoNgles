// JS
var scoreDisplay = document.querySelector("span");
var totalScore = 0;



import utils from './utils'
// import { NONAME } from 'dns'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2

}

const colors = ['#0DFF84', '#E8E60C', '#FF7B00', '#E80CA6', '#001EFF']

const enemyColor = ['#000000'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomIntFromRangeFarFromZero(min, maxOfMin, minOfMax, max) {
    var randomNumber = randomIntFromRange(min, max);
    if (maxOfMin <= randomNumber && randomNumber <= minOfMax)
        return randomNumber

    else if (maxOfMin > randomNumber || randomNumber > minOfMax) {
        randomIntFromRangeFarFromZero(min, maxOfMin, minOfMax, max);
    }
    console.log(randomNumber)
    return randomNumber
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


// OBJECT CIRCLE //
var ballArray = [];
class Circle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.velocity = {
            x: randomIntFromRangeFarFromZero(-20, -15, 15, 20),
            y: randomIntFromRangeFarFromZero(-20, -15, 15, 20)
        }
        this.radius = radius
        this.color = color

        this.drawCircleStroke = function () {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.strokeStyle = this.color
            c.lineWidth = 2;
            c.stroke()
            c.closePath()
        }

        this.drawCircleFill = function () {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.lineWidth = 2;
            c.fill()
            c.closePath()
        }

        this.update = (ballArray) => {

            for (let i = 0; i < ballArray.length; i++) {
                // RADIUS OF BALLARRAY //
                var radius = 30;

                var color = randomColor(colors);
                var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, ballArray[i].x, ballArray[i].y) - (this.radius + circle2.radius);

                if (distanceBetweenTwoObjects < 0) {
                    if (distanceBetweenTwoObjects !== 0 && (distanceBetweenTwoObjects !== -(this.radius * 2)))
                        ballArray.splice(i, 1);
                    totalScore += 100;
                    console.log(totalScore)
                    scoreDisplay.textContent = totalScore;
                    if (circle2.radius <= 300)
                        // HOW FAST THE MOUSE CIRCLE IS INCREASING
                        circle2.radius += .1;
                }
                // DELIMITATE THE INIT SPAWN IN THE SCREEN //
                if (this.x + this.radius <= 0 || this.x - this.radius >= innerWidth || this.y + this.radius <= 0 || this.y - this.radius >= innerHeight) {
                    ballArray.splice(ballArray.indexOf(this), 1);
                    return;
                }

            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
            let x = randomIntFromRange(radius, innerWidth - radius - 2);
            let y = randomIntFromRange(radius, innerHeight - radius);


            if (50 >= circle2.radius) {
                //NUMBER OF BALLS SPAWNING ALL THE TIME
                if (ballArray.length < 10) {
                    ballArray.push(new Circle(x, y, radius, color))

                } else if (50 <= circle2.radius <= 200) {
                    if (ballArray.length < 5) {
                        ballArray.push(new Circle(x, y, radius, color))
                    }
                }
            }
        };

    }
};


// OBJECT SQUARE //
var squareArray = [];
class Square {
    constructor(x, y, size, color) {
        this.x = x
        this.y = y
        this.velocity = {
            x: randomIntFromRangeFarFromZero(-20, -15, 15, 20),
            y: randomIntFromRangeFarFromZero(-20, -15, 15, 20)
        }
        this.size = size

        this.color = color
        this.drawSquareStroke = function () {
            c.beginPath()
            c.rect(this.x, this.y, this.size, this.size)
            c.strokeStyle = this.color
            c.lineWidth = 2;
            c.stroke()
            c.closePath()
        }

        this.drawSquareFill = function () {
            c.beginPath()
            c.rect(this.x, this.y, this.size, this.size)
            c.fillStyle = this.color
            c.lineWidth = 2;
            c.fill()
            c.closePath()
        }

        this.update = (squareArray) => {

            for (let i = 0; i < squareArray.length; i++) {
                // SIZE OF THE SQUARES //    
                var size = 50;

                var color = randomColor(colors);
                var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, squareArray[i].x, squareArray[i].y) - (size + circle2.radius);

                if (distanceBetweenTwoObjects < 0) {
                    if (distanceBetweenTwoObjects !== 0 && (distanceBetweenTwoObjects !== -(circle2.radius + size)))
                        squareArray.splice(i, 1);
                    // SCORE FOR SQUARES //
                    totalScore += 200;
                    scoreDisplay.textContent = totalScore;
                    if (circle2.radius <= 300)
                        // HOW FAST THE MOUSE CIRCLE IS INCREASING //
                        circle2.radius += .1;
                }
                // DELIMITATE THE INIT SPAWN IN THE SCREEN //
                if (this.x + this.size <= 0 || this.x - this.size >= innerWidth || this.y + this.size <= 0 || this.y - this.size >= innerHeight) {
                    squareArray.splice(squareArray.indexOf(this), 1);
                    return;
                }

            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
            let x = randomIntFromRange(size, innerWidth - size - 2);
            let y = randomIntFromRange(size, innerHeight - size);


            if (50 >= circle2.radius) {
                //NUMBER OF SQUARE SPAWNING ALL THE TIME
                if (squareArray.length < 10) {
                    squareArray.push(new Square(x, y, size, color))

                } else if (50 <= circle2.radius <= 200) {
                    if (squareArray.length < 5) {
                        squareArray.push(new Square(x, y, size, color))
                    }
                }
            }
        };


    }
};

// OBJECTS ENEMIES //
var enemyArray = [];
class Enemy {
    constructor(x, y, size, color) {
        this.x = x
        this.y = y
        this.velocity = {
            x: 0.5,
            y: 0.5
        }

        this.color = enemyColor

        this.drawEnemy = function () {
            c.beginPath()
            c.moveTo(this.x, this.y);
            c.lineTo(this.x, this.y - 15);
            c.lineTo(this.x + 10, this.y);
            c.lineTo(this.x + 10, this.y - 15);
            c.lineWidth = 5;
            c.strokeStyle = enemyColor;
            c.stroke()
            c.closePath()
        }

        this.size = size

        this.update = (enemyArray) => {

            for (let i = 0; i < enemyArray.length; i++) {
                // SIZE OF THE ENEMIES //    
                var size = 15;
                var color = randomColor(colors);
                var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, enemyArray[i].x, enemyArray[i].y) - (size + circle2.radius);

                if (distanceBetweenTwoObjects < 0) {
                    if (distanceBetweenTwoObjects !== 0 && (distanceBetweenTwoObjects !== -(circle2.radius + size)))
                        enemyArray.splice(i, 1);
                    // SCORE FOR ENEMIES //
                    totalScore += 200;
                    scoreDisplay.textContent = totalScore;
                    if (circle2.radius <= 300)
                        // HOW FAST THE MOUSE CIRCLE IS INCREASING //
                        circle2.radius += .1;
                }
                // DELIMITATE THE INIT SPAWN IN THE SCREEN //
                if (this.x + this.size <= 0 || this.x - this.size >= innerWidth || this.y + this.size <= 0 || this.y - this.size >= innerHeight) {
                    enemyArray.splice(enemyArray.indexOf(this), 1);
                    return;
                }

            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
            let x = randomIntFromRange(size, innerWidth - size - 2);
            let y = randomIntFromRange(size, innerHeight - size);


            if (50 >= circle2.radius) {
                //NUMBER OF ENEMIES SPAWNING ALL THE TIME
                if (enemyArray.length < 40) {
                    enemyArray.push(new Enemy(x, y, size, color))

                } else if (50 <= circle2.radius <= 200) {
                    if (enemyArray.length < 2) {
                        enemyArray.push(new Enemy(x, y, size, color))
                    }
                }
            }
        };


    }
};



// Implementation

let circle2;

function init() {
    circle2 = new Circle(undefined, undefined, 20, "red")
    circle2.velocity = {
        x: 0,
        y: 0
    }

    // NUMBER OF BALLS SPAWNING AT THE START
    for (let i = 0; i < 10; i++) {
        // SIZE OF THE STARTING BALLS
        var radius = 10;
        let x = randomIntFromRange(radius, innerWidth + radius + 5);
        let y = randomIntFromRange(radius, innerHeight - radius);
        var color = randomColor(colors);

        if (i !== 0) {
            for (let j = 0; j < ballArray.length; j++) {
                if (getDistance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, innerWidth - radius - 2);
                    y = randomIntFromRange(radius, innerHeight - radius);
                    j = -1;
                }
            }

        }
        ballArray.push(new Circle(x, y, radius, color))
    }

    // NUMBER OF SQUARES SPAWNING AT THE START //
    for (let i = 0; i < 10; i++) {
        // SIZE OF THE STARTING SQUARES
        var size = 30;
        let x = randomIntFromRange(size, innerWidth + size + 2);
        let y = randomIntFromRange(size, innerHeight - size);
        var color = randomColor(colors);

        if (i !== 0) {
            for (let j = 0; j < squareArray.length; j++) {
                if (getDistance(x, y, squareArray[j].x, squareArray[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, innerWidth - radius - 2);
                    y = randomIntFromRange(radius, innerHeight - radius);
                    j = -1;
                }
            }

        }
        squareArray.push(new Square(x, y, size, color))
    }

    // NUMBER OF ENEMIES SPAWNING AT THE START //
    for (let i = 0; i < 10; i++) {
        // SIZE OF THE STARTING ENNEMIES
        var size = 10;
        let x = randomIntFromRange(size, innerWidth + size + 2);
        let y = randomIntFromRange(size, innerHeight - size);
        var color = randomColor(enemyColor);

        if (i !== 0) {
            for (let j = 0; j < enemyArray.length; j++) {
                if (getDistance(x, y, enemyArray[j].x, enemyArray[j].y) - size * 2 < 0) {
                    x = randomIntFromRange(size, innerWidth - size - 2);
                    y = randomIntFromRange(size, innerHeight - size);
                    j = -1;
                }
            }

        }
        enemyArray.push(new Enemy(x, y, size, color))
    }

}

// Animation Loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)

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

    enemyArray.forEach(enemy => {
        enemy.update(enemyArray);
        enemy.drawEnemy();
    })
    requestAnimationFrame(animate)
}

init()
animate()
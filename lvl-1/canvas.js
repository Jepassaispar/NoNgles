// IMPORTANT VARIABLES
var scoreDisplay = document.querySelectorAll(".score");
var circleRadius = document.querySelector("#circleRadius");
let totalScore = 0;
var fullLife = 20;

// LIVES & POPUPS//
var hearts = document.querySelectorAll(".heart");
var heart1 = document.getElementById("heart-1");
var heart2 = document.getElementById("heart-2");
var heart3 = document.getElementById("heart-3");
var heart4 = document.getElementById("heart-4");
var heart5 = document.getElementById("heart-5");

heart1.src = "./img/1-Full-Heart.png";
heart2.src = "./img/1-Full-Heart.png";
heart3.src = "./img/1-Full-Heart.png";
heart4.src = "./img/1-Full-Heart.png";
heart5.src = "./img/1-Full-Heart.png";

function threeQuarterHeart(heart) {
    heart.src = "./img/2-three-quarter-Heart.png"
}

function halfHeart(heart) {
    heart.src = "./img/3-half-heart.png";
}

function quarterHeart(heart) {
    heart.src = "./img/4-quarter-heart.png"
}

function emptyHeart(heart) {
    heart.src = "./img/5-empty-heart.png"
}

function togglePopupWin() {
    var popup = document.getElementById("myPopupWin");
    popup.classList.toggle("show");
    displayTheScore(totalScore)
}

function togglePopupLose() {
    var popup = document.getElementById("myPopupLose");
    popup.classList.toggle("show");
    displayTheScore(scoreDisplay)
}

var closePopUpWin = document.querySelector(".closePopUpWin");

var closePopUpLose = document.querySelector(".closePopUpLose");

function decreaseLife() {
    if (fullLife === 20) {
        return fullLife -= 1;
    }
    if (fullLife === 19) {
        threeQuarterHeart(heart5)
        return fullLife -= 1;
    } else if (fullLife === 18) {
        halfHeart(heart5)
        return fullLife -= 1;
    } else if (fullLife === 17) {
        quarterHeart(heart5)
        return fullLife -= 1;
    } else if (fullLife === 16) {
        emptyHeart(heart5)
        return fullLife -= 1;
    } else if (fullLife === 15) {
        emptyHeart(heart5)
        threeQuarterHeart(heart4)
        return fullLife -= 1;
    } else if (fullLife === 14) {
        emptyHeart(heart5)
        halfHeart(heart4)
        return fullLife -= 1;
    } else if (fullLife === 13) {
        emptyHeart(heart5)
        quarterHeart(heart4)
        return fullLife -= 1;
    } else if (fullLife === 12) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        return fullLife -= 1;
    } else if (fullLife === 11) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        threeQuarterHeart(heart3)
        return fullLife -= 1;
    } else if (fullLife === 10) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        halfHeart(heart3)
        return fullLife -= 1;
    } else if (fullLife === 9) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        quarterHeart(heart3)
        return fullLife -= 1;
    } else if (fullLife === 8) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        return fullLife -= 1;
    } else if (fullLife === 7) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        threeQuarterHeart(heart2)
        return fullLife -= 1;
    } else if (fullLife === 6) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        halfHeart(heart2)
        return fullLife -= 1;
    } else if (fullLife === 5) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        quarterHeart(heart2)
        return fullLife -= 1;
    } else if (fullLife === 4) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        emptyHeart(heart2)
        return fullLife -= 1;
    } else if (fullLife === 3) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        emptyHeart(heart2)
        threeQuarterHeart(heart1)
        return fullLife -= 1;
    } else if (fullLife === 2) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        emptyHeart(heart2)
        halfHeart(heart1)
        return fullLife -= 1;
    } else if (fullLife === 1) {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        emptyHeart(heart2)
        quarterHeart(heart1)
        return fullLife -= 1;
    } else {
        emptyHeart(heart5)
        emptyHeart(heart4)
        emptyHeart(heart3)
        emptyHeart(heart2)
        emptyHeart(heart1)
        audioLoseLvl.play()
        togglePopupLose()
    }
}

decreaseLife()

// AUDIO
var audioLosePoint = document.querySelector("#losePoint")
var audioGainPoint = document.querySelector("#gainPoint")
var audioWinLvl = document.querySelector("#lvl-success")
var audioLoseLvl = document.querySelector("#lvl-fail")

// CANVAS
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const colors = ['#0DFF84', '#E8E60C', '#FF7B00', '#E80CA6', '#001EFF']
const enemyColor = ['#000000'];

canvas.width = innerWidth
canvas.height = innerHeight

// EVENT LISTENER
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})



function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// UTILITY FUNCTIONS
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
    return randomNumber
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

/////////////////////////////////////////////////////////////////
// OBJECT CIRCLE & BALL ARRAY//
var ballArray = [];
class Circle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.velocity = {
            // SPEED OF THE OBJECTS OF BALLARRAY
            x: randomIntFromRangeFarFromZero(-3, -1, 1, 3),
            y: randomIntFromRangeFarFromZero(-3, -1, 1, 3),
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

                // RADIUS OF OBJECTS OF BALLARRAY //
                var radius = 80;

                var color = randomColor(colors);
                var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, ballArray[i].x, ballArray[i].y) - (this.radius + circle2.radius);

                if (distanceBetweenTwoObjects < 0) {
                    if (distanceBetweenTwoObjects !== 0 && (distanceBetweenTwoObjects !== -(this.radius * 2)))
                        // WHAT HAPPENS WHEN BALLARAY OBJECTS COLLIDE WITH MOUSE OBJECT
                        ballArray.splice(i, 1);
                    audioGainPoint.play();
                    totalScore += 100;
                    displayTheScore(totalScore);
                    displayValueCircleRadius();
                    circle2.radius += .2;
                }
                // DELIMITATE THE SPAWN OF BALLARRAY OBJECTS INSIDE THE SCREEN //
                if (this.x + this.radius <= 0 || this.x - this.radius >= innerWidth || this.y + this.radius <= 0 || this.y - this.radius >= innerHeight) {
                    ballArray.splice(ballArray.indexOf(this), 1);
                    return;
                }

            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
            let x = randomIntFromRange(radius, innerWidth - radius - 2);
            let y = randomIntFromRange(radius, innerHeight - radius);


            // NUMBER OF BALLS SPAWNING AT ANYTIME
            if (ballArray.length < 3) {
                ballArray.push(new Circle(x, y, radius, color))
            }
        };
    }
};

var angle = 0;
this.convertToRadians = function (degree) {
    return degree * (Math.PI / 180)
}

/////////////////////////////////////////////////////////////////
// OBJECT SQUARE & SQUARE ARRAY //
var squareArray = [];
class Square {
    constructor(x, y, size, color) {
        this.velocity = {
            // SPEED OF THE OBJECTS OF SQUAREARRAY
            x: randomIntFromRangeFarFromZero(-3, -1, 1, 3),
            y: randomIntFromRangeFarFromZero(-3, -1, 1, 3),
        }
        this.size = size
        this.x = x - this.size / 2
        this.y = y - this.size / 2
        this.color = color

        this.drawSquareStroke = function () {
            c.beginPath()
            c.rect(this.x - size / 2, this.y - size / 2, this.size, this.size)
            c.strokeStyle = this.color
            c.lineWidth = 2;
            c.stroke()
            c.closePath()
        }

        this.update = (squareArray) => {

            for (let i = 0; i < squareArray.length; i++) {

                // SIZE OF OBJECTS OF SQUAREARRAY //    
                var size = 100;

                var color = randomColor(colors);
                var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, squareArray[i].x, squareArray[i].y) - (size / 2 + circle2.radius);

                if (distanceBetweenTwoObjects < 0) {
                    if (distanceBetweenTwoObjects !== 0 && (distanceBetweenTwoObjects !== -(circle2.radius + size / 2)))
                    // WHAT HAPPENS WHEN BALLARAY OBJECTS COLLIDE WITH MOUSE OBJECT                    
                    squareArray.splice(i, 1);
                    totalScore += 200;
                    audioGainPoint.play();
                    displayTheScore(totalScore);
                    displayValueCircleRadius();
                    checkIfWin();
                    circle2.radius += .4;
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


            //NUMBER OF SQUARE SPAWNING AT ANYIME
            if (squareArray.length < 3) {
                squareArray.push(new Square(x, y, size, color))
            }
        };
    }
};

/////////////////////////////////////////////////////////////////
// OBJECTS ENEMY & ENEMIES ARRAY//
var enemyArray = [];
class Enemy {
    constructor(x, y, size, color) {
        this.x = x
        this.y = y
        this.velocity = {
            // SPEED OF THE OBJECTS OF ENEMYARRAY
            x: randomIntFromRangeFarFromZero(-10, -8, 8, 10),
            y: randomIntFromRangeFarFromZero(-10, -8, 8, 10),
        }

        this.color = enemyColor

        this.drawEnemy = function () {
            c.beginPath()
            c.moveTo(this.x, this.y);
            c.lineTo(this.x, this.y - 15);
            c.lineTo(this.x + 10, this.y);
            c.lineTo(this.x + 10, this.y - 15);
            c.lineTo(this.x + 7, this.y - 15);
            c.lineWidth = 5;
            c.strokeStyle = enemyColor;
            c.stroke()
            c.closePath()
        }

        this.size = size

        this.update = (enemyArray) => {

            for (let i = 0; i < enemyArray.length; i++) {

                // SIZE OBJECTS IN ENEMYARRAY //    
                var size = 15;
                var color = randomColor(colors);
                var distanceBetweenTwoObjects = getDistance(circle2.x, circle2.y, enemyArray[i].x, enemyArray[i].y) - (size + circle2.radius);

                if (distanceBetweenTwoObjects < 0) {
                    if (distanceBetweenTwoObjects !== 0 && (distanceBetweenTwoObjects !== -(circle2.radius + size)))
                        // WHAT HAPPENS WHEN ENEMYARRAY OBJECTS COLLIDE WITH MOUSE OBJECT                          
                        enemyArray.splice(i, 1);
                    audioLosePoint.play();
                    totalScore -= 500;
                    decreaseLife();
                    displayTheScore(totalScore);
                    displayValueCircleRadius()
                    circle2.radius -= .5;
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


            //NUMBER OF ENEMIES SPAWNING AT ANYTIME
            if (enemyArray.length < 5) {
                enemyArray.push(new Enemy(x, y, size, color))
            }
        };
    }
};


/////////////////////////////////////////////////////////////////
// IIMPLEMENTATION
let circle2;

function init() {
    circle2 = new Circle(undefined, undefined, 20, "red")
    circle2.velocity = {
        x: 0,
        y: 0
    }

    // NUMBER OF BALLS SPAWNING AT THE START
    for (let i = 0; i < 4; i++) {
        // SIZE OF THE STARTING BALLS
        var radius = 80;
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
    for (let i = 0; i < 4; i++) {
        // SIZE OF THE STARTING SQUARES
        var size = 100;
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
    for (let i = 0; i < 5; i++) {
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


/////////////////////////////////////////////////////////////////
// AANIMATION LOOP //
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)

    circle2.update(ballArray);
    circle2.drawCircleFill();
    circle2.x = mouse.x;
    circle2.y = mouse.y;



    ballArray.forEach(ball => {
        ball.update(ballArray);
        ball.drawCircleStroke();

    })

    squareArray.forEach(square => {
        square.update(squareArray);
        square.drawSquareStroke();
    })

    enemyArray.forEach(enemy => {
        enemy.update(enemyArray);
        enemy.drawEnemy();
    })
    requestAnimationFrame(animate)
}

init()
animate()

/////////////////////////////////////////////////////////////////
// SCORE //
function checkIfWin() {
    if (circle2.radius >= 45) {
        togglePopupWin()
        audioWinLvl.play();
        circle2.style.display = "none";
        return;
    }
    return
}

function displayValueCircleRadius() {
    var circleRadiusValueInteger = parseInt(circle2.radius);
    if (String(circleRadiusValueInteger).length === 1) {
        circleRadius.textContent = `0${circleRadiusValueInteger}`
    } else if (String(circleRadiusValueInteger).length === 2) {
        circleRadius.textContent = `${circleRadiusValueInteger}`
    }
}


function displayTheScore(score) {
    if (score === 0) {
        scoreDisplay.textContent = "00000000"
    } else if (String(score).length === 3) {
        if (score >= 0)
            scoreDisplay.forEach(function (display) {
                display.textContent = `00000${score}`
            })
        else
            scoreDisplay.forEach(function (display) {
                display.textContent = `-00000${-score}`
            })
    } else if (String(score).length === 4) {
        if (score >= 0)
            scoreDisplay.forEach(function (display) {
                display.textContent = `0000${score}`
            })
        else
            scoreDisplay.forEach(function (display) {
                display.textContent = `-0000${-score}`
            })
    } else if (String(score).length === 5) {
        if (score >= 0)
            scoreDisplay.forEach(function (display) {
                display.textContent = `000${score}`
            })
        else
            scoreDisplay.forEach(function (display) {
                display.textContent = `-000${-score}`
            })
    } else if (String(score).length === 6) {
        if (score >= 0)
            scoreDisplay.forEach(function (display) {
                display.textContent = `00${score}`
            })
        else
            scoreDisplay.forEach(function (display) {
                display.textContent = `-00${-score}`
            })
    } else if (String(score).length === 7) {
        if (score >= 0)
            scoreDisplay.forEach(function (display) {
                display.textContent = `0${score}`
            })
        else
            scoreDisplay.forEach(function (display) {
                display.textContent = `-0${-score}`
            })
    } else if (String(score).length === 8) {
        if (score >= 0)
            scoreDisplay.forEach(function (display) {
                display.textContent = `${score}`
            })
        else
            scoreDisplay.forEach(function (display) {
                display.textContent = `-${-score}`
            })
    } else {
        return scoreDisplay = "You broke the game, congrats !"
    }
}

displayTheScore(totalScore)
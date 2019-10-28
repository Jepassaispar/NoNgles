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

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


var ballArray = [];
// Objects
function Circle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.velocity = {
        x: randomIntFromRange(-5,5),
        y: randomIntFromRange(-5,5)
    }
    this.radius = radius
    this.color = color

    this.update = (ballArray) => {

        this.drawStroke();

        for (let i = 0; i < ballArray.length; i++) {
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
                    circle2.radius+=1;
                }
            if (this.x + this.radius <= 0 || this.x - this.radius >= innerWidth || this.y + this.radius <= 0 || this.y - this.radius >= innerHeight) {
                ballArray.splice(ballArray.indexOf(this), 1);
                return;
            }

        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        let x = randomIntFromRange(radius, innerWidth - radius - 2);
        let y = randomIntFromRange(radius, innerHeight - radius);

        //NUMBER OF BALLS SPAWNING ALL THE TIME

        if ( 50 >= circle2.radius) {
            if (ballArray.length < 20) {
                ballArray.push(new Circle(x, y, radius, color))
                
            }
        else if (50<= circle2.radius <= 200) {
            if (ballArray.length < 5) {
                ballArray.push(new Circle(x, y, radius, color))
        }
        }}
    };

    this.drawStroke = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.color
        c.stroke()
        c.closePath()
    }

    this.drawFill = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
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

    for (let i = 0; i < 20; i++) {
        var radius = 30;
        let x = randomIntFromRange(radius, innerWidth - radius - 2);
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

}

// Animation Loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height)

    // circle1.update();
    circle2.update(ballArray);
    circle2.drawStroke();
    circle2.x = mouse.x;
    circle2.y = mouse.y;

    // getDistance(circle1.x, circle1.y, circle2.x, circle2.y)

    ballArray.forEach(ball => {
        ball.update(ballArray);
        ball.drawFill();
        // console.log((getDistance(circle2.x, circle2.y, ball.x, ball.y)))
    })
    requestAnimationFrame(animate)
}

init()
animate()



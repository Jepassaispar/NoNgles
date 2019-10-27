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
    this.radius = radius
    this.color = color

    this.update = () => {
        this.draw();

        for (let i = 0; i < ballArray.length; i++) {
            var distanceBetweenTwoObjects = getDistance(this.x, this.y, ballArray[i].x, ballArray[i].y) - this.radius * 2;
            if (distanceBetweenTwoObjects < 0) {
                if (distanceBetweenTwoObjects !== 0 && (distanceBetweenTwoObjects !== -(this.radius * 2)))
                    ballArray[i].color = "pink";
                // } else {
                //     if (!isNaN(distanceBetweenTwoObjects))
                // console.log(distanceBetweenTwoObjects)
            }
        }
    };

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.color
        c.stroke()
        c.closePath()
    }

};





// Implementation
// let circle1;
let circle2;

function init() {
    // circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(undefined, undefined, 20, "red")

    // objects = []

    for (let i = 0; i < 20; i++) {
        let x = randomIntFromRange(radius, innerWidth - radius - 2);
        let y = randomIntFromRange(radius, innerHeight - radius);
        var radius = 20;
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
    console.log(ballArray)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // circle1.update();
    circle2.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;

    // getDistance(circle1.x, circle1.y, circle2.x, circle2.y)


    ballArray.forEach(ball => {
        ball.update(ballArray);
        // console.log((getDistance(circle2.x, circle2.y, ball.x, ball.y)))
    })
}

init()
animate()


// PH's Function
// IMPORTANT VARIABLES
var scoreDisplay = document.querySelectorAll(".score");
var circleRadius = document.querySelector("#circleRadius");
let totalScore = 0;
var fullLife = 20;
let heartNumber = 5;
let heartLife = 5;

// LIVES & POPUPS//
var hearts = document.querySelectorAll(".heart");
var heart1 = document.getElementById("heart-1");
var heart2 = document.getElementById("heart-2");
var heart3 = document.getElementById("heart-3");
var heart4 = document.getElementById("heart-4");
var heart5 = document.getElementById("heart-5");

heart1.src = "./img/1-img-heart.png";
heart2.src = "./img/1-img-heart.png";
heart3.src = "./img/1-img-heart.png";
heart4.src = "./img/1-img-heart.png";
heart5.src = "./img/1-img-heart.png";

function togglePopupWin() {
  var popup = document.getElementById("myPopupWin");
  popup.classList.toggle("show");
  displayTheScore(totalScore);
}

function togglePopupLose() {
  var popup = document.getElementById("myPopupLose");
  popup.classList.toggle("show");
  displayTheScore(scoreDisplay);
}

var closePopUpWin = document.querySelector(".closePopUpWin");

var closePopUpLose = document.querySelector(".closePopUpLose");

function selectHeartImage(num, life) {
  var heart = document.getElementById(`heart-${num}`);
  heart.src = `./img/${life}-img-heart.png`;
}

function emptyHeart(num) {
  var heart = document.getElementById(`heart-${num}`);
  heart.src = "./img/5-img-heart.png";
}

function decreaseLife() {
  fullLife -= 1;
  heartLife -= 1;
  console.log(fullLife);
  if (fullLife === 1) {
    emptyHeart(1);
    audioLoseLvl.play();
    togglePopupLose();
  }
  for (let i = 5; i > heartNumber; i--) {
    emptyHeart(i);
  }
  if (heartLife !== 1) {
    selectHeartImage(heartNumber, heartLife);
  } else {
    console.log("<3" + heartNumber);
    emptyHeart(heartNumber);
    heartNumber -= 1;
    heartLife = 5;
  }
}

// AUDIO
var audioLosePoint = document.querySelector("#losePoint");
var audioGainPoint = document.querySelector("#gainPoint");
var audioWinLvl = document.querySelector("#lvl-success");
var audioLoseLvl = document.querySelector("#lvl-fail");
var audioLvl = document.getElementById("lvl-music");
audioLvl.play();
audioLvl.volume = 0.4;

// CANVAS
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const colors = ["#0DFF84", "#E8E60C", "#FF7B00", "#E80CA6", "#001EFF"];
const enemyColor = ["#000000"];

canvas.width = innerWidth;
canvas.height = innerHeight;

// EVENT LISTENER
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

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
  if (maxOfMin >= randomNumber || randomNumber >= minOfMax) {
    return randomNumber;
  } else {
    return randomIntFromRangeFarFromZero(min, maxOfMin, minOfMax, max);
  }
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

/////////////////////////////////////////////////////////////////
// OBJECT CIRCLE & BALL ARRAY//
var ballArray = [];
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      // SPEED OF THE OBJECTS OF BALLARRAY
      x: randomIntFromRangeFarFromZero(-10, -5, 5, 10),
      y: randomIntFromRangeFarFromZero(-10, -5, 5, 10)
    };
    this.radius = radius;
    this.color = color;

    this.drawCircleStroke = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = this.color;
      c.lineWidth = 2;
      c.stroke();
      c.closePath();
    };

    this.drawCircleFill = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.lineWidth = 2;
      c.fill();
      c.closePath();
    };

    this.update = ballArray => {
      for (let i = 0; i < ballArray.length; i++) {
        // RADIUS OF OBJECTS OF BALLARRAY //
        var radius = 50;

        var color = randomColor(colors);
        var distanceBetweenTwoObjects =
          getDistance(circle2.x, circle2.y, ballArray[i].x, ballArray[i].y) -
          (this.radius + circle2.radius);

        if (distanceBetweenTwoObjects < 0) {
          if (
            distanceBetweenTwoObjects !== 0 &&
            distanceBetweenTwoObjects !== -(this.radius * 2)
          )
            // WHAT HAPPENS WHEN BALLARAY OBJECTS COLLIDE WITH MOUSE OBJECT
            ballArray.splice(i, 1);
          audioGainPoint.play();
          totalScore += 100;
          displayTheScore(totalScore);
          displayValueCircleRadius();
          circle2.radius += 0.2;
        }
        // DELIMITATE THE SPAWN OF BALLARRAY OBJECTS INSIDE THE SCREEN //
        if (
          this.x + this.radius <= 0 ||
          this.x - this.radius >= innerWidth ||
          this.y + this.radius <= 0 ||
          this.y - this.radius >= innerHeight
        ) {
          ballArray.splice(ballArray.indexOf(this), 1);
          return;
        }
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;
      let x = randomIntFromRange(radius, innerWidth - radius - 2);
      let y = randomIntFromRange(radius, innerHeight - radius);

      //NUMBER OF BALLS SPAWNING AT ANYTIME
      if (ballArray.length < 8) {
        ballArray.push(new Circle(x, y, radius, color));
      }
    };
  }
}

var angle = 0;
this.convertToRadians = function(degree) {
  return degree * (Math.PI / 180);
};

/////////////////////////////////////////////////////////////////
// OBJECT SQUARE & SQUARE ARRAY //
var squareArray = [];
class Square {
  constructor(x, y, size, color) {
    this.velocity = {
      // SPEED OF THE OBJECTS OF SQUAREARRAY
      x: randomIntFromRangeFarFromZero(-5, -2, 2, 5),
      y: randomIntFromRangeFarFromZero(-5, -2, 2, 5)
    };
    this.size = size;
    this.x = x - this.size / 2;
    this.y = y - this.size / 2;
    this.color = color;

    this.drawSquareStroke = function() {
      c.beginPath();
      c.rect(this.x - size / 2, this.y - size / 2, this.size, this.size);
      c.strokeStyle = this.color;
      c.lineWidth = 2;
      c.stroke();
      c.closePath();
    };

    this.update = squareArray => {
      for (let i = 0; i < squareArray.length; i++) {
        // SIZE OF OBJECTS OF SQUAREARRAY //
        var size = 60;

        var color = randomColor(colors);
        var distanceBetweenTwoObjects =
          getDistance(
            circle2.x,
            circle2.y,
            squareArray[i].x,
            squareArray[i].y
          ) -
          (size / 2 + circle2.radius);

        if (distanceBetweenTwoObjects < 0) {
          if (
            distanceBetweenTwoObjects !== 0 &&
            distanceBetweenTwoObjects !== -(circle2.radius + size / 2)
          )
            // WHAT HAPPENS WHEN BALLARAY OBJECTS COLLIDE WITH MOUSE OBJECT
            squareArray.splice(i, 1);
          totalScore += 200;
          audioGainPoint.play();
          displayTheScore(totalScore);
          displayValueCircleRadius();
          checkIfWin();
          circle2.radius += 0.4;
        }
        // DELIMITATE THE INIT SPAWN IN THE SCREEN //
        if (
          this.x + this.size <= 0 ||
          this.x - this.size >= innerWidth ||
          this.y + this.size <= 0 ||
          this.y - this.size >= innerHeight
        ) {
          squareArray.splice(squareArray.indexOf(this), 1);
          return;
        }
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;
      let x = randomIntFromRange(size, innerWidth - size - 2);
      let y = randomIntFromRange(size, innerHeight - size);

      //NUMBER OF SQUARE SPAWNING ALL THE TIME
      if (squareArray.length < 6) {
        squareArray.push(new Square(x, y, size, color));
      }
    };
  }
}

/////////////////////////////////////////////////////////////////
// OBJECTS ENEMY & ENEMIES ARRAY//
var enemyArray = [];
class Enemy {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
      // SPEED OF THE OBJECTS OF ENEMYARRAY
      x: randomIntFromRangeFarFromZero(-12, -8, 8, 12),
      y: randomIntFromRangeFarFromZero(-12, -8, 8, 12)
    };

    this.color = enemyColor;

    this.drawEnemy = function() {
      c.beginPath();
      c.moveTo(this.x, this.y);
      c.lineTo(this.x, this.y - 15);
      c.lineTo(this.x + 10, this.y);
      c.lineTo(this.x + 10, this.y - 15);
      c.lineTo(this.x + 7, this.y - 15);
      c.lineWidth = 5;
      c.strokeStyle = enemyColor;
      c.stroke();
      c.closePath();
    };

    this.size = size;

    this.update = enemyArray => {
      for (let i = 0; i < enemyArray.length; i++) {
        // SIZE OBJECTS IN ENEMYARRAY //
        var size = 15;
        var color = randomColor(colors);
        var distanceBetweenTwoObjects =
          getDistance(circle2.x, circle2.y, enemyArray[i].x, enemyArray[i].y) -
          (size + circle2.radius);

        if (distanceBetweenTwoObjects < 0) {
          if (
            distanceBetweenTwoObjects !== 0 &&
            distanceBetweenTwoObjects !== -(circle2.radius + size)
          )
            // WHAT HAPPENS WHEN ENEMYARRAY OBJECTS COLLIDE WITH MOUSE OBJECT
            enemyArray.splice(i, 1);
          audioLosePoint.play();
          totalScore -= 500;
          decreaseLife();
          decreaseLife();
          displayTheScore(totalScore);
          displayValueCircleRadius();
          circle2.radius -= 0.5;
        }
        // DELIMITATE THE INIT SPAWN IN THE SCREEN //
        if (
          this.x + this.size <= 0 ||
          this.x - this.size >= innerWidth ||
          this.y + this.size <= 0 ||
          this.y - this.size >= innerHeight
        ) {
          enemyArray.splice(enemyArray.indexOf(this), 1);
          return;
        }
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;
      let x = randomIntFromRange(size, innerWidth - size - 2);
      let y = randomIntFromRange(size, innerHeight - size);

      //NUMBER OF ENEMIES SPAWNING ALL THE TIME
      if (enemyArray.length < 10) {
        enemyArray.push(new Enemy(x, y, size, color));
      }
    };
  }
}

// Implementation

let circle2;

function init() {
  circle2 = new Circle(undefined, undefined, 20, "red");
  circle2.velocity = {
    x: 0,
    y: 0
  };

  // NUMBER OF BALLS SPAWNING AT THE START
  for (let i = 0; i < 8; i++) {
    // SIZE OF THE STARTING BALLS
    var radius = 60;
    let x = randomIntFromRange(radius, innerWidth + radius + 5);
    let y = randomIntFromRange(radius, innerHeight - radius);
    var color = randomColor(colors);

    if (i !== 0) {
      for (let j = 0; j < ballArray.length; j++) {
        if (
          getDistance(x, y, ballArray[j].x, ballArray[j].y) - radius * 2 <
          0
        ) {
          x = randomIntFromRange(radius, innerWidth - radius - 2);
          y = randomIntFromRange(radius, innerHeight - radius);
          j = -1;
        }
      }
    }
    ballArray.push(new Circle(x, y, radius, color));
  }

  // NUMBER OF SQUARES SPAWNING AT THE START //
  for (let i = 0; i < 6; i++) {
    // SIZE OF THE STARTING SQUARES
    var size = 60;
    let x = randomIntFromRange(size, innerWidth + size + 2);
    let y = randomIntFromRange(size, innerHeight - size);
    var color = randomColor(colors);

    if (i !== 0) {
      for (let j = 0; j < squareArray.length; j++) {
        if (
          getDistance(x, y, squareArray[j].x, squareArray[j].y) - radius * 2 <
          0
        ) {
          x = randomIntFromRange(radius, innerWidth - radius - 2);
          y = randomIntFromRange(radius, innerHeight - radius);
          j = -1;
        }
      }
    }
    squareArray.push(new Square(x, y, size, color));
    // console.log(squareArray)
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
        if (
          getDistance(x, y, enemyArray[j].x, enemyArray[j].y) - size * 2 <
          0
        ) {
          x = randomIntFromRange(size, innerWidth - size - 2);
          y = randomIntFromRange(size, innerHeight - size);
          j = -1;
        }
      }
    }
    enemyArray.push(new Enemy(x, y, size, color));
  }
}

/////////////////////////////////////////////////////////////////
// AANIMATION LOOP //
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  circle2.update(ballArray);
  circle2.drawCircleFill();
  circle2.x = mouse.x;
  circle2.y = mouse.y;

  ballArray.forEach(ball => {
    ball.update(ballArray);
    ball.drawCircleStroke();
  });

  squareArray.forEach(square => {
    square.update(squareArray);
    square.drawSquareStroke();
  });

  enemyArray.forEach(enemy => {
    enemy.update(enemyArray);
    enemy.drawEnemy();
  });
  requestAnimationFrame(animate);
}

init();
animate();

/////////////////////////////////////////////////////////////////
// SCORE //
function checkIfWin() {
  if (circle2.radius >= 45) {
    togglePopupWin();
    audioWinLvl.play();
    circle2.style.display = "none";
    return;
  }
  return;
}

function displayValueCircleRadius() {
  var circleRadiusValueInteger = parseInt(circle2.radius);
  if (String(circleRadiusValueInteger).length === 1) {
    circleRadius.textContent = `0${circleRadiusValueInteger}`;
  } else if (String(circleRadiusValueInteger).length === 2) {
    circleRadius.textContent = `${circleRadiusValueInteger}`;
  }
}

function displayTheScore(score) {
  if (score === 0) {
    scoreDisplay.textContent = "00000000";
  } else if (String(score).length === 3) {
    if (score >= 0)
      scoreDisplay.forEach(function(display) {
        display.textContent = `00000${score}`;
      });
    else
      scoreDisplay.forEach(function(display) {
        display.textContent = `-00000${-score}`;
      });
  } else if (String(score).length === 4) {
    if (score >= 0)
      scoreDisplay.forEach(function(display) {
        display.textContent = `0000${score}`;
      });
    else
      scoreDisplay.forEach(function(display) {
        display.textContent = `-0000${-score}`;
      });
  } else if (String(score).length === 5) {
    if (score >= 0)
      scoreDisplay.forEach(function(display) {
        display.textContent = `000${score}`;
      });
    else
      scoreDisplay.forEach(function(display) {
        display.textContent = `-000${-score}`;
      });
  } else if (String(score).length === 6) {
    if (score >= 0)
      scoreDisplay.forEach(function(display) {
        display.textContent = `00${score}`;
      });
    else
      scoreDisplay.forEach(function(display) {
        display.textContent = `-00${-score}`;
      });
  } else if (String(score).length === 7) {
    if (score >= 0)
      scoreDisplay.forEach(function(display) {
        display.textContent = `0${score}`;
      });
    else
      scoreDisplay.forEach(function(display) {
        display.textContent = `-0${-score}`;
      });
  } else if (String(score).length === 8) {
    if (score >= 0)
      scoreDisplay.forEach(function(display) {
        display.textContent = `${score}`;
      });
    else
      scoreDisplay.forEach(function(display) {
        display.textContent = `-${-score}`;
      });
  } else {
    return (scoreDisplay = "You broke the game, congrats !");
  }
}

displayTheScore(totalScore);

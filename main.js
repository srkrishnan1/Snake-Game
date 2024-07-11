export const UNIT = 15;
const gameBoard = document.getElementById("game-board");
const gameboardCtx = gameBoard.getContext("2d");
const scoreSpan = document.getElementById("score-span");
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
var score = 0;
var toggleGamePlay;
var foodX;
var foodY;
var xvel = UNIT;
var yvel = 0;
var started = false;
var snake = [
  { x: UNIT * 4, y: HEIGHT / 2 },
  { x: UNIT * 3, y: HEIGHT / 2 },
  { x: UNIT * 2, y: HEIGHT / 2 },
  { x: UNIT, y: HEIGHT / 2 },
];

function init() {
  clearBoard();
  updateFood();
  drawFood();
  drawSnake();
  document.addEventListener("keydown", (e) => {
    if (e.key == " ") {
      toggleGame();
    }
  });
}

function toggleGame() {
  started = !started;
  if (started) {
    toggleGamePlay = setInterval(playGame, 300);
  } else {
    clearInterval(toggleGamePlay);
  }
}

init();

function playGame() {
  clearBoard();
  drawFood();
  drawSnake();
  updateSnake();
  checkGameOver();
}
function drawFood() {
  gameboardCtx.fillStyle = "red";
  gameboardCtx.fillRect(foodX, foodY, UNIT, UNIT);
  gameboardCtx.strokeStyle = "black";
  gameboardCtx.strokeRect(foodX, foodY, UNIT, UNIT);
}
function updateFood() {
  foodX = Math.floor((Math.random() * WIDTH) / UNIT) * UNIT;
  foodY = Math.floor((Math.random() * HEIGHT) / UNIT) * UNIT;
}

function drawSnake() {
  gameboardCtx.fillStyle = "blue";
  gameboardCtx.strokeStyle = "black";

  snake.forEach((cords) => {
    gameboardCtx.fillRect(cords.x, cords.y, UNIT, UNIT);
    gameboardCtx.strokeRect(cords.x, cords.y, UNIT, UNIT);
  });
}

function updateSnake() {
  const head = { x: snake[0].x + xvel, y: snake[0].y + yvel };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    updateFood(UNIT);
    score++;
    scoreSpan.textContent = score;
  } else {
    snake.pop();
  }

  changeDirection();
}
function clearBoard() {
  gameboardCtx.fillStyle = "#111111";
  gameboardCtx.fillRect(0, 0, WIDTH, HEIGHT);
}

function changeDirection() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (yvel != UNIT) {
          xvel = 0;
          yvel = -UNIT;
        }
        break;
      case "ArrowDown":
        if (yvel != -UNIT) {
          xvel = 0;
          yvel = UNIT;
        }
        break;
      case "ArrowLeft":
        if (xvel != UNIT) {
          xvel = -UNIT;
          yvel = 0;
        }
        break;
      case "ArrowRight":
        if (xvel != -UNIT) {
          xvel = UNIT;
          yvel = 0;
        }
        break;
    }
  });
}
function checkGameOver() {
  const hitTheSnake = snake.some((item, index) => {
    if (index != 0) {
      return snake[0].x == item.x && snake[0].y == item.y;
    }
  });
  if (
    snake[0].x < 0 ||
    snake[0].x > WIDTH ||
    snake[0].y < 0 ||
    snake[0].y > HEIGHT ||
    hitTheSnake
  ) {
    toggleGame();
    clearBoard();
    gameboardCtx.font = "bold 32px aerial";
    gameboardCtx.textAlign = "center";
    gameboardCtx.fillStyle = "white";
    gameboardCtx.fillText("Game Over", WIDTH / 2, HEIGHT / 2);
    restartBtn();
  }
}

function restartBtn() {
  const btnWidth = 100;
  const btnHeight = 30;
  const btnX = WIDTH / 2 - btnWidth / 2;
  const btnY = HEIGHT / 2 + 40;
  gameboardCtx.fillStyle = "white";

  gameboardCtx.font = "bold 16px aerial";
  const btnText = "RESTART";
  gameboardCtx.textAlign = "center";
  gameboardCtx.textBaseline = "middle";

  gameboardCtx.fillRect(btnX, btnY, btnWidth, btnHeight);
  gameboardCtx.fillStyle = "black";
  gameboardCtx.fillText(btnText, btnX + btnWidth / 2, btnY + btnHeight / 2);

  gameBoard.addEventListener("click", (e) => {
    const mouseX = e.clientX - gameBoard.getBoundingClientRect().left;
    const mouseY = e.clientY - gameBoard.getBoundingClientRect().top;
    if (
      mouseX >= btnX &&
      mouseX <= btnX + btnWidth &&
      mouseY >= btnY &&
      mouseY <= btnY + btnHeight
    ) {
      console.log("reload started");
      location.reload();
    }
  });
}

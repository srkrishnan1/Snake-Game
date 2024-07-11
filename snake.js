var UNIT = 5;
var xvel = 0;
var yvel = 0;
var snake = [
  { x: UNIT * 4, y: 0 },
  { x: UNIT * 3, y: 0 },
  { x: UNIT * 2, y: 0 },
  { x: UNIT, y: 0 },
];

function drawSnake(gameboardCtx) {
  gameboardCtx.fillStyle = "blue";
  gameboardCtx.strokeStyle = "black";

  snake.forEach((cords) => {
    gameboardCtx.fillRect(cords.x, cords.y, UNIT, UNIT);
    gameboardCtx.strokeRect(cords.x, cords.y, UNIT, UNIT);
  });
}

function updateSnake(foodX, foodY) {
  const head = { x: snake[0].x + xvel, y: snake[0].y + yvel };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    console.log("creating");
  } else {
    snake.pop();
  }

  changeDirection();
}
function clearBoard(gameboardCtx, WIDTH, HEIGHT) {
  gameboardCtx.fillStyle = "#111111";
  gameboardCtx.fillRect(0, 0, WIDTH, HEIGHT);
}

function changeDirection() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (yvel != UNIT) {
          console.log(e.key);
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

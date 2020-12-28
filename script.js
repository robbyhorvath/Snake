const cvs = document.getElementById('gameCanvas')
const ctx = cvs.getContext('2d')
const box = 16 //px

// 32 x 32 grid

const apple = new Image()
apple.src = '/apple.png'

let score = 0

let snake = [{
    x: 15 * box,
    y: 15 * box
}]

let food = {
    x: Math.floor(Math.random() * 31) * box,
    y: Math.floor(Math.random() * 31) * box
}

let d
const KeyboardHelper = {
    left: 65,
    up: 87,
    right: 68,
    down: 83
};

document.addEventListener('keydown', direction)

function direction(event) {
    let key = event.keyCode
    if (key === KeyboardHelper.left && d !== 'right') {
        d = 'left'
    } else if (key === KeyboardHelper.right && d !== 'left') {
        d = 'right'
    } else if (key === KeyboardHelper.up && d !== 'down') {
        d = 'up'
    } else if (key === KeyboardHelper.down && d !== 'up') {
        d = 'down'
    }
}

function collision(head) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            return true;
        }
    }
    return false;
}


function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'darkgreen' : 'lightgreen'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.drawImage(apple, food.x, food.y, box, box)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (d === 'left') snakeX -= box
    if (d === 'right') snakeX += box
    if (d === 'up') snakeY -= box
    if (d === 'down') snakeY += box

    if (snakeX === food.x && snakeY === food.y) {
        score++
        document.getElementById('scoreCount').innerHTML = score
        food = {
            x: Math.floor(Math.random() * 31) * box,
            y: Math.floor(Math.random() * 31) * box
        }
    } else {
        snake.pop()
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < 0 || snakeX > 31 * box || snakeY < 0 || snakeY > 31 * box || collision(newHead)) {
        document.getElementById('scoreCount').innerHTML = 'Game Over'
        clearInterval(game)
    }

    snake.unshift(newHead)
}

let game = setInterval(draw, 100)
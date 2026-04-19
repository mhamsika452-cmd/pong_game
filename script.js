// Pong Game Logic

// Canvas Setup
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Game Objects
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speed: 4, velocityX: 4, velocityY: 4 };
const paddleWidth = 10, paddleHeight = 100;
const playerPaddle = { x: 0, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight, color: 'red' };
const aiPaddle = { x: canvas.width - paddleWidth, y: (canvas.height - paddleHeight) / 2, width: paddleWidth, height: paddleHeight, color: 'blue' };

// Event Listeners
document.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    playerPaddle.y = event.clientY - rect.top - playerPaddle.height / 2;
});

// Collision Detection Function
function detectCollision(ball, paddle) {
    return ball.x < paddle.x + paddle.width &&
           ball.x + ball.radius > paddle.x &&
           ball.y < paddle.y + paddle.height &&
           ball.y + ball.radius > paddle.y;
}

// AI Logic
function aiMove() {
    const centerOfPaddle = aiPaddle.y + aiPaddle.height / 2;
    if (ball.y < centerOfPaddle) {
        aiPaddle.y -= 4;
    } else {
        aiPaddle.y += 4;
    }
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Ball Movement
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Wall Collision
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Paddle Collision
    if (detectCollision(ball, playerPaddle) || detectCollision(ball, aiPaddle)) {
        ball.velocityX = -ball.velocityX;
    }

    // Score Update
    if (ball.x + ball.radius >= canvas.width) {
        // Player scored
        resetGame();
    } else if (ball.x - ball.radius <= 0) {
        // AI scored
        resetGame();
    }
    aiMove();
}

// Draw Function
function draw() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw Ball
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fill();
    // Draw Paddles
    context.fillStyle = playerPaddle.color;
    context.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    context.fillStyle = aiPaddle.color;
    context.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
}

// Reset Game Functionality
function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.velocityY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// Initialize Game
resetGame();
gameLoop();
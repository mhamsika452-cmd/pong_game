// Pong Game Script

// Set up the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let paddleWidth = 10;
let paddleHeight = 100;
let ballRadius = 10;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;

// AI parameters
const aiSpeed = 4;

// Draw the game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw paddles
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
    // Draw scores
    ctx.font = '20px Arial';
    ctx.fillText('Player 1: ' + player1Score, 20, 20);
    ctx.fillText('Player 2: ' + player2Score, canvas.width - 120, 20);
}

// Update game logic
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // Ball collision with top and bottom
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }
    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    // Score Update
    if (ballX + ballRadius > canvas.width) {
        player1Score++;
        resetBall();
    } else if (ballX - ballRadius < 0) {
        player2Score++;
        resetBall();
    }
    // AI movement
    if (ballY > paddle2Y + paddleHeight / 2 && paddle2Y + paddleHeight < canvas.height) {
        paddle2Y += aiSpeed;
    } else if (ballY < paddle2Y + paddleHeight / 2 && paddle2Y > 0) {
        paddle2Y -= aiSpeed;
    }
}

// Reset ball to center
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Handle keyboard controls
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && paddle1Y > 0) {
        paddle1Y -= 20;
    } else if (event.key === 'ArrowDown' && paddle1Y + paddleHeight < canvas.height) {
        paddle1Y += 20;
    }
});

// Game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
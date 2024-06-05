const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
const friction = 0.8;
const keys = {
    left: false,
    right: false,
    up: false
};

const player = {
    x: 50,
    y: 200,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    grounded: false,
    jumping: false
};

const platforms = [
    { x: 100, y: 350, width: 600, height: 10 },
    { x: 400, y: 250, width: 100, height: 10 }
];

function drawPlayer() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = '#654321';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;

    if (!player.grounded) {
        player.dy += gravity;
    }

    player.dx *= friction;

    player.grounded = false;
    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            player.grounded = true;
            player.dy = 0;
            player.y = platform.y - player.height;
        }
    });

    if (player.x < 0) {
        player.x = 0;
    } else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    if (player.y < 0) {
        player.y = 0
    } else if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.grounded = true;
    }
}

function update() {
    clear();
    drawPlatforms();
    drawPlayer();
    newPos();
    requestAnimationFrame(update);
}

function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function jump() {
    if (player.grounded) {
        player.jumping = true;
        player.grounded = false;
        player.dy = -10;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        keys.right = true;
        moveRight();
    } else if (e.key == 'ArrowLeft') {
        keys.left = true;
        moveLeft();
    } else if (e.key === 'ArrowUp') {
        keys.up = true;
        jump();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        keys.right = false;
        player.dx = 0;
    } else if (e.key === 'ArrowLeft') {
        keys.left = false;
        player.dx = 0;
    } else if (e.key === 'ArrowUp') {
        keys.up = false;
        player.jumping = false;
    }
});

update();

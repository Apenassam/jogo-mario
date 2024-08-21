const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('Stage Win (Super Mario) - QuickSounds.com.mp3');
const audioGameOver = new Audio('jogo-mario/Game Over #2 (Super Mario) - QuickSounds.com.mp3');

let gameLoop; // Variável para armazenar o loop do jogo
let gameStarted = false; // Variável para verificar se o jogo já começou

const startGame = () => {
    if (!gameStarted) { // Impedir que o jogo comece novamente se já estiver em andamento
        gameStarted = true;
        pipe.classList.add('pipe-animation');
        start.style.display = 'none';
        audioStart.currentTime = 0;
        audioStart.loop = true; // Fazer com que a música do início fique em loop
        audioStart.play();
        gameLoop = setInterval(loop, 10);
    }
};

const restartGame = () => {
    gameOver.style.display = 'none';
    pipe.style.left = '';
    pipe.style.right = '0';
    mario.src = 'imagens/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.currentTime = 0;
    audioStart.play();

    pipe.classList.add('pipe-animation');
    gameLoop = setInterval(loop, 10);
};

const jump = () => {
    mario.classList.add('jump');
    
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
};

const loop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = parseFloat(window.getComputedStyle(mario).getPropertyValue('bottom').replace('px', ''));
    
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.classList.remove('pipe-animation');
        pipe.style.left = `${pipePosition}px`;

        mario.classList.remove('jump');
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'imagens/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '50px';

        audioStart.pause(); // Pausar a música de início
        audioGameOver.currentTime = 0;
        audioGameOver.play(); // Tocar a música de "game over"

        gameOver.style.display = 'flex';
        gameStarted = false; // Permitir reiniciar o jogo

        clearInterval(gameLoop); // Parar o loop do jogo
    }
};

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', e => {
    if (e.touches.length > 0) {
        jump();
    }
});

document.addEventListener('keypress', e => {
    const tecla = e.key;
    if (tecla === 'Enter') {
        startGame();
    }
});

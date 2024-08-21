const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('Stage Win (Super Mario) - QuickSounds.com.mp3'); // Defina o caminho correto para o áudio
const audioGameOver = new Audio('jogo-mario/Mario Death - QuickSounds.com.mp3'); // Defina o caminho correto para o áudio

const startGame = () => {
    pipe.classList.add('pipe-animation');
    start.style.display = 'none';
    audioStart.play();
};

const restartGame = () => {
    gameOver.style.display = 'none';
    pipe.style.left = '';
    pipe.style.right = '0';
    mario.src = 'imagens/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';

    start.style.display = 'none';

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.play();
    audioStart.currentTime = 0;
};

const jump = () => {
    mario.classList.add('jump');
    
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
};

const loop = () => {
    setInterval(() => {
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

            const stopAudioStart = () => {
                audioStart.pause();
            };
            stopAudioStart();

            audioGameOver.play();

            setTimeout(() => {
                audioGameOver.pause();
            }, 7000);

            gameOver.style.display = 'flex';

            clearInterval(loop);
        }
    }, 10);
};

loop();

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


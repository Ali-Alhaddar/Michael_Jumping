document.addEventListener('DOMContentLoaded', function() {
    const michael = document.getElementById('michael');
    const gameArea = document.getElementById('gameArea');
    let isGameOver = false;
    let score = 0;
    let startTime;
    let scoreDisplay;
    let hitSound = new Audio('sound/e37e-e2ef-4e58-a50b-0374edfd0e78.mp3'); 

    function createScoreDisplay() {
        scoreDisplay = document.createElement('div');
        scoreDisplay.classList.add('score');
        gameArea.appendChild(scoreDisplay);
    }

    let timer = () => {
        score += 10;
        scoreDisplay.innerText = score;
    }

    const setIntervalID = setInterval(timer, 1000);

    function createDuck() {
        if (!isGameOver) {
            const duck = document.createElement('div');
            duck.classList.add('duck');

            duck.style.top = (gameArea.offsetHeight - 50) + 'px';
            duck.style.right = '0';

            gameArea.appendChild(duck);

            moveDuck(duck);
        }
    }

    function moveDuck(duck) {
        let duckPosition = parseInt(duck.style.right, 10);

        function frame() {
            duckPosition += 5;
            duck.style.right = duckPosition + 'px';

            if (duckPosition > gameArea.offsetWidth) {
                gameArea.removeChild(duck);
                cancelAnimationFrame(duckAnimation);
            } else {
                if (checkCollision(michael, duck)) {
                    endGame();
                } else {
                    duckAnimation = requestAnimationFrame(frame);
                }
            }
        }

        let duckAnimation = requestAnimationFrame(frame);
    }

    function checkCollision(michael, duck) {
        let michaelRect = michael.getBoundingClientRect();
        let duckRect = duck.getBoundingClientRect();

        return !(
            michaelRect.bottom < duckRect.top ||
            michaelRect.top > duckRect.bottom ||
            michaelRect.right < duckRect.left ||
            michaelRect.left > duckRect.right
        );
    }

    function endGame() {
        isGameOver = true;
        hitSound.play(); 
        alert('Game Over! You hit the duck.');
        location.reload();
    }

    function jump() {
        if (michael && !michael.classList.contains('jump')) {
            michael.classList.add('jump');
            setTimeout(() => {
                michael.classList.remove('jump');
            }, 700);
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            jump();
        }
    });

    setInterval(createDuck, 2300);
    createScoreDisplay();
});

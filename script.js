const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
const helpText = document.getElementById("helpText");

let gameOver = false;
let foodX, foodY;
let snakeX = 15, snakeY = 15;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let intervalReccurence = 125;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDifficultyToEasy = () => {
    intervalReccurence = 125;
    setIntervalId = setInterval(initGame, intervalReccurence)
}

const changeDifficultyToMedium = () => {
    intervalReccurence = 60;
    setIntervalId = setInterval(initGame, intervalReccurence)
}

const changeDifficultyToHard = () => {
    intervalReccurence = 30;
    setIntervalId = setInterval(initGame, intervalReccurence)
}

const changeDifficultyToImpossible = () => {
    intervalReccurence = 20;
    setIntervalId = setInterval(initGame, intervalReccurence)
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK ro replay...");
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "w" && velocityY != 1) {
        helpText.style.display="none";
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "s" && velocityY != -1) {
        helpText.style.display="none";
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "d" && velocityX != -1) {
        helpText.style.display="none";
        velocityX = 1;
        velocityY = 0;
    } else if(e.key === "a" && velocityX != 1) {
        helpText.style.display="none";
        velocityX = -1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key}));
});

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    helpText.innerText = "Press W, A, S, D or a button to start"

    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);

        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;

    const easyButton = document.getElementById("easy");
    easyButton.style.display = "none";
    const mediumButton = document.getElementById("medium");
    mediumButton.style.display = "none";
    const hardButton = document.getElementById("hard");
    hardButton.style.display = "none";
    const impossibleButton = document.getElementById("impossible");
    impossibleButton.style.display = "none";
}
changeFoodPosition();
document.addEventListener("keydown", changeDirection)
const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector('#timeLeft');
const overlay = document.getElementById("overlay");
let score = document.querySelector("#score");
let speed = 1000;
let difficultyName = "Easy";
let result = 0;
let currentTime = timeLeft.textContent

document.getElementById("easy").addEventListener("click", function () {
    speed = 1000;
    difficultyName = "Easy";
    hideDifficultyButtons();
});
document.getElementById("medium").addEventListener("click", function () {
    speed = 750;
    difficultyName = "Medium";
    hideDifficultyButtons();
});
document.getElementById("hard").addEventListener("click", function () {
    speed = 500;
    difficultyName = "Hard";
    hideDifficultyButtons();
});

function hideDifficultyButtons() {
    document.getElementById("difficulty").style.display = "none";
}

function startGame() {
function randomSquare() {
    square.forEach(className => {
        className.classList.remove("mole");
    })
    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("mole");

    hitPosition = randomPosition.id;
}

square.forEach(id => {
    id.addEventListener("mouseup", () => {
        if(id.id === hitPosition) {
            result = result + 1;
            score.textContent = result;
        }
    })
})

function moveMole() {
    let timerId = null;
    timerId = setInterval(function(){
        if (currentTime > 0) randomSquare();
    },speed)
}
moveMole();
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime === 0){
        clearInterval(timerId);
        overlay.style.display = "block";
        overlay.innerHTML = `<h2>GAME OVER! Your final score is ${result} on ${difficultyName}</h2>`
        document.querySelector("#start").textContent = "New game"
    }
    
      
}

let timerId = setInterval(countDown,1000);
}
document.querySelector("#start").addEventListener("click", () => {
    startGame();
    hideDifficultyButtons();
    if(currentTime <= 0){
        window.location.reload();
    }
});


"use strict";
//varialbles
const welcome = document.querySelector(".welcome");
const startGameBtn = document.getElementById("startGameBtn");
const howToPlay = document.getElementById("how");
const skip = document.getElementById("skip");
let guessNumber = document.querySelector(".guess-number");
const playerName = document.getElementById("playerName");
const displayOnLoad = document.getElementById("displayOnLoad");
const bigContainer = document.querySelector(".bigContainer");
const check = document.querySelector("#check");
const inputNumber = document.querySelector("#input-number");
const remark = document.querySelector(".remark");
let hideNumber = document.getElementById("secretNumber").children[0];
const playAgain = document.querySelector(".playAgain");
const reset = document.getElementById("reset");
let scorePoints = document.getElementById("scorePoints");
let highScorePoints = document.getElementById("highScorePoints");
const welcomePage = document.querySelector(".welcomePage");
const foot = document.querySelector("#foot");
let secretNumber = Math.floor(Math.random() * 20) + 1;
let highscore = 0;
let score = 20;
scorePoints.textContent = score;

//Event Listeners
window.addEventListener("load", () => {
  showlandingPage();
  setTimeout(function () {
    entryPage();
  }, 1000);
});

startGameBtn.addEventListener("click", () => {
  howToPlayPage();
});

check.addEventListener("click", () => {
  score = 20;
  let guessedNumber = Number(inputNumber.value);
  inputNumber.value = "";
  if (guessedNumber === secretNumber) {
    document.getElementById("correctGuess").play();
    document.body.style.backgroundColor = "green";
    remark.innerHTML = "You are Correct!!";
    if (score > highscore) {
      highscore = scorePoints.innerHTML;
      highScorePoints.textContent = highscore;
    }
    document.getElementById("song").play();
    hideNumber.innerHTML = secretNumber;
    scorePoints.innerHTML = "";

    setTimeout(function () {
      console.log("okay");
      refreshPage();
      secretNumber = Math.floor(Math.random() * 20) + 1;
      console.log(secretNumber);
    }, 2000);
  } else if (guessedNumber == "") {
    remark.innerText = "⚠️No Number!";
  } else if (+guessedNumber > 20 || guessedNumber < 1) {
    remark.innerText = "⚠️Invalid Number!";
    document.querySelector(".remark").style.color = "yellow";
  } else if (guessedNumber > secretNumber) {
    remark.innerText = ` 📈${playerName.value}, Number is too high`;
    document.body.style.backgroundColor = "red";
    scorePoints.innerHTML--;
    document.getElementById("failedGuess").play();
  } else if (guessedNumber < secretNumber) {
    remark.innerText = `📉${playerName.value},Number is too low`;
    document.body.style.backgroundColor = "red";
    scorePoints.innerHTML--;
    document.getElementById("failedGuess").play();
  } else if (score.innerHTML === 0) {
    remark.innerText = `You lost ${playerName.value}, Please play again.`;
    document.body.style.backgroundColor = "red";
    score.innerHTML = "";
  }
});

restart.addEventListener("click", () => {
  refreshPage();
});

reset.addEventListener("click", () => {
  inputNumber.value = "";
});

playerName.addEventListener("input", () => {
  playerNameCheck();
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    playerNameCheck();
    howToPlayPage();
  }
});

skip.addEventListener("click", function () {
  refreshPage();
});

//Functions
function refreshPage() {
  welcomePage.style.display = "none";
  foot.style.display = "none";
  bigContainer.style.display = "block";
  howToPlay.style.display = "none";
  skip.style.display = "none";
  remark.innerHTML = "START AGAIN!";
  remark.style.color = "white";
  remark.style.paddingTop = "30px";
  guessNumber.innerHTML = `Welcome, ${playerName.value}`;
  document.body.style.backgroundColor = "#38016f";
  scorePoints.innerHTML = 20;
  hideNumber.innerHTML = "?";
}
function howToPlayPage() {
  welcomePage.style.display = "none";
  foot.style.display = "none";
  bigContainer.style.display = "none";
  howToPlay.style.display = "block";
  skip.style.display = "block";
}
function showlandingPage() {
  displayOnLoad.style.display = "block";
  foot.style.display = "none";
  welcomePage.style.display = "none";
}
function entryPage() {
  displayOnLoad.style.display = "none";
  foot.style.display = "block";
  welcomePage.style.display = "block";
}
function playerNameCheck() {
  if (playerName.value === "" || !isNaN(playerName.value)) {
    startGameBtn.disabled = true;
    KeyboardEvent.disabled = true;
    startGameBtn.style.backgroundColor = "red";
    document.getElementById("failedGuess").play();

    //fix a condition for keypress too
  } else {
    //  KeyboardEvent.disabled=false;
    startGameBtn.disabled = false;
    startGameBtn.style.backgroundColor = "blue";
    document.getElementById("correctGuess").play();
  }
}

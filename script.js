let isPlayerBatting;
let playerScore = 0;
let computerScore = 0;
let innings = 1;
let target = 0;
let tossWinner;

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const choiceSection = document.getElementById("choice-section");
const batBowlChoice = document.getElementById("bat-bowl-choice ");
const tossSection = document.getElementById("toss-section ");
const messageEl = document.getElementById("message");
const targetEl = document.getElementById("target");
const playerHandImage = document.getElementById("player-hand");
const computerHandImage = document.getElementById("computer-hand");
const firecracker = document.getElementById("firecracker");
const restartSection = document.getElementById("restart-section");

function startToss(choice) {
  const playerNum = Math.ceil(Math.random() * 6);
  const compNum = Math.ceil(Math.random() * 6);
  const sum = playerNum + compNum;
  const result = sum % 2 == 0 ? "even" : "odd";

  if (choice === result) {
    tossWinner = "player";

    batBowlChoice.classList.remove("hidden");

    tossSection.classList.add("hidden");
  } else {
    tossWinner = "computer";
    isPlayerBatting = Math.random() < 0.5;
    updateGameStart();
  }
}

function chooseBatBowl(choice) {
  isPlayerBatting = choice === "bat";

  batBowlChoice.classList.add("hidden");
  updateGameStart();
}

function updateGameStart() {
  choiceSection.classList.remove("hidden");
  showMessage(`${isPlayerBatting ? "You" : "Computer"} are batting first!`);
}

function playerPlays(playerChoice) {
  const computerChoice = Math.ceil(Math.random() * 6);
  playerHandImage.src = `images/hand${playerChoice}.png`;
  computerHandImage.src = `images/hand${computerChoice}.png`;

  if (isPlayerBatting) {
    if (playerChoice === computerChoice) {
      showMessage(
        playerScore === 0 ? "You are OUT on the first ball!" : "You're OUT !"
      );
      nextInnings();
    } else {
      playerScore += playerChoice;
      playerScoreEl.textContent = playerScore;
      checkSpecial(playerChoice);

      if (innings === 2 && playerScore >= target) {
        showMessage("You won the game!");

        choiceSection.classList.add("hidden");
        restartSection.classList.remove("hidden");
        return;
      }
    }
  } else {
    if (playerChoice === computerChoice) {
      showMessage(
        computerScore === 0
          ? "Computer is OUT on the first ball!"
          : "Computer is OUT!"
      );
      nextInnings();
    } else {
      computerScore += computerChoice;
      computerScoreEl.textContent = computerScore;
      checkSpecial(computerChoice);
    }
  }
  checkWin();
}

function nextInnings() {
  innings++;

  choiceSection.classList.add("hidden");
  if (innings === 2) {
    target = isPlayerBatting ? playerScore + 1 : computerScore + 1;
    targetEl.textContent = `Target : ${target}`;
    isPlayerBatting = !isPlayerBatting;
    setTimeout(() => {
      choiceSection.classList.remove("hidden");
      showMessage(`${isPlayerBatting ? "You" : "Computer"} are now batting.`);
    }, 2000);
  } else {
    if (playerScore > computerScore) {
      showMessage("You won the game!");
    } else if (playerScore < computerScore) {
      showMessage("Computer won the game!");
    } else {
      showMessage("Its a tie !");
    }
    targetEl.textContent = "";

    restartSection.classList.remove("hidden");
  }
}

function checkSpecial(score) {
  if (score === 4 || score === 6) {
    showFirecracker(score);
  }
}

function showFirecracker(score) {
  firecracker.classList.remove("hidden");
  firecracker.style.animation = "none";
  firecracker.offsetHeight;
  firecracker.style.animation = null;
  showMessage(`${score === 4 ? "Four!" : "Six"}`);
  setTimeout(() => {
    firecracker.classList.add("hidden");
  }, 2000);
}

function showMessage(msg) {
  messageEl.textContent = msg;
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  innings = 1;
  target = 0;
  tossWinner = null;

  playerScoreEl.textContent = 0;
  computerScoreEl.textContent = 0;
  messageEl.textContent = "";
  targetEl.textContent = "";
  playerHandImage.src = "images/hand1.png";
  computerHandImage.src = "images/hand1.png";

  firecracker.classList.add("hidden");
  tossSection.classList.remove("hidden");
  batBowlChoice.classList.add("hidden");
  choiceSection.classList.add("hidden");
  restartSection.classList.add("hidden");
}
window.onload = function () {};

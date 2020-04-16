const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const Words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Init Word
let randomWord;

// Init Score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value. Default is medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value = difficulty;

function getRandomWord() {
  return Words[Math.floor(Math.random() * Words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);

    // Game over
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
`;

  endgameEl.style.display = "flex";
}

// Focus on text on start
text.focus();

//Start Counting down
const timeInterval = setInterval(updateTime, 1000);

addWordToDOM();

// Event listeners
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    let timeIncrement = 5;
    if (difficulty === "hard") {
      timeIncrement = 2;
    } else if (difficulty === "medium") {
      timeIncrement = 3;
    }
    console.log(timeIncrement);

    time += timeIncrement;

    //Clear
    e.target.value = "";
  }
});

settingsBtn.addEventListener("click", (e) => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
  location.reload();
});

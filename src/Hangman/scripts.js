const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letter");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "aroan", "sharon", "programming"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Display word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      letter =>
        `<span class="letter"> ${correctLetters.includes(letter) ? letter : ""}
      </span>`
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations!!! You have won!!!";
    popup.style.display = "flex";
  }
}

//Keydown letter press
function processLetters(event) {
  let keycode = event.keyCode;
  if (keycode >= 65 && keycode <= 90) {
    let letter = event.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterEL();
      } else {
        showNotification();
      }
    }
  }
}

//Update wrong letters
function updateWrongLetterEL() {
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

  //Display parts
  figureParts.forEach((part, index) => {
    let errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }

    //Check if lost
    if (wrongLetters.length === figureParts.length) {
      finalMessage.innerText = "You lost!!! Please try again!";
      popup.style.display = "flex";
    }
  });
}

//Show Notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//function start again
function playAgain() {
  //Empty Array
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLetterEL();
  popup.style.display = "none";
}

displayWord();

//Event Listeners
window.addEventListener("keydown", e => processLetters(e));
playAgainBtn.addEventListener("click", playAgain);

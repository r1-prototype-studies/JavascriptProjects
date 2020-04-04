const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = [
  "amazingGrace",
  "cornerstone",
  "hosanna",
  "OurGod",
  "WonderfulCross",
  "yourLoveNeverFails"
];

// Keep track of songs
let songIndex = 2;

// Update song details
function loadSong(song) {
  title.innerText = song;
  cover.src = `assets/${song}.jpg`;
  audio.src = `assets/${song}.mp3`;
}

// Play Song
function play() {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.add("fa-play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");
  audio.pause();
}
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");
  audio.play();
}

//Play previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Play next song
function nextSong() {
  songIndex++;

  if (songIndex === songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// update progress
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  progress.style.width = `${(currentTime / duration) * 100}%`;
}

//play with progress
function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", play);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
//Initially load songs into DOM
loadSong(songs[songIndex]);

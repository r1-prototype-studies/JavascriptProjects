const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

function toggleMenu() {
  document.body.classList.toggle("show-nav");
}

function openModal() {
  modal.classList.add("show-modal");
}

function closeModal() {
  modal.classList.remove("show-modal");
}

// Event Listeners
toggle.addEventListener("click", toggleMenu);
open.addEventListener("click", openModal);
close.addEventListener("click", closeModal);

//Hide modal on outside click
window.addEventListener("click", e => {
  e.target == modal ? closeModal() : false;
});

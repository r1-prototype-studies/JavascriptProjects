const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

//Add new user
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
  //clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//Format Money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Double Money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//Sort users with respect to Money
function sortUser() {
  updateDOM(data.sort((a, b) => b.money - a.money));
}

//Show only millionaires
function showMillionaires() {
  if (showMillionairesBtn.classList.contains("enabled")) {
    updateDOM();
  } else {
    updateDOM(data.filter(item => item.money > 1000000));
  }
  showMillionairesBtn.classList.toggle("enabled");
}

//Calculate wealth
function calculateWealth() {
  const total = data.reduce((total, item) => total + item.money, 0);

  const totalEl = document.createElement("div");
  totalEl.innerHTML = `<h3>Total: 
  <strong>${formatMoney(total)}</strong></h3>
  `;
  main.appendChild(totalEl);
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", doubleMoney);

sortBtn.addEventListener("click", sortUser);

showMillionairesBtn.addEventListener("click", showMillionaires);

calculateWealthBtn.addEventListener("click", calculateWealth);

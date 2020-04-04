const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/*const dummyTransactions = [
  { id: 1, text: "flower", amount: -20 },
  { id: 2, text: "apple", amount: -100 },
  { id: 3, text: "incentive", amount: +80 },
  { id: 4, text: "orange", amount: -40 },
  { id: 5, text: "salary", amount: 300 }
];*/
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transactions to DOM
function addTransactionDOM(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(sign === "+" ? "plus" : "minus");
  item.innerHTML = `
  ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="deleteTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
}

// Update balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, amount) => acc + amount, 0).toFixed(2);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, amount) => acc + amount, 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(amount => amount < 0)
      .reduce((acc, amount) => acc + amount, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//Init
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

//Add Transaction
function addTransaction(event) {
  event.preventDefault();

  if (text.value.trim() === "" || amount.value.trim === "") {
    alert("Please add a text and amount.");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    text.value = "";
    amount.value = "";
    updateLocalStorage();
  }
}

// Generate random ID
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

// Delete Transaction
function deleteTransaction(transactionId) {
  transactions = transactions.filter(
    transaction => transaction.id !== transactionId
  );
  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Event Listener
form.addEventListener("submit", addTransaction);

init();

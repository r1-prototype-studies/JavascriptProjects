const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  /*fetch("assets/items.json")
    .then(res => res.json())
    .then(data => console.log(data));*/

  const currency1 = currency_one.value;
  const currency2 = currency_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency2];
      rateEl.innerText = `1 ${currency1} = ${rate} ${currency2} `;
      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currency_one.addEventListener("change", calculate);
currency_two.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
amount_two.addEventListener("change", calculate);

swap.addEventListener("click", () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculate();
});

const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  singleMealEl = document.getElementById("single-meal");

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const mealApi = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const randomApi = "https://www.themealdb.com/api/json/v1/1/random.php";

//Search meal and fetch from API
function searchMeal(event) {
  event.preventDefault();

  //Clear the single meal
  singleMealEl.innerHTML = "";

  //Get search term
  const term = search.value;

  if (term.trim()) {
    fetch(searchApi + term)
      .then(res => res.json())
      .then(data => {
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no results for '${term}'. Try again!</p>`;
        } else {
          resultHeading.innerHTML = `<h2>Search results for '${term}' :</h2>`;
          mealsEl.innerHTML = data.meals
            .map(
              meal =>
                `<div class="meal"> 
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealid="${meal.idMeal}">
                <h3> ${meal.strMeal}</h3>
              </div>
              </div>`
            )
            .join("");
        }
      });

    //Clear search text
    search.value = "";
  } else {
    alert("Please enter a search term.");
  }
}

//Get meal
function getMeal(event) {
  //path is undefined in firefox
  var path = event.path || (event.composedPath && event.composedPath());
  const mealInfo = path.find(item => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealId");
    getMealById(mealId);
  }
}

//Fetch Meal by Id
function getMealById(mealId) {
  fetch(mealApi + mealId)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let index = 1; index <= 20; index++) {
    if (meal[`strIngredient${index}`]) {
      ingredients.push(
        `${meal[`strIngredient${index}`]} - ${meal[`strMeasure${index}`]}`
      );
    } else {
      break;
    }
  }

  console.log(ingredients);

  singleMealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p> ${meal.strCategory}</p>` : ""} 
            ${meal.strArea ? `<p> ${meal.strArea}</p>` : ""} 
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li> ${ing} </li>`).join("")}
            </ul>
        </div>
    </div>
  `;
}

//Get Random Meal
function getRandomMeal() {
  //Clear meals and heading
  mealsEl.innerText = "";
  resultHeading.innerText = "";

  fetch(randomApi)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Event Listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", getMeal);

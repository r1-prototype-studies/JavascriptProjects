const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show input success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check valid emailaddress
function CheckEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid.");
  }
}

// Check required fields
function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is a required.`);
    } else {
      showSuccess(input);
    }
  });
}

// Check field length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters.`
    );
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "passwords do not match");
  }
}

//Get field name - First uppercase and rest lowercase
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (event) {
  console.info("submit button clicked");
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  CheckEmail(email);
  checkPasswordMatch(password, password2);
  /* if (username.value === "") {
    showError(username, "User name is required.");
  } else {
    showSuccess(username);
  }

  if (email.value === "") {
    showError(email, "Email is required.");
  } else if (!validateEmail(email.value)) {
    showError(email, "Email is not valid.");
  } else {
    showSuccess(email);
  }

  if (password.value === "") {
    showError(password, "Password is required.");
  } else {
    showSuccess(password);
  }

  if (password2.value === "") {
    showError(password2, "Confirm Password.");
  } else {
    showSuccess(password2);
  }*/
});

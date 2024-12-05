document.querySelector(".login-button")?.addEventListener("click", () => {
  login();
});

async function login() {
  const username = document.querySelector('input[name="username"]')?.value;
  const usernameError = document.querySelector(
    'input[name="username"]'
  )?.nextElementSibling;

  const password = document.querySelector('input[name="password"]')?.value;
  const passwordError = document.querySelector(
    'input[name="password"]'
  )?.nextElementSibling;

  if (
    username === undefined ||
    usernameError?.tagName?.toLowerCase() !== "span" ||
    password === undefined ||
    passwordError?.tagName?.toLowerCase() !== "span"
  ) {
    location.href = "/index.html";
  }

  let hasErrors = false;

  if (username.length === 0) {
    usernameError.textContent = "Username should not be empty!";
    hasErrors = true;
  }

  if (!checkUsername(username)) {
    usernameError.textContent = "Username should have at least 3 characters!";
    hasErrors = true;
  }

  if (password.length === 0) {
    passwordError.textContent = "Password should not be empty!";
    hasErrors = true;
  }

  if (!checkPassword(password)) {
    passwordError.textContent = "Password should have at least 3 characters!";
    hasErrors = true;
  }

  if (hasErrors) {
    return;
  }

  passwordError.textContent = "";
  usernameError.textContent = "";

  const response = await loginAPI(username, password);

  localStorage.setItem("user", JSON.stringify(response));
  location.href = "/index.html";
}

function checkUsername(username) {
  return username.length >= 3;
}

function checkPassword(password) {
  return password.length >= 3;
}

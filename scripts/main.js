async function resolveFetch(promise) {
  try {
    return [await promise.then((resp) => resp.json()), null];
  } catch (error) {
    return [null, error];
  }
}

async function resolvePromise(promise) {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, error];
  }
}

function checkLoginStatus() {
  const user = localStorage.getItem("user");
  if (!user) return;

  const { username } = JSON.parse(user);
  const accountButton = document.querySelector(".account");
  const span = accountButton.querySelector("span");
  accountButton.setAttribute("href", "#");
  span.textContent = `Hello, ${username}`;
}

checkLoginStatus();

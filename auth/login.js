const email = document.querySelector(".email");
const password = document.querySelector(".password");
const submit = document.querySelector(".submit");
const mess = document.querySelector(".mess");

submit.addEventListener("click", () => {
  if (!email.value || !password.value) {
    mess.innerHTML = "Fill all fields..";
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  const logins = {
    email: email.value,
    password: password.value,
  };

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCS9x_NSVsWGkHA1JHbkheIt-i2Jg6lSM";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...logins, returnSecureToken: true }),
  })
    .then((resp) => resp.json())
    .then((msg) => {
      if (msg.idToken) {
        mess.innerHTML = "Log in success";
        mess.style.display = "flex";
        setTimeout(() => {
          mess.style.display = "none";
        }, 3500);
        localStorage.setItem("token", msg.idToken);
        login.redirect();
      }
      mess.innerHTML = msg.error.message;
      mess.style.display = "flex";
      setTimeout(() => {
        mess.style.display = "none";
      }, 3500);
    })
    .catch((error) => {});
});

class auth {
  token = localStorage.getItem("token");
  redirect() {
    if (this.token) {
      location.href = "../home/home.html";
    }
    return;
  }
}
const login = new auth();

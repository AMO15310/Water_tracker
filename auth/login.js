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
  const url = "http://localhost:3320/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logins),
  })
    .then((resp) => resp.json())
    .then((msg) => {
      console.log(msg.message);
      mess.innerHTML = msg.message;
      mess.style.display = "flex";
      setTimeout(() => {
        mess.style.display = "none";
      }, 3500);
      if (msg.message !== "Log in success") {
        return;
      }
      localStorage.setItem("token", msg.token);
      login.redirect();
      //   console.log(login.token);
    });
});

class auth {
  token = localStorage.getItem("token");
  redirect() {
    if (this.token) {
      location.href = "../home/home.html";
    }
  }
}
const login = new auth();

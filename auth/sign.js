const email = document.querySelector(".email");
const userName = document.querySelector(".name");
const password = document.querySelector(".password");
const confPass = document.querySelector(".pass2");
const submitbtn = document.querySelector(".submit");
const mess = document.querySelector(".mess");
const mess2 = document.querySelector(".mess2");

submitbtn.addEventListener("click", () => {
  if (!email.value || !userName.value || !password.value || !confPass.value) {
    mess.innerText = "Fill all fields.";
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  if (password.value !== confPass.value) {
    mess.innerText = "Passwords must be same!";
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  if (password.value.length < 6) {
    mess.innerText = "Passwords must be 6 characters";
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  const details = {
    email: email.value,
    password: password.value,
    displayName: userName.value,
  };
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCS9x_NSVsWGkHA1JHbkheIt-i2Jg6lSM";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...details, returnSecureToken: true }),
  })
    .then((resp) => resp.json())
    .then((msg) => {
      console.log(msg);
      if (msg.idToken) {
        mess2.innerText = "Sign up succeful Log in to access";
        mess2.style.display = "flex";
        setTimeout(() => {
          mess2.style.display = "none";
        }, 3500);
      }
      mess2.innerText = msg.error.message;
      mess2.style.display = "flex";
      setTimeout(() => {
        mess2.style.display = "none";
      }, 3500);
    });
});

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
    name: userName.value,
    password: password.value,
  };
  const url = "http://localhost:3320/signup";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  })
    .then((resp) => resp.json())
    .then((msg) => {
      mess2.innerText = msg.message;
      mess2.style.display = "flex";
      setTimeout(() => {
        mess2.style.display = "none";
      }, 3500);
    });
});

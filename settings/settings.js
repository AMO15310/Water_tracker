const newEmail = document.querySelector(".email-input");
const newPass = document.querySelector(".new-pass");
const oldPass = document.querySelector(".conf-pass");
const saveButton = document.querySelector(".save");
const cancelButton = document.querySelector(".cancel");
const mess = document.querySelector(".mess");

const token = localStorage.getItem("token");

!token ? (location.href = "../auth/login.html") : "";
cancelButton.addEventListener("click", () => {
  newEmail.value = "";
  newPass.value = "";
  confPass.value = "";
});
saveButton.addEventListener("click", () => {
  if (!newEmail.value || !newPass.value || !oldPass.value) {
    mess.innerText = "Fill all fields";
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }

  if (newPass.value.length < 6) {
    mess.innerText = "Password must not be less than 6 !";
    mess.style.display = "flex";
    setTimeout(() => {
      mess.style.display = "none";
    }, 3500);
    return false;
  }
  const newValues = {
    email: newEmail.value,
    password: newPass.value,
    oldpass: oldPass.value,
  };
  const url = "http://localhost:3320/changepass";
  fetch(url, {
    method: "PATCH",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newValues),
  })
    .then((resp) => resp.json())
    .then((msg) => {
      if (msg.message == "jwt expired") {
        location.href = "../auth/login.html";
      }

      if (msg.message == "Password changed successfully") {
        mess.innerText = msg.message;
        mess.style.display = "flex";
        mess.style.color = "white";
        mess.style.backgroundColor = "#109045";

        setTimeout(() => {
          mess.style.display = "none";
          mess.style.backgroundColor = "#f4d6d2";
          mess.style.color = "#70211a";
        }, 3500);
      }
      mess.innerText = msg.message;
      mess.style.display = "flex";
      setTimeout(() => {
        mess.style.display = "none";
      }, 3500);
    });
});

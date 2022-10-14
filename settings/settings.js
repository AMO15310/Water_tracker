const newEmail = document.querySelector(".email-input");
const newPass = document.querySelector(".new-pass");
const confPass = document.querySelector(".conf-pass");
const saveButton = document.querySelector(".save");
const cancelButton = document.querySelector(".cancel");
const pm1 = document.querySelector(".pm1");
const pm2 = document.querySelector(".pm2");
const pm3 = document.querySelector(".pm3");
const pm4 = document.querySelector(".pm4");
const pm5 = document.querySelector(".pm5");
const pm6 = document.querySelector(".pm6");
let password = 1234;
let username = "benmax@gmail.com";

cancelButton.addEventListener("click", () => {
  newEmail.value = "";
  newPass.value = "";
  confPass.value = "";
});

saveButton.addEventListener("click", () => {
  if (newPass.value !== confPass.value) {
    // console.log("Passwords must be same!!");
    pm1.style.display = "block";
    setTimeout(() => {
      pm1.style.display = "none";
    }, 3000);

    return false;
  }
  if (newPass.value == "" || confPass.value == "") {
    // console.log("Password cannot be an empty string!!");
    pm2.style.display = "block";
    setTimeout(() => {
      pm2.style.display = "none";
    }, 3000);
    return false;
  }
  if (newPass.value.length < 6) {
    // console.log("Password Must be atleast 6 characters");
    pm3.style.display = "block";
    setTimeout(() => {
      pm3.style.display = "none";
    }, 3000);
    return false;
  }
  if (newEmail.value !== "") {
    username = newEmail.value;
    // console.log(`Username Changed and its ${username}`);
    pm4.style.display = "block";
    setTimeout(() => {
      pm4.style.display = "none";
    }, 3000);
  }

  if (newPass.value == confPass.value || newPass.value !== "") {
    password = newPass.value;
    // console.log(`New password is set and is ${password}`);
    pm5.style.display = "block";
    setTimeout(() => {
      pm5.style.display = "none";
    }, 3000);
    //   return false;
  } else {
    // console.log("Try again");
    pm6.style.display = "block";
    setTimeout(() => {
      pm6.style.display = "none";
    }, 3000);
  }
});

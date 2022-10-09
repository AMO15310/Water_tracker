"use strict";
const linkcontainer = document.querySelector("#linnks");
const container = document.querySelector(".table");
const switchButton = document.querySelector(".mode");
const body = document.querySelector("body");
let element = document.body;
const loginbtn = document.querySelector("#loginbtn");
// AUTH
const mail = document.querySelector(".email")
const pass = document.querySelector(".pass")

const email = "a@gmail.com";
const password = "1234";

// LOG IN REDIRECT
loginbtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (mail.value == email && pass.value == password) {
    window.location.href = "./index.html";
  }
});

// let switchedMode = true
// let notSwitched = false

// if(switchedMode){
//   switchButton.addEventListener('click', ()=>{

//     // element.classList.toggle("dark-mode");
//       body.style.backgroundColor = 'black'
//       // switchedMode = false
//     })

// }
// else if(!notswitched && switchedMode){
//   console.log(switchedMode)
//   switchButton.addEventListener('click',()=>{
//     body.style.backgroundColor = 'white'
//     switchedMode = true
//   })
// }

// DARK MODE TOGGLE
// function mode() {
//   var element = document.body;
//   element.classList.toggle("dark-mode");
// }

const showLinks = () => {
  linkcontainer.style.display = "flex";
};
const closeLinks = () => {
  linkcontainer.style.display = "none";
};
// SHOW SUCCES MESSAGE ON SUBMIT

// LOAD DATA
(() => {
  const records = JSON.parse(localStorage.getItem("records"));
  records.forEach((record) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${record.client}</td>
        <td>${record.tel}</td>
        <td>${record.meter}</td>
        <td>${record.initialR}</td>
        <td>${record.finalR}</td>
        <td>${record.usedUnits}</td>
        <td>${record.untCost}</td>
        <td>${record.ttalBill}</td>
        <td>${record.payed}</td>
        <td>${record.bal}</td>
        <td><button class="edit">Edit</button></td>
        <td><button type="button" class="btn btn-danger">Delete</button></td>
    
      `;
    container.appendChild(tr);
  });
})();

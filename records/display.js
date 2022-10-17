"use strict";
const linkcontainer = document.querySelector("#linnks");
const container = document.querySelector(".table");
const container2 = document.querySelector(".table2");
const switchButton = document.querySelector(".mode");
const body = document.querySelector("body");
let element = document.body;
const loginbtn = document.querySelector("#loginbtn");
const deletebtn = document.querySelector("#delete");
const editbtn = document.querySelector(".edit");

// AUTH
const mail = document.querySelector(".email");
// const pass = document.querySelector(".pass")

const email = "a@gmail.com";
const password = "1234";

// LOG IN REDIRECT
// loginbtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (mail.value == email && pass.value == password) {
//     window.location.href = "./index.html";
//   }
// });

const showLinks = () => {
  linkcontainer.style.display = "flex";
};
const closeLinks = () => {
  linkcontainer.style.display = "none";
};

// SHOW SUCCES MESSAGE ON SUBMIT

// LOAD DATA
const records = JSON.parse(localStorage.getItem("JsonData"));
console.log(records);
// const rowRecord = new Array();
let newRecords;

// const newRecords2 = newRecords
(() => {
  // const records = JSON.parse(localStorage.getItem("JsonData"));

  records.forEach((record) => {
    const indx = records.indexOf(record);
    // console.log(indx);
    const del = () => {
      // const rowRecordarray = rowRecord.push(records);
      records.splice(indx, 1);
      // console.log(records);
      // return records;
    };
    const id = Math.floor(Math.random() * 100001) + 1;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${id}</td>
        <td>${record.clientName}</td>
        <td>${record.phoneno}</td>
        <td>${record.meterv}</td>
        <td>${record.initialr}</td>
        <td>${record.finalr}</td>
        <td>${record.consumed}</td>
        <td>${record.unitCost}</td>
        <td>${record.totalCost}</td>
        <td>${record.totalpayed}</td>
        <td>${record.balance}</td>
        <td><button class="edit">Edit</button></td>
        <td><button  type="button" id="del" class="btn btn-danger delete">Delete</button></td>

        `;
    container.appendChild(tr);
  });
})();

const delbtn = document.getElementsByClassName("delete");
const dlbtn = document.querySelectorAll("#del");

// for (let btn of delbtn) {
//   btn.addEventListener("click", () => {
//     // records.find((record) => {
//     //   return record;
//     // });
//     console.log
//   });
// }
console.log(dlbtn);

dlbtn.forEach((btn) => {
  btn.addEventListener("click", (id) => {
    // console.log(
    //   records.find((record) => {
    //     return record;
    //   })
    // );

    console.log(
      records.find((record) => {
        return record.id === id;
      })
    );
  });
});

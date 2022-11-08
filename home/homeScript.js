const homeContainer = document.querySelector(".table2");
const balance = document.querySelector(".bal");
const consumed = document.querySelector(".cons");
const AmountPaid = document.querySelector(".paid");

const bodyy = document.querySelector("body");

fetch(`http://localhost:3320/usersbal`)
  .then((resp) => resp.json())
  .then((records) => {
    records.forEach((record) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${record.name}</td>
        <td>${record.contact}</td>
        <td>${record.meterNumber}</td>
        <td>${record.initialUnits}</td>
        <td>${record.finalUnits}</td>
        <td>${record.consumedUnits}</td>
        <td>${record.unitCost}</td>
        <td>${record.totalCost}</td>
        <td>${record.paid}</td>
        <td>${record.balance}</td>


        `;
      homeContainer.appendChild(tr);
    });
  });

const theme = localStorage.getItem("theme");
bodyy.classList = theme;
let balurl = "http://localhost:3320/totalbal";
fetch(balurl)
  .then((res) => res.json())
  .then((bal) => {
    balance.innerHTML = bal[0]["SUM(balance)"] + " " + "Kes";
  });

let uniturl = "http://localhost:3320/totalunits";
fetch(uniturl)
  .then((res) => res.json())
  .then((unit) => {
    consumed.innerHTML = unit["SUM(consumedUnits)"] + " " + "Units";
  });

let paidurl = "http://localhost:3320/totalpaid";

fetch(paidurl)
  .then((res) => res.json())
  .then((paid) => {
    AmountPaid.innerHTML = paid[0]["SUM(paid)"] + " " + "Kes";
  });

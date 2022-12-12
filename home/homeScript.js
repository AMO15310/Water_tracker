const homeContainer = document.querySelector(".table2");
const balance = document.querySelector(".bal");
const consumed = document.querySelector(".cons");
const AmountPaid = document.querySelector(".paid");

const bodyy = document.querySelector("body");

const token = localStorage.getItem("token");

!token ? (location.href = "../auth/index.html") : "";

fetch(`https://water-tracker-3943a-default-rtdb.firebaseio.com/users.json`, {
  headers: {
    token: token,
  },
})
  .then((resp) => resp.json())
  .then((records) => {
    const clients = Object.values(records);
    clients.forEach((client) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${client.name}</td>
        <td>${client.contact}</td>
        <td>${client.meterNumber}</td>
        <td>${client.initialUnits}</td>
        <td>${client.finalUnits}</td>
        <td>${client.consumedUnits}</td>
        <td>${client.unitCost}</td>
        <td>${client.totalCost}</td>
        <td>${client.paid}</td>
        <td>${client.balance}</td>


        `;
      homeContainer.appendChild(tr);
    });
  });

const theme = localStorage.getItem("theme");
bodyy.classList = theme;
let balurl =
  "https://water-tracker-3943a-default-rtdb.firebaseio.com/users.json";
fetch(balurl, {
  headers: {
    token: token,
  },
})
  .then((res) => res.json())
  .then((bal) => {
    if (
      bal.message == "jwt malformed" ||
      bal.message == "invalid signature" ||
      bal.message == "jwt expired"
    ) {
      location.href = "../auth/index.html";
    }
    balance.innerHTML = bal[0]["SUM(balance)"] + " " + "Kes";
  });

let uniturl =
  "https://water-tracker-3943a-default-rtdb.firebaseio.com/users.json";
fetch(uniturl, {
  headers: {
    token: token,
  },
})
  .then((res) => res.json())
  .then((unit) => {
    consumed.innerHTML = unit["SUM(consumedUnits)"] + " " + "Units";
  });

let paidurl =
  "https://water-tracker-3943a-default-rtdb.firebaseio.com/users.json";

fetch(paidurl, {
  headers: {
    token: token,
  },
})
  .then((res) => res.json())
  .then((paid) => {
    AmountPaid.innerHTML = paid[0]["SUM(paid)"] + " " + "Kes";
  });

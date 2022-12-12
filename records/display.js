// "use strict";
const linkcontainer = document.querySelector("#linnks");
const container = document.querySelector(".table");
const container2 = document.querySelector(".table2");
const switchButton = document.querySelector(".mode");
const body = document.querySelector("body");
let element = document.body;
let message = document.querySelector(".message1");
const loginbtn = document.querySelector("#loginbtn");
let message3 = document.querySelector(".mess");

const client2 = document.querySelector(".name2");
const phone2 = document.querySelector(".phone-no2");
const meter2 = document.querySelector(".meter-no2");
const initial2 = document.querySelector(".initial-reading2");
const final2 = document.querySelector(".final-reading2");
const unit2 = document.querySelector(".unit-cost2");
const submit2 = document.querySelector("#submit-btn2");
const paid = document.querySelector(".paid");

const mail = document.querySelector(".email");

const showLinks = () => {
  linkcontainer.style.display = "flex";
};
const closeLinks = () => {
  linkcontainer.style.display = "none";
};
const token1 = localStorage.getItem("token");

!token1 ? (location.href = "../auth/index.html") : "";

// FETCH DATA
fetch(`https://water-tracker-3943a-default-rtdb.firebaseio.com/users.json`, {
  headers: {
    token: token1,
  },
})
  .then((resp) => resp.json())
  .then((records) => {
    // if (
    //   records.message == "jwt malformed" ||
    //   records.message == "jwt expired" ||
    //   records.message == "invalid signature"
    // ) {
    //   location.href = "../auth/index.html";
    // }
    const clients = Object.values(records);
    console.log(clients);

    clients.forEach((record) => {
      const id = Math.floor(Math.random() * 100001) + 1;
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${id}</td>
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
        <td><button onclick="editfunc('${record.id}')" class="edit">Edit</button></td>
        <td><button onclick="delfunc('${record.id}')" type="button" id="del" class="btn btn-danger delete">Delete</button></td>

        `;
      container.appendChild(tr);
    });
  });

const delfunc = (id) => {
  // fetch(" http://localhost:3320/user/" + id, {
  fetch(
    " https://water-tracker-3943a-default-rtdb.firebaseio.com/users.json" + id,
    {
      Headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  )
    .then((res) => res.json())
    .then((mess) => {
      console.log(mess);
      message3.style.display = "flex";
      message3.innerHTML = mess;
      const out = () => {
        message3.style.display = "none";
        window.location.reload();
      };
      setTimeout(out, 3500);
    });
};

const editfunc = (id) => {
  console.log(id);

  localStorage.setItem("myid", id);
  window.location.href = "./editting.html";
};

const userid = localStorage.getItem("myid");

submit2.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  const newValues = {
    name: client2.value,
    meterNumber: meter2.value,
    contact: phone2.value,
    initialUnits: initial2.value,
    finalUnits: final2.value,
    consumedUnits: final2.value - initial2.value,
    unitCost: unit2.value,
    totalCost: (final2.value - initial2.value) * unit2.value,
    paid: paid.value,
    balance: (final2.value - initial2.value) * unit2.value - paid.value,
  };
  // fetch("http://localhost:3320/user/" + userid, {
  fetch(
    "https://water-tracker-3943a-default-rtdb.firebaseio.com/users.json" +
      userid,
    {
      headers: {
        token: token1,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ ...newValues }),
    }
  )
    .then((res) => res.json())
    .then((msg) => {
      message.innerHTML = msg.message;
      message.style.color = "green";
      const out = () => {
        message.style.display = "none";
      };
      setTimeout(out, 3000);
    })
    .catch((error) => {
      message.innerHTML = `Opps!! something went wrong!`;
      message.style.color = "red";
      message.style.display = "block";
      const out = () => {
        message.style.display = "none";
      };
      setTimeout(out, 3000);
    });
});

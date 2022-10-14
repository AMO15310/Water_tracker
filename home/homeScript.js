const homeContainer = document.querySelector(".table2");

const Jsondata = localStorage.getItem("JsonData");
const bodyy = document.querySelector("body");
const cleanData = JSON.parse(Jsondata);

cleanData.forEach((element) => {
  const tabrow = document.createElement("tr");
  tabrow.innerHTML = `
    <td>${element.clientName}</td>
    <td>${element.phoneno}</td>
    <td>${element.meterv}</td>
    <td>${element.initialr}</td>
    <td>${element.finalr}</td>
    <td>${element.consumed}</td>
    <td>${element.unitCost}</td>
    <td>${element.totalCost}</td>
    <td>${element.totalpayed}</td>
    <td>${element.balance}</td>
    `;
  homeContainer.appendChild(tabrow);
});
const theme = localStorage.getItem("theme");
bodyy.classList = theme;

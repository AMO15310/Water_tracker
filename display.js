const linkcontainer = document.querySelector("#linnks");
const container = document.querySelector(".table");

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
    container.appendChild(tr)
  });
})();

// SELECT FORM INPUTS
const userName = document.querySelector(".name");
const phoneNumber = document.querySelector(".phone-no");
const meterNumber = document.querySelector(".meter-no");
const initReading = document.querySelector(".initial-reading");
const finalReading = document.querySelector(".final-reading");
const submit = document.querySelector("#submit-btn");

const succ = document.querySelector(".succ")

// Calculated values
const unitCost = 120;

// Data Array
const records = [];
// Raw record

// Handle click event
submit.addEventListener("click", function onSubmit(e) {
  e.preventDefault();
  const consumedUnits = finalReading.value - initReading.value;
  const totalBill = consumedUnits * unitCost;
  const payment = 1000;
  const balance = totalBill - payment;

  if (userName.value == "" || phoneNumber.value == "") {
    return false;
  }
  const record = {
    client: userName.value,
    tel: phoneNumber.value,
    meter: meterNumber.value,
    initialR: initReading.value,
    finalR: finalReading.value,
    usedUnits: consumedUnits,
    untCost: unitCost,
    ttalBill: totalBill,
    payed: payment,
    bal: balance,
  };

  records.push(record);
  succes();

  const stringifiedRecords = JSON.stringify(records);
  console.log(stringifiedRecords);
  localStorage.setItem("records", stringifiedRecords);
});
const succes = () => {
  succ.style.display = "block";
  setTimeout(() => {
    succ.style.display = "none";
  }, 3000);
};

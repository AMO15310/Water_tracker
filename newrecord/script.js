const client = document.querySelector(".name");
const phone = document.querySelector(".phone-no");
const meter = document.querySelector(".meter-no");
const initial = document.querySelector(".initial-reading");
const final = document.querySelector(".final-reading");
const unit = document.querySelector(".unit-cost");
const submit = document.querySelector("#submit-btn");
const table = document.querySelector(".table");
const message = document.querySelector(".succ");
const message2 = document.querySelector(".message2");

let payed = 0;

const submission = (details) => {
  try {
    fetch(" http://localhost:3320/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.message);
        message.innerHTML = response.message;
        message.style.color = "green";
        message.style.display = "block";
        client.value = "";
        phone.value = "";
        meter.value = "";
        initial.value = "";
        final.value = "";

        const out = () => {
          message.style.display = "none";
        };
        setTimeout(out, 3000);
      })
      .catch((error) => {
        console.log(error);
        message.innerHTML = `Opps!! something went wrong!`;
        message.style.color = "red";
        message.style.display = "block";
        const out = () => {
          message.style.display = "none";
        };
        setTimeout(out, 3000);
      });
  } catch (error) {
    message.innerHTML = `Something went wrong`;
    message.style.display = "block";
    const out = () => {
      message.style.display = "none";
    };
    setTimeout(out, 3000);
  }
};

// POST DATA TO DATABASE

document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault();

  const newDetails = {
    name: client.value,
    meterNumber: meter.value,
    contact: phone.value,
    initialUnits: initial.value,
    finalUnits: final.value,
    consumedUnits: final.value - initial.value,
    unitCost: unit.value,
    totalCost: (final.value - initial.value) * unit.value,
    paid: payed,
    balance: (final.value - initial.value) * unit.value - payed,
  };
  if (
    client.value == "" ||
    phone.value == "" ||
    meter.value == "" ||
    initial.value == "" ||
    final.value == ""
  ) {
    message2.style.display = "block";
    const out2 = () => {
      message2.style.display = "none";
    };
    setTimeout(out2, 3000);
    return false;
  } else {
    submission(newDetails);
  }
});

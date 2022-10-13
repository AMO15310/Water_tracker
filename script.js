// SELECT THE INPUT FIELDS
const client = document.querySelector('.name')
const phone = document.querySelector('.phone-no')
const meter = document.querySelector('.meter-no')
const initial = document.querySelector('.initial-reading')
const final = document.querySelector('.final-reading')
const unit = document.querySelector('.unit-cost')
const submit = document.querySelector('#submit-btn')
const table = document.querySelector('.table')
const message = document.querySelector('.succ')
const message2 = document.querySelector('.message2')


let payed=1000

// CREATE AN EMPTY ARRAY
const details = []
// DO THE MATHS 
const submission = (e) => {
  e.preventDefault()

  const newDetails = {
    clientName: client.value,
    phoneno: phone.value,
    meterv: meter.value,
    initialr: initial.value,
    finalr: final.value,
    unitCost: unit.value,
    consumed: final.value - initial.value,
    totalCost: (final.value - initial.value) * unit.value,
    balance: ( (final.value - initial.value) * unit.value) - payed,
    totalpayed:payed
  }
  // details.push(clientName)
  // details.push(phoneno)
  // details.push(meterv)
  // details.push(initialr)
  // details.push(finalr)
  // details.push(unitCost)
  // details.push(consumed)
  // details.push(totalCost)
  if (client.value ==""||phone.value == ""||meter.value=="") {
    message2.style.display = 'block'
    const out2 = () => {
      message2.style.display = 'none'
      
    }
    setTimeout(out2,3000)

    
  } else {
    
    details.push(newDetails)
    message.style.display = 'block'
    const out = () => {
      message.style.display = 'none'
      
    }
    setTimeout(out,3000)
  }

  // STRINFIFY THE DATA IN THE ARRAY TO SEND IT TO THE LOCAL STORAGE
  const stringData = JSON.stringify(details)
  // SEND TO LOCAL STORAGE
  localStorage.setItem("JsonData", stringData)

  // console.log(finalr);
}
// ADD EVENT LISTENER TO THE BUTTON
document.querySelector('#submit-btn').addEventListener('click', submission)
// console.log(details);
// RETRIEVE DATA FROM THE LOCAL STORAGE
const gotData = localStorage.getItem("JsonData")
// PARSE THE DATA TO GET AN OBJECT
const clvnData = JSON.parse(gotData)
// console.log(clvnData);
// EXPORT THE DATA TO THE RECORDS PAGE 
// clvnData = [clvnData]
console.log(clvnData)
// clvnData.forEach(element => {
//   table.innerHTML += `
//   <tr>
//   <td>${element.clientName}</td>
//   <td>${element.phoneno}</td>
//   <td>${element.meterv}</td>
//   <td>${element.initialr}</td>
//   <td>${element.finalr}</td>
//   <td>${element.consumed}</td>
//   <td>${element.unitCost}</td>
//   <td>${element.totalCost}</td>
//   </tr>
//   `
// });



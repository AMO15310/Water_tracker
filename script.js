let users = [{ id: 1, name: 'Amos', email: 'amos@gmail.com', role: 'Admin' }, { id: 2, name: ' Erick', email: 'erick@gmail.com', role: 'User' }]
let inputemail = 'erick@gmail.com'
let founduser = users.filter((u) => {
    return u.email == inputemail

})

// console,lof
// if (founduser[0].role == 'Admin') {
    
//     console.log(founduser[0].role)
//     window.location.href="#"
// }
// else if (founduser[0].role == 'User') {
//     // window.location.reload(s)
//     window.location = "./newrecord.html"

// } else {
//     window.location.href = "#"
// }

function createUser() {
    var userName = document.getElementById("user_name").value;
    var userPhone = document.getElementById("user_phone").value;
    var userPassw = document.getElementById("user_passw").value;
    var disc = 10;
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:8081/demo/save");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({name: userName, phone: userPhone, password: userPassw, discount:disc}));
    console.log("hhh");
    loadUsers();

}
function deleteUser(id) {

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8081/demo/delete/" + id , true);
    xhttp.send();
    console.log("del succes");
   setTimeout(loadUsers, 1000);
}
function loadUsers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(this.responseText);
            var html = `<tr>
                            <th>User id</th>
                            <th>User name</th>
                            <th>User phone</th>
                        </tr>` ;
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                console.log(user);
                html +=
                    `
                        <tr>
                            <td>${user.id} </td>
                            <td>${user.name}</td>
                            <td> ${user.phone}</td>
                            <td> ${user.password}</td>
                            <td><button type="submit" onclick="deleteUser(${user.id})">delete</button></td>
                        `;
            }
            document.querySelector(".usersList").innerHTML = html;
        }
    };
    xhttp.open("GET", "http://localhost:8081/demo/users", true);
    xhttp.send();
}
loadUsers();




const btn = document.querySelector('.btn');
btn.addEventListener("click", createUser);
// document.querySelector('.del').addEventListener("click", deleteUser)


function myPhone(){
    console.log("start");
    const input = document.querySelector('#ph');

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:8081/demo/enter");
    // xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(input.value);
    console.log("succes");
}
const phBtn = document.querySelector('.ph_btn');
phBtn.addEventListener("click", myPhone);

document.querySelector('#demobtn').addEventListener("click", ()=>{
    var results = document.cookie.match(/id_user=(.+?)(;|$)/);
    console.log(results[1]);
});
document.querySelector('#delcookie').addEventListener("click", ()=>{
    document.cookie = "id_user=;max-age=-1";
});

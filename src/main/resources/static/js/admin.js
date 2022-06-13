window.addEventListener('DOMContentLoaded', () =>{
    window.removeEventListener('scroll', showModalByScroll);

    //Tabs
     const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent(){
        tabsContent.forEach(item=>{
            item.style.display = 'none';
        });
        tabs.forEach(tab =>{
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent(i){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabsContent();
    showTabsContent(0);

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((tab, i) =>{
                if(target == tab){
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
});
// const modalTimerId =  setTimeout(()=>{openModal('.admin-modal');}, 500);

///////////////////////////////////////////

function loadRequests(){
    let select = document.querySelector('#Req_orderBy');
    console.log(select.value);
    fetch("http://localhost:8081/admin/requests/"+ select.value, {
        method: 'GET', // или 'PUT'
        // body: JSON.stringify({phone: userPhone, password: userPassw}), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            // var services = JSON.parse(res);
            var conteiner = document.querySelector(".requestList");
            var html = `<tr>
                            <th> id</th>
                            <th>CLient name</th>
                            <th>CLient phone</th>
                            <th>Master</th>
                            <th>Sale</th>
                            <th>Date</th>
                            </tr>` ;
            for (var i = 0; i < res.length; i++) {
                var request = res[i];
                html +=
                    `
                        <tr>
                            <td>${request.id} </td>
                            <td>${request.name}</td>
                            <td> ${request.phoneClient}</td>
                            <td>${request.idMaster}</td>
                            <td>${request.totalPrice}</td>
                            <td>${request.dateRequest}</td>
                            <td><button type="submit" onclick="deleteUser( 'deleterequest/${request.id}')">delete</button></td>
                        `;



                ////////


                ///////////
            }
            conteiner.innerHTML = html;
        })

}



////////////////////////////////////////

function createMaster() {
    var Name = document.getElementById( "master_name");
    var Phone = document.getElementById("master_phone");
    var image = document.getElementById("master_img");
    var serv = 1;
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:8081/admin/savemaster");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({name: Name.value, phone: Phone.value, img:"img/masters/" +image, service_id: serv}));
   console.log("added");
   console.log(Name + Phone + image);
    setTimeout(loadMaster, 1000);
    Name.value = "";
    Phone.value = "";
    image.value = "";
}
function deleteUser(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8081/admin/" + id , true);
    xhttp.send();
    console.log("del succes");
    setTimeout(loadMaster, 1000);
}
function loadMaster() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(this.responseText);
            var html = `<tr>
                            <th>Master id</th>
                            <th>Master name</th>
                            <th>Master phone</th>
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
                            <td><button type="submit" onclick="deleteUser( 'deletemaster/${user.id}')">delete</button></td>
                            
                        `;
            }
            document.querySelector(".masterList").innerHTML = html;
        }
    };
    xhttp.open("GET", "http://localhost:8081/admin/masters", true);
    xhttp.send();
    loadService();
}

function getServices(){

}
//////////////////////////////////////
function createService() {
    var Name  = document.getElementById( "serv_name");
    var Price = document.getElementById("serv_price");
    var image = document.getElementById("serv_img");

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:8081/admin/saveservice");
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({nameServ: Name.value, price: parseInt(Price.value), img: "img/slider/"+image}));
    console.log("added");

    setTimeout(loadService, 1000);
    Name.value = "";
    Price.value = "";
    image.value = "";
}
function loadService() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(this.responseText);
            var html = `<tr>
                            <th> id</th>
                            <th> name</th>
                            <th> phone</th>
                        </tr>` ;
            var serviceselect = '';
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                console.log(user);
                html +=
                    `
                        <tr>
                            <td>${user.id} </td>
                            <td>${user.nameServ}</td>
                            <td> ${user.price}</td>
                            <td><button type="submit" onclick="deleteUser( 'deleteservice/${user.id}')">delete</button></td>
                            
                        `;
                serviceselect += `
                    <option>${user.nameServ}</option>
                `;
            }
            document.querySelector(".serviceList").innerHTML = html;
            document.querySelector('#selectserv').innerHTML = serviceselect;
        }
    };
    xhttp.open("GET", "http://localhost:8081/admin/services", true);
    xhttp.send();
}


////////////////////////////////////////////////
document.querySelector("#mast").addEventListener("click", loadMaster)
document.querySelector("#serv").addEventListener("click", loadService)
document.querySelector("#btn_sortReq").addEventListener("click", loadRequests)
document.querySelector(".btn_add_master").addEventListener("click", createMaster)
document.querySelector(".btn_add_serv").addEventListener("click", createService)

document.querySelector("#btn_admin_entr").addEventListener('click', ()=>{
    if(document.querySelector("#admin_passw_enter").value == "111"){
        closeModal('.admin-modal');
    }
})
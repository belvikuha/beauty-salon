
window.addEventListener('DOMContentLoaded', () =>{

})

const btnmodal = document.querySelectorAll('[data-modal]'),
    btn_reg = document.querySelector('.reg_btn'),
    
    btnClose = document.querySelectorAll('.modal__close'),
    form_reg = document.querySelector('.registr_form'),
    form_enter = document.querySelector('.enter_form'),
    user_inf_btn = document.querySelector('.user_icon'),
    user_inf_block = document.querySelector('.user_block'),

user_block_container = document.querySelector('.user_block_container');


let btnex = document.querySelector('.exit_btn_img');
btnex.addEventListener('click',async () => {
    console.log("fg");
    // document.cookie = "id_user=;max-age=-1";
    // await fetch("http://localhost:8081/user/exit",
    //     {
    //         method: 'GET', // или 'PUT'
    //         // body: JSON.stringify({phone: userPhone, password: userPassw}), // данные могут быть 'строкой' или {объектом}!
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    document.cookie = "id_user=;max-age=-1";
    document.location.replace("http://localhost:8081/main");
    user_block_container.style.display = 'none';
})


function openModal(selector){
    mWindow = document.querySelector(selector);
    mWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // clearInterval(modalTimerId);
}
function closeModal(selector){
    mWindow = document.querySelector(selector);
    mWindow.style.display = 'none';
    document.body.style.overflow = '';
    // form_enter.style.display = 'none';
    // form_reg.style.display = 'none';
}
// window.addEventListener('DOMContentLoaded', () =>{
    

    // document.querySelector('.user_icon').addEventListener

user_inf_btn.addEventListener('mouseover', (e)=>{
    user_inf_block.style.display = 'block';

})
// user_inf_block.addEventListener('mouseover', (e)=>{
//     user_inf_block.style.display = 'block';
// })

user_inf_btn.addEventListener('mouseleave', (e)=>{
    user_inf_block.style.display = 'none';
})


btn_reg.addEventListener('click', ()=>{
        openModal('.registr_modal')
        // form_enter.style.display = 'none';
        // form_reg.style.display = 'block';
    });

btnmodal.forEach(element => {element.addEventListener('click', ()=>{ //////потом удалить !
            // form_enter.style.display = 'block';
            openModal('.registr_modal');
            // try{
            //     var results = document.cookie.match(/id_user=(.+?)(;|$)/);
            //
            // }catch (e){
            //
            // }\


        })
    });

    btnClose.forEach(btn =>{ btn.addEventListener('click', (e)=>{
        mWindow = document.querySelectorAll('.modal');
        // console.log(e.path[3]);
        
       mWindow.forEach(window =>{
           
            if(e.path[3]  === window){
                closeModal("." + window.classList[1]); 
                // console.log(window.classList[1]);
            }

       })
    });
})  

document.querySelectorAll('.modal').forEach(modal =>{ modal.addEventListener('click', (e)=>{
        if(e.target === modal)
        closeModal("." + modal.classList[1]); 
    });
});
    // document.addEventListener('keydown', (e)=>{
    //     if(e.code === "Escape" && mWindow.style.display === 'block')
    //         closeModal();
    // });

    // const modalTimerId =  setTimeout(openModal, 4000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight ){
            openRequestWindow(0);
            // openModal('.enterence_modal');
            // form_enter.style.display = 'block';
            window.removeEventListener('scroll', showModalByScroll); //что-бы окно всплывало только один раз удаляяем обработчик события при срабатываении 
        }
    }
window.addEventListener('scroll', showModalByScroll);

    // });


// function createUser() {

//     var userName = document.getElementById("user_name").value;
//     var userPhone = document.getElementById("user_phone").value;
//     var userPassw = document.getElementById("user_passw").value;
//     var disc = 10;
//     var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
//     xmlhttp.open("POST", "http://localhost:8081/user/save");
//     xmlhttp.setRequestHeader("Content-Type", "application/json");
//     xmlhttp.send(JSON.stringify({name: userName, phone: userPhone, password: userPassw, discount:disc}));
//     console.log(xmlhttp.response);
//     console.log("hhh");

// }
// document.querySelector('.registr_btn').addEventListener('click', create);



async function create() {
    var userName = document.getElementById("user_name").value;
    var userPhone = document.getElementById("user_phone").value;
    var userPassw = document.getElementById("user_passw").value;
    const textP = document.querySelector('#form_info_text');

    var disc = 10;
        const response = await fetch("http://localhost:8081/user/save", {
            method: 'POST', // или 'PUT'
            body: JSON.stringify({name: userName, phone: userPhone, password: userPassw, discount: disc}), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.text())
            .then(res => {
                textP.textContent = res;
                if(res ==="Регистрация успешна"){
                    setTimeout(()=>{closeModal('.registr_modal');}, 2000);
                    document.querySelector('#user_phone_enter').value = userPhone;
                }else setTimeout(()=>{ textP.textContent = "";}, 2000);
            })
            // .then(res => {
            //
            // });
}

//     const json = await response.json();
//     console.log('Успех:', JSON.stringify(json));
// } catch (error) {
//     console.error('Ошибка:', error);


form_reg.addEventListener('submit', event => {

    event.preventDefault();
    create();
});


async function enterence() {

    var userPhone = document.getElementById("user_phone_enter").value;
    var userPassw = document.getElementById("user_passw_enter").value;
    const textP = document.querySelector('#form_info_text_enter');


    const response = await fetch("http://localhost:8081/user/enter", {
        method: 'POST', // или 'PUT'
        body: JSON.stringify({phone: userPhone, password: userPassw}), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.text())
        .then(res => {
            if(res ==="good"){
                setTimeout(()=>{closeModal('.enterence_modal')}, 1000);
                load_info_user();
            }
            else{
                textP.textContent = res;
                setTimeout(()=>{
                    textP.textContent = "";

                }, 2000);
            }
        }
        )

        // .then(res => {});
}

form_enter.addEventListener('submit', event => {
    event.preventDefault();
    enterence();
});

async function load_info_user() {

    const response = await fetch("http://localhost:8081/user/userinfo",
        {
            method: 'GET', // или 'PUT'
            // body: JSON.stringify({phone: userPhone, password: userPassw}), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(res =>

        // if (res != null) {
            res.json()
        //     console.log(res);
        // }
    ).then(res=>{
        // var user = JSON.parse(res);
        var html = `
                <div class="user_info">
                            <img src="img/icons/638178_avatar_brunette_female_portrait_profile_icon.png" width="90px"height="90px" alt="">
                            <div class = "user_info_content">
                                <h1>${res.name}</h1>
                                <p>${res.phone}</p>
                            </div>
                        </div>
                <div class="user_info">
                            <img src="img/icons/1814073_discount_price_tag_icon.png" alt="">
                            <h2>${res.discount}%</h2>
                </div>
                 `;
        document.querySelector(".user_info_bd").innerHTML = html;
        document.querySelector('.user_block_container').style.display = 'block';

        document.querySelector('.request_form').reset();
        document.getElementById("anon_user_name").value = res.name;
        document.getElementById("anon_user_phone").value = res.phone;
        document.getElementById("procent").value = res.discount;

        document.querySelector(".if_have_acc_btn").innerHTML = "";

    // catch (e) {
    //     // document.querySelector('.user_block_container').style.display = 'none';
    //
// else {
//         console.log("o nou");
//     }
    })




}

// load_info_user();

async function sendRequest() {

    const userName = document.getElementById("anon_user_name").value,
         userPhone = document.getElementById("anon_user_phone").value,
        idM = document.getElementById("idMaster").value,
        procent = document.getElementById("procent").value;

    const response = await fetch("http://localhost:8081/sendRequest", {
        method: 'POST', // или 'PUT'
        body: JSON.stringify({name: userName, phoneClient: userPhone,dateRequest: new Date(), totalPrice: Number(procent), idMaster: Number(idM)}), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(
        document.querySelector('.request_form_preinfo').innerHTML = "мы скоро с вами свяжемся!")
        .then(setTimeout(()=>{
            closeModal('.request_user_modal'); document.querySelector('.request_form_preinfo').innerHTML = ""
       }, 2000))



}

document.querySelector('.request_form').addEventListener('submit', event => {
    event.preventDefault();
    sendRequest();
});

document.querySelector('.if_have_acc_btn').addEventListener('click', ()=>{
    openModal('.enterence_modal');
    // closeModal('.request_user_modal');
    // let form_req = document.querySelector('.request_form');
    // form_req.reset();
    // let id = document.cookie.match(/masterId=(.+?)(;|$)/);
    // openRequestWindow(id[1]);
})

///////поиск юзера
function findUser(){


}
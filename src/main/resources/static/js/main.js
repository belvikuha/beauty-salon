
// const menuItem = document.querySelector('.menu-item');
// document.querySelector('.icon').addEventListener('click', ()=>{
//     menuItem.classList.toggle('humb');
//     // menuItem.classList.remove()
// });
// document.querySelector("#close_modal_request").addEventListener('click',()=>{
//     let modal = document.querySelector('.modal_request'),
//         container = document.querySelector('.modal_request_container');
//
//     modal.style.display = "none";
//     container.innerHTML="";
// })



var left = 0;
var timer;

function autoSlider(){
    timer = setTimeout(function(){
        var polosa = document.getElementById('polosa');
        left -= 350;
        if (left < - (polosa.offsetWidth-1100)){
            left = 0;
        }
        polosa.style.left = left +'px';
        autoSlider ();
    }, 4000);

}



function openRequestWindow(id){
    closeModal(".select_master");

    // document.cookie = `masterId=${id}`;
    // document.cookie = `masterId=${id}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
   const idM = document.getElementById("idMaster");
    idM.value= Number(id);



    if(document.cookie.match(/id_user=(.+?)(;|$)/) == null){
        document.getElementById("procent").value = 0;
    }

   setTimeout(()=>{openModal('.request_user_modal')}, 100);
   

    
    
    let id_master = Number(id);
    console.log("айди:" + id);
}

function loadMasterByService(id){
     document.querySelector(".modal_request_container").innerHTML="";

    let id_serv = Number(id);
    document.querySelector('.modal_request').style.display = "block";
    openModal('.select_master');
    // if(document.cookie.match(/id_user=(.+?)(;|$)/) != null){
        // open window ""
        fetch(`http://localhost:8081/findMaster/${id_serv}`, {
            method: 'GET', // или 'PUT'
            // body: JSON.stringify({phone: userPhone, password: userPassw}), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()).then(resp =>
            {
                var conteiner = document.querySelector(".modal_request_container");
                // container.innerHTML="";
                for (var i = 0; i < resp.length; i++) {
                    var master = resp[i];
                    var d = document.createElement('div');
                    d.classList.add('modal_request_master')
                    // console.log(master.name);
                    var html =`
                    <div class="modal_request_master_img" >
                    <img src="${master.img}" onclick = "openRequestWindow(${master.id})">
                    </div>
                    <h1>${master.name}</h1> `;
                    d.innerHTML  = html;
                    conteiner.appendChild(d);
                }
            }
        )
    // }
}

async function loadService() {
    const response = await fetch("http://localhost:8081/admin/services", {
        method: 'GET', // или 'PUT'
        // body: JSON.stringify({phone: userPhone, password: userPassw}), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            // var services = JSON.parse(res);
            var conteiner = document.querySelector(".services_container");

            for (var i = 0; i < res.length; i++) {
                var service = res[i];
                var d = document.createElement('div');
                d.classList.add('service_block')
                var html = `
                <h1>${service.nameServ}</h1>
                <img src="${service.img}" alt="">
                <h2>${service.price}₴</h2>
                <div class="center">
                    <button class="btn" onclick="loadMasterByService(${service.id})">
                        <svg width="255px" height="60px" viewBox="0 0 255 60" class="border">
                            <polyline points="254,1 254,59 1,59 1,1 254,1" class="bg-line" />
                            <polyline points="254,1 254,59 1,59 1,1 254,1" class="hl-line" />
                        </svg>
                        <span>ЗАПИСАТЬСЯ</span>
                    </button>
                </div>
            `;

                d.innerHTML  = html;
                conteiner.appendChild(d);
                ////////






                ///////////
            }

        });
}

async function loadMasters() {
    const response = await fetch("http://localhost:8081/admin/masterSlider", {
        method: 'GET', // или 'PUT'
        // body: JSON.stringify({phone: userPhone, password: userPassw}), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            // var services = JSON.parse(res);
            let width = res.length * 350;
            console.log(width);
           document.getElementById('polosa').style.width = width + "px";

            var conteiner = document.querySelector("#polosa");
            var html = "";

            for (var i = 0; i < res.length; i++) {
                var master = res[i];
                var d = document.createElement('div');
                d.classList.add('master_block')
                html = `
                <img src="${master.img}" alt="" >
                <h2>${master.name}</h2> 
                <h3>${master.service}</h3>           
            `;

                d.innerHTML  = html;
                conteiner.appendChild(d);
            }

        });
}
loadService();
loadMasters();




window.addEventListener('DOMContentLoaded', () =>{


    var results = document.cookie.match(/id_user=(.+?)(;|$)/);

    if(results != null){
        load_info_user();
        user_block_container.style.display = 'block';

    }
    else{
        user_inf_btn.addEventListener('click', (e)=>{
            openModal('.enterence_modal');
            window.addEventListener('scroll', showModalByScroll);
        })
    }
    const topnav=document.querySelector('.topnav');
    function showMenuByScroll(){
        if(window.pageYOffset >=document.documentElement.clientHeight  ){
            topnav.style.background='rgba(166, 111, 81, 0.75)';
        }
        else{
            topnav.style.background='rgba(166, 111, 81, 0)';
        }
    }

    window.addEventListener('scroll', showMenuByScroll);

    });

autoSlider();


/////////
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 500,
    framesCount = 30;

anchors.forEach(function(item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', function(e) {
        // убираем стандартное поведение
        e.preventDefault();

        // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

        // запускаем интервал, в котором
        let scroller = setInterval(function() {
            // считаем на сколько скроллить за 1 такт
            let scrollBy = coordY / framesCount;

            // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
            // и дно страницы не достигнуто
            if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                // то скроллим на к-во пикселей, которое соответствует одному такту
                window.scrollBy(0, scrollBy);
            } else {
                // иначе добираемся до элемента и выходим из интервала
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
            // время интервала равняется частному от времени анимации и к-ва кадров
        }, animationTime / framesCount);
    });
});
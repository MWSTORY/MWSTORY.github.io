$(function(){
    includeHTML("consultation_form.html", "#modal_base_ground");
})
function includeHTML(fn, target) {
    let element = document.querySelector(target);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            element.innerHTML = this.responseText;
        componentDidMount()
    }
    xhttp.open("GET", fn, true);
    xhttp.send();
}

function componentDidMount(){
    $(".open").attr('onclick','').unbind("click");
    $(".open").click(function(){
        $("#modal_content").removeClass('display_on');
        $("#modal_content_back").removeClass('display_on');
    });
    $("#m_close").attr('onclick','').unbind("click");
    $("#m_close").click(function(){
        $("#modal_content").addClass('display_on');
        $("#modal_content_back").addClass('display_on');
    });
}

function email_checker(data){
    if(data.match(/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*/g) != undefined) return true;
    return false;
}

function tel_checker(data){
    if(data.match(/([0-9]*-?[0-9]){1,}/g) != undefined) return true;
    return false;
}

function apply_consultation_inquiry(){
    // let form = document.querySelector("#gmail_sender");
    let company = document.querySelector('#company').value;
    let manager = document.querySelector('#manager').value;
    let email = document.querySelector('#email').value;
    let tel = document.querySelector('#tel').value;
    let massage = document.querySelector('#message').value;
    
    console.log(company, manager, email, tel, massage);
    if(email_checker(email) && tel_checker(tel)){
        let form = {
            company,
            manager,
            email,
            tel,
            massage
        }
        // form.action = "https://script.google.com/macros/s/AKfycbzLWzwVIKhcDRRHoruWZMK2t-dFu_M-rtss_gfParPrJID3aK11ikxI04OBPrOFkAU2/exec";
        // form.submit();
        // console.log(form);
        fetch("https://script.google.com/macros/s/AKfycbzLWzwVIKhcDRRHoruWZMK2t-dFu_M-rtss_gfParPrJID3aK11ikxI04OBPrOFkAU2/exec", {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(form)
        }).then(res => {
            console.log(res);
        })
    }else{
        alert("이메일 또는 전화번호를 정확히 입력해주세요.")
    }
}
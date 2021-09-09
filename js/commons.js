$(function(){
    includeHTML("consultation_form.html", "#modal_base_ground");
})
// 외부 페이지 불러오기
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

// 페이지 불러온 후 작동되는 이벤트
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

// 이메일 유효 체크
function email_checker(data){
    if(data.match(/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*/g) != undefined) return true;
    return false;
}

// 전화번호 유효 체크
function tel_checker(data){
    let res = data.match(/^[0-9](-?[0-9]){1,}$/g);
    if(res != undefined) return true;
    return false;
}

// 상담 메일 전송
function apply_consultation_inquiry(){
    // 페이지 이동 방지
    // let form = document.querySelector("#gmail_sender");
    let company = document.querySelector('#company').value;
    let manager = document.querySelector('#manager').value;
    let email = document.querySelector('#email').value;
    let tel = document.querySelector('#tel').value;
    let message = document.querySelector('#message').value;
    if(email_checker(email) && tel_checker(tel)){
        var formData = new FormData();
        formData.append('company', company);
        formData.append('manager', manager);
        formData.append('email', email);
        formData.append('tel', tel);
        formData.append('message', message);

        // form.action = "https://script.google.com/macros/s/AKfycbwwlzPDgI5WoEmV_I7hURrZNHCMB2oqEr8rLjpIf0RcyGQhXywtbCcnHW4xrbL7VI5V/exec";
        // form.submit();

        // javascript 프론트엔드로 메일 처리
        // 구글 드라이브 연동해서 메일 전송함
        fetch("https://script.google.com/macros/s/AKfycbwwlzPDgI5WoEmV_I7hURrZNHCMB2oqEr8rLjpIf0RcyGQhXywtbCcnHW4xrbL7VI5V/exec", {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:formData,
            mode: 'no-cors'
        }).then(res => {
            alert("상담 문의가 접수되었습니다")
            location.reload();
        })
    }else{
        alert("이메일 또는 전화번호를 정확히 입력해주세요.")
    }
}
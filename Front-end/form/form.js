new InputMask().Initialize(document.querySelectorAll("#phone"), {
    mask: InputMaskDefaultMask.Phone,
    placeHolder: "ex. (99) 99999-9999"
});

function validaEmail(email) {
    er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

    if (er.exec(email)) {
        return true;
    } else {
        return false;
    }
}

function testePinta(event) {
    // pega o asterisco para mudar pra exclamação
    var x = event.parentNode.childNodes[3];
    // console.log(x);
    if (!event.checkValidity()) {
        event.style.borderColor = "orange";
        event.style.boxShadow = "1px 1px 10px orange";
        x.className = "fa fa-exclamation";

    }
    else if (event.checkValidity()) {
        event.style.boxShadow = "none";
        event.style.borderColor = "#dcdcdc";
        x.className = "fa fa-asterisk";
    }
}


function checkSelects(select) {
    if (select.value == 0) {
        // console.log(select.className);
        select.className = "inputInvalid";
        select.style.boxShadow = "1px 1px 1 orange";
    }
    else {
        select.className = "inputValid";
    }
}

function emailCheck(input) {
    if (validaEmail(input.value)) {
        input.parentNode.childNodes[7].style.visibility = "hidden";
        input.parentNode.childNodes[5].className = "glyphicon glyphicon-asterisk form-control-feedback"
        input.className = "inputValid";
    }
    else {
        input.parentNode.childNodes[7].style.visibility = "visible";
        input.parentNode.childNodes[5].className = "glyphicon glyphicon-exclamation-sign form-control-feedback"
        input.className = "inputInvalid";

    }
}

function checkInputs(input) {
    if (input.className == "email") {
        emailCheck(input);
    }
    else if (input.className != "image") {
        if (input.checkValidity()) {
            if (input.parentNode.childNodes[3].className == "namel") {
                input.parentNode.childNodes[7].className = "glyphicon glyphicon-asterisk form-control-feedback"
            }
            else {
                input.parentNode.childNodes[5].className = "glyphicon glyphicon-asterisk form-control-feedback"
            }
            input.className = "inputValid";
        }
        else {
            if (input.parentNode.childNodes[3].className == "namel") {
                input.parentNode.childNodes[7].className = "glyphicon glyphicon-exclamation-sign form-control-feedback"
            }
            else {
                input.parentNode.childNodes[5].className = "glyphicon glyphicon-exclamation-sign form-control-feedback"
            }
            input.className = "inputInvalid";
        }
    }
}

var procuraIdUrl = function () {
    //procura na url o ID para dar um PUT
    var urlParaProcura = window.location.search;
    if (urlParaProcura == "") {
        return 0;
    }
    let params = new URLSearchParams(urlParaProcura);
    let idParaPut = params.get("id");

    return idParaPut;
}
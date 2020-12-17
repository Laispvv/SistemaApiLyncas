// inicialização de variáveis chaves
var entriesAmount = 25;
var currentEntrie = 5;
var currentPage = 3;
var baseUrl = "https://localhost:5001/api/pessoas/"

var statusIconObj = function (obj) {
    if (obj.status == "Disponível") {
        return "<i class=\"fa fa-circle\" aria-hidden=\"true\" id=\"statusIcon\" style=\"font-size: 12px;color: #6ed659;\"></i>";
    }
    else if (obj.status == "Indisponível") {
        return "<i class=\"fa fa-circle\" aria-hidden=\"true\" id=\"statusIcon\" style=\"font-size: 12px;color:  #d6d459;\"></i>";
    }
    else return "<i class=\"fa fa-circle\" aria-hidden=\"true\" id=\"statusIcon\" style=\"font-size: 12px;color: #dd405a;\"></i>";
}

var createItemForObject = function (obj) {
    var idDoObj = obj.id;
    var html = 
        `<tr id=${idDoObj}>
            <td> ${idDoObj} </td>
            <td> 
                <img src=${obj.imagem} />
                <span>
                    ${obj.nome}
                </span>
            </td>
            <td> ${obj.dataCriada} </td>
            <td> ${obj.ocupacao} </td>
            <td> ${statusIconObj(obj)} ${obj.status} </td>
            <td>
                <button id="${idDoObj}"  onClick=onCogButtonClick(this) class="cogIcon ${idDoObj}">
                    <i class="fa fa-cog ${idDoObj}" aria-hidden="true" style="color:#22bee6;"></i>
                </button>
                <button id="${idDoObj}" onClick=onCancelButtonClick(this) class="cancelIcon ${idDoObj}">
                    <i id="${idDoObj}" class="fa fa-times-circle ${idDoObj}" aria-hidden="true" style="color:#dd405a;"></i>
                </button>
            </td>
        </tr>`;
    return html;
}

//permite string replacement por index
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// =================================================================================================================================================
var verifyAutentication = function(){
    var autentication = localStorage.getItem('autentication');
    var autenticationSession = sessionStorage.getItem('autentication'); 

    //verificando se a pessoa ta logada para poder acessar o sistema:
    if ((!autentication && !autenticationSession) || autentication == "false" ) {
        window.location.href = '/login/login.html'; //se nao ta logado redireciona para a tela de login
        return false;
    }
    return true;
}

var preencheDashboardPorApi = function(){
    var listaPessoas = [];

    var get = $.ajax({
        url: baseUrl,
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            listaPessoas = data;
            data.forEach(element => {
                // console.log(element);
                var html = "<tr>";
                data.forEach(p => {
                    //     //função que adiciona a pessoa na tela
                    html += createItemForObject(p);
                });

                html += "</tr>";

                $("#tableBody").html(html);    
            });
        },
        error: function (err) {
            console.log('error ' + err);
            return ""
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    
    verifyAutentication();   
    preencheDashboardPorApi();
    
 }, false);




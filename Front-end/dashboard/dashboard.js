// inicialização de variáveis chaves - se existir informação a respeito no banco, usa elas

// if (sessionStorage.getItem("currentPage")) {
//     currentPage = sessionStorage.getItem("currentPage");
// } else {
//     currentPage = 0;
//     sessionStorage.setItem("currentPage", 0);
// }

var total, numeroPagina, tamanhoPagina, currentPage;

var baseUrl = "https://localhost:5001/api/pessoas/";

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
        `
        <tr id=${idDoObj};>
            <td onclick="window.location='/Details/details.html?id=${idDoObj}'"> 
                ${idDoObj} 
            </td>
            <td onclick="window.location='/Details/details.html?id=${idDoObj}'"> 
                <img src=${obj.imagem} />
                <span>
                    ${obj.nome}
                </span>
            </td>
            <td onclick="window.location='/Details/details.html?id=${idDoObj}'"> ${obj.dataCriada} </td>
            <td onclick="window.location='/Details/details.html?id=${idDoObj}'"> ${obj.ocupacao} </td>
            <td> ${statusIconObj(obj)} ${obj.status} </td>
            <td>
                <button id="${idDoObj}"  onClick=onCogButtonClick(this) class="cogIcon ${idDoObj}">
                    <i class="fa fa-cog ${idDoObj}" aria-hidden="true" style="color:#22bee6;"></i>
                </button>
                <button id="${idDoObj}" onClick=onCancelButtonClick(this) class="cancelIcon ${idDoObj}">
                    <i id="${idDoObj}" class="fa fa-times-circle ${idDoObj}" aria-hidden="true" style="color:#dd405a;"></i>
                </button>
            </td>
        </tr>
        `;
    return html;
}

jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });
});

// =================================================================================================================================================
var verifyAutentication = function(){
    var autentication = localStorage.getItem('autentication');
    var autenticationSession = sessionStorage.getItem('autentication'); 

    //verificando se a pessoa ta logada para poder acessar o sistema:
    if (!autentication && !autenticationSession) {
        window.location.href = '/login/login.html'; //se nao ta logado redireciona para a tela de login
        return false;
    }
    return true;
}

const fnDeErro = function (err) {
    console.log('error ' + err);
    return "";
};

var preencheDashboardPorApi = function(){
    const fnDeSucesso = function (data) {
        //inicialização das variáveis
        total = data.total;
        currentPage = data.numeroPagina;
        currentEntrie = data.tamanhoPagina;
        pessoas = data.resultado;
        console.log(data);

        var html = "<tr>";
        pessoas.forEach(element => {
            html += createItemForObject(element);
        });
        html += "</tr>";
        $("#tableBody").html(html);

        var currentEntrieVar = $("#currentEntrie");
        currentEntrieVar.html(currentEntrie);
        var totalAmountVar = $("#totalAmount");
        totalAmountVar.html(total);
    };
    
    $.ajax({
        url: baseUrl + `?${sessionStorage.getItem("ordenar")}&tamanho=6&pagina=${sessionStorage.getItem("currentPage")}`,
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        success: fnDeSucesso,
        error: fnDeErro
    });
}


function pintaBotao(){
    //pinta o botão da página atual de azul
    var buttonPage = document.getElementById((sessionStorage.getItem("currentPage") % 5) + "button");
    buttonPage.style = "color: white;background-color: #22bee6;";
}

window.addEventListener('DOMContentLoaded', function () {

    verifyAutentication();   
    preencheDashboardPorApi();

    //coloca o nome do usuário logado na tela inicial
    var sAuth = sessionStorage.getItem("autentication");
    var lAuth = localStorage.getItem("autentication");

    if(sAuth != null){
        $("#NomeDoUsuario").html("Olá, " + sAuth);
    }else{
        $("#NomeDoUsuario").html("Olá, " + lAuth);
    }

    pintaBotao(0);
 }, false);
 
 //função para fazer o download no export to excel!
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function sortByButton(item){
    console.log(item);
    var stringOrdenacao = `ordenarPor=${item}`;
    //significa que já foi pedido pra ordenar na ordem crescente,
    //então ordena na decrescente
    if(sessionStorage.getItem("ordenar") == stringOrdenacao){
        stringOrdenacao += ' desc';
    }
    sessionStorage.setItem("ordenar", stringOrdenacao);
    window.location.reload(false);
}
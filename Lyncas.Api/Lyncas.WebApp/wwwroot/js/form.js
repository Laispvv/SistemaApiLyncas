function getInformations(id) {
    //pega as informações dos inputs e salva
    //no data como propriedades de pessoa
    var name = document.getElementById("inputNome").value;
    var role = document.getElementById("passportInput").value;
    var status = document.getElementById("language").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var password = document.getElementById("countryInput").value;

    var imgUrl = localStorage.getItem("imageUrl");
    var image;
    if (imgUrl) {
        image = "data:image/png;base64," + imgUrl;
    }
    else {
        image = null;
    }

    var data = {
        Id: id,
        Nome: name,
        Ocupacao: role,
        Status: status,
        Dia: day,
        Mes: month,
        Ano: year,
        Senha: password,
        Imagem: image
    };
    return data;
}

function saveChanges() {
    debugger;
    //pega se é update ou add
    var url = window.location.search;
    const urlParams = new URLSearchParams(url);
    var update = urlParams.get('update');

    //se for update pega o codigo de update e chama a chamada certa
    //if (update == 'true') {
        //var id = urlParams.get('codigo');
        var data = getInformations(0);

        //chamada do método update
        $.ajax({
            url: '/Pessoa/Form',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            //success: function (returndata) {
            //    //pega a url do retorno da função no controller
            //    console.log(returndata.newurl);
            //    window.location = returndata.newurl;
            //}
        });

        //se não, não passa id e chama para adicionar
    //} else {
    //    //no método adicionar todos os campos devem ser preenchidos
    //    //então checa se eles são válidos
    //    var data = getInformations(0); //id = 0 que não existe
    //    //parte que verifica a validade dos inputs, se for válido redireciona para o dashboard
    //    if (data.Name &&
    //        data.Role &&
    //        data.Password &&
    //        data.Status != 0 &&
    //        data.Dia != 0 &&
    //        data.Mes != 0 &&
    //        data.Ano != 0 &&
    //        data.Photo
    //    ) {
    //        //chamada ajax para mandar o post de add pessoa
    //        $.ajax({
    //            url: '/Pessoa/Form',
    //            type: 'POST',
    //            contentType: 'application/json',
    //            data: JSON.stringify(data),
    //            success: function (returndata) {
    //                //pega a url do retorno da função no controller
    //                window.location = returndata.newurl;
    //            }
    //        });

    //        //se tudo estiver certo, apaga a imagem salva
    //        localStorage.removeItem("imageUrl");
    //    }
        //else {
        //    alert("Por favor, preencha todos os campos necessários!");
        //    //checa validade dos inputs -> apenas para add pessoas!!
        //    for (var i = 0; i < inputs.length; i++) {
        //        checkInputs(inputs[i]);
        //    }
        //    for (var i = 0; i < selects.length; i++) {
        //        checkSelects(selects[i]);
        //    }
        //}
    //}
}

function deleteFile() {
    var image = document.getElementById('profile');
    image.src = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_357118.png&f=1&nofb=1";
}

function loadFile(event) {
    var image = document.getElementById('profile');
    //salva o arquivo como uma URL,
    var imageURL = new URL(URL.createObjectURL(event.target.files[0]));

    // localStorage.setItem('imageURL', JSON.stringify(imageURL));
    image.src = imageURL;
}

//função que salva imagem carregada na base64
document.getElementById('file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        localStorage.setItem('imageUrl', base64String);
    };
    reader.readAsDataURL(file);
})
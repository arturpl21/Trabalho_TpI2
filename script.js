function validarUsuario(){
    let idade = document.getElementById("idade").value;
    let senha = document.getElementById("senha").value;

    if(idade < 18){
        alert("Usuário deve ser maior de idade");
        return false;
    }
    if(senha.length < 6){
        alert("Senha muito curta");
        return false;
    }

    return true;
}

function validarData(data){
    let hoje = new Date();
    let dataForm = new Date(data);

    if(dataForm < hoje){
        alert("Data inválida");
        return false;
    }

    return true;
}
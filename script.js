function exibirMensagem(texto, sucesso){
    var el = document.getElementById('mensagem-retorno');

    if(el){
    el.textContent = texto;
    el.style.color = sucesso ? 'green' : 'red';
    }
    else{
    alert(texto);
    }
}

function cadastrarUsuario(){
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var senhaC = document.getElementById('senha_confirmacao').value;
    var idade = document.getElementById('idade').value;

    if(idade < 18){
    exibirMensagem('Usuário deve ser maior de idade.', false);
    return;
    }
    if(senha.length < 6){
    exibirMensagem('Senha muito curta (mínimo 6 caracteres).', false);
    return;
    }
    if(senha !== senhaC){
    exibirMensagem('As senhas não conferem.', false);
    return;
    }

    var url = '../phps/usuario.php?nome=' + encodeURIComponent(nome)
    + '&email=' + encodeURIComponent(email)
    + '&idade=' + encodeURIComponent(idade);

    fetch(url)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        console.info(dataJson);
        if(dataJson){
        exibirMensagem('Usuário cadastrado com sucesso: ' + dataJson.data, true);
        }
        else{
        exibirMensagem('Problema ao cadastrar usuário.', false);
        }
    })
    .catch(function(error){
        exibirMensagem('Erro na requisição: ' + error, false);
    });
}

function cadastrarCategoria(){
    var nome = document.getElementById('nome').value;
    var descricao = document.getElementById('descricao').value;
    var cor = document.getElementById('cor').value;
    var tipo = document.getElementById('tipo').value;
    var status = document.getElementById('status').value;

    var url = '../phps/categoria.php?nome=' + encodeURIComponent(nome)
    + '&descricao=' + encodeURIComponent(descricao)
    + '&cor=' + encodeURIComponent(cor)
    + '&tipo=' + encodeURIComponent(tipo)
    + '&status=' + encodeURIComponent(status);

    fetch(url)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        console.info(dataJson);
        if(dataJson){
        exibirMensagem('Categoria cadastrada com sucesso: ' + dataJson.data, true);
        }
        else{
        exibirMensagem('Problema ao cadastrar categoria.', false);
        }
    })
    .catch(function(error){
        exibirMensagem('Erro na requisição: ' + error, false);
    });
}

function cadastrarProjeto(){
    var nome = document.getElementById('nome').value;
    var descricao = document.getElementById('descricao').value;
    var dataInicio = document.getElementById('data_inicio').value;
    var dataFim = document.getElementById('data_fim').value;
    var responsavel = document.getElementById('responsavel').value;

    var formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('data_inicio', dataInicio);
    formData.append('data_fim', dataFim);
    formData.append('responsavel', responsavel);

    var options = {
        method: 'POST',
        body: formData
    };

    fetch('../phps/projeto.php', options)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        console.info(dataJson);
        if(dataJson){
        exibirMensagem('Projeto cadastrado com sucesso: ' + dataJson.data, true);
        }
        else{
        exibirMensagem('Problema ao cadastrar projeto.', false);
        }
    })
    .catch(function(error){
        exibirMensagem('Erro na requisição: ' + error, false);
    });
}

function cadastrarTarefa(){
    var titulo = document.getElementById('titulo').value;
    var descricao = document.getElementById('descricao').value;
    var data = document.getElementById('data').value;
    var prioridade = document.getElementById('prioridade').value;
    var statusVal = document.getElementById('status').value;

    var hoje = new Date();
    var dataForm = new Date(data);
    if(dataForm < hoje){
    exibirMensagem('Data inválida: deve ser hoje ou futura.', false);
    return;
    }

    var formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('data', data);
    formData.append('prioridade', prioridade);
    formData.append('status', statusVal);

    var options = {
        method: 'POST',
        body: formData
    };

    fetch('../phps/tarefa.php', options)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        console.info(dataJson);
        if(dataJson){
        ('Tarefa cadastrada com sucesso: ' + dataJson.data, true);
        }
        else{
        exibirMensagem('Problema ao cadastrar tarefa.', false);
        }
    })
    .catch(function(error){
        exibirMensagem('Erro na requisição: ' + error, false);
    });
}

function cadastrarComentario(){
    var usuario = document.getElementById('usuario').value;
    var tarefa = document.getElementById('tarefa').value;
    var comentario = document.getElementById('comentario').value;
    var data = document.getElementById('data').value;
    var visibilidade = document.getElementById('visibilidade').value;

    var formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('tarefa', tarefa);
    formData.append('comentario', comentario);
    formData.append('data', data);
    formData.append('visibilidade', visibilidade);

    var options = {
        method: 'POST',
        body: formData
    };

    fetch('../phps/comentario.php', options)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        console.info(dataJson);
        if(dataJson){
        exibirMensagem('Comentário cadastrado com sucesso: ' + dataJson.data, true);
        }
        else{
        exibirMensagem('Problema ao cadastrar comentário.', false);
        }
    })
    .catch(function(error){
        exibirMensagem('Erro na requisição: ' + error, false);
    });
}
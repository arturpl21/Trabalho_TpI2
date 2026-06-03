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

function limparTabela(idTab){
    var tbody = document.getElementById(idTab);
        while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
        }
}
 
function pesquisarUsuario(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    var url = '../phps/pesquisa_usuario.php?search=' + encodeURIComponent(search);
 
    fetch(url)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        console.info(dataJson);
        if(dataJson){
        limparTabela('resultadobody');
 
        var resultado = dataJson.data;
 
            for(var element of resultado){
            var tr  = document.createElement('tr');
            var cod = document.createElement('td');
            var nom = document.createElement('td');
            var sob = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.cod));
            nom.appendChild(document.createTextNode(element.nome));
            sob.appendChild(document.createTextNode(element.sobrenome));
 
            tr.appendChild(cod);
            tr.appendChild(nom);
            tr.appendChild(sob);
 
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){
        alert('Erro na pesquisa: ' + error);
    });
}
 
function pesquisarCategoria(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    fetch('../phps/pesquisa_categoria.php?search=' + encodeURIComponent(search))
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson){
        limparTabela('resultadobody');
        
            for(var element of dataJson.data){
            var tr = document.createElement('tr');
            var cod = document.createElement('td');
            var nome = document.createElement('td');
            var tipo = document.createElement('td');
            var status = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.cod));
            nome.appendChild(document.createTextNode(element.nome));
            tipo.appendChild(document.createTextNode(element.tipo));
            status.appendChild(document.createTextNode(element.status));
 
            tr.appendChild(cod);
            tr.appendChild(nome);
            tr.appendChild(tipo);
            tr.appendChild(status);
 
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){
        alert('Erro na pesquisa: ' + error);
    });
}
 
function pesquisarProjeto(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    fetch('../phps/pesquisa_projeto.php?search=' + encodeURIComponent(search))
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson){
        limparTabela('resultadobody');
            for(var element of dataJson.data){
            var tr = document.createElement('tr');
            var cod = document.createElement('td');
            var nome = document.createElement('td');
            var responsavel = document.createElement('td');
            var dataInicio = document.createElement('td');
            var dataFim  = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.cod));
            nome.appendChild(document.createTextNode(element.nome));
            responsavel.appendChild(document.createTextNode(element.responsavel));
            dataInicio.appendChild(document.createTextNode(element.data_inicio));
            dataFim.appendChild(document.createTextNode(element.data_fim));
 
            tr.appendChild(cod);
            tr.appendChild(nome);
            tr.appendChild(responsavel);
            tr.appendChild(dataInicio);
            tr.appendChild(dataFim);
 
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){
        alert('Erro na pesquisa: ' + error);
    });
}
 
function pesquisarTarefa(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    fetch('../phps/pesquisa_tarefa.php?search=' + encodeURIComponent(search))
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson){
        limparTabela('resultadobody');
            for(var element of dataJson.data){
            var tr = document.createElement('tr');
            var cod = document.createElement('td');
            var titulo = document.createElement('td');
            var prioridade = document.createElement('td');
            var status = document.createElement('td');
            var data = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.cod));
            titulo.appendChild(document.createTextNode(element.titulo));
            prioridade.appendChild(document.createTextNode(element.prioridade));
            status.appendChild(document.createTextNode(element.status));
            data.appendChild(document.createTextNode(element.data));
 
            tr.appendChild(cod);
            tr.appendChild(titulo);
            tr.appendChild(prioridade);
            tr.appendChild(status);
            tr.appendChild(data);
 
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){
        alert('Erro na pesquisa: ' + error);
    });
}
 
function pesquisarComentario(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    fetch('../phps/pesquisa_comentario.php?search=' + encodeURIComponent(search))
    .then(function(response){ return response.json();})
    .then(function(dataJson){
        if(dataJson){
        limparTabela('resultadobody');
            for(var element of dataJson.data){
            var tr = document.createElement('tr');
            var cod = document.createElement('td');
            var usuario = document.createElement('td');
            var tarefa = document.createElement('td');
            var comentario = document.createElement('td');
            var data = document.createElement('td');
            var visibilidade = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.cod));
            usuario.appendChild(document.createTextNode(element.usuario));
            tarefa.appendChild(document.createTextNode(element.tarefa));
            comentario.appendChild(document.createTextNode(element.comentario));
            data.appendChild(document.createTextNode(element.data));
            visibilidade.appendChild(document.createTextNode(element.visibilidade));
 
            tr.appendChild(cod);
            tr.appendChild(usuario);
            tr.appendChild(tarefa);
            tr.appendChild(comentario);
            tr.appendChild(data);
            tr.appendChild(visibilidade);
 
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){
        alert('Erro na pesquisa: ' + error);
    });
}
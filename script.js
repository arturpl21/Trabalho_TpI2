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

function limparTabela(idTab){
    var tbody = document.getElementById(idTab);

    while(tbody.firstChild){
    tbody.removeChild(tbody.firstChild);
    }
}

function criarLink(texto, acao){
    var link = document.createElement('a');

    link.appendChild(document.createTextNode(texto));
    link.setAttribute('onclick', acao);
    link.href = '#';
    link.style.marginRight = '8px';

    return link;
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
    .catch(function(error){exibirMensagem('Erro na requisição: ' + error, false);});
}

function atualizarUsuario(){
    var cod = document.getElementById('cod_edicao').value;
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var idade = document.getElementById('idade').value;
 
    var formData = new FormData();
    formData.append('cod', cod);
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('idade', idade);
 
    fetch('../phps/atualizar_usuario.php', {method: 'POST', body: formData})
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        document.getElementById('btn-cadastrar').style.display = 'inline';
        document.getElementById('btn-atualizar').style.display = 'none';
        document.getElementById('cod_edicao').value = '';
        pesquisarUsuario();
        }
        else{
        exibirMensagem('Problema ao atualizar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function editarUsuario(cod){
    fetch('../phps/editar_usuario.php?cod=' + cod)
    .then(function(response){return response.json();})
    .then(function(dataJson) {
        if(dataJson.data){
        var r = dataJson.data;
        document.getElementById('cod_edicao').value = r.cod;
        document.getElementById('nome').value = r.nome;
        document.getElementById('email').value = r.email;
        document.getElementById('idade').value = r.idade;
        document.getElementById('btn-cadastrar').style.display = 'none';
        document.getElementById('btn-atualizar').style.display = 'inline';
        exibirMensagem('Editando usuário: ' + r.nome, true);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function deletarUsuario(cod){
    if(!confirm('Deseja deletar o usuário de código ' + cod + '?')) return;
    fetch('../phps/deletar_usuario.php?cod=' + cod)
    .then(function(response){ return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        pesquisarUsuario();
        }
        else{
        exibirMensagem('Problema ao deletar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function pesquisarUsuario(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    fetch('../phps/pesquisa_usuario.php?search=' + encodeURIComponent(search))
    .then(function(response){ return response.json();})
    .then(function(dataJson){
        if(dataJson){
        limparTabela('resultadobody');
        
            for(var element of dataJson.data){
            var tr = document.createElement('tr');
            var cod = document.createElement('td');
            var nom = document.createElement('td');
            var sob = document.createElement('td');
            var acoes = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.id));
            nom.appendChild(document.createTextNode(element.nome));
            sob.appendChild(document.createTextNode(element.sobrenome));
 
            acoes.appendChild(criarLink('Alterar', 'editarUsuario(' + element.id + ')'));
            .appendChild(criarLink('Deletar', 'deletarUsuario(' + element.id + ')'));
 
            tr.appendChild(cod);
            tr.appendChild(nom);
            tr.appendChild(sob);
            tr.appendChild(acoes);
 
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){alert('Erro na pesquisa: ' + error);});
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
    .catch(function(error){exibirMensagem('Erro na requisição: ' + error, false);});
}

function atualizarCategoria(){
    var formData = new FormData();
    formData.append('cod', document.getElementById('cod_edicao').value);
    formData.append('nome', document.getElementById('nome').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('tipo', document.getElementById('tipo').value);
    formData.append('status', document.getElementById('status').value);
 
    fetch('../phps/atualizar_categoria.php',{method: 'POST', body: formData})
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        document.getElementById('btn-cadastrar').style.display = 'inline';
        document.getElementById('btn-atualizar').style.display = 'none';
        document.getElementById('cod_edicao').value = '';
        pesquisarCategoria();
        }
        else{
        exibirMensagem('Problema ao atualizar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function editarCategoria(cod){
    fetch('../phps/editar_categoria.php?cod=' + cod)
    .then(function(response){ return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        var r = dataJson.data;
        document.getElementById('cod_edicao').value = r.cod;
        document.getElementById('nome').value = r.nome;
        document.getElementById('descricao').value = r.descricao;
        document.getElementById('tipo').value = r.tipo;
        document.getElementById('status').value = r.status;
        document.getElementById('btn-cadastrar').style.display = 'none';
        document.getElementById('btn-atualizar').style.display = 'inline';
        exibirMensagem('Editando categoria: ' + r.nome, true);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function deletarCategoria(cod){
    if(!confirm('Deseja deletar a categoria de código ' + cod + '?')) return;
    fetch('../phps/deletar_categoria.php?cod=' + cod)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        pesquisarCategoria();
        }
        else{
        exibirMensagem('Problema ao deletar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function pesquisarCategoria(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    fetch('../phps/pesquisa_categoria.php?search=' + encodeURIComponent(search))
    .then(function(response){ return response.json();})
    .then(function(dataJson){
        if(dataJson){
        limparTabela('resultadobody');
            
            for(var element of dataJson.data){
            var tr = document.createElement('tr');
            var cod = document.createElement('td');
            var nome = document.createElement('td');
            var tipo = document.createElement('td');
            var status = document.createElement('td');
            var acoes = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.id));
            nome.appendChild(document.createTextNode(element.nome));
            tipo.appendChild(document.createTextNode(element.tipo));
            status.appendChild(document.createTextNode(element.status));
 
            acoes.appendChild(criarLink('Alterar', 'editarCategoria(' + element.id + ')'));
            acoes.appendChild(criarLink('Deletar', 'deletarCategoria(' + element.id + ')'));
 
            tr.appendChild(cod);
            tr.appendChild(nome);
            tr.appendChild(tipo);
            tr.appendChild(status);
            tr.appendChild(acoes);
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){alert('Erro na pesquisa: ' + error);});
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
    .catch(function(error){exibirMensagem('Erro na requisição: ' + error, false);});
}

function atualizarProjeto(){
    var formData = new FormData();
    formData.append('cod', document.getElementById('cod_edicao').value);
    formData.append('nome', document.getElementById('nome').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('data_inicio', document.getElementById('data_inicio').value);
    formData.append('data_fim', document.getElementById('data_fim').value);
    formData.append('responsavel', document.getElementById('responsavel').value);
 
    fetch('../phps/atualizar_projeto.php',{method: 'POST', body: formData})
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        document.getElementById('btn-cadastrar').style.display = 'inline';
        document.getElementById('btn-atualizar').style.display = 'none';
        document.getElementById('cod_edicao').value = '';
        pesquisarProjeto();
        }
        else{
        exibirMensagem('Problema ao atualizar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function editarProjeto(cod){
    fetch('../phps/editar_projeto.php?cod=' + cod)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
            var r = dataJson.data;
            document.getElementById('cod_edicao').value = r.cod;
            document.getElementById('nome').value = r.nome;
            document.getElementById('descricao').value = r.descricao;
            document.getElementById('data_inicio').value = r.data_inicio;
            document.getElementById('data_fim').value = r.data_fim;
            document.getElementById('responsavel').value = r.responsavel;
            document.getElementById('btn-cadastrar').style.display = 'none';
            document.getElementById('btn-atualizar').style.display = 'inline';
            exibirMensagem('Editando projeto: ' + r.nome, true);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function deletarProjeto(cod){
    if(!confirm('Deseja deletar o projeto de código ' + cod + '?')) return;
    fetch('../phps/deletar_projeto.php?cod=' + cod)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        pesquisarProjeto();
        }
        else{
        exibirMensagem('Problema ao deletar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
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
            var dataFim = document.createElement('td');
            var acoes = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.id));
            nome.appendChild(document.createTextNode(element.nome));
            responsavel.appendChild(document.createTextNode(element.responsavel));
            dataInicio.appendChild(document.createTextNode(element.data_inicio));
            dataFim.appendChild(document.createTextNode(element.data_fim));
 
            acoes.appendChild(criarLink('Alterar', 'editarProjeto(' + element.id + ')'));
            acoes.appendChild(criarLink('Deletar', 'deletarProjeto(' + element.id + ')'));
 
            tr.appendChild(cod); tr.appendChild(nome); tr.appendChild(responsavel);
            tr.appendChild(dataInicio); tr.appendChild(dataFim); tr.appendChild(acoes);
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){alert('Erro na pesquisa: ' + error);});
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
    .catch(function(error){exibirMensagem('Erro na requisição: ' + error, false);});
}

function atualizarTarefa(){
    var formData = new FormData();
    formData.append('cod', document.getElementById('cod_edicao').value);
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('data', document.getElementById('data').value);
    formData.append('prioridade', document.getElementById('prioridade').value);
    formData.append('status', document.getElementById('status').value);
 
    fetch('../phps/atualizar_tarefa.php',{method: 'POST', body: formData})
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        document.getElementById('btn-cadastrar').style.display = 'inline';
        document.getElementById('btn-atualizar').style.display = 'none';
        document.getElementById('cod_edicao').value = '';
        pesquisarTarefa();
        }
        else{
        exibirMensagem('Problema ao atualizar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function editarTarefa(cod){
    fetch('../phps/editar_tarefa.php?cod=' + cod)
    .then(function(response){ return response.json();})
    .then(function(dataJson){
        if (dataJson.data){
        var r = dataJson.data;
        document.getElementById('cod_edicao').value = r.cod;
        document.getElementById('titulo').value = r.titulo;
        document.getElementById('descricao').value = r.descricao;
        document.getElementById('data').value = r.data;
        document.getElementById('prioridade').value = r.prioridade;
        document.getElementById('status').value = r.status;
        document.getElementById('btn-cadastrar').style.display = 'none';
        document.getElementById('btn-atualizar').style.display = 'inline';
        exibirMensagem('Editando tarefa: ' + r.titulo, true);
        }
    })
    .catch(function(error){ exibirMensagem('Erro: ' + error, false);});
}
 
function deletarTarefa(cod){
    if(!confirm('Deseja deletar a tarefa de código ' + cod + '?')) return;
    fetch('../phps/deletar_tarefa.php?cod=' + cod)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        pesquisarTarefa();
        }
        else{
        exibirMensagem('Problema ao deletar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
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
            var acoes = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.id));
            titulo.appendChild(document.createTextNode(element.titulo));
            prioridade.appendChild(document.createTextNode(element.prioridade));
            status.appendChild(document.createTextNode(element.status));
            data.appendChild(document.createTextNode(element.data));
 
            acoes.appendChild(criarLink('Alterar', 'editarTarefa(' + element.id + ')'));
            acoes.appendChild(criarLink('Deletar', 'deletarTarefa(' + element.id + ')'));
 
            tr.appendChild(cod); tr.appendChild(titulo); tr.appendChild(prioridade);
            tr.appendChild(status); tr.appendChild(data); tr.appendChild(acoes);
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){alert('Erro na pesquisa: ' + error);});
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
    .catch(function(error){exibirMensagem('Erro na requisição: ' + error, false);});
}

function atualizarComentario(){
    var formData = new FormData();
    formData.append('cod', document.getElementById('cod_edicao').value);
    formData.append('usuario', document.getElementById('usuario').value);
    formData.append('tarefa', document.getElementById('tarefa').value);
    formData.append('comentario', document.getElementById('comentario').value);
    formData.append('data', document.getElementById('data').value);
    formData.append('visibilidade', document.getElementById('visibilidade').value);
 
    fetch('../phps/atualizar_comentario.php', {method: 'POST', body: formData})
    .then(function(response){return response.json();})
    .then(function(dataJson) {
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        document.getElementById('btn-cadastrar').style.display = 'inline';
        document.getElementById('btn-atualizar').style.display = 'none';
        document.getElementById('cod_edicao').value = '';
        pesquisarComentario();
        }
        else{
        exibirMensagem('Problema ao atualizar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function editarComentario(cod){
    fetch('../phps/editar_comentario.php?cod=' + cod)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        var r = dataJson.data;
        document.getElementById('cod_edicao').value = r.cod;
        document.getElementById('usuario').value = r.usuario;
        document.getElementById('tarefa').value = r.tarefa;
        document.getElementById('comentario').value = r.comentario;
        document.getElementById('data').value = r.data;
        document.getElementById('visibilidade').value = r.visibilidade;
        document.getElementById('btn-cadastrar').style.display = 'none';
        document.getElementById('btn-atualizar').style.display = 'inline';
        exibirMensagem('Editando comentário de: ' + r.usuario, true);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function deletarComentario(cod){
    if(!confirm('Deseja deletar o comentário de código ' + cod + '?')) return;
    fetch('../phps/deletar_comentario.php?cod=' + cod)
    .then(function(response){return response.json();})
    .then(function(dataJson){
        if(dataJson.data){
        exibirMensagem(dataJson.data, true);
        pesquisarComentario();
        }
        else{
        exibirMensagem('Problema ao deletar.', false);
        }
    })
    .catch(function(error){exibirMensagem('Erro: ' + error, false);});
}
 
function pesquisarComentario(){
    var campoPesquisa = document.getElementById('campo-pesquisa');
    var search = campoPesquisa ? campoPesquisa.value : '';
 
    fetch('../phps/pesquisa_comentario.php?search=' + encodeURIComponent(search))
    .then(function(response){return response.json();})
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
            var acoes = document.createElement('td');
 
            cod.appendChild(document.createTextNode(element.id));
            usuario.appendChild(document.createTextNode(element.usuario));
            tarefa.appendChild(document.createTextNode(element.tarefa));
            comentario.appendChild(document.createTextNode(element.comentario));
            data.appendChild(document.createTextNode(element.data));
            visibilidade.appendChild(document.createTextNode(element.visibilidade));
 
            acoes.appendChild(criarLink('Alterar', 'editarComentario(' + element.id + ')'));
            acoes.appendChild(criarLink('Deletar', 'deletarComentario(' + element.id + ')'));
 
            tr.appendChild(cod); tr.appendChild(usuario); tr.appendChild(tarefa);
            tr.appendChild(comentario); tr.appendChild(data);
            tr.appendChild(visibilidade); tr.appendChild(acoes);
            document.getElementById('resultadobody').appendChild(tr);
            }
        }
    })
    .catch(function(error){alert('Erro na pesquisa: ' + error);});
}
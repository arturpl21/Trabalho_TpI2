<?php
require './dbconnect.php';
    if(isset($_POST['nome'])){
        $resultado = save('projetos',[
        'nome' => $_POST['nome'],
        'descricao' => isset($_POST['descricao']) ? $_POST['descricao'] : '',
        'data_inicio' => isset($_POST['data_inicio']) ? $_POST['data_inicio'] : null,
        'data_fim' => isset($_POST['data_fim']) ? $_POST['data_fim'] : null,
        'responsavel' => isset($_POST['responsavel']) ? $_POST['responsavel'] : ''
        ]);
        if($resultado){
        echo '{"data": "Projeto ' . $_POST['nome'] . ' cadastrado com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao cadastrar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
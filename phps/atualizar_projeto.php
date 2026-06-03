<?php
require './dbconnect.php';
    if(isset($_POST['cod']) && isset($_POST['nome'])){
        $resultado = update('projetos', $_POST['cod'],[
        'nome' => $_POST['nome'],
        'descricao' => $_POST['descricao'],
        'data_inicio' => $_POST['data_inicio'],
        'data_fim' => $_POST['data_fim'],
        'responsavel' => $_POST['responsavel']
        ]);
        if($resultado){
        echo '{"data": "Projeto ' . $_POST['nome'] . ' atualizado com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao atualizar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
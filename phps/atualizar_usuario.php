<?php
require './dbconnect.php';
    if(isset($_POST['cod']) && isset($_POST['nome'])){
        $resultado = update('usuarios', $_POST['cod'],[
        'nome' => $_POST['nome'],
        'email' => $_POST['email'],
        'idade' => $_POST['idade']
        ]);
        if($resultado){
        echo '{"data": "Usuário ' . $_POST['nome'] . ' atualizado com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao atualizar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
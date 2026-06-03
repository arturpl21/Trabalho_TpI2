<?php
require './dbconnect.php';
    if(isset($_GET['nome']) && isset($_GET['email']) && isset($_GET['idade'])){
        $resultado = save('usuarios',[
        'nome' => $_GET['nome'],
        'email' => $_GET['email'],
        'senha' => isset($_GET['senha']) ? $_GET['senha'] : '',
        'idade' => $_GET['idade']
        ]);
        if($resultado){
        echo '{"data": "Usuário ' . $_GET['nome'] . ' cadastrado com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao cadastrar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
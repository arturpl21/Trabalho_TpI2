<?php
require './dbconnect.php';
    if(isset($_GET['nome'])){
        $resultado = save('categorias',[
        'nome' => $_GET['nome'],
        'descricao' => isset($_GET['descricao']) ? $_GET['descricao'] : '',
        'cor' => isset($_GET['cor']) ? $_GET['cor'] : '',
        'tipo' => isset($_GET['tipo']) ? $_GET['tipo'] : '',
        'status' => isset($_GET['status']) ? $_GET['status'] : ''
        ]);
        if($resultado){
        echo '{"data": "Categoria ' . $_GET['nome'] . ' cadastrada com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao cadastrar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
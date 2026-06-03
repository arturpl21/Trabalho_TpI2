<?php
require './dbconnect.php';
    if(isset($_POST['cod']) && isset($_POST['nome'])){
        $resultado = update('categorias', $_POST['cod'],[
        'nome' => $_POST['nome'],
        'descricao' => $_POST['descricao'],
        'tipo' => $_POST['tipo'],
        'status' => $_POST['status']
        ]);
        if($resultado){
        echo '{"data": "Categoria ' . $_POST['nome'] . ' atualizada com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao atualizar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
<?php
require './dbconnect.php';
    if(isset($_POST['cod']) && isset($_POST['comentario'])){
        $resultado = update('comentarios', $_POST['cod'],[
        'usuario' => $_POST['usuario'],
        'tarefa' => $_POST['tarefa'],
        'comentario' => $_POST['comentario'],
        'data' => $_POST['data'],
        'visibilidade' => $_POST['visibilidade']
        ]);
        if($resultado){
        echo '{"data": "Comentário de ' . $_POST['usuario'] . ' atualizado com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao atualizar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
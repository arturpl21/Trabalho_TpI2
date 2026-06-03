<?php
require './dbconnect.php';
    if(isset($_POST['comentario'])){
        $resultado = save('comentarios',[
        'usuario' => isset($_POST['usuario']) ? $_POST['usuario'] : '',
        'tarefa' => isset($_POST['tarefa']) ? $_POST['tarefa'] : '',
        'comentario' => $_POST['comentario'],
        'data' => isset($_POST['data']) ? $_POST['data'] : null,
        'visibilidade' => isset($_POST['visibilidade']) ? $_POST['visibilidade'] : ''
        ]);
        if($resultado){
        echo '{"data": "Comentário cadastrado com sucesso!"}';
        }else{
        echo '{"error": "Erro ao cadastrar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
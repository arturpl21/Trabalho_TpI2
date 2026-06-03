<?php
require './dbconnect.php';
    if(isset($_POST['titulo'])){
        $resultado = save('tarefas',[
        'titulo' => $_POST['titulo'],
        'descricao' => isset($_POST['descricao']) ? $_POST['descricao'] : '',
        'data' => isset($_POST['data']) ? $_POST['data'] : null,
        'prioridade' => isset($_POST['prioridade']) ? $_POST['prioridade'] : '',
        'status' => isset($_POST['status']) ? $_POST['status'] : ''
        ]);
        if($resultado){
        echo '{"data": "Tarefa ' . $_POST['titulo'] . ' cadastrada com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao cadastrar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
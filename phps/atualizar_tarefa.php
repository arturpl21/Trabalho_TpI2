<?php
require './dbconnect.php';
    if(isset($_POST['cod']) && isset($_POST['titulo'])){
        $resultado = update('tarefas', $_POST['cod'],[
        'titulo' => $_POST['titulo'],
        'descricao' => $_POST['descricao'],
        'data' => $_POST['data'],
        'prioridade' => $_POST['prioridade'],
        'status' => $_POST['status']
        ]);
        if($resultado){
        echo '{"data": "Tarefa ' . $_POST['titulo'] . ' atualizada com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao atualizar"}';
        }
    }
    else{
    echo '{"error": "Dados incompletos"}';
    }
?>
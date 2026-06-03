<?php
require './dbconnect.php';
    if(isset($_GET['cod'])){
        $resultado = deleteById('tarefas', $_GET['cod']);
        if($resultado){
        echo '{"data": "Tarefa de código ' . $_GET['cod'] . ' deletada com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao deletar"}';
        }
    }
    else{
    echo '{"error": "Parâmetro cod não informado"}';
    }
?>
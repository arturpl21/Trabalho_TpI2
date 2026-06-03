<?php
require './dbconnect.php';
    if(isset($_GET['cod'])){
    $resultado = deleteById('comentarios', $_GET['cod']);
        if($resultado){
        echo '{"data": "Comentário de código ' . $_GET['cod'] . ' deletado com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao deletar"}';
        }
    }
    else{
    echo '{"error": "Parâmetro cod não informado"}';
    }
?>
<?php
require './dbconnect.php';
    if(isset($_GET['cod'])){
    $resultado = deleteById('categorias', $_GET['cod']);
        if($resultado){
        echo '{"data": "Categoria de código ' . $_GET['cod'] . ' deletada com sucesso!"}';
        }
        else{
        echo '{"error": "Erro ao deletar"}';
        }
    }
    else{
    echo '{"error": "Parâmetro cod não informado"}';
    }
?>
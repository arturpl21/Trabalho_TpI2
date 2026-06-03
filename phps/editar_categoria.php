<?php
require './dbconnect.php';
    if(isset($_GET['cod'])){
    $resultado = findById('categorias', $_GET['cod']);
        if($resultado){
        echo '{"data": ' . json_encode($resultado[0]) . '}';
        }
        else{
        echo '{"error": "Registro não encontrado"}';
        }
    }
    else{
    echo '{"error": "Parâmetro cod não informado"}';
    }
?>
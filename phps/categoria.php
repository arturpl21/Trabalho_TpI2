<?php
if(isset($_GET['nome']) && isset($_GET['tipo']) && isset($_GET['status'])){
$nome = $_GET['nome'];
$tipo = $_GET['tipo'];
$status = $_GET['status'];
echo '{"data": "Categoria ' . $nome . ' cadastrada com sucesso!"}';
}
else{
echo '{"error": "Dados incompletos"}';
}
?>
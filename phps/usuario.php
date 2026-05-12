<?php
if(isset($_GET['nome']) && isset($_GET['email']) && isset($_GET['idade'])){
$nome = $_GET['nome'];
$email = $_GET['email'];
$idade = $_GET['idade'];
echo '{"data": "Usuário ' . $nome . ' cadastrado com sucesso!"}';
}
else{
echo '{"error": "Dados incompletos"}';
}
?>
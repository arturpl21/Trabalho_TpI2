<?php
if(isset($_POST['usuario']) && isset($_POST['tarefa']) && isset($_POST['comentario'])){
$usuario = $_POST['usuario'];
$tarefa = $_POST['tarefa'];
$comentario = $_POST['comentario'];
echo '{"data": "Comentário de ' . $usuario . ' cadastrado com sucesso!"}';
}
else{
echo '{"error": "Dados incompletos"}';
}
?>
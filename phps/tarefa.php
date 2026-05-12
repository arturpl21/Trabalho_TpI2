<?php
if(isset($_POST['titulo']) && isset($_POST['data']) && isset($_POST['status'])){
$titulo = $_POST['titulo'];
$data = $_POST['data'];
$status = $_POST['status'];
echo '{"data": "Tarefa ' . $titulo . ' cadastrada com sucesso!"}';
}
else{
echo '{"error": "Dados incompletos"}';
}
?>
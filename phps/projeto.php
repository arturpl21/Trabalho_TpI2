<?php
if(isset($_POST['nome']) && isset($_POST['responsavel'])){
$nome = $_POST['nome'];
$responsavel = $_POST['responsavel'];
echo '{"data": "Projeto ' . $nome . ' cadastrado com sucesso!"}';
}
else{
echo '{"error": "Dados incompletos"}';
}
?>
<?php
require './dbconnect.php';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$resultado = $search
    ? findBySearch('tarefas', 'titulo', $search)
    : findAll('tarefas');
echo '{"data": ' . json_encode($resultado) . '}';
?>
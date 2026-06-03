<?php
require './dbconnect.php';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$resultado = $search
    ? findBySearch('categorias', 'nome', $search)
    : findAll('categorias');
echo '{"data": ' . json_encode($resultado) . '}';
?>
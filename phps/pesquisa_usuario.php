<?php
require './dbconnect.php';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$resultado = $search
    ? findBySearch('usuarios', 'nome', $search)
    : findAll('usuarios');
echo '{"data": ' . json_encode($resultado) . '}';
?>
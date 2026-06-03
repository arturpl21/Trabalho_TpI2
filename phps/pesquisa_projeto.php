<?php
require './dbconnect.php';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$resultado = $search
    ? findBySearch('projetos', 'nome', $search)
    : findAll('projetos');
echo '{"data": ' . json_encode($resultado) . '}';
?>
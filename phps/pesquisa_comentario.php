<?php
require './dbconnect.php';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$resultado = $search
    ? findBySearch('comentarios', 'usuario', $search)
    : findAll('comentarios');
echo '{"data": ' . json_encode($resultado) . '}';
?>
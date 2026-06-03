<?php
include './dbconfig.php';

function getConnection(){
$conn = null;
    try{
        $conn = new PDO(
        "mysql:host = " . HOST . ";dbname = " . DB_NAME . ";charset = utf8",
        USER,
        PASSWORD
        );
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $pe){
    echo '{"error": "Não foi possível conectar ao banco: ' . $pe->getMessage() . '"}';
    }

return $conn;
}

function findAll($table){
$conn = getConnection();
$query = $conn->prepare("SELECT * FROM " . $table);
$query->execute();

return $query->fetchAll(PDO::FETCH_ASSOC);
}

function findBySearch($table, $column, $search){
$conn = getConnection();
    $query = $conn->prepare(
    "SELECT * FROM " . $table . " WHERE " . $column . " LIKE :search"
    );
$query->execute([':search' => '%' . $search . '%']);
    
return $query->fetchAll(PDO::FETCH_ASSOC);
}

function findById($table, $id){
$conn = getConnection();
$query = $conn->prepare("SELECT * FROM " . $table . " WHERE id = :id");
$query->execute([':id' => $id]);

return $query->fetchAll(PDO::FETCH_ASSOC);
}

function save($table, $fields){
$conn = getConnection();
$columns = implode(', ', array_keys($fields));
$placeholders = implode(', ', array_map(fn($k) => ':' . $k, array_keys($fields)));
    $query = $conn->prepare(
    "INSERT INTO " . $table . " (" . $columns . ") VALUES (" . $placeholders . ")"
    );
    try{
    $query->execute($fields);
    return true;
    }
    catch(PDOException $pe){
    echo '{"error": "' . $pe->getMessage() . '"}';
    return false;
    }
}

function update($table, $id, $fields){
$conn = getConnection();
$set = implode(', ', array_map(fn($k) => $k . ' = :' . $k, array_keys($fields)));
    $query = $conn->prepare(
    "UPDATE " . $table . " SET " . $set . " WHERE id = :id"
    );
$fields[':id'] = $id;
$params = [];
    foreach($fields as $k => $v){
    $params[':' . ltrim($k, ':')] = $v;
    }
$params[':id'] = $id;
    try{
    $set2 = implode(', ', array_map(fn($k) => $k . ' = :' . $k, array_keys($fields)));
        $q2 = $conn->prepare(
        "UPDATE " . $table . " SET " . $set2 . " WHERE id = :id"
        );
    $fields['id'] = $id;
    $q2->execute($fields);
    return true;
    }
    catch(PDOException $pe){
    echo '{"error": "' . $pe->getMessage() . '"}';
    return false;
    }
}

function deleteById($table, $id){
$conn = getConnection();
$query = $conn->prepare("DELETE FROM " . $table . " WHERE id = :id");
    try{
    $query->execute([':id' => $id]);
    return true;
    }
    catch(PDOException $pe){
    echo '{"error": "' . $pe->getMessage() . '"}';
    return false;
    }
}
?>
<?php
if(isset($_GET['search']) && strpos($_GET['search'], 'produto') !== false){
    echo '{
        data": [
        {"cod": 1, "nome": "Tecnologia", "tipo": "Área", "status": "Ativo"},
        {"cod": 2, "nome": "Marketing", "tipo": "Área", "status": "Ativo"},
        {"cod": 3, "nome": "Financeiro", "tipo": "Setor", "status": "Inativo"}
        ]
    }';
}
else{
    echo '{
        "data": [
        {"cod": 10, "nome": "Suporte", "tipo": "Área", "status": "Ativo"},
        {"cod": 12, "nome": "Logística", "tipo": "Setor", "status": "Inativo"}
        ]
    }';
}
?>
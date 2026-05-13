<?php
if(isset($_GET['search']) && strpos($_GET['search'], 'produto') !== false){
    echo '{
        "data": [
        {"cod": 1, "nome": "Ana", "sobrenome": "Almeida"},
        {"cod": 2, "nome": "Bianca", "sobrenome": "Batista"},
        {"cod": 3, "nome": "Carlos", "sobrenome": "Fonseca"}
        ]
    }';
}
else{
    echo '{
        "data": [
        {"cod": 10, "nome": "Davi", "sobrenome": "Dias"},
        {"cod": 12, "nome": "Emanuel", "sobrenome": "Esteves"}
        ]
    }';
}
?>
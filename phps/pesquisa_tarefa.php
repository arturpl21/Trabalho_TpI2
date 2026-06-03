<?php
if(isset($_GET['search']) && strpos($_GET['search'], 'produto') !== false){
    echo '{
        "data": [
        {"cod": 1, "titulo": "Criar tela de login", "prioridade": "Alta",
            "status": "Pendente", "data": "2025-07-10"},
        {"cod": 2, "titulo": "Revisar banco de dados", "prioridade": "Media",
            "status": "Pendente", "data": "2025-07-15"},
        {"cod": 3, "titulo": "Testar API", "prioridade": "Baixa",
            "status": "Concluído", "data": "2025-07-20"}
        ]
    }';
}
else{
    echo '{
        "data": [
        {"cod": 10, "titulo": "Deploy produção", "prioridade": "Alta",
            "status": "Pendente", "data": "2025-07-25"},
        {"cod": 12, "titulo": "Documentar endpoints", "prioridade": "Baixa",
            "status": "Pendente", "data": "2025-07-30"}
        ]
    }';
}
?>
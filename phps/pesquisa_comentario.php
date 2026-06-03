<?php
if(isset($_GET['search']) && strpos($_GET['search'], 'produto') !== false){
    echo '{
        "data": [
        {"cod": 1, "usuario": "Ana", "tarefa": "Criar tela de login",
            "comentario": "Em andamento", "data": "2025-06-01", "visibilidade": "Visível"},
        {"cod": 2, "usuario": "Bianca", "tarefa": "Revisar banco de dados",
            "comentario": "Aguardando", "data": "2025-06-02", "visibilidade": "Visível"},
        {"cod": 3, "usuario": "Carlos", "tarefa": "Testar API",
            "comentario": "Concluído", "data": "2025-06-03", "visibilidade": "Oculto"}
        ]
    }';
}
else{
    echo '{
        "data": [
        {"cod": 10, "usuario": "Davi", "tarefa": "Deploy produção", 
            "comentario": "Pendente revisão", "data": "2025-06-04", "visibilidade": "Visível"},
        {"cod": 12, "usuario": "Emanuel", "tarefa": "Documentar endpoints",
            "comentario": "Iniciado", "data": "2025-06-05", "visibilidade": "Oculto"}
        ]
    }';
}
?>
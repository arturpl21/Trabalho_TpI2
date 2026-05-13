<?php
if(isset($_GET['search']) && strpos($_GET['search'], 'produto') !== false){
    echo '{
        "data": [
        {"cod": 1, "nome": "Sistema Web", "responsavel": "Ana", 
            "data_inicio": "2025-01-05", "data_fim": "2025-06-05"},
        { "cod": 2, "nome": "App Mobile", "responsavel": "Bianca",
            "data_inicio": "2025-02-04", "data_fim": "2025-07-04"},
        { "cod": 3, "nome": "Portal Interno", "responsavel": "Carlos",
            "data_inicio": "2025-03-03", "data_fim": "2025-08-03"}
        ]
    }';
}
else{
    echo '{
        "data": [
        {"cod": 10, "nome": "Intranet", "responsavel": "Davi",
            "data_inicio": "2025-04-02", "data_fim": "2025-09-02"},
        {"cod": 12, "nome": "Dashboard BI", "responsavel": "Emanuel",
            "data_inicio": "2025-05-01", "data_fim": "2025-10-01"}
        ]
    }';
}
?>
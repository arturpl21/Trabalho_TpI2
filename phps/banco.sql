CREATE DATABASE IF NOT EXISTS sistema_tarefas
CHARACTER SET utf8
COLLATE utf8_general_ci;
USE sistema_tarefas;

CREATE TABLE IF NOT EXISTS usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    idade INT NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    cor VARCHAR(10),
    tipo VARCHAR(50),
    status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS projetos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    data_inicio DATE,
    data_fim DATE,
    responsavel VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS tarefas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    data DATE,
    prioridade VARCHAR(20),
    status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS comentarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100),
    tarefa VARCHAR(100),
    comentario TEXT,
    data DATE,
    visibilidade VARCHAR(20)
);

INSERT INTO usuarios(nome, email, senha, idade) VALUES
    ('Artur', 'artur@email.com', '123456', 25),
    ('Bianca', 'bianca@email.com', '123456', 30),
    ('Carlos', 'carlos@email.com', '123456', 22);

INSERT INTO categorias(nome, descricao, cor, tipo, status) VALUES
    ('Tecnologia', 'Area de TI', '#0000ff', 'Area', 'Ativo'),
    ('Marketing', 'Area de marketing', '#ff0000', 'Area', 'Ativo'),
    ('Financeiro', 'Setor financeiro', '#00ff00', 'Setor', 'Inativo');

INSERT INTO projetos(nome, descricao, data_inicio, data_fim, responsavel) VALUES
    ('Sistema Web', 'Sistema web corporativo', '2025-01-10', '2025-06-30', 'Ana Silva'),
    ('App Mobile', 'Aplicativo mobile', '2025-02-01', '2025-08-15', 'Beatriz Lima'),
    ('Portal Interno', 'Portal interno RH', '2025-03-05', '2025-12-01', 'Carlod Souza');

INSERT INTO tarefas(titulo, descricao, data, prioridade, status) VALUES
    ('Criar tela de login', 'Tela de login do sistema', '2026-07-10', 'Alta', 'Pendente'),
    ('Revisar banco de dados', 'Revisao do schema', '2026-07-15', 'Media', 'Pendente'),
    ('Testar API', 'Testes de integracao', '2026-06-30', 'Baixa', 'Concluido');

INSERT INTO comentarios(usuario, tarefa, comentario, data, visibilidade) VALUES
    ('Ana', 'Criar tela de login', 'Em andamento', '2025-06-01', 'Visivel'),
    ('Beatriz', 'Revisar banco de dados', 'Aguardando', '2025-06-05', 'Visivel'),
    ('Carlos','Testar API', 'Concluido', '2025-06-10', 'Oculto');
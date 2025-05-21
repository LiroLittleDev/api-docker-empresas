// Importa os módulos necessários
const express = require('express'); // Framework para criar servidor e rotas HTTP
const sqlite3 = require('sqlite3').verbose(); // Banco de dados SQLite
const path = require('path'); // Utilitário para lidar com caminhos de arquivos

// Cria a aplicação Express
const app = express();

// Define a porta onde a API irá rodar
const PORT = 3000;

// Middleware que permite o servidor receber dados em formato JSON
app.use(express.json());

// Define o caminho onde o banco de dados ficará salvo
// O arquivo 'empresa.db' será criado na pasta 'data' dentro do container ou volume
const dbPath = path.join(__dirname, 'data', 'empresa.db');

// Cria uma conexão com o banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar no banco de dados:', err.message);
  } else {
    console.log('✅ Conectado ao banco de dados SQLite!');
  }
});

// Cria a tabela 'empresas' caso ela não exista
db.run(`
  CREATE TABLE IF NOT EXISTS empresas (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- ID auto incremental
    nome TEXT NOT NULL,                    -- Nome da empresa (obrigatório)
    cnpj TEXT NOT NULL UNIQUE,             -- CNPJ da empresa (obrigatório e único)
    email TEXT NOT NULL,                   -- E-mail da empresa (obrigatório)
    telefone TEXT                          -- Telefone da empresa (opcional)
  )
`);

// 🔸 Rota POST para cadastrar uma nova empresa
app.post('/empresas', (req, res) => {
  // Extrai os dados enviados no corpo da requisição
  const { nome, cnpj, email, telefone } = req.body;

  // Validação básica: nome, cnpj e email são obrigatórios
  if (!nome || !cnpj || !email) {
    return res.status(400).json({ error: 'Campos nome, cnpj e email são obrigatórios.' });
  }

  // Query SQL para inserir uma nova empresa
  const query = `INSERT INTO empresas (nome, cnpj, email, telefone) VALUES (?, ?, ?, ?)`;
  const params = [nome, cnpj, email, telefone];

  // Executa a query no banco
  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message }); // Retorna erro, se houver
    }
    // Retorna a empresa cadastrada com o ID gerado
    res.status(201).json({ id: this.lastID, nome, cnpj, email, telefone });
  });
});

// 🔸 Rota GET para listar todas as empresas cadastradas
app.get('/empresas', (req, res) => {
  const query = `SELECT * FROM empresas`;

  // Executa a busca no banco
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message }); // Retorna erro, se houver
    }
    // Retorna a lista de empresas
    res.json(rows);
  });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

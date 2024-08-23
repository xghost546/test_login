const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear o corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para processar o formulário
app.post('/submit-form', (req, res) => {
    const { username, password } = req.body;

    // Formatar os dados para salvar no arquivo
    const loginData = `Username: ${username}, Password: ${password}\n`;

    // Caminho do arquivo login.txt
    const filePath = path.join(__dirname, 'login.txt');

    // Salvar os dados no arquivo login.txt
    fs.appendFile(filePath, loginData, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            return res.status(500).send('Erro no servidor');
        }
        res.send('Dados salvos com sucesso');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

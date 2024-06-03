const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [];

// Rota para criar um novo item
app.post('/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.status(201).send(product);
});

// Rota para listar todos os itens
app.get('/products', (req, res) => {
    res.send(products);
});

// Rota para obter um item específico pelo ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const products = products.find(i => i.id === id);

    if (products) {
        res.send(products);
    } else {
        res.status(404).send({ message: 'Item não encontrado' });
    }
});



app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});

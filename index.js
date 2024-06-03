import express from 'express';
import  getSearchParams from './gerenate_params.js';

const app = express();
const port = 3000;

app.use(express.json());

// Rota para listar todos os itens
app.get('/products', async (req, res) => {
    res.send([]);
});

// Rota para obter um item específico pelo ID
app.get('/product/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    if(!id){
        res.status(400).send({ message: 'Informe o id do produto' });
    }
    const browser = await getSearchParams(id);

    const url = 'https://acs.aliexpress.com/h5/mtop.aliexpress.pdp.pc.query/1.0/';
    const cookieHeader = browser.cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    try {
        const response = await fetch(url + '?' + new URLSearchParams(browser.params), {
          method: 'GET',
          credentials: 'include',
          headers: {
            Cookie: cookieHeader
          }
        });
        const result = await response.text();
        const jsonString = result.substring(result.indexOf('(') + 1, result.lastIndexOf(')'));
        const jsonObject = JSON.parse(jsonString);
        res.send(jsonObject.data);    
    } catch (error) {
        console.error('Erro:', error);
        res.status(404).send({ message: 'Item não encontrado' });
    }
});



app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});

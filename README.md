# Documentação da API

## Visão Geral
Esta API permite que você liste e veja detalhes dos produtos da AliExpress. A API é construída usando Node.js com o framework Express.

## Começando

### Pré-requisitos
- Node.js instalado na sua máquina
- npm (Node Package Manager)

### Instalação
1. Clone o repositório:
    ```sh
    git clone https://github.com/erickeira/aliexpress-api.git
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd aliexpress-api
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```

### Executando a API
1. Inicie o servidor:
    ```sh
    npm run start
    ```
2. A API estará rodando em:
    ```
    http://localhost:3000
    ```

## Endpoints

### Listar Todos os Produtos
#### Requisição
- **Método**: GET
- **URL**: `/products`

#### Resposta
- **Status**: 200 OK
- **Corpo**: Um array de produtos (atualmente retorna um array vazio)
    ```json
    []
    ```

### Obter Produto pelo ID
#### Requisição
- **Método**: GET
- **URL**: `/product/:id`
- **Parâmetros de URL**:
  - `id` (obrigatório): O ID do produto

#### Resposta
- **Status**: 200 OK
- **Corpo**: Objeto JSON contendo detalhes do produto

#### Respostas de Erro
- **Status**: 400 Requisição Inválida
  - **Corpo**: 
    ```json
    {
      "message": "Informe o id do produto"
    }
    ```
- **Status**: 404 Não Encontrado
  - **Corpo**: 
    ```json
    {
      "message": "Item não encontrado"
    }
    ```

## Exemplo de Uso
### Obter Detalhes do Produto
Para obter detalhes de um produto com ID `123`:
```sh
curl http://localhost:3000/product/123
```

### Resposta Esperada
```json
{
  // Detalhes do produto
}
```

Sinta-se à vontade para contribuir e fazer melhorias nesta API!

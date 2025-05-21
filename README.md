Esta é uma API RESTful desenvolvida com Node.js, Express, SQLite e Docker. Seu objetivo é permitir o cadastro e a listagem de empresas de vendas. Os dados são armazenados de forma persistente em um banco de dados SQLite, que fica salvo em um volume Docker, garantindo que mesmo após parar ou reiniciar o container os dados permaneçam disponíveis.

Funcionamento da API
A API oferece duas principais funcionalidades: o cadastro de empresas e a listagem de todas as empresas cadastradas. Todo o sistema roda de forma containerizada com Docker, permitindo que qualquer pessoa execute o projeto facilmente, sem se preocupar com configurações locais complexas.

Quando a API é inicializada, ela cria automaticamente um banco de dados SQLite, caso ainda não exista, e cria uma tabela específica para armazenar os dados das empresas. Esse banco é salvo em uma pasta chamada data, garantindo persistência dos dados.

Manipulando a API
A API possui uma URL base que, por padrão local, é http://localhost:3000. A partir dessa URL, você consegue acessar as rotas para realizar operações.

Cadastro de Empresas
Para cadastrar uma nova empresa, você deve enviar uma requisição do tipo POST para a rota /empresas. Essa requisição deve conter um corpo em formato JSON com quatro informações:

nome da empresa (obrigatório)

cnpj da empresa (obrigatório e único)

email da empresa (obrigatório)

telefone da empresa (opcional)

Se algum dos campos obrigatórios não for enviado, a API retorna um erro informando que os campos nome, cnpj e email são obrigatórios. Além disso, se tentar cadastrar uma empresa com um CNPJ já existente no banco de dados, a API também retorna um erro, informando que esse CNPJ já está cadastrado.

Quando o cadastro é bem-sucedido, a API retorna os dados da empresa recém-cadastrada junto com um ID que é gerado automaticamente pelo banco de dados.

Listagem de Empresas
A listagem de empresas é feita através da rota GET /empresas. Ao acessar essa rota, a API retorna uma lista com todas as empresas que estão cadastradas no banco de dados. Os dados retornados incluem o ID, nome, CNPJ, email e telefone de cada empresa.

Essa rota permite consultar todos os registros salvos, facilitando a visualização dos dados armazenados no banco.

Respostas da API
Quando você realiza um cadastro corretamente, a API retorna os dados da empresa cadastrada, incluindo um identificador único (ID). No caso de consultas, ela retorna uma lista de todas as empresas existentes.

Se ocorrer algum erro, como campos obrigatórios não preenchidos ou tentativa de cadastro de CNPJ duplicado, a API responde com mensagens de erro claras informando qual foi o problema.

Persistência dos Dados
O banco de dados utilizado é o SQLite, um banco de dados leve e fácil de configurar. Ele é armazenado em um volume Docker na pasta data. Isso significa que, mesmo que você pare ou remova o container da API, os dados não são perdidos. Eles continuam salvos no seu computador, podendo ser acessados novamente assim que o container for reiniciado.

Como utilizar a API
Para utilizar a API, você deve executar os comandos para iniciar o container via Docker Compose. Assim que o container estiver rodando, você poderá acessar a API por meio de ferramentas como Postman, Insomnia ou diretamente pelo navegador no caso da listagem.

Para cadastrar uma empresa, envie uma requisição POST para a rota /empresas com os dados necessários no corpo da requisição. Para listar todas as empresas cadastradas, acesse a rota GET /empresas.

Se quiser parar a API, basta utilizar o comando para derrubar o container. Mesmo após parar, todos os dados permanecem salvos e disponíveis para uso futuro.

Finalidade
Essa API foi criada como um projeto de estudo e prática, ideal para quem deseja entender na prática como funciona o desenvolvimento de APIs RESTful utilizando Node.js, integração com banco de dados SQLite e práticas de containerização com Docker e Docker Compose.

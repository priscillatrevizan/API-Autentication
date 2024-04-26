# API de Autenticação - Desafio Autodidata Potência Tech

Este projeto é parte do Desafio Autodidata da Potência Tech e consiste em uma API de autenticação que permite o cadastro e login de usuários.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB (com Mongoose)
- Bcrypt (para criptografar senhas)
- Json Web Token (JWT)

## Passo a Passo Realizado

1. **Construção da Rota Pública**: Uma rota pública foi criada com o método GET para o acesso inicial da aplicação. Isso permite que os usuários verifiquem o sucesso inicial com a validação.

2. **Registro de Usuário**: Foi implementada a funcionalidade de registro de usuários, permitindo que eles se cadastrem no sistema. Utilizou-se o bcrypt para gerar um hash da senha do usuário, garantindo a segurança das informações.

3. **Validações e Proteção de Dados**: Diversas validações foram realizadas para proteger os dados e garantir a integridade do sistema. Verificou-se se todos os campos necessários foram fornecidos no corpo da solicitação, tanto para o registro de usuário quanto para o login.

4. **Verificação de Usuário Existente**: Antes de criar um novo usuário durante o registro, verificou-se se já existe um usuário com o mesmo e-mail. Isso evita a criação de múltiplos usuários com o mesmo e-mail, garantindo unicidade.

5. **Verificação de Senha durante o Login**: Durante o login, verificou-se se a senha fornecida corresponde à senha armazenada no banco de dados usando a função `bcrypt.compare()`. Se as senhas não corresponderem, retornou-se um status 422 com a mensagem "Senha inválida".

6. **Tratamento de Erros**: Implementou-se um tratamento de erros robusto, retornando códigos de status apropriados e mensagens de erro descritivas para diferentes situações, como campos ausentes, usuário não encontrado e senha inválida.

7. **Implementação da Rota de Login**: Criou-se uma rota de login que entrega um token JWT para o usuário autenticado, comparando sua senha com a senha armazenada no sistema.

8. **Criação da Rota Privada**: Implementou-se uma rota privada que verifica se o usuário está autenticado, utilizando um middleware para verificar o token JWT. Isso impede que usuários façam requisições sem token ou com token incorreto, garantindo a segurança da aplicação.

## Endpoints

- Para o endpoint de registro (/auth/signup):

Retorna um status 400 com a mensagem "Informe todos os campos corretamente" se algum campo obrigatório estiver ausente ou vazio no corpo da requisição.
Retorna um status 400 com a mensagem "As senhas não coincidem" se a senha e sua confirmação forem diferentes.
Retorna um status 400 com a mensagem "E-mail já cadastrado. Por favor, utilize outro email!" se o e-mail já estiver em uso.
Retorna um status 201 com a mensagem "Cadastro realizado com sucesso" se o usuário for criado com sucesso.

- Para o endpoint de login (/auth/signin):

Retorna um status 400 com a mensagem "Login inválido" se o e-mail ou a senha estiverem ausentes ou vazios no corpo da requisição.
Retorna um status 400 com a mensagem "Login inválido" se o e-mail fornecido não estiver cadastrado no banco de dados.
Retorna um status 400 com a mensagem "Login inválido" se a senha fornecida não corresponder à senha armazenada no banco de dados.
Retorna um status 200 com o token JWT e os detalhes do usuário (ID, nome e e-mail) se a autenticação for bem-sucedida.

## Como Rodar o Projeto Localmente

1. Clone este repositório
2. Instale as dependências
   cd nome-do-repositorio
   npm install
3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   DB_USER=seu-usuario-do-banco-de-dados
   DB_PASS=sua-senha-do-banco-de-dados
   SECRET=sua-chave-secreta-para-o-JWT
4. Inicie o servidor: npm start
5. Acesse a API em `http://localhost:3000`.

## Documentação

Para mais detalhes sobre como esta API foi feita e qual foi a "linha de pensamento", consulte a [documentação no Notion](link-para-a-documentacao).

## Deploy

Este projeto foi implantado usando [nome-da-plataforma-de-hospedagem](link-para-a-aplicacao-hospedada). Você pode acessá-lo e testar os endpoints usando o [Insomnia](https://insomnia.rest/download).

## Autor

Seu nome

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou relatar problemas.

## Licença

Este projeto está licenciado sob a Licença [MIT](https://opensource.org/licenses/MIT).

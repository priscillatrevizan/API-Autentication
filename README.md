# API de Autenticação - Desafio Autodidata Potência Tech

Este projeto é parte do Desafio Autodidata da Potência Tech e consiste em uma API de autenticação que permite o cadastro e login de usuários.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB (com Mongoose)
- Bcrypt (para criptografar senhas)
- Json Web Token (JWT)

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

Para mais detalhes sobre como esta API foi feita e qual foi a "linha de pensamento", consulte [meu site Notion](https://priscillatrevizan.notion.site/Desafio-Potencia-Tech-Abr-24-b53b6abcc3394769a05365212f2108e8?pvs=4).

## Deploy

Este projeto foi implantado usando [Render](notion://www.notion.so/priscillatrevizan/link-para-a-aplicacao-hospedada), e seu deploy está disponível online [aqui!](https://api-autentication-gt1p.onrender.com/)

Você pode acessá-lo e testar os endpoints usando o [Insomnia](https://insomnia.rest/download).

## Autor

[Priscilla Trevizan](https://www.linkedin.com/in/priscillatrevizan/)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um PR ou relatar problemas.

## Licença

Este projeto está licenciado sob a Licença [MIT](https://opensource.org/licenses/MIT).

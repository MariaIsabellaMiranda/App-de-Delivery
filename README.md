# Delivery App
![Captura de tela de 2023-01-09 19-40-59](https://user-images.githubusercontent.com/96309515/211422855-38302d79-2538-4b95-b038-6adc92f953f5.png)
![Captura de tela de 2023-01-09 19-41-23](https://user-images.githubusercontent.com/96309515/211422928-d14179fa-81c9-42dd-966a-31b3135ff60b.png)

# Sobre

Um aplicativo de delivery para uma distribuidora de bebidas. Uma aplicação com Front-end e Back-end integrados com foco na agilidade e escalabilidade do negócio.
Este projeto foi desenvolvido em grupo, utilizando metodologias ágeis como Kanban.

<br>

- **Front-End:** o front-end foi construído utilizando `React.js` e como gerenciador de estado utilizamos o `Redux`. Foram utilizados componentes funcionais e após escolher as ferramentas a serem utilizadas criamos um fluxo lógico de desenvolvimento dos componentes e páginas. <br>
Para a estilização utilizamos `CSS` puro. <br>
Foram desenvolvidos também `Testes Unitários` automatizados utilizando as bibliotecas `React Testing Library` e `Jest`.

<br>

- **Back-End:** o back-end foi construído utilizando modelagem de dados através do `ORM Sequelize`, banco de dados `MySQL` e com a arquitetura de software `MSC (Model-Service-Controller)`. O desenvolvimento respeitou regras de negócio providas no projeto.<br>
Utilizamos `Express.js` para criar e estruturar uma `API RESTful`. <br>
Foram criados `Testes de Integração` cobrindo todo o projeto utilizando `Mocha`, `Chai` e `Sinon`.

<br>

## Construído com

 Front-End  |  Back-End
 --- | ---
 React.js | Node.js
 Redux | Express
 React Hooks | MySql
 RTL | Sequelize
 Jest | Mocha
 CSS | Chai
 Docker | Sinon
 --- | Docker

<br>

## O que faz?

O cliente realiza o login, escolhe os produtos disponíveis,  faz o pedido via "carrinho de compras" e visualiza o status do pedido e pode marcar como  "Recebido" quando a compra é entregue.<br>

O vendedor recebe o pedido com as quantidades e itens escolhidos, seleciona a opcão "Preparando" enquanto prepara a entrega, marca "Em trânsito" ao enviar e acompanha o retorno do cliente ao receber a compra.<br>

O Administrador é capaz de incluir/excluir usuários.<br>

<br>

## Como excutar o projeto

<details>
  <summary><strong>A aplicação já contém alguns usuários criados:</strong></summary><br />
  
 | Usuário | E-mail | Senha |
|---|---|---|
| Delivery App Admin | `adm@deliveryapp.com` | `--adm2@21!!--` |
| Fulana Pereira | `fulana@deliveryapp.com` | `fulana@123` |
| Cliente Zé Birita | `zebirita@email.com` | `$#zebirita#$` |

</details>

<br>

 ⚠️**Importante**: É necessário ter o `node` na versão `16` instalado em sua máquina!

- Clone o projeto para sua máquina local;
- `cd` no diretório do projeto;
- Rode `npm run dev:prestart`: A partir da raiz, esse comando faz o processo de instalação de dependências (npm i) nos dois projetos (./front-end e ./back-end) e roda o Sequelize no ./back-end (lembrar de configurar o .env no mesmo);
- Rode `npm run dev`: A partir da raiz, esse comando limpa as portas 3000 e 3001 e sobe a aplicação com pm2 em modo fork (uma instância pra cada aplicação). Nesse modo, as atualizações são assistidas (modo watch);
- Rode `npm run stop`: A partir da raiz, esse comando para e deleta as aplicações rodando no pm2;


Opcional:
- Rode `npm run test:coverage` dentro de (./front-end ou ./back-end) para visualizar a cobertura dos testes da aplicação na qual estiver dentro.

<br>

## Autores

- Maria Isabella Miranda da Silva <br>
  Linkedin: [@Maria Isabella](https://www.linkedin.com/in/maria-isabella-miranda/) <br>
  Email: ma_isabella.miranda@hotmail.com
  
- Gabriel Dias <br>
  GitHub: [biewwl](https://github.com/biewwl)

- Pedro Reis <br>
  GitHub: [pedronr03](https://github.com/pedronr03)
  
- Thiago Mamede <br>
  GitHub: [tmamedeTrybe](https://github.com/tmamedeTrybe)


<br>

## Mostre seu suporte

Me dê uma ⭐️ se você gostou deste projeto!

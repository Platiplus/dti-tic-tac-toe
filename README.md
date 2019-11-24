[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/Platiplus/dti-tic-tac-toe.svg?branch=master)](https://travis-ci.com/Platiplus/dti-tic-tac-toe)
[![Coverage Status](https://coveralls.io/repos/github/Platiplus/dti-tic-tac-toe/badge.svg?branch=master)](https://coveralls.io/github/Platiplus/dti-tic-tac-toe?branch=master)

# DTI-TIC-TAC-TOE

Este projeto é um teste para desenvolvedor fullstack para a DTI Digital.

## Iniciando
O projeto foi feito com NodeJS.

Para ter uma cópia local do código fonte, você poderá rodar o comando ```git clone https://github.com/Platiplus/dti-tic-tac-toe.git``` em um terminal
ou baixar a zip do projeto no botão que fica no canto superior direito da tela.

### Pré-requisitos

Caso queira rodar o projeto localmente sem a necessidade de containers:
[NodeJS](https://nodejs.org/)

Caso queira rodar o projeto em containers:
[Docker](https://www.docker.com/)
[Docker Compose](https://docs.docker.com/compose/install/)

Informações detalhadas sobre a instalação serão encontradas nos links acima.

### Informações
Relatório de code-coverage online em [Coveralls](https://coveralls.io/github/Platiplus/dti-tic-tac-toe)

Deploy do projeto pode ser consultado e testado em [Heroku](http://dti-tic-tac-toe.herokuapp.com/)

### Rodando o projeto

#### Docker e Docker-compose
Para instalar o projeto através do docker, vá para a pasta raiz do projeto e rode o comando ```docker-compose up```.

O projeto estará rodando no endereço 'http://localhost:8080'
Uma instância do Sonar também estará rodando em 'http://localhost:9000'

#### Localmente
Caso desejar instalar o projeto localmente sem a utilização de containers, entre na pasta raiz do projeto e rode o comando ```npm install```,
depois rode o comando ```node server.js```.

Também será necessário a criação de um arquivo ```.env``` conforme o exemplo encontrado em ```.example.env``` ou somente renomear este arquivo.

O projeto estará rodando no endereço 'http://localhost:8080'

#### Testes
Para rodar os testes, basta estar na pasta raiz do projeto em um terminal e rodar o comando ```npm run test-only```.

O comando ```npm run test``` rodará os testes e passará um relatório de code-coverage para o coveralls, porém, precisaria de uma 'repo-key' (particular) válida e a compatibilidade do comando com sistemas Windows também é limitada

#### SonarQube
Um relatório do SonarQube pode ser gerado rodando o comando ```npm run sonar```.
Para que o relatório seja gerado com sucesso e possa ser consultado, uma instância do SonarQube precisa estar rodando na porta 9000.

Se a instalação do projeto tiver ocorrido com containers, ela já estará configurada, caso contrário, esse processo terá que ser manual e por conta própria.

## Desenvolvido com

* [NodeJS](https://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [Travis-CI](https://travis-ci.com/)
* [Heroku](https://www.heroku.com/)
* [Coveralls](https://coveralls.io/)

## Autor

* **Victor Rosa** - [Platiplus](https://github.com/Platiplus)

## Licença

Este projeto é OPEN SOURCE (MIT).
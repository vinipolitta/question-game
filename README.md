# Quiz App

![Quiz App Screenshot](./screenshot.png)

O Quiz App é um aplicativo de questionário interativo que permite aos usuários testar seus conhecimentos em vários tópicos. Os usuários podem escolher a categoria, dificuldade e o número de perguntas antes de iniciar o jogo.

Este projeto foi desenvolvido como uma aplicação web usando Angular para o front-end. Ele se integra com a API [Open Trivia Database](https://opentdb.com/) para buscar perguntas de trivia em tempo real.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/) (18.16.1 ou superior)
- [Angular CLI](https://angular.io/cli) (v16.2.1 ou superior)

## Instalação

Siga estas etapas para configurar e executar o projeto localmente:

1. Clone este repositório em sua máquina:

   ```bash
   git clone https://github.com/vinipolitta/question-game

2. Navegue até o diretório do projeto:

   ```bash
   cd question-game

3. Navegue até o diretório do projeto:

   ```bash
   npm install
4. Inicie o servidor de desenvolvimento:

   ```bash
   ng serve or npm start
   

5. Abra um navegador e acesse http://localhost:4200/. O aplicativo estará rodando localmente

## Uso

1. **Página Inicial**: Na página inicial, você verá a tela de boas-vindas com a opção de "Começar o Jogo". Clique no botão para iniciar o jogo.

2. **Preencha os Detalhes**: Preencha seu nome, a quantidade de perguntas, a categoria e a dificuldade desejados e clique em "Iniciar Jogo".

3. **Tela de Perguntas**: Você será redirecionado para a tela de perguntas, onde poderá responder às perguntas de trivia.

4. **Resultados**: Após responder a todas as perguntas ou quando o tempo se esgotar, você verá os resultados do jogo.

5. **Reiniciar ou Voltar**: Você pode optar por jogar novamente ou retornar à página inicial.

## Contribuição

Contribuições são bem-vindas! Se você deseja melhorar este projeto ou relatar problemas, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações: `git checkout -b minha-alteracao`
3. Faça commit de suas alterações: `git commit -m 'Adicione uma nova funcionalidade'`
4. Envie suas alterações: `git push origin minha-alteracao`
5. Abra um pull request neste repositório.

## Licença

Este projeto está licenciado sob a Licença MIT.

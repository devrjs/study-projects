<div align="center">
<img alt="Logo letmeask" src="https://user-images.githubusercontent.com/88215288/193161454-9b354609-d2dc-443a-8ea2-146d541c1df8.svg" />
</div>

<br>

<div align="center">

[Sobre o projeto](#-sobre-o-projeto) |
[Tecnologias utilizadas](#%EF%B8%8F-tecnologias-utilizadas) |
[Pré-requisitos](#-pré-requisitos) |
[Como executar](#-como-executar) |
[Licença](#-licença)

</div>

<br>

# 🚀 Sobre o projeto

O projeto foi feito em um bootcamp da Rocketseat, é um sistema web para auxiliar streamers com uma grande quantidade de pessoas em sua transmissão, onde de forma organizada, as pessoas podem enviam suas perguntas para que elas possam serem lidas e respondidas pelo streamer.

<br>

<!-- `Demonstração do projeto:`

<div align="center">
<img alt="Preview do projeto em gif" src="https://user-images.githubusercontent.com/88215288/193357388-da984b6b-7733-4986-9405-e5eb6ab20bfd.gif"/>
</div>

<a href="https://letmeask-a11cb.web.app/"><div align="center"><img alt="Badge de version do package.json" src="https://user-images.githubusercontent.com/88215288/193375459-695ed037-bba2-4161-bdd5-712549734c4f.gif" width="20%" height="20%"/></div></a>

<br> -->

# 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Firebase](https://firebase.google.com/)

<br>

# 📋 Pré-requisitos

`1.` É preciso ter o `Node.js` instalado nem sua máquina para poder executar este projeto. Acesse sua página [clicando aqui!](https://nodejs.org/pt-br/)

`2.` É necessário ter criado uma conta no [Firebase](https://firebase.google.com/) para gerar a conexão com o banco de dados.

<br>

# 📦 Como executar

`1.` Baixe a pasta do projeto ou clone o repositorio com o seguinte comando:

```bash
git clone https://github.com/odevz/letmeask
```

`2.` Execute o terminal e entre na pasta do projeto.

`3.` Use o seguinte comando para instalar as dependências do projeto:

```
npm install
```

`4.` Crie um projeto no Firebase e pegue suas configurações de conexão com o banco de dados.

`5.` Crie um novo arquivo na raiz do projeto com o nome de `.env.local`, e coloque as configurações do Firebase no seguinte formato:

```
VITE_FIREBASE_API_KEY="******************"
VITE_FIREBASE_AUTH_DOMAIN="******************"
VITE_FIREBASE_DATABASE_URL="******************"
VITE_FIREBASE_PROJECT_ID="******************"
VITE_FIREBASE_STORAGE_BUCKET="******************"
VITE_FIREBASE_MESSAGING_SENDER_ID="******************"
VITE_FIREBASE_APP_ID="******************"
```

`6.` Acesse o projeto do Firebase e vá na aba de "Criação" e em `Authentication`, clique em "Settings" e selecione Domínios autorizados, em seguida adicione o seguinte domino: `127.0.0.1`

`7.` Volte ao terminal e digite:

```
npm run dev
```

O terminal exibirá o endereço e a porta do projeto que poderá ser acessada pelo navegador.

<br>

# 📄 Licença

Este projeto está sob a licença MIT, veja o arquivo LICENSE.md para detalhes.

<br>

---

Feito com ❤️ por [odevz](https://github.com/odevz).

<div align="center">

<strong>UPLOAD.AI</strong>

</div>

<div align="center">

<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/devrjs/nlw-13-ia" />
<img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/devrjs/nlw-13-ia" />
<img alt="Badge de Licença" src="https://img.shields.io/github/license/devrjs/nlw-13-ia?color=%23835afd" />

</div>

<div align="center">

[Sobre o projeto](#-sobre-o-projeto) |
[Tecnologias utilizadas](#%EF%B8%8F-tecnologias-utilizadas) |
[Pré-requisitos](#-pré-requisitos) |
[Como executar](#-como-executar) |
[Licença](#-licença)

</div>

<div align="center">

<span>Gere automaticamente títulos e descrições para seus vídeos com IA
</span>

</div>

<br>

# 🚀 Sobre o projeto

O Upload.ai é um aplicativo web desenvolvido com as tecnologias React e Node.js, que oferece aos usuários a capacidade de fazer o upload de vídeos e utilizar a inteligência artificial (IA) para gerar automaticamente títulos cativantes e descrições otimizadas para SEO.

<br>

`Demonstração do projeto:`

<div align="center">
<img alt="Preview do projeto em gif" src="https://github.com/devrjs/nlw-13-ia/assets/88215288/470c749d-6c50-4066-aff0-153d128de692"/>
</div>

<br>

# 🛠️ Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/pt-br/)

<br>

# 📋 Pré-requisitos

`1.` Tenha o **Node.js** instalado em sua máquina. Se você ainda não o possui, você pode baixá-lo [clicando aqui!](https://nodejs.org/pt-br/)

`2.` Ter uma API Key da [OpenAI](https://openai.com/)

<br>

# 📦 Como executar

Para executar o projeto, siga os passos abaixo:

`1.` Baixe a pasta do projeto ou clone o repositório com o seguinte comando:

```bash
git clone https://github.com/devrjs/nlw-13-ia
```

`2.` Abra o terminal e acesse as seguintes pastas do projeto: **upload-ai-web** e **upload-ai-api**.

`3.` Para cada pasta, utilize o seguinte comando para instalar as dependências do projeto:

```
npm install
```

`4.` Em **upload-ai-api** execute tambem o comando:

```
npx prisma generate
```

Em seguida:

```
npx prisma db seed
```

`5.` Na pasta **upload-ai-api**, crie um novo arquivo na raiz do projeto com o nome de **.env**, e coloque a variável de ambiente da OpenAI no seguinte formato:

```
OPENAI_KEY="******************"
```

`6.` Abra o terminal para cada pasta, **upload-ai-web** e **upload-ai-api**, e digite:

```
npm run dev
```

O terminal exibirá o endereço e a porta do projeto que poderá ser acessada pelo navegador.

<br>

# 📄 Licença

Este projeto está sob a licença MIT, veja o arquivo LICENSE.md para detalhes.

<br>

---

Feito com ❤️ por [devrjs](https://github.com/devrjs).

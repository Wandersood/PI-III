# Projeto Interdisciplinar III - Sistema de Gerenciamento de Fotografias (Em andamento)

<div align="center">
  <a href="https://github.com/HenriqueCosta05/Projeto_Interdisciplinar_III_FATEC">
    <img src="app/frontend/client/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Sistema de Gerenciamento de Fotografias</h3>

  <p align="center">
    Um micro-saas para fotógrafos automatizarem suas tarefas!
    <br />
    <a href="">Em breve - veja a aplicação em funcionamento!</a>
    ·
    <a href="">Reportar Bugs</a>
  </p>
</div>

## Sobre o projeto

O Micro-SaaS Adriana Oliveira Fotografias é uma solução completa e inovadora, projetada especificamente para atender às necessidades dos fotógrafos profissionais. Esta plataforma automatiza diversas tarefas diárias, permitindo que os fotógrafos concentrem-se no seu trabalho artístico enquanto o sistema cuida do restante.

## Construído com

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Para executar o back-end

```
cd app/backend
```

```
python -m venv nome_do_ambiente_virtual
```

```
nome_do_ambiente_virtual/Scripts/activate
```

```
pip install -r requirements.txt
```

### Microsserviços - Executá-los em portas separadas!

Microsserviço 1 - Clientes

```
uvicorn client:app --reload --port 8000
```

Microsserviço 2 - Agenda (Em processo de refatoração)

```
uvicorn calendars:app --reload --port 8001
```

Microsserviço 3 - **Financeiro**

```
uvicorn financial:app --reload --port 8002
```

Microsserviço 4 - Galeria (Em andamento)

```
uvicorn gallery:app --reload --port 8003
```

Microsserviço 5 - Autenticação do Administrador (Em andamento)

```
  uvicorn auth_admin:app --reload --port 8004
```

## Para executar o front-end

```
cd app/frontend/client
```

```
npm i
```

```
npm run dev
```

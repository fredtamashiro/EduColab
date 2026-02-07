# EduColab (MVP Hackathon 5FSDT)

Plataforma colaborativa para professores do ensino público com foco em:
1) criação de materiais didáticos,
2) geração de questionários a partir do material,
3) compartilhamento e melhoria colaborativa.

Este MVP utiliza dados fake em memória e IA simulada para demonstrar o fluxo principal.

## O que foi desenvolvido

- Login fake por perfil de professor (sem senha).
- CRUD de materiais: criar, listar, ver detalhe, editar e arquivar (soft delete).
  - Disciplina com lista pré-definida.
- Questionário por material:
  - criação manual de questões (múltipla escolha + dissertativa),
  - marcação de dificuldade (F/M/D),
  - salvamento e visualização.
- Comunidade:
  - listar materiais públicos,
  - clonar material para “meus materiais”,
  - comentar sugestões de melhoria.
- IA simulada:
  - “sugerir questões”,
  - “avaliar dificuldade”,
  - alerta quando conteúdo muda e requer revisão.
  - notificação de revisão após cadastro de material.

## Stack

- React + Vite
- CSS puro
- Mock local (sem back-end)

## Como rodar localmente

Requisitos:
- Node.js 18+

Passos:
```bash
npm install
npm run dev
```

O app ficará disponível em:
```
http://localhost:5173/
```

## Build de produção (opcional)

```bash
npm run build
npm run preview
```

## Observações

- Todo o conteúdo é mockado e fica em memória.
- Não há persistência real nem integração com API/IA.
- Ideal para demo e gravação do pitch/MVP.

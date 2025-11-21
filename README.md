# HabitTrack

Um gerenciador de hábitos simples e elegante construído com React, TypeScript e Tailwind CSS v4.

## Funcionalidades

- **Dashboard**: Visualização clara dos seus hábitos diários.
- **Gráficos**: Acompanhe seu progresso semanal com gráficos interativos.
- **Persistência**: Seus dados são salvos automaticamente no navegador.
- **Tema Escuro**: Interface adaptável para dia e noite.
- **Reset Diário**: O status dos hábitos é resetado visualmente a cada novo dia.

## Tecnologias

- React 19
- TypeScript
- Tailwind CSS v4 (Beta)
- Vite
- Lucide React (Ícones)
- Recharts (Gráficos)

## Como Rodar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse `http://localhost:5173` no seu navegador.

## Estrutura do Projeto

- `src/components`: Componentes reutilizáveis (Button, Card, Input, Modal).
- `src/context`: Gerenciamento de estado global (HabitContext, ThemeContext).
- `src/hooks`: Hooks customizados (useLocalStorage, useDailyReset).
- `src/pages`: Páginas da aplicação (Login, Dashboard).
- `src/utils`: Funções auxiliares.

## Uso

1. **Login**: Use qualquer email e senha para entrar (simulação).
2. **Adicionar Hábito**: Clique em "Novo Hábito" e digite o nome.
3. **Marcar como Feito**: Clique no quadrado ao lado do nome do hábito.
4. **Tema**: Use o ícone de sol/lua no topo para alternar o tema.

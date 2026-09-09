# 📱 Meu Lista de Tarefas

Projeto desenvolvido como atividade da disciplina de **Desenvolvimento para Dispositivos Móveis** da Fatec.

O objetivo desta etapa foi iniciar a estrutura de uma aplicação mobile utilizando **React Native**, **Expo** e **TypeScript**, realizando a configuração inicial do projeto e preparando o ambiente para as próximas funcionalidades.

> 🚧 **Status do projeto:** Desenvolvimento inicial concluído até a Etapa 5.

---

## 🛠️ Tecnologias utilizadas

Até o momento, o projeto utiliza:

* React Native
* Expo
* TypeScript
* Expo Router
* NativeWind
* Tailwind CSS
* Expo SQLite

---

## 📂 Estrutura inicial do projeto

Após as configurações realizadas, o projeto possui uma estrutura semelhante a esta:

```text
meu-lista-tarefas/
│
├── app/
├── assets/
├── src/
│   └── types/
│       └── task.ts
│
├── global.css
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
├── nativewind-env.d.ts
├── app.json
├── package.json
└── tsconfig.json
```

---

# 🚀 Desenvolvimento do projeto

## 1. Criação do projeto

O projeto foi iniciado utilizando o template em branco do Expo com suporte ao TypeScript:

```bash
npx create-expo-app@latest meu-lista-tarefas --template blank-typescript
```

Em seguida, foi acessada a pasta criada:

```bash
cd meu-lista-tarefas
```

---

## 2. Instalação das dependências

Foram instalados os pacotes necessários para a configuração inicial da aplicação.

Entre eles estão recursos para:

* Navegação entre telas;
* Banco de dados local;
* Áreas seguras da tela;
* Gestos;
* Animações;
* Estilização com NativeWind.

---

## 3. Configuração do Expo Router

Para preparar o projeto para o sistema de rotas, o Expo Router foi definido como ponto de entrada da aplicação.

No arquivo `package.json`, a propriedade principal foi configurada da seguinte forma:

```json
"main": "expo-router/entry"
```

Também foi definido um `scheme` no arquivo `app.json`:

```json
"scheme": "lista-tarefas"
```

Essa configuração permite que o aplicativo tenha uma identificação própria para a utilização de links internos e navegação.

---

## 4. Configuração do NativeWind

O NativeWind foi configurado para permitir a utilização de classes inspiradas no Tailwind CSS dentro dos componentes do React Native.

### Arquivo `global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Arquivo `tailwind.config.js`

O arquivo foi configurado para reconhecer os arquivos localizados nas pastas `app` e `src`.

### Arquivo `babel.config.js`

Foi realizada a configuração do Babel para funcionar em conjunto com o Expo e o NativeWind.

### Arquivo `metro.config.js`

O bundler Metro foi configurado para processar o arquivo `global.css`.

### Arquivo `nativewind-env.d.ts`

Este arquivo foi adicionado para que o TypeScript reconheça corretamente propriedades como `className` nos componentes.

---

## 5. Criação dos tipos TypeScript

Foi criada a pasta:

```text
src/types/
```

Dentro dela, foi adicionado o arquivo `task.ts`.

Esse arquivo contém as definições utilizadas para representar uma tarefa e os dados necessários para criar ou editar uma tarefa.

### Interface `Task`

Representa a estrutura principal de uma tarefa:

* `id`: identificador da tarefa;
* `title`: título;
* `description`: descrição;
* `completed`: status de conclusão;
* `createdAt`: data de criação.

### Tipo `TaskFilter`

Define os filtros disponíveis para as tarefas:

```text
all
pending
completed
```

### Interfaces para criação e edição

Também foram criados tipos específicos para organizar os dados utilizados durante a criação e edição de tarefas:

* `CreateTaskInput`
* `UpdateTaskInput`

O uso do TypeScript ajuda a manter uma estrutura mais organizada e reduz possíveis erros durante o desenvolvimento.

---

6. Configuração do banco de dados SQLite

Para persistir as tarefas localmente, foi utilizado o módulo `expo-sqlite`.

Foi criada a pasta:

```
src/database/

```

Arquivo `database.ts`
Esse arquivo é responsável por gerenciar a conexão com o banco de dados. Ele implementa um padrão Singleton, garantindo que apenas uma conexão seja aberta durante a execução do aplicativo. Na primeira chamada, o banco é criado (caso não exista) e a tabela `tasks` é inicializada automaticamente.

Também foi habilitado o modo `WAL` (Write-Ahead Log), que melhora a performance de escrita do SQLite. Em vez de gravar diretamente no arquivo, o banco utiliza um log intermediário, reduzindo o tempo de travamento durante operações de escrita.

7. Criação do repositório de tarefas

Arquivo `src/database/taskRepository.ts`

Esse arquivo concentra todas as operações de CRUD (Create, Read, Update, Delete) relacionadas às tarefas, entre elas:

* Buscar todas as tarefas (da mais recente para a mais antiga);
* Buscar uma tarefa específica por ID;
* Criar uma nova tarefa;
* Atualizar título e descrição de uma tarefa existente;
* Alternar o status de conclusão de uma tarefa;
* Excluir uma tarefa.

Por que separar conexão e operações em arquivos diferentes?
O arquivo `database.ts` cuida apenas da conexão com o banco (abrir e criar tabelas), enquanto o `taskRepository.ts` cuida das operações sobre os dados. Essa divisão segue o princípio de Responsabilidade Única (SRP), tornando o código mais organizado e fácil de manter.

8. Criação do hook customizado

Arquivo `src/hooks/useTasks.ts`

Foi desenvolvido um hook customizado para centralizar toda a lógica de estado e manipulação das tarefas, evitando que essa lógica fique espalhada pelos componentes de tela. Entre as responsabilidades do hook estão:

* Carregar as tarefas do banco de dados;
* Recarregar a lista automaticamente sempre que a tela voltar a ficar em foco (por exemplo, ao retornar do formulário de cadastro);
* Aplicar filtros (todas, pendentes ou concluídas);
* Alternar o status de conclusão de uma tarefa;
* Remover uma tarefa;
* Fornecer contadores de tarefas totais, pendentes e concluídas.

Por que usar `useCallback`?
Sem o `useCallback`, a função de carregamento das tarefas seria recriada a cada renderização do componente. Isso geraria um loop infinito em conjunto com o `useFocusEffect`, já que o efeito identificaria a mudança de referência da função e a executaria novamente, causando nova renderização — e assim sucessivamente. O `useCallback` mantém a mesma referência da função entre renderizações, evitando esse problema.

🚧 Status atualizado do projeto: Desenvolvimento concluído até a Etapa 8, com banco de dados local, camada de repositório e hook de gerenciamento de estado das tarefas já implementados.


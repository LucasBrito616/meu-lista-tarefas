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


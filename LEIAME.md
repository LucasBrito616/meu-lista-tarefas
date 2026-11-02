# meu-lista-tarefas (passos 1 a 30)

Projeto Expo SDK 57 já criado, com os pacotes instalados nas versões do SDK e o código dos passos 4 a 10. Os passos 1, 2 e 3 do README já estão aplicados: o `package.json` usa `"main": "expo-router/entry"` e o `app.json` tem `"scheme": "lista-tarefas"`.

## Como rodar

1. Instale o Node.js 22.13 ou superior (nodejs.org, versão LTS) e o app Expo Go no celular.
2. Extraia o zip numa pasta fora de Downloads, por exemplo `Documentos`, e abra essa pasta no VS Code (File > Open Folder).
3. Abra o terminal do VS Code (Ctrl + ") e rode, uma linha por vez:

```
npm install --legacy-peer-deps
npx expo start --clear
```

4. Escaneie o QR Code com o Expo Go (Android: scanner dentro do Expo Go; iPhone: câmera). Celular e computador na mesma rede Wi-Fi.

Se o celular não conectar, use `npx expo start --tunnel`.

## O que tem aqui

```
app/_layout.tsx, index.tsx, form.tsx, profile.tsx, login.tsx, register.tsx
src/types/task.ts, profile.ts
src/database/database.ts, taskRepository.ts, profileRepository.ts
src/hooks/useTasks.ts, useProfile.ts, useAuth.ts
src/services/firebaseConfig.ts
src/contexts/AuthContext.tsx
src/types/auth.ts
.env.example
src/components/EmptyState.tsx, FilterBar.tsx, TaskItem.tsx, CameraCapture.tsx
global.css, tailwind.config.js, babel.config.js, metro.config.js, nativewind-env.d.ts
```

Diferença em relação ao README: o `nativewind-env.d.ts` tem uma linha a mais (`declare module '*.css';`), necessária para o TypeScript 6 aceitar o `import '../global.css'`.

## Se aparecer erro de worklets

```
npx expo install react-native-worklets
npx expo start --clear
```

## Perfil do usuário (passos 12 a 19)

Adicionados: `expo-camera` e `expo-file-system` (versões do SDK 57), tipos, tabela `profile`, repositório, hook `useProfile`, componente `CameraCapture`, tela `app/profile.tsx` e botão 👤 no header da lista.
Depois de `npm install --legacy-peer-deps`, rode `npx expo start --clear`. Na primeira vez que tocar na foto, permita a câmera no Expo Go.

## Autenticação com Firebase (passos 20 a 30)

Adicionados: `firebase`, `expo-auth-session`, `expo-web-browser`, `expo-crypto` e `@react-native-async-storage/async-storage`; login por email/senha e Google; cadastro; proteção de rotas no `_layout.tsx`; botão 🚪 de sair no header.

### O que você precisa fazer (passo 21, manual)
1. No Firebase Console, crie o projeto, registre um app Web e copie o `firebaseConfig`.
2. Em Authentication > Sign-in method, ative **Email/Password** e **Google**; copie o **ID do cliente da Web** do Google.
3. Copie `.env.example` para `.env` e preencha com os seus valores. O `.env` não vai para o Git (está no `.gitignore`).
4. Reinicie com `npx expo start --clear`.

Observação: no Expo Go o login com Google depende do Web Client ID e do redirecionamento do Expo; se falhar, o login por email/senha continua funcionando. O passo 31 (Client IDs de iOS/Android) é opcional e está comentado em `useAuth.ts`.

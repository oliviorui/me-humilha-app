# Me Humilha

Aplicação mobile de motivação reversa construída com Expo + React Native.

## Visão Geral

**Me Humilha** é um aplicativo de “motivação reversa”: em vez de frases motivacionais tradicionais, ele entrega frases duras, sarcásticas e provocativas para gerar desconforto produtivo e incentivar ação.

A proposta é simples:

- gerar impacto emocional
- quebrar procrastinação
- provocar reação imediata
- transformar frustração em movimento

O app funciona de forma rápida, visual e offline-first.

---

## Objetivo do Projeto

Este projeto foi criado como MVP (Minimum Viable Product) para validar a ideia de produto e a experiência do usuário antes da construção de uma versão mais robusta com backend, contas de utilizador e conteúdo dinâmico.

O foco atual é:

- experiência visual forte
- uso simples e rápido
- partilha social
- retenção através de frases memoráveis

---

## Stack Tecnológica

### Mobile

- React Native
- Expo SDK 54
- Expo Router
- TypeScript

### Armazenamento Local

- AsyncStorage

### UI / UX

- Expo Blur
- Expo Sharing
- React Native View Shot
- Safe Area Context
- Ionicons

### Estado e Tema

- Context API
- Theme Provider customizado
- Sistema Light / Dark persistente

---

## Funcionalidades Atuais

### Frase aleatória

O utilizador pode gerar frases aleatórias de motivação reversa.

### Fundo visual dinâmico

Cada frase é acompanhada por uma imagem visual aleatória para reforçar impacto emocional.

### Guardar frases

O utilizador pode guardar frases favoritas localmente.

### Partilhar

O utilizador pode partilhar uma arte visual gerada com a frase atual.

### Tema claro / escuro

O app permite alternar entre modo claro e escuro com persistência local.

### Onboarding

Primeira experiência guiada para novos utilizadores.

### Progresso do ano

Exibição visual do progresso percentual do ano atual.

---

## Estrutura do Projeto

```text
app/
 ├── (tabs)/
 │   ├── index.tsx
 │   ├── favorites.tsx
 │   ├── settings.tsx
 │   └── _layout.tsx
 │
 ├── onboarding.tsx
 ├── index.tsx
 └── _layout.tsx

src/
 ├── components/
 ├── data/
 ├── hooks/
 ├── theme/
 ├── utils/
 └── screens/

assets/
 ├── images/
 └── fonts/
```

---

## Arquitetura

O projeto segue uma arquitetura simples e modular:

- `app/` → rotas e navegação
- `components/` → componentes reutilizáveis
- `data/` → frases e imagens estáticas
- `utils/` → lógica de negócio e helpers
- `theme/` → tema global e paletas
- `hooks/` → hooks personalizados

O objetivo foi manter alta legibilidade e baixo acoplamento.

---

## Estado Atual do MVP

### Concluído

- navegação principal
- geração de frases
- favoritos
- partilha
- tema persistente
- onboarding
- estabilidade principal do fluxo

### Em evolução

- notificações locais
- melhoria da experiência de partilha
- refinamento visual final
- limpeza técnica e otimização

### Futuro (v2)

- autenticação
- backend real
- sincronização entre dispositivos
- painel administrativo
- frases remotas
- analytics
- gamificação
- planos premium

---

## Instalação

```bash
git clone <repo-url>
cd reverse-coach-app
npm install
npx expo start
```

---

## Scripts

### Desenvolvimento

```bash
npx expo start
```

### Limpar cache

```bash
npx expo start -c
```

### Lint

```bash
npm run lint
```

### Android

```bash
npx expo run:android
```

### iOS

```bash
npx expo run:ios
```

---

## Qualidade e Revisão Técnica

O projeto passou por auditoria técnica focada em:

- estabilidade
- limpeza de código
- bugs reais
- estrutura de produção
- UX
- segurança básica
- preparação para release

Foram corrigidos:

- crash na tela de definições
- problema de onboarding ignorado
- erro de renderização no QuotePanel
- inconsistências no ThemeProvider
- problemas de tab navigation
- melhoria da partilha visual
- melhoria do feedback ao guardar frases

---

## Limitações Atuais

Este MVP ainda não possui:

- backend
- autenticação
- base de dados remota
- sistema real de notificações
- sincronização cloud

Isso é intencional nesta fase.

---

## Filosofia do Produto

Este app não tenta “motivar”.

Ele confronta.

A ideia não é conforto.

É reação.

---

## Autor

Desenvolvido por Olívio Cumbe.

Projeto focado em produto, execução e validação real de mercado.

---

## Licença

Uso privado / MVP de validação.

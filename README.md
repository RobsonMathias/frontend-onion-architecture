# To-Do List Application

Esse projeto é um exemplo prático de uma composição baseada padrão de projeto conhecido como Onion Architecture

## Getting Started

1. Run `yarn install` or `yarn`.
3. Run `yarn start`.

## Features

- Sign In
- Sign Up
- Logout
- Sign Up com Google
- Gerenciamento de tarefas

## Development

### Project organization

Aqui uma breve descrição de cada layer que compõe a aplicação.

| Folder                         | Description |
|--------------------------------|-------------|
| `/`                            | Conteúdo raiz do projeto e configurações como: lint, testes, envs e etc. |
| `/.github/`                    | Configuração do Github como modelos de PR e ações de pipeline para compilação e implantação |
| `/cypress/`                    | Configuração e cenários de testes E2E |
| `/public/`                     | Pasta para arquivos estáticos como index.html, imagens, fontes e scripts  |
| `/src/`                        | Estrutura principal do projeto |
| `/src/@fixtures`               | Mocks e abstração para testes unitários e de integração  |
| `/src/@types`                  | Tipos, interfaces e entidades |
| `/src/adapters`                | Configuração do projeto como criação de banco de dados ou configurações de armazenamento na web |
| `/src/constants`               | Variáveis constantes |
| `/src/layouts`                 | Componentes de UI, um forte candidato a ser extraído e se tornar uma biblioteca compartilhada entre projetos, evite usar hooks relacionados a um módulo, store ou requisição de api nesta pasta. |
| `/src/modules`                 | Módulos de aplicação baseados em domínios, todos os módulos devem ter um baixo acoplamento, todos os módulos devem ser fortes candidatos a serem extraídos e se tornarem um micro-frontend. |
| `/src/pages`                   | Componentes que compõem módulos e layout com composição de rotas e aplicação, esta camada não deve ser extraída do projeto para um micro-frontend. |
| `/src/services`                | Abstração de solicitação de API e componentes externos, como: Apis, Web storages, analytics e outros coletores de eventos |
| `/src/stores`                  | Composição de stores que mescla todas as stores de cada módulo e cria um vínculo entre elas. |
| `/src/wrappers`                | Wrappers para páginas ou componentes que precisam executar uma configuração ou comportamento padrão |
| `/src/**/__tests__`            | Todos os testes de unidade e integração |
| `/src/**/__snapshots__`        | Snapshots, testes de contrato de HTML. |

### Commands

**Build:**

```
yarn build
```

**Dev open on port 3000:**

```
yarn start
```

**Lint:**

```
yarn lint
```

**Format code:**

```
yarn format
```

**Unit test:**

```
yarn test
```

**Integration test:**

```
yarn test:integration
```

**E2E Test:**
```
yarn e2e
```
To debug and open cypress browser management run:
```
yarn e2e:dev
```

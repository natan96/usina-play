# Usina Play - Aplicativo Mobile

## Sobre o Projeto

Este projeto foi desenvolvido como parte de um teste técnico para a BE220 Digital, com o objetivo de reproduzir a interface de um aplicativo mobile desenvolvido para a Rede Usina do Corpo. O foco principal do teste foi a fidelidade visual da interface e a qualidade do código-fonte.

Além da reprodução fiel da tela inicial solicitada, foram implementadas funcionalidades adicionais para demonstrar capacidade técnica em desenvolvimento de aplicações completas, incluindo operações CRUD, gestão de estado, integração com Firebase e componentização avançada.

## Tecnologias Utilizadas

### Core

- **Ionic Framework 8.0.0** - Framework híbrido para desenvolvimento mobile
- **Angular 20.0.0** - Framework JavaScript utilizando standalone components
- **TypeScript 5.9.0** - Linguagem de programação tipada

### Backend e Persistência

- **Firebase 12.9.0** - Backend as a Service (BaaS)
  - Firestore - Banco de dados NoSQL em tempo real
  - Authentication - Sistema de autenticação
- **AngularFire 20.0.1** - Biblioteca oficial de integração Angular + Firebase

### Bibliotecas Complementares

- **ngx-image-cropper 9.1.6** - Biblioteca para crop de imagens com proporções customizadas
- **RxJS 7.8.0** - Programação reativa e gerenciamento de observables
- **Ionicons 7.0.0** - Biblioteca de ícones do Ionic

### Ferramentas de Desenvolvimento

- **ESLint 9.16.0** - Linter para padronização de código
- **Angular ESLint** - Regras específicas para projetos Angular
- **Karma + Jasmine** - Framework de testes unitários
- **Capacitor 8.0.2** - Runtime nativo para deploy mobile

## Estrutura do Projeto

```
usina-play/
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizáveis
│   │   │   ├── conteudos/       # Seção de conteúdo da home
│   │   │   ├── personal-online/ # Seção Personal Online da home
│   │   │   ├── programas/       # Seção de programas da home
│   │   │   ├── topbar/          # Barra superior com menu e notificações
│   │   │   └── modals/          # Componentes modais
│   │   │       ├── treino-form-modal/      # Modal CRUD de treinos
│   │   │       ├── meu-corpo-modal/        # Modal de medidas corporais
│   │   │       ├── objetivos-modal/        # Modal de objetivos e conquistas
│   │   │       └── notifications-popover/  # Popover de notificações
│   │   │
│   │   ├── core/                # Núcleo da aplicação
│   │   │   ├── config/          # Configurações (collections Firebase)
│   │   │   ├── enums/           # Enumerações (níveis de usuário)
│   │   │   ├── interfaces/      # Interfaces TypeScript
│   │   │   ├── models/          # Modelos de dados
│   │   │   │   ├── user.ts      # Modelo de usuário
│   │   │   │   ├── treino.ts    # Modelo de treino
│   │   │   │   ├── programa.ts  # Modelo de programa
│   │   │   │   └── notification.ts
│   │   │   ├── repositories/    # Camada de acesso a dados
│   │   │   │   ├── firebase-abstract.repository.ts
│   │   │   │   ├── user.repository.ts
│   │   │   │   ├── treino.repository.ts
│   │   │   │   ├── programa.repository.ts
│   │   │   │   └── notification.repository.ts
│   │   │   └── services/        # Serviços de negócio
│   │   │       ├── auth.service.ts
│   │   │       ├── notification.service.ts
│   │   │       └── treino.service.ts
│   │   │
│   │   ├── layout/              # Layout base da aplicação
│   │   │   ├── layout.component.ts
│   │   │   └── layout.module.ts
│   │   │
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── home/            # Página inicial (tela reproduzida)
│   │   │   └── personal-online-list/  # Página de gerenciamento de treinos
│   │   │
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   │
│   ├── assets/                  # Recursos estáticos
│   │   ├── icon/               # Ícones do app
│   │   └── images/             # Imagens e recursos visuais
│   │
│   ├── environments/            # Configurações de ambiente
│   │   ├── environment.ts      # Desenvolvimento
│   │   └── environment.prod.ts # Produção
│   │
│   ├── theme/                   # Temas e estilos globais
│   │   └── variables.scss      # Variáveis CSS do Ionic
│   │
│   ├── global.scss             # Estilos globais
│   ├── index.html              # HTML principal
│   └── main.ts                 # Bootstrap da aplicação
│
├── angular.json                # Configuração do Angular CLI
├── capacitor.config.ts         # Configuração do Capacitor
├── ionic.config.json           # Configuração do Ionic
├── package.json                # Dependências do projeto
├── tsconfig.json               # Configuração do TypeScript
└── README.md                   # Este arquivo
```

## Funcionalidades Implementadas

### 1. Tela Principal (Home)

Reprodução fiel da interface solicitada contendo:

#### Topbar

- Logo da aplicação
- Botão de menu lateral (hamburger menu)
- Botão de notificações com badge de contagem
- Acesso rápido a "Meu Corpo" e "Objetivos e Conquistas"

#### Seção Personal Online

- Scroll horizontal de cards de treino
- Card especial "Novo Treino" para criação
- Exibição de treinos com imagem ou placeholder
- Design responsivo com diferentes tamanhos de card

#### Seção Programas

- Grid horizontal de programas de treinamento
- Cards com imagens e títulos
- Scroll suave em dispositivos móveis

#### Seção Conteúdo

- Cards informativos com layout diferenciado
- Sistema de highlight visual em cards específicos
- Textos e descrições formatados

### 2. Sistema de Autenticação

- Estrutura preparada para autenticação Firebase
- Service de autenticação com gerenciamento de sessão
- Proteção de rotas baseada em autenticação
- Controle de usuário atual em todo o aplicativo

### 3. CRUD Completo de Treinos (Funcionalidade Extra)

#### Modal de Formulário de Treino

- Modo híbrido: criação e edição
- Upload e crop de imagem (proporção 500x334px)
- Validação de formulário reativo
- Preview de imagem antes do salvamento
- Suporte a treinos sem imagem (placeholder dinâmico)
- Integração completa com Firebase Firestore

#### Página Personal Online List

- Listagem completa de treinos do usuário
- Botão FAB para criar novo treino
- Ações de edição e exclusão por treino
- Confirmação de exclusão com alertas customizados
- Estados de loading com spinners
- Estado vazio com mensagem informativa
- Filtros por userId para isolamento de dados

### 4. Perfil do Usuário (Funcionalidades Extra)

#### Modal "Meu Corpo"

- Exibição de medidas corporais
  - Peso (kg)
  - Altura (metros)
  - Percentual de gordura
- Circunferências detalhadas
  - Cintura
  - Quadril
  - Busto
  - Pescoço
  - Braço
  - Antebraço
  - Coxa
  - Panturrilha
- Estado vazio quando sem dados cadastrados
- Design com cards organizados por categoria

#### Modal "Objetivos e Conquistas"

- Listagem de objetivos do usuário
- Indicador visual para objetivos conquistados (troféu)
- Círculo vazio para objetivos pendentes
- Diferenciação de background para conquistas
- Estado vazio quando sem objetivos

### 5. Sistema de Notificações (Funcionalidade Extra)

- Popover de notificações acessível pelo topbar
- Badge com contador de notificações não lidas
- Marcação de notificações como lidas
- Integração com Firebase Firestore
- Design responsivo e acessível

### 6. Menu Lateral

- Navegação entre páginas
- Itens de menu:
  - Personal Online (Lista completa)
  - Home
- Botão de logout
- Fechamento automático após navegação

## Arquitetura e Padrões Implementados

### Padrão Repository

Implementação do padrão Repository para abstração da camada de dados:

```typescript
FirebaseAbstractRepository<T extends BaseModel>
├── convertToModel()
├── convertToFirestore()
├── add()
├── set()
├── getById()
├── getAll()
├── getByQuery()
├── update()
├── delete()
├── getByField()
├── getAllOrdered()
└── getWithLimit()
```

### Modelos de Dados

#### User

```typescript
interface User extends BaseModel {
  nome: string;
  email: string;
  nivel: UserLevel;
  meuCorpo?: MeuCorpo;
  objetivos?: Objetivo[];
}
```

#### Treino

```typescript
interface Treino extends BaseModel {
  nome: string;
  imageUrl?: string;
  userId: string;
}
```

#### Programa

```typescript
interface Programa extends BaseModel {
  nome: string;
  imageUrl: string;
  userId: string;
}
```

### Filtros por Usuário

Todos os dados são filtrados por `userId` para garantir isolamento:

- Treinos carregados via `getByField('userId', currentUser.id)`
- Programas filtrados por usuário autenticado
- Notificações específicas por usuário

### Componentização

- **Standalone Components**: Utilizados para modais com imports explícitos
- **Module Components**: Utilizados para componentes compartilhados
- **Lazy Loading**: Páginas carregadas sob demanda
- **ViewEncapsulation.None**: Para estilização de componentes third-party

### Gerenciamento de Estado

- **Signals**: Utilizado para estados reativos (`loading`, `notifications`)
- **Observables**: Para operações assíncronas e streams de dados
- **Dependency Injection**: `inject()` function-based em vez de constructor injection

### Estilização

#### Tema Customizado

```scss
--ion-color-primary: #f07d07
--background: #202020
--color: #ffffff
```

#### Técnicas CSS

- CSS Variables para temas do Ionic
- SCSS com nesting
- Media queries para responsividade
- Flexbox para layouts
- Grid CSS onde apropriado
- Animações de skeleton loading

## Instalação e Execução

### Pré-requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- Angular CLI 20.x
- Ionic CLI 8.x

### Instalação

```bash
# Clonar o repositório
git clone <repository-url>
cd usina-play

# Instalar dependências
npm install
```

### Configuração do Firebase

1. Criar projeto no Firebase Console
2. Ativar Authentication e Firestore
3. Copiar configurações do Firebase
4. Atualizar `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  },
};
```

### Executar em Desenvolvimento

```bash
# Servidor de desenvolvimento
ionic serve
# ou
npm start

# A aplicação estará disponível em http://localhost:8100
```

### Build para Produção

```bash
# Build otimizado
npm run build

# Os arquivos estarão em www/
```

### Deploy Mobile

```bash
# Adicionar plataforma Android
ionic capacitor add android

# Adicionar plataforma iOS
ionic capacitor add ios

# Sincronizar código web com plataformas nativas
ionic capacitor sync

# Abrir no Android Studio
ionic capacitor open android

# Abrir no Xcode
ionic capacitor open ios
```

## Estrutura Firebase

### Collections

#### users

```javascript
{
  id: string,
  nome: string,
  email: string,
  nivel: string,
  meuCorpo?: {
    peso: number,
    altura: number,
    percentualGordura?: number,
    circunferencias?: {
      cintura?: number,
      quadril?: number,
      busto?: number,
      pescoco?: number,
      braco?: number,
      antebraco?: number,
      coxa?: number,
      panturrilha?: number
    }
  },
  objetivos?: [
    {
      objetivo: string,
      conquistado: boolean
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### treinos

```javascript
{
  id: string,
  nome: string,
  imageUrl?: string,
  userId: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### programas

```javascript
{
  id: string,
  nome: string,
  imageUrl: string,
  userId: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### notifications

```javascript
{
  id: string,
  userId: string,
  title: string,
  message: string,
  read: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Boas Práticas Implementadas

### Code Quality

- Tipagem forte com TypeScript
- Interfaces para todos os modelos
- ESLint configurado com regras Angular
- Nomenclatura consistente (kebab-case para arquivos)
- Comentários JSDoc em métodos complexos

### Performance

- Lazy loading de módulos
- OnPush change detection onde aplicável
- Signals para reatividade eficiente
- Debounce em operações de busca
- Paginação preparada nos repositories

### Segurança

- Validação de formulários
- Sanitização de inputs
- Firebase Security Rules (recomendado configurar)
- Proteção de rotas sensíveis
- Isolamento de dados por usuário

### UX/UI

- Estados de loading
- Estados vazios informativos
- Feedback visual em ações
- Confirmações para ações destrutivas
- Animações suaves e não obstrusivas
- Design responsivo mobile-first

### Manutenibilidade

- Separação de responsabilidades
- Camadas bem definidas (UI, Services, Repositories)
- Reutilização de componentes
- Configurações centralizadas
- Environments para diferentes ambientes

## Diferenciais Técnicos

1. **Arquitetura Escalável**: Padrão Repository com abstract class genérica
2. **Angular Moderno**: Uso de standalone components e control flow syntax (@if, @for)
3. **Dependency Injection Avançada**: Function-based injection com `inject()`
4. **Gestão de Contexto**: `runInInjectionContext` para evitar bugs de hydration
5. **Crop de Imagem**: Implementação customizada com proporções específicas
6. **Modal Híbrido**: Único componente para criar e editar (modo dual)
7. **Filtros por Usuário**: Isolamento completo de dados multi-tenant
8. **TypeScript Strict**: Configuração strict habilitada
9. **Componentização Inteligente**: Mix estratégico de standalone e module components
10. **CSS Moderno**: Variables, nesting, media queries, animations

## Informações de Desenvolvimento

### Tempo de Desenvolvimento

Projeto desenvolvido dentro do prazo de 3 dias solicitado.

### Escopo Expandido

Além da reprodução visual solicitada, foram implementadas:

- Sistema completo de CRUD para treinos
- Modais de perfil de usuário (Meu Corpo, Objetivos)
- Sistema de notificações
- Página dedicada para gerenciamento de treinos
- Arquitetura completa com Firebase
- Filtros e isolamento de dados por usuário

### Decisões Técnicas

1. **Standalone vs Module Components**: Modais são standalone para máxima portabilidade, componentes de seção são module-based para facilitar imports em conjunto

2. **Repository Pattern**: Escolhido para facilitar futura migração de backend ou adição de cache layer

3. **Signals**: Preferido ao invés de BehaviorSubject para estados simples, melhorando performance

4. **ngx-image-cropper**: Biblioteca madura com suporte a touch, melhor que implementação manual

5. **ViewEncapsulation.None**: Necessário para estilizar componentes de bibliotecas third-party mantendo scoping

## Contato

Desenvolvido por Natan para teste técnico BE220 Digital.

---

**Nota**: Este projeto foi desenvolvido com foco em demonstração de capacidades técnicas em desenvolvimento mobile híbrido, arquitetura de software e integração com serviços cloud. Todas as funcionalidades extras foram implementadas para evidenciar domínio das tecnologias e boas práticas de desenvolvimento.

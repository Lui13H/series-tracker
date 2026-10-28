# StreamTrack - Maratona do Luis e do Samuel

Sistema de rastreamento de progresso para séries e animes com suporte a múltiplas rotas de visualização.

## Estrutura do Projeto

```
Séries/
├── index.html              # Arquivo HTML principal (refatorado)
├── README.md              # Este arquivo
│
├── assets/
│   └── css/
│       └── styles.css     # Estilos customizados globais
│
└── js/
    ├── app.js             # Arquivo principal da aplicação
    │
    ├── data/
    │   └── episodes.js    # Dados de todos os episódios
    │
    ├── state/
    │   └── progress.js    # Gerenciamento de progresso (localStorage)
    │
    ├── ui/
    │   ├── routes.js      # Configuração das rotas (Luis/Samuel)
    │   └── render.js      # Funções de renderização da UI
    │
    └── utils/
        ├── time.js        # Funções utilitárias de tempo
        └── toast.js       # Sistema de notificações
```

## Organização por Responsabilidade

### 📄 `/js/data/episodes.js`
Contém todos os dados de episódios das séries:
- `hxhExame` - Hunter x Hunter: Exame Hunter
- `hxhYorknew` - Hunter x Hunter: Yorknew
- `chainsawManEps` - Chainsaw Man
- `hxhChimera` - Hunter x Hunter: Formigas Quimera
- `deathNoteEps` - Death Note
- `breakingBadEps` - Breaking Bad
- `elCaminoEps` - El Camino
- `betterCallSaulEps` - Better Call Saul

### 💾 `/js/state/progress.js`
Gerencia o progresso do usuário:
- `loadProgress()` - Carrega dados do localStorage
- `saveProgress()` - Salva dados no localStorage
- `toggleSingleEpisode()` - Marca/desmarca episódio individual
- `toggleEpisodeUpTo()` - Marca episódios em cascata até um ponto
- `resetAllProgress()` - Reseta todo o progresso
- `isWatched()` - Verifica se episódio foi assistido

### 🎨 `/js/ui/routes.js`
Define as rotas de visualização:
- `getLuisArcs()` - Retorna arcos da rota do Luis (2 opções)
- `getSamuelArcs()` - Retorna arcos da rota do Samuel (2 opções)
- `getActiveKey()` - Identifica a chave de armazenamento ativa

### 🖼️ `/js/ui/render.js`
Funções de renderização:
- `renderApp()` - Renderiza a aplicação completa
- `renderMainTabs()` - Abas principais (Luis vs Samuel)
- `renderSubtabs()` - Abas secundárias (Rotas 1 vs 2)
- `renderDashboard()` - Dashboard com estatísticas
- `renderArcs()` - Lista de episódios e arcos

### ⚙️ `/js/utils/`
Funções utilitárias:
- `formatTime()` - Converte minutos em formato legível (h min)
- `showToast()` - Exibe notificações flutuantes

### 🚀 `/js/app.js`
Arquivo principal que:
- Gerencia o estado global da aplicação
- Coordena interações do usuário
- Orquestra renderizações

## Como Funciona

1. **Carregamento**: `app.js` chama `initApp()` ao carregar a página
2. **Inicialização**: Carrega progresso do localStorage
3. **Renderização**: Exibe a interface baseada no estado atual
4. **Interação**: Usuário clica em botões que chamam funções de `app.js`
5. **Atualização**: Estado é atualizado, progresso é salvo, UI é re-renderizada

## Rotas Disponíveis

### 🧟 Luis
- **Rota 1**: Hunter x Hunter Completo + Chainsaw Man
- **Rota 2**: Death Note + Chainsaw Man

### 🤠 Samuel
- **Rota 1**: Breaking Bad + El Camino + Better Call Saul
- **Rota 2**: Breaking Bad + El Camino

## Funcionalidades

- ✅ Rastreamento de progresso por episódio
- ✅ Múltiplas rotas de visualização
- ✅ Marcação em cascata (marca até um episódio específico)
- ✅ Persistência de dados (localStorage)
- ✅ Estatísticas em tempo real (duração, porcentagem, etc)
- ✅ Interface responsiva (mobile-friendly)
- ✅ Design dark mode

## Desenvolvimento

Para adicionar novas séries:

1. Adicione dados em `/js/data/episodes.js`
2. Crie uma nova rota em `/js/ui/routes.js`
3. Atualize os nomes e descrições em `index.html`

Para modificar comportamentos:

1. Lógica de estado → `/js/state/progress.js`
2. Renderização → `/js/ui/render.js`
3. Interações → `/js/app.js`

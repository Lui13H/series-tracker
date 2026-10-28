# Séries — Instruções para o Claude

## Contexto do projeto

Rastreador de séries modular com dados em `js/data/episodes.js`, lógica de estado em `js/state/progress.js` e UI em `js/ui/`.

## Antes de propor alterações significativas

Consulte sempre:

- `graphify-out/graph.json` — grafo completo de nós (funções, arquivos, dados) e arestas (dependências)
- `graphify-out/GRAPH_REPORT.md` — resumo de comunidades, god-nodes e conexões surpreendentes
- `graphify-out/obsidian/` — cofre Obsidian com uma nota `.md` por nó e o `graph.canvas`

Isso evita quebrar dependências não óbvias e orienta onde cada mudança deve ser feita.

## Após mudanças estruturais

Sempre que houver adição de novos arquivos, novas séries ou mudanças lógicas profundas, execute em sequência:

```bash
graphify .
graphify export obsidian
```

Isso mantém o `graph.json`, o `GRAPH_REPORT.md`, o cofre Obsidian e o `graph.html` sincronizados com o estado real do código.

## Arquitetura do projeto

O projeto segue separação estrita de responsabilidades:

- **Dados** (`js/data/`) — arrays de episódios por série, sem lógica
- **Estado** (`js/state/`) — leitura/escrita de progresso no localStorage
- **UI** (`js/ui/`) — renderização e roteamento, sem acesso direto ao storage
- **Utilitários** (`js/utils/`) — funções puras sem efeitos colaterais

Mantenha essa separação ao adicionar código. Não misture lógica de estado com renderização.

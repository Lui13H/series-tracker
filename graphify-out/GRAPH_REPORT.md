# Graph Report - Séries  (2026-10-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 44 nodes · 55 edges · 6 communities (3 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Watch Progress
- Show Episodes
- App Utilities
- UI Rendering

## God Nodes (most connected - your core abstractions)
1. `renderApp()` - 6 edges
2. `saveProgress()` - 4 edges
3. `loadProgress()` - 3 edges
4. `initApp()` - 2 edges
5. `getProgressForRoute()` - 2 edges
6. `getSavedProgress()` - 2 edges
7. `isWatched()` - 2 edges
8. `resetAllProgress()` - 2 edges
9. `toggleEpisodeUpTo()` - 2 edges
10. `toggleSingleEpisode()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `initApp()` --calls--> `loadProgress()`  [INFERRED]
  js/app.js → js/state/progress.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Core Application Flow** — js_app, js_state_progress, js_ui_render [EXTRACTED 1.00]

## Communities (6 total, 3 thin omitted)

### Community 0 - "Watch Progress"
Cohesion: 0.27
Nodes (10): initApp(), getProgressForRoute(), getSavedProgress(), isWatched(), loadProgress(), resetAllProgress(), saveProgress(), toggleEpisodeUpTo() (+2 more)

### Community 2 - "Show Episodes"
Cohesion: 0.22
Nodes (8): betterCallSaulEps, breakingBadEps, chainsawManEps, deathNoteEps, elCaminoEps, hxhChimera, hxhExame, hxhYorknew

### Community 4 - "UI Rendering"
Cohesion: 0.60
Nodes (5): renderApp(), renderArcs(), renderDashboard(), renderMainTabs(), renderSubtabs()

## Knowledge Gaps
- **1 isolated node(s):** `styles.css`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 22 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderApp()` connect `UI Rendering` to `Event Handlers`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `styles.css` to the rest of the system?**
  _1 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `initApp()` connect `Watch Progress` to `Event Handlers`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
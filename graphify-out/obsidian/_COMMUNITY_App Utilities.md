---
type: community
cohesion: 0.25
members: 8
---

# App Utilities

**Cohesion:** 0.25 - loosely connected
**Members:** 8 nodes

## Members
- [[formatTime()]] - code - js/utils/time.js
- [[getActiveKey()]] - code - js/ui/routes.js
- [[getLuisArcs()]] - code - js/ui/routes.js
- [[getSamuelArcs()]] - code - js/ui/routes.js
- [[index.html]] - code - index.html
- [[routes.js]] - code - js/ui/routes.js
- [[styles.css]] - code - README.md
- [[time.js]] - code - js/utils/time.js

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/App_Utilities
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_Event Handlers]]
- 2 edges to [[_COMMUNITY_UI Rendering]]
- 1 edge to [[_COMMUNITY_Watch Progress]]
- 1 edge to [[_COMMUNITY_Show Episodes]]

## Top bridge nodes
- [[index.html]] - degree 8, connects to 4 communities
- [[time.js]] - degree 3, connects to 1 community
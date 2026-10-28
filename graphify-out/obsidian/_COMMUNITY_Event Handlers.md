---
type: community
cohesion: 0.22
members: 9
---

# Event Handlers

**Cohesion:** 0.22 - loosely connected
**Members:** 9 nodes

## Members
- [[app.js]] - code - js/app.js
- [[handleResetAllProgress()]] - code - js/app.js
- [[handleToggleEpisodeUpTo()]] - code - js/app.js
- [[handleToggleSingleEpisode()]] - code - js/app.js
- [[showToast()]] - code - js/utils/toast.js
- [[switchLuisRoute()]] - code - js/app.js
- [[switchSamuelRoute()]] - code - js/app.js
- [[switchTab()]] - code - js/app.js
- [[toast.js]] - code - js/utils/toast.js

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Event_Handlers
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_App Utilities]]
- 1 edge to [[_COMMUNITY_Watch Progress]]
- 1 edge to [[_COMMUNITY_UI Rendering]]

## Top bridge nodes
- [[app.js]] - degree 10, connects to 3 communities
- [[toast.js]] - degree 3, connects to 1 community
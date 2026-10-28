---
type: community
cohesion: 0.27
members: 11
---

# Watch Progress

**Cohesion:** 0.27 - loosely connected
**Members:** 11 nodes

## Members
- [[getProgressForRoute()]] - code - js/state/progress.js
- [[getSavedProgress()]] - code - js/state/progress.js
- [[initApp()]] - code - js/app.js
- [[isWatched()]] - code - js/state/progress.js
- [[loadProgress()]] - code - js/state/progress.js
- [[progress.js]] - code - js/state/progress.js
- [[resetAllProgress()]] - code - js/state/progress.js
- [[saveProgress()]] - code - js/state/progress.js
- [[toggleEpisodeUpTo()]] - code - js/state/progress.js
- [[toggleSingleEpisode()]] - code - js/state/progress.js
- [[userProgress]] - code - js/state/progress.js

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Watch_Progress
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_Event Handlers]]
- 1 edge to [[_COMMUNITY_App Utilities]]

## Top bridge nodes
- [[progress.js]] - degree 10, connects to 1 community
- [[initApp()]] - degree 2, connects to 1 community
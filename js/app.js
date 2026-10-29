let currentTab = 'luis';
let luisRoute = 'rota1';
let samuelRoute = 'rota1';

function initApp() {
    loadProgress();
    renderApp(currentTab, luisRoute, samuelRoute);
}

function switchTab(tab) {
    currentTab = tab;
    renderApp(currentTab, luisRoute, samuelRoute);
}

function switchLuisRoute(route) {
    luisRoute = route;
    renderApp(currentTab, luisRoute, samuelRoute);
}

function switchSamuelRoute(route) {
    samuelRoute = route;
    renderApp(currentTab, luisRoute, samuelRoute);
}

// Saves and restores the scroll position of the open arc's episode list
// so that marking an episode doesn't jump the list back to the top
function saveEpScrollState() {
    const panel = document.querySelector('.arc-eps-panel:not(.hidden)');
    if (!panel) return null;
    const scrollEl = panel.querySelector('.ep-scroll-container');
    return { panelId: panel.id, scrollTop: scrollEl ? scrollEl.scrollTop : 0 };
}

function restoreEpScrollState(state) {
    if (!state) return;
    const panel = document.getElementById(state.panelId);
    if (!panel) return;
    const scrollEl = panel.querySelector('.ep-scroll-container');
    if (scrollEl) scrollEl.scrollTop = state.scrollTop;
}

// Returns the sibling routes that share the same person (Luis or Samuel)
function getSiblingRoutes(routeKey) {
    if (routeKey === 'luis_rota1' || routeKey === 'luis_rota2') {
        return ['luis_rota1', 'luis_rota2'];
    }
    return ['samuel_rota1', 'samuel_rota2'];
}

// Checks if a globalIdx actually exists as an episode in a given route
// (prevents syncing indices that coincidentally overlap but are different content)
function globalIdxExistsInRoute(globalIdx, routeKey) {
    const parts = routeKey.split('_');
    const arcs = parts[0] === 'luis' ? getLuisArcs(parts[1]) : getSamuelArcs(parts[1]);
    return arcs.some(arc => arc.episodes.some(ep => ep.globalIdx === globalIdx));
}

// After toggling episodes in sourceRouteKey, mirror the same watched state
// to sibling routes — but only for indices that actually exist in both routes
function syncToSiblings(affectedIndices, sourceRouteKey) {
    const siblings = getSiblingRoutes(sourceRouteKey).filter(r => r !== sourceRouteKey);
    affectedIndices.forEach(globalIdx => {
        const nowWatched = isWatched(globalIdx, sourceRouteKey);
        siblings.forEach(sibKey => {
            if (globalIdxExistsInRoute(globalIdx, sibKey) && isWatched(globalIdx, sibKey) !== nowWatched) {
                toggleSingleEpisode(globalIdx, sibKey);
            }
        });
    });
}

function handleToggleSingleEpisode(globalIdx) {
    const activeKey = getActiveKey(currentTab, luisRoute, samuelRoute);
    const scrollState = saveEpScrollState();
    toggleSingleEpisode(globalIdx, activeKey);
    syncToSiblings([globalIdx], activeKey);
    renderApp(currentTab, luisRoute, samuelRoute);
    restoreEpScrollState(scrollState);
}

function handleToggleEpisodeUpTo(globalIdx) {
    const activeKey = getActiveKey(currentTab, luisRoute, samuelRoute);
    const scrollState = saveEpScrollState();
    const arcs = currentTab === 'luis' ? getLuisArcs(luisRoute) : getSamuelArcs(samuelRoute);

    let allRouteIndices = [];
    arcs.forEach(arc => {
        arc.episodes.forEach(ep => {
            allRouteIndices.push(ep.globalIdx);
        });
    });

    toggleEpisodeUpTo(globalIdx, activeKey, allRouteIndices);

    const targetIdx = allRouteIndices.indexOf(globalIdx);
    if (targetIdx >= 0) {
        syncToSiblings(allRouteIndices.slice(0, targetIdx + 1), activeKey);
    }

    const alreadyWatched = getProgressForRoute(activeKey).includes(globalIdx);
    if (alreadyWatched) {
        showToast(`Progresso desmarcado a partir do item`);
    } else {
        showToast(`Itens marcados como assistidos em cascata!`);
    }

    renderApp(currentTab, luisRoute, samuelRoute);
    restoreEpScrollState(scrollState);
}

function handleResetAllProgress() {
    if (confirm("Deseja resetar todo o progresso de todas as rotas?")) {
        resetAllProgress();
        renderApp(currentTab, luisRoute, samuelRoute);
        showToast("Progresso resetado com sucesso.");
    }
}

window.addEventListener('load', function() {
    initApp();
});

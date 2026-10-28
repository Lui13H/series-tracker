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

function handleToggleSingleEpisode(globalIdx) {
    const activeKey = getActiveKey(currentTab, luisRoute, samuelRoute);
    toggleSingleEpisode(globalIdx, activeKey);
    renderApp(currentTab, luisRoute, samuelRoute);
}

function handleToggleEpisodeUpTo(globalIdx) {
    const activeKey = getActiveKey(currentTab, luisRoute, samuelRoute);
    const arcs = currentTab === 'luis' ? getLuisArcs(luisRoute) : getSamuelArcs(samuelRoute);

    let allRouteIndices = [];
    arcs.forEach(arc => {
        arc.episodes.forEach(ep => {
            allRouteIndices.push(ep.globalIdx);
        });
    });

    toggleEpisodeUpTo(globalIdx, activeKey, allRouteIndices);

    const alreadyWatched = getProgressForRoute(activeKey).includes(globalIdx);
    if (alreadyWatched) {
        showToast(`Progresso desmarcado a partir do item`);
    } else {
        showToast(`Itens marcados como assistidos em cascata!`);
    }

    renderApp(currentTab, luisRoute, samuelRoute);
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

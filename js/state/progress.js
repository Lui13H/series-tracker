let userProgress = {};

function getSavedProgress() {
    try {
        const data = localStorage.getItem('streamtrack_routes_v3');
        return data ? JSON.parse(data) : {
            'luis_rota1': [],
            'luis_rota2': [],
            'samuel_rota1': [],
            'samuel_rota2': []
        };
    } catch (e) {
        return { 'luis_rota1': [], 'luis_rota2': [], 'samuel_rota1': [], 'samuel_rota2': [] };
    }
}

function loadProgress() {
    userProgress = getSavedProgress();
}

function saveProgress() {
    try {
        localStorage.setItem('streamtrack_routes_v3', JSON.stringify(userProgress));
    } catch (e) {
        console.error('Erro ao salvar no localStorage', e);
    }
}

function getProgressForRoute(routeKey) {
    return userProgress[routeKey] || [];
}

function isWatched(globalIdx, routeKey) {
    return getProgressForRoute(routeKey).includes(globalIdx);
}

function toggleSingleEpisode(globalIdx, routeKey) {
    if (!userProgress[routeKey]) userProgress[routeKey] = [];
    const index = userProgress[routeKey].indexOf(globalIdx);

    if (index > -1) {
        userProgress[routeKey].splice(index, 1);
    } else {
        userProgress[routeKey].push(globalIdx);
        userProgress[routeKey].sort((a, b) => a - b);
    }

    saveProgress();
}

function toggleEpisodeUpTo(globalIdx, routeKey, allRouteIndices) {
    if (!userProgress[routeKey]) userProgress[routeKey] = [];

    const currentList = userProgress[routeKey];
    const alreadyWatched = currentList.includes(globalIdx) && currentList.length >= globalIdx + 1;

    if (alreadyWatched) {
        userProgress[routeKey] = currentList.filter(n => n < globalIdx);
    } else {
        const targetIdx = allRouteIndices.indexOf(globalIdx);
        const newList = [];
        for (let i = 0; i <= targetIdx; i++) {
            newList.push(allRouteIndices[i]);
        }
        userProgress[routeKey] = newList;
    }

    saveProgress();
}

function resetAllProgress() {
    userProgress = { 'luis_rota1': [], 'luis_rota2': [], 'samuel_rota1': [], 'samuel_rota2': [] };
    saveProgress();
}

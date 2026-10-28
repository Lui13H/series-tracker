function renderApp(currentTab, luisRoute, samuelRoute) {
    renderMainTabs(currentTab);
    renderSubtabs(currentTab, luisRoute, samuelRoute);
    renderDashboard(currentTab, luisRoute, samuelRoute);
    renderArcs(currentTab, luisRoute, samuelRoute);
}

function renderMainTabs(currentTab) {
    const mainTabsEl = document.getElementById('main-tabs');
    mainTabsEl.innerHTML = `
        <button onclick="switchTab('luis')" class="p-4 rounded-2xl border transition-all text-left flex items-center space-x-4 ${currentTab === 'luis' ? 'bg-slate-800/90 border-indigo-500 shadow-lg shadow-indigo-500/10' : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'}">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white text-lg shadow-md shrink-0">
                <i class="fa-solid fa-user-astronaut"></i>
            </div>
            <div>
                <h3 class="font-bold text-white text-base">Rota do Luis</h3>
                <p class="text-xs text-slate-400">Hunter x Hunter, Death Note & Chainsaw Man</p>
            </div>
        </button>
        <button onclick="switchTab('samuel')" class="p-4 rounded-2xl border transition-all text-left flex items-center space-x-4 ${currentTab === 'samuel' ? 'bg-slate-800/90 border-amber-500 shadow-lg shadow-amber-500/10' : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50'}">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-emerald-700 flex items-center justify-center text-white text-lg shadow-md shrink-0">
                <i class="fa-solid fa-hat-cowboy"></i>
            </div>
            <div>
                <h3 class="font-bold text-white text-base">Rota do Samuel</h3>
                <p class="text-xs text-slate-400">Breaking Bad, El Camino & Better Call Saul</p>
            </div>
        </button>
    `;
}

function renderSubtabs(currentTab, luisRoute, samuelRoute) {
    const luisSubtabs = document.getElementById('luis-subtabs-container');
    const samuelSubtabs = document.getElementById('samuel-subtabs-container');

    if (currentTab === 'luis') {
        luisSubtabs.classList.remove('hidden');
        samuelSubtabs.classList.add('hidden');
        document.getElementById('btn-rota1').className = `flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition border ${luisRoute === 'rota1' ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`;
        document.getElementById('btn-rota2').className = `flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition border ${luisRoute === 'rota2' ? 'bg-indigo-600 border-indigo-500 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`;
    } else {
        luisSubtabs.classList.add('hidden');
        samuelSubtabs.classList.remove('hidden');
        document.getElementById('btn-samuel-rota1').className = `flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition border ${samuelRoute === 'rota1' ? 'bg-amber-600 border-amber-500 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`;
        document.getElementById('btn-samuel-rota2').className = `flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition border ${samuelRoute === 'rota2' ? 'bg-amber-600 border-amber-500 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`;
    }
}

function renderDashboard(currentTab, luisRoute, samuelRoute) {
    const arcs = currentTab === 'luis' ? getLuisArcs(luisRoute) : getSamuelArcs(samuelRoute);
    const activeKey = getActiveKey(currentTab, luisRoute, samuelRoute);

    const seriesName = currentTab === 'luis'
        ? (luisRoute === 'rota1' ? 'Rota do Luis — Rota 1 (HxH Completo + CSM)' : 'Rota do Luis — Rota 2 (Death Note + CSM)')
        : (samuelRoute === 'rota1' ? 'Rota do Samuel — Rota 1 (BB + El Camino + BCS)' : 'Rota do Samuel — Rota 2 (Breaking Bad + El Camino)');
    const seriesDesc = currentTab === 'luis'
        ? 'Acompanhe as ramificações de animes episódio por episódio.'
        : 'Trilogia e expansões do universo Breaking Bad.';

    document.getElementById('current-title').textContent = seriesName;
    document.getElementById('current-desc').textContent = seriesDesc;

    // Calculate stats
    let totalEpisodesCount = 0;
    let totalDurationMinutes = 0;
    arcs.forEach(arc => {
        arc.episodes.forEach(ep => {
            totalEpisodesCount++;
            totalDurationMinutes += ep.duration;
        });
    });

    const watchedList = getProgressForRoute(activeKey);
    let watchedDurationMinutes = 0;
    arcs.forEach(arc => {
        arc.episodes.forEach(ep => {
            if (watchedList.includes(ep.globalIdx)) {
                watchedDurationMinutes += ep.duration;
            }
        });
    });

    const remainingDurationMinutes = Math.max(0, totalDurationMinutes - watchedDurationMinutes);
    const percent = totalEpisodesCount > 0 ? Math.round((watchedList.filter(idx => {
        let exists = false;
        arcs.forEach(a => a.episodes.forEach(e => { if (e.globalIdx === idx) exists = true; }));
        return exists;
    }).length / totalEpisodesCount) * 100) : 0;

    document.getElementById('stat-percent').textContent = `${percent}%`;
    document.getElementById('stat-watched').textContent = formatTime(watchedDurationMinutes);
    document.getElementById('stat-remaining').textContent = formatTime(remainingDurationMinutes);
    document.getElementById('stat-total').textContent = formatTime(totalDurationMinutes);
    document.getElementById('progress-bar-fill').style.width = `${percent}%`;
}

function renderArcs(currentTab, luisRoute, samuelRoute) {
    const arcs = currentTab === 'luis' ? getLuisArcs(luisRoute) : getSamuelArcs(samuelRoute);
    const activeKey = getActiveKey(currentTab, luisRoute, samuelRoute);
    const watchedList = getProgressForRoute(activeKey);

    const arcsContainer = document.getElementById('arcs-container');
    arcsContainer.innerHTML = arcs.map(arc => {
        let arcTotalDuration = arc.episodes.reduce((acc, ep) => acc + ep.duration, 0);
        let arcWatchedCount = arc.episodes.filter(ep => watchedList.includes(ep.globalIdx)).length;
        let arcWatchedDuration = arc.episodes.filter(ep => watchedList.includes(ep.globalIdx)).reduce((acc, ep) => acc + ep.duration, 0);
        let arcRemainingDuration = arcTotalDuration - arcWatchedDuration;
        let arcPercent = arc.episodes.length > 0 ? Math.round((arcWatchedCount / arc.episodes.length) * 100) : 0;

        return `
            <div class="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <!-- Arc Header -->
                <div class="p-6 bg-slate-800/40 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-3">
                            <h3 class="text-xl font-bold text-white">${arc.name}</h3>
                            <span class="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">Itens ${arc.epStart}–${arc.epEnd}</span>
                        </div>
                        <p class="text-xs text-slate-400 mt-1">Duração: <span class="text-indigo-400 font-semibold">${formatTime(arcTotalDuration)}</span> (${arc.episodes.length} itens)</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="text-right">
                            <span class="text-xs text-slate-400 block">Faltam <strong class="text-amber-400">${formatTime(arcRemainingDuration)}</strong></span>
                            <span class="text-xs text-slate-500">${arcWatchedCount}/${arc.episodes.length} vistos (${arcPercent}%)</span>
                        </div>
                        <div class="w-16 h-16 relative flex items-center justify-center">
                            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path class="text-slate-800" stroke-width="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path class="text-indigo-500" stroke-dasharray="${arcPercent}, 100" stroke-width="3" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <span class="absolute text-xs font-bold text-white">${arcPercent}%</span>
                        </div>
                    </div>
                </div>

                <!-- Episodes List -->
                <div class="divide-y divide-slate-800/60 max-h-[500px] overflow-y-auto">
                    ${arc.episodes.map(ep => {
                        const watched = isWatched(ep.globalIdx, activeKey);
                        return `
                            <div class="p-4 sm:px-6 flex items-center justify-between transition-colors ${watched ? 'bg-indigo-950/20 hover:bg-indigo-950/30' : 'hover:bg-slate-800/30'}">
                                <div class="flex items-center space-x-4 min-w-0">
                                    <button onclick="handleToggleSingleEpisode(${ep.globalIdx})"
                                        class="w-7 h-7 rounded-lg border flex items-center justify-center transition-all shrink-0 ${watched ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30' : 'border-slate-700 bg-slate-800 hover:border-indigo-400 text-transparent'}">
                                        <i class="fa-solid fa-check text-xs ${watched ? 'opacity-100' : 'opacity-0'}"></i>
                                    </button>
                                    <div class="min-w-0">
                                        <div class="flex items-center gap-2">
                                            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">#${ep.num}</span>
                                            <h4 class="text-sm font-medium ${watched ? 'text-slate-300 line-through decoration-slate-600' : 'text-white'} truncate">${ep.title}</h4>
                                        </div>
                                        <span class="text-xs text-slate-500 mt-0.5 block"><i class="fa-regular fa-clock mr-1"></i>${ep.duration} min</span>
                                    </div>
                                </div>
                                <button onclick="handleToggleEpisodeUpTo(${ep.globalIdx})"
                                    class="text-xs px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 hover:bg-slate-700 hover:border-indigo-500 text-slate-300 transition flex items-center gap-1.5 shrink-0">
                                    <i class="fa-solid fa-flag text-indigo-400"></i>
                                    <span class="hidden sm:inline">Já vi até aqui</span>
                                    <span class="sm:hidden">Até aqui</span>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderApp(currentTab, luisRoute, samuelRoute) {
    renderMainTabs(currentTab);
    renderSubtabs(currentTab, luisRoute, samuelRoute);
    renderDashboard(currentTab, luisRoute, samuelRoute);
    renderArcs(currentTab, luisRoute, samuelRoute);
}

function renderMainTabs(currentTab) {
    const mainTabsEl = document.getElementById('main-tabs');
    mainTabsEl.innerHTML = `
        <button onclick="switchTab('luis')" class="tab-card p-4 rounded-xl border text-left flex items-center space-x-4 ${currentTab === 'luis' ? 'bg-slate-800/80 border-indigo-500/60 shadow-lg shadow-indigo-500/10' : 'bg-[#0c1225]/70 border-white/[0.07] hover:bg-slate-800/40 hover:border-white/[0.12]'}">
            <div class="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-900/50 shrink-0">
                <i class="fa-solid fa-user-astronaut text-base"></i>
            </div>
            <div>
                <h3 class="font-semibold text-white text-sm tracking-tight">Rota do Luis</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Hunter x Hunter, Death Note & Chainsaw Man</p>
            </div>
        </button>
        <button onclick="switchTab('samuel')" class="tab-card p-4 rounded-xl border text-left flex items-center space-x-4 ${currentTab === 'samuel' ? 'bg-slate-800/80 border-amber-500/60 shadow-lg shadow-amber-500/10' : 'bg-[#0c1225]/70 border-white/[0.07] hover:bg-slate-800/40 hover:border-white/[0.12]'}">
            <div class="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-amber-900/50 shrink-0">
                <i class="fa-solid fa-hat-cowboy text-base"></i>
            </div>
            <div>
                <h3 class="font-semibold text-white text-sm tracking-tight">Rota do Samuel</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Breaking Bad, El Camino & Better Call Saul</p>
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
        document.getElementById('btn-rota1').className = `route-btn flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition border ${luisRoute === 'rota1' ? 'bg-indigo-600/90 border-indigo-500/80 text-white' : 'bg-slate-900/60 border-white/[0.08] text-slate-400 hover:text-slate-200'}`;
        document.getElementById('btn-rota2').className = `route-btn flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition border ${luisRoute === 'rota2' ? 'bg-indigo-600/90 border-indigo-500/80 text-white' : 'bg-slate-900/60 border-white/[0.08] text-slate-400 hover:text-slate-200'}`;
    } else {
        luisSubtabs.classList.add('hidden');
        samuelSubtabs.classList.remove('hidden');
        document.getElementById('btn-samuel-rota1').className = `route-btn flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition border ${samuelRoute === 'rota1' ? 'bg-amber-600/90 border-amber-500/80 text-white' : 'bg-slate-900/60 border-white/[0.08] text-slate-400 hover:text-slate-200'}`;
        document.getElementById('btn-samuel-rota2').className = `route-btn flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition border ${samuelRoute === 'rota2' ? 'bg-amber-600/90 border-amber-500/80 text-white' : 'bg-slate-900/60 border-white/[0.08] text-slate-400 hover:text-slate-200'}`;
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
            <div class="arc-card bg-[#0c1225]/90 border border-white/[0.07] rounded-xl overflow-hidden shadow-2xl">
                <!-- Arc Header -->
                <div class="px-5 py-4 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="min-w-0">
                        <div class="flex items-center gap-2.5 flex-wrap">
                            <h3 class="text-base font-semibold text-white tracking-tight">${arc.name}</h3>
                            <span class="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.07] text-slate-500 font-medium uppercase tracking-widest">#${arc.epStart}–${arc.epEnd}</span>
                        </div>
                        <div class="flex items-center gap-3 mt-1.5">
                            <span class="text-[11px] text-slate-500">${arc.episodes.length} itens · <span class="text-slate-400">${formatTime(arcTotalDuration)}</span></span>
                            <span class="text-[11px] text-slate-600">·</span>
                            <span class="text-[11px] text-slate-500">Faltam <span class="text-amber-400/90 font-medium">${formatTime(arcRemainingDuration)}</span></span>
                        </div>
                        <div class="arc-progress-track w-40 mt-2.5">
                            <div class="arc-progress-fill" style="width:${arcPercent}%"></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 shrink-0">
                        <div class="text-right">
                            <span class="stat-num text-xl font-bold text-white">${arcPercent}<span class="text-sm text-slate-500">%</span></span>
                            <span class="text-[10px] text-slate-600 block">${arcWatchedCount}/${arc.episodes.length} vistos</span>
                        </div>
                        <div class="w-12 h-12 relative flex items-center justify-center">
                            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path stroke-width="3" stroke="rgba(255,255,255,0.06)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path stroke-dasharray="${arcPercent}, 100" stroke-width="3" stroke-linecap="butt" stroke="#6366f1" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Episodes List -->
                <div class="max-h-[520px] overflow-y-auto">
                    ${arc.episodes.map(ep => {
                        const watched = isWatched(ep.globalIdx, activeKey);
                        return `
                            <div class="ep-row px-5 py-3 flex items-center gap-3 ${watched ? 'bg-indigo-950/15' : ''}">
                                <button onclick="handleToggleSingleEpisode(${ep.globalIdx})"
                                    class="ep-checkbox ${watched ? 'ep-checked' : ''} w-6 h-6 rounded-md border flex items-center justify-center ${watched ? 'bg-indigo-600 border-indigo-500/80 text-white' : 'border-white/[0.12] bg-white/[0.03] text-transparent'}">
                                    <i class="fa-solid fa-check text-[10px]"></i>
                                </button>
                                <span class="stat-num text-[11px] text-slate-600 w-6 text-right shrink-0 select-none">${ep.num}</span>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-[13px] font-medium ${watched ? 'text-slate-500 opacity-60' : 'text-slate-100'} truncate leading-tight">${ep.title}</h4>
                                </div>
                                <span class="stat-num text-[11px] text-slate-600 shrink-0 w-12 text-right">${ep.duration}<span class="text-slate-700 text-[10px]">min</span></span>
                                <button onclick="handleToggleEpisodeUpTo(${ep.globalIdx})"
                                    class="btn-mark text-[11px] px-2.5 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-slate-500 flex items-center gap-1.5 shrink-0">
                                    <i class="fa-solid fa-flag text-indigo-500/70 text-[10px]"></i>
                                    <span class="hidden sm:inline">Até aqui</span>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

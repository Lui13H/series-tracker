function renderApp(currentTab, luisRoute, samuelRoute) {
    renderMainTabs(currentTab);
    renderSubtabs(currentTab, luisRoute, samuelRoute);
    renderDashboard(currentTab, luisRoute, samuelRoute);
    renderArcs(currentTab, luisRoute, samuelRoute);
}

function renderMainTabs(currentTab) {
    const mainTabsEl = document.getElementById('main-tabs');
    mainTabsEl.innerHTML = `
        <button onclick="switchTab('luis')" class="profile-card p-4 rounded-xl border text-left flex items-center gap-4 ${currentTab === 'luis' ? 'profile-active-indigo' : 'bg-white/[0.02] border-white/[0.07]'}">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
                <i class="fa-solid fa-user-astronaut" style="font-size:17px"></i>
            </div>
            <div>
                <h3 class="font-semibold text-white text-sm" style="letter-spacing:-0.01em">Rota do Luis</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Hunter x Hunter, Death Note & Chainsaw Man</p>
                ${currentTab === 'luis' ? '<span class="inline-block mt-1.5 text-[9px] text-indigo-400 uppercase tracking-widest font-semibold">● Ativo</span>' : ''}
            </div>
        </button>
        <button onclick="switchTab('samuel')" class="profile-card p-4 rounded-xl border text-left flex items-center gap-4 ${currentTab === 'samuel' ? 'profile-active-amber' : 'bg-white/[0.02] border-white/[0.07]'}">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-amber-700/30 shrink-0">
                <i class="fa-solid fa-hat-cowboy" style="font-size:17px"></i>
            </div>
            <div>
                <h3 class="font-semibold text-white text-sm" style="letter-spacing:-0.01em">Rota do Samuel</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Breaking Bad, El Camino & Better Call Saul</p>
                ${currentTab === 'samuel' ? '<span class="inline-block mt-1.5 text-[9px] text-amber-400 uppercase tracking-widest font-semibold">● Ativo</span>' : ''}
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
        document.getElementById('btn-rota1').className = `pill-btn flex-1 sm:flex-none border ${luisRoute === 'rota1' ? 'pill-active-indigo' : 'pill-inactive'}`;
        document.getElementById('btn-rota2').className = `pill-btn flex-1 sm:flex-none border ${luisRoute === 'rota2' ? 'pill-active-indigo' : 'pill-inactive'}`;
    } else {
        luisSubtabs.classList.add('hidden');
        samuelSubtabs.classList.remove('hidden');
        document.getElementById('btn-samuel-rota1').className = `pill-btn flex-1 sm:flex-none border ${samuelRoute === 'rota1' ? 'pill-active-amber' : 'pill-inactive'}`;
        document.getElementById('btn-samuel-rota2').className = `pill-btn flex-1 sm:flex-none border ${samuelRoute === 'rota2' ? 'pill-active-amber' : 'pill-inactive'}`;
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
            <div class="arc-card shadow-2xl">
                <!-- Arc Header -->
                <div class="px-5 py-5 border-b border-white/[0.05] flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div class="min-w-0">
                        <div class="flex items-center gap-2.5 flex-wrap">
                            <h3 class="text-base font-semibold text-white" style="letter-spacing:-0.01em">${arc.name}</h3>
                            <span class="text-[9px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.07] text-slate-600 font-semibold uppercase tracking-widest">#${arc.epStart}–${arc.epEnd}</span>
                        </div>
                        <div class="flex items-center gap-3 mt-1.5">
                            <span class="text-[11px] text-slate-600">${arc.episodes.length} ep · ${formatTime(arcTotalDuration)}</span>
                            <span class="text-[10px] text-slate-700">·</span>
                            <span class="text-[11px] text-slate-600">Faltam <span class="text-amber-400/80 font-medium">${formatTime(arcRemainingDuration)}</span></span>
                        </div>
                        <div class="arc-progress-track w-36 mt-3">
                            <div class="arc-progress-fill" style="width:${arcPercent}%"></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 shrink-0">
                        <div class="text-right">
                            <span class="stat-num text-2xl font-bold text-white">${arcPercent}<span class="text-base text-slate-600">%</span></span>
                            <span class="text-[9px] text-slate-600 block mt-0.5">${arcWatchedCount}/${arc.episodes.length} vistos</span>
                        </div>
                        <div class="w-11 h-11 flex items-center justify-center">
                            <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <path stroke-width="2.5" stroke="rgba(255,255,255,0.05)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                <path stroke-dasharray="${arcPercent}, 100" stroke-width="2.5" stroke-linecap="butt" stroke="url(#arcGrad${arc.epStart})" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                <defs>
                                    <linearGradient id="arcGrad${arc.epStart}" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stop-color="#6366f1"/>
                                        <stop offset="100%" stop-color="#a78bfa"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Episodes List -->
                <div class="max-h-[540px] overflow-y-auto">
                    ${arc.episodes.map(ep => {
                        const watched = isWatched(ep.globalIdx, activeKey);
                        return `
                            <div class="ep-row px-5 py-3.5 flex items-center gap-3 ${watched ? 'bg-indigo-950/10' : ''}">
                                <button onclick="handleToggleSingleEpisode(${ep.globalIdx})"
                                    class="ep-checkbox ${watched ? 'ep-checked' : ''} w-6 h-6 rounded-md border flex items-center justify-center ${watched ? 'bg-indigo-600 border-indigo-500/80 text-white' : 'border-white/[0.11] bg-white/[0.02] text-transparent'}">
                                    <i class="fa-solid fa-check text-[10px]"></i>
                                </button>
                                <span class="stat-num text-[10px] text-slate-700 w-5 text-right shrink-0 select-none">${ep.num}</span>
                                <div class="flex-1 min-w-0">
                                    <h4 class="ep-title-text text-[13px] font-medium leading-tight truncate ${watched ? 'text-slate-600' : 'text-slate-200'}">${ep.title}</h4>
                                </div>
                                <span class="stat-num text-[11px] text-slate-700 shrink-0 w-11 text-right">${ep.duration}<span class="text-[9px]">m</span></span>
                                <button onclick="handleToggleEpisodeUpTo(${ep.globalIdx})"
                                    class="btn-mark text-[10px] px-2.5 py-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] text-slate-600 flex items-center gap-1.5 shrink-0">
                                    <i class="fa-solid fa-flag text-indigo-500/60 text-[9px]"></i>
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

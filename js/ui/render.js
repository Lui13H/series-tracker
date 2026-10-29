const POSTER_GRADIENTS = [
    'linear-gradient(155deg, #050d1c 0%, #0f2448 40%, #1a3a6e 70%, #0d1e40 100%)',
    'linear-gradient(155deg, #0a0514 0%, #2d1660 40%, #4a2d8a 70%, #1a0d3d 100%)',
    'linear-gradient(155deg, #1a0500 0%, #7a1500 40%, #c0350c 70%, #3d0d00 100%)',
    'linear-gradient(155deg, #0c0e00 0%, #2a3a00 40%, #4a6600 70%, #1a2200 100%)',
    'linear-gradient(155deg, #080808 0%, #1a0a28 40%, #2d1550 70%, #100820 100%)',
    'linear-gradient(155deg, #001a0c 0%, #004d22 40%, #00843b 70%, #002514 100%)',
    'linear-gradient(155deg, #1a1000 0%, #5a3800 40%, #8a6020 70%, #2e1e00 100%)',
    'linear-gradient(155deg, #1a0800 0%, #6b2c00 40%, #c04a00 70%, #3d1500 100%)',
];

const POSTER_IMAGES = {
    'Hunter':           'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
    'Death Note':       'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
    'Chainsaw':         'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
    'Breaking Bad':     'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjEtYzZmZi00ZDk1LWFjODctMjdlY2UzMWJmZmZkXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg',
    'El Camino':        'https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUxN2YyODM4N2JkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    'Better Call Saul': 'https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMjRmNS00MjVjLTlhMWUtMjlkMzA4MjBiODU0XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_FMjpg_UX1000_.jpg',
};

function getPosterImage(arcName) {
    for (const [key, url] of Object.entries(POSTER_IMAGES)) {
        if (arcName.includes(key)) return url;
    }
    return null;
}

// Season tab state — persists across re-renders, reset on route/tab switch
let activeSeasonPerArc = {};
let _lastArcs = [];
let _lastActiveKey = '';

function resetActiveSeasons() {
    activeSeasonPerArc = {};
}

// Updates only the episode list + tab highlights of the clicked arc panel
// without triggering a full renderApp (avoids panel close/reopen)
function switchSeason(arcIdx, seasonLabel) {
    activeSeasonPerArc[arcIdx] = seasonLabel;
    const panel = document.getElementById('arc-eps-' + arcIdx);
    if (!panel) return;
    const arc = _lastArcs[arcIdx];
    if (!arc) return;
    const groups = groupEpisodes(arc.episodes);
    const activeGroup = groups.find(g => g.label === seasonLabel) || groups[0];
    panel.querySelectorAll('.season-tab').forEach(btn => {
        btn.classList.toggle('season-tab-active', btn.textContent.trim() === seasonLabel);
    });
    const scrollContainer = panel.querySelector('.ep-scroll-container');
    if (scrollContainer) {
        scrollContainer.innerHTML = renderEpisodeRows(activeGroup.episodes, _lastActiveKey);
        scrollContainer.scrollTop = 0;
    }
}

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

function groupEpisodes(episodes) {
    const hasSeasonsInTitle = episodes.some(ep => /^S\d+ E/.test(ep.title));
    if (hasSeasonsInTitle) {
        const map = {};
        episodes.forEach(ep => {
            const m = ep.title.match(/^S(\d+)\s/);
            const s = m ? +m[1] : 0;
            if (!map[s]) map[s] = { label: 'Temporada ' + s, episodes: [] };
            map[s].episodes.push(ep);
        });
        return Object.keys(map).sort((a, b) => a - b).map(k => map[k]);
    }
    if (episodes.length > 35) {
        const size = 20, groups = [];
        for (let i = 0; i < episodes.length; i += size) {
            const chunk = episodes.slice(i, i + size);
            groups.push({ label: `Eps. ${chunk[0].num}–${chunk[chunk.length - 1].num}`, episodes: chunk });
        }
        return groups;
    }
    return [{ label: null, episodes }];
}

function renderEpisodeRows(episodes, activeKey) {
    return episodes.map(ep => {
        const watched = isWatched(ep.globalIdx, activeKey);
        return `
            <div class="ep-row px-5 py-3.5 flex items-center gap-3${watched ? ' bg-indigo-950/10' : ''}">
                <button onclick="handleToggleSingleEpisode(${ep.globalIdx})" class="ep-checkbox${watched ? ' ep-checked' : ''} w-6 h-6 rounded-md border flex items-center justify-center${watched ? ' bg-indigo-600 border-indigo-500/80 text-white' : ' border-white/[0.11] bg-white/[0.02] text-transparent'}">
                    <i class="fa-solid fa-check" style="font-size:10px"></i>
                </button>
                <span class="stat-num text-slate-700 w-5 text-right shrink-0 select-none" style="font-size:10px">${ep.num}</span>
                <div class="flex-1 min-w-0">
                    <h4 class="ep-title-text font-medium leading-tight truncate${watched ? ' text-slate-600' : ' text-slate-200'}" style="font-size:13px">${ep.title}</h4>
                </div>
                <span class="stat-num text-slate-700 shrink-0 w-11 text-right" style="font-size:11px">${ep.duration}<span style="font-size:9px">m</span></span>
                <button onclick="handleToggleEpisodeUpTo(${ep.globalIdx})" class="btn-mark text-slate-600 flex items-center gap-1.5 shrink-0 rounded-lg border border-white/[0.07] bg-white/[0.02]" style="font-size:10px;padding:6px 10px">
                    <i class="fa-solid fa-flag text-indigo-500/60" style="font-size:9px"></i>
                    <span class="hidden sm:inline">Até aqui</span>
                </button>
            </div>`;
    }).join('');
}

function renderArcs(currentTab, luisRoute, samuelRoute) {
    const arcs = currentTab === 'luis' ? getLuisArcs(luisRoute) : getSamuelArcs(samuelRoute);
    const activeKey = getActiveKey(currentTab, luisRoute, samuelRoute);
    const watchedList = getProgressForRoute(activeKey);
    _lastArcs = arcs;
    _lastActiveKey = activeKey;

    const arcStats = arcs.map(arc => {
        const totalDur = arc.episodes.reduce((s, e) => s + e.duration, 0);
        const watchedCount = arc.episodes.filter(e => watchedList.includes(e.globalIdx)).length;
        const percent = arc.episodes.length > 0 ? Math.round((watchedCount / arc.episodes.length) * 100) : 0;
        const firstUnwatched = arc.episodes.find(e => !watchedList.includes(e.globalIdx)) || null;
        return { totalDur, watchedCount, percent, firstUnwatched };
    });

    const continueArcIdx = arcStats.findIndex(s => s.firstUnwatched !== null);
    const continueEp = continueArcIdx >= 0 ? arcStats[continueArcIdx].firstUnwatched : null;
    const continueArc = continueArcIdx >= 0 ? arcs[continueArcIdx] : null;
    const continueStats = continueArcIdx >= 0 ? arcStats[continueArcIdx] : null;
    const continueImg = continueArc ? getPosterImage(continueArc.name) : null;

    const continueSection = continueEp ? `
        <div class="mb-8">
            <p class="catalog-section-title">Continuar Assistindo</p>
            <div class="continue-card" onclick="toggleArc(${continueArcIdx})">
                <div class="continue-thumb" style="background:${POSTER_GRADIENTS[continueArcIdx % POSTER_GRADIENTS.length]};position:relative;overflow:hidden">${continueImg ? `<img src="${continueImg}" alt="" class="poster-img" onerror="this.remove()">` : ''}</div>
                <div class="continue-info">
                    <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(148,163,184,0.45);font-weight:600;margin-bottom:4px">${continueArc.name}</p>
                    <p style="font-size:13px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${continueEp.title}</p>
                    <p style="font-size:11px;color:rgba(100,116,139,0.8);margin-top:4px">Ep. ${continueEp.num} &middot; ${continueEp.duration} min</p>
                    <div class="continue-progress-bar" style="margin-top:10px">
                        <div class="continue-progress-fill" style="width:${continueStats.percent}%"></div>
                    </div>
                </div>
                <div style="display:flex;align-items:center;padding:0 16px;flex-shrink:0">
                    <div style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center">
                        <i class="fa-solid fa-play" style="font-size:11px;color:#fff;margin-left:2px"></i>
                    </div>
                </div>
            </div>
        </div>` : '';

    const posterGrid = `
        <div class="mb-6">
            <p class="catalog-section-title">Suas Séries</p>
            <div class="poster-grid">
                ${arcs.map((arc, i) => {
                    const { percent, watchedCount, totalDur } = arcStats[i];
                    const grad = POSTER_GRADIENTS[i % POSTER_GRADIENTS.length];
                    const posterImg = getPosterImage(arc.name);
                    return `
                        <div class="poster-card" data-arc="${i}" onclick="toggleArc(${i})">
                            <div style="position:absolute;inset:0;background:${grad}"></div>
                            ${posterImg ? `<img src="${posterImg}" alt="" class="poster-img" onerror="this.remove()">` : ''}
                            <div class="poster-noise"></div>
                            <div class="poster-overlay">
                                <div class="poster-progress-ring">
                                    <svg style="width:100%;height:100%;transform:rotate(-90deg)" viewBox="0 0 36 36">
                                        <path stroke-width="3" stroke="rgba(255,255,255,0.18)" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                        <path stroke-dasharray="${percent}, 100" stroke-width="3" stroke-linecap="butt" stroke="${percent >= 100 ? '#34d399' : '#a78bfa'}" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    </svg>
                                    <span style="position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff;font-variant-numeric:tabular-nums">${percent}%</span>
                                </div>
                                <p class="poster-title">${arc.name}</p>
                                <p class="poster-meta">${arc.episodes.length} ep &middot; ${formatTime(totalDur)}</p>
                            </div>
                        </div>`;
                }).join('')}
            </div>
        </div>`;

    const episodePanels = arcs.map((arc, i) => {
        const { percent, watchedCount } = arcStats[i];
        const groups = groupEpisodes(arc.episodes);
        const hasMultipleGroups = groups.length > 1;

        let activeSeason;
        if (hasMultipleGroups) {
            if (activeSeasonPerArc[i]) {
                activeSeason = activeSeasonPerArc[i];
            } else {
                const watchedInArc = arc.episodes.filter(ep => watchedList.includes(ep.globalIdx));
                if (watchedInArc.length > 0) {
                    const lastWatched = watchedInArc[watchedInArc.length - 1];
                    const grp = groups.find(g => g.episodes.some(ep => ep.globalIdx === lastWatched.globalIdx));
                    activeSeason = grp ? grp.label : groups[0].label;
                } else {
                    activeSeason = groups[0].label;
                }
            }
        }
        const activeGroup = hasMultipleGroups
            ? (groups.find(g => g.label === activeSeason) || groups[0])
            : groups[0];

        const seasonTabsHtml = hasMultipleGroups ? `
            <div class="season-tabs">
                ${groups.map(g => `<button onclick="switchSeason(${i}, '${g.label}')" class="season-tab${g.label === activeSeason ? ' season-tab-active' : ''}">${g.label}</button>`).join('')}
            </div>` : '';

        return `
            <div id="arc-eps-${i}" class="arc-eps-panel hidden">
                <div class="arc-eps-header">
                    <div style="min-width:0">
                        <p style="font-size:13px;font-weight:600;color:#fff;letter-spacing:-0.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${arc.name}</p>
                        <p style="font-size:11px;color:rgba(100,116,139,0.65);margin-top:2px">${watchedCount}/${arc.episodes.length} ep &middot; ${percent}% concluído</p>
                    </div>
                    <button onclick="toggleArc(${i})" style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);transition:background 0.15s;flex-shrink:0" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
                        <i class="fa-solid fa-chevron-up" style="font-size:9px;color:rgba(148,163,184,0.6)"></i>
                    </button>
                </div>
                ${seasonTabsHtml}
                <div class="ep-scroll-container" style="max-height:460px;overflow-y:auto">
                    ${renderEpisodeRows(activeGroup.episodes, activeKey)}
                </div>
            </div>`;
    }).join('');

    document.getElementById('arcs-container').innerHTML = continueSection + posterGrid + episodePanels;

    const openIdx = continueArcIdx >= 0 ? continueArcIdx : 0;
    toggleArc(openIdx, true);
}

function toggleArc(arcIdx, skipScroll = false) {
    const panel = document.getElementById('arc-eps-' + arcIdx);
    if (!panel) return;
    const isOpen = !panel.classList.contains('hidden');

    document.querySelectorAll('.arc-eps-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.poster-card').forEach(c => c.classList.remove('poster-active'));

    if (!isOpen) {
        panel.classList.remove('hidden');
        const card = document.querySelector('.poster-card[data-arc="' + arcIdx + '"]');
        if (card) card.classList.add('poster-active');

        if (!skipScroll) {
            setTimeout(() => {
                const rect = panel.getBoundingClientRect();
                const headerH = 68;
                if (rect.top < headerH || rect.bottom > window.innerHeight) {
                    const targetY = window.scrollY + rect.top - headerH - 16;
                    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
                }
            }, 80);
        }
    }
}

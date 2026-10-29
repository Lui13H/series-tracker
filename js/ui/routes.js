function getLuisArcs(luisRoute) {
    if (luisRoute === 'rota1') {
        // Rota Death Note: Exame → Death Note → CSM → Reze → HxH Yorknew → HxH Chimera
        return [
            { name: 'Hunter × Hunter — Exame Hunter',      epStart: 1,   epEnd: 21,  episodes: hxhExame },
            { name: 'Death Note',                           epStart: 22,  epEnd: 58,  episodes: deathNoteEps },
            { name: 'Chainsaw Man',                         epStart: 59,  epEnd: 70,  episodes: chainsawManEps },
            { name: 'Chainsaw Man — Filme da Reze',        epStart: 71,  epEnd: 71,  episodes: chainsawManFilme },
            { name: 'Hunter × Hunter — até Yorknew',       epStart: 72,  epEnd: 108, episodes: hxhYorknew },
            { name: 'Hunter × Hunter — Formigas Quimera',  epStart: 109, epEnd: 198, episodes: hxhChimera },
        ];
    } else {
        // Rota HxH: Exame → HxH Yorknew → CSM → Reze → HxH Chimera → Death Note
        return [
            { name: 'Hunter × Hunter — Exame Hunter',      epStart: 1,   epEnd: 21,  episodes: hxhExame },
            { name: 'Hunter × Hunter — até Yorknew',       epStart: 22,  epEnd: 58,  episodes: hxhYorknew },
            { name: 'Chainsaw Man',                         epStart: 59,  epEnd: 70,  episodes: chainsawManEps },
            { name: 'Chainsaw Man — Filme da Reze',        epStart: 71,  epEnd: 71,  episodes: chainsawManFilme },
            { name: 'Hunter × Hunter — Formigas Quimera',  epStart: 72,  epEnd: 161, episodes: hxhChimera },
            { name: 'Death Note',                           epStart: 162, epEnd: 198, episodes: deathNoteEps },
        ];
    }
}

function getSamuelArcs(samuelRoute) {
    if (samuelRoute === 'rota1') {
        // Rota 1: Breaking Bad + El Camino
        return [
            { name: 'Breaking Bad (Temporadas 1 a 5)',     epStart: 1,  epEnd: 62,  episodes: breakingBadEps },
            { name: 'El Camino: A Breaking Bad Movie',     epStart: 63, epEnd: 63,  episodes: elCaminoEps },
        ];
    } else {
        // Rota 2: Breaking Bad + El Camino + Better Call Saul
        return [
            { name: 'Breaking Bad (Temporadas 1 a 5)',     epStart: 1,  epEnd: 62,  episodes: breakingBadEps },
            { name: 'El Camino: A Breaking Bad Movie',     epStart: 63, epEnd: 63,  episodes: elCaminoEps },
            { name: 'Better Call Saul (Temporadas 1 a 6)', epStart: 64, epEnd: 126, episodes: betterCallSaulEps },
        ];
    }
}

function getActiveKey(currentTab, luisRoute, samuelRoute) {
    if (currentTab === 'luis') {
        return `luis_${luisRoute}`;
    }
    return `samuel_${samuelRoute}`;
}

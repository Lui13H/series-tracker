function getLuisArcs(luisRoute) {
    if (luisRoute === 'rota1') {
        return [
            { name: 'Hunter × Hunter — Exame Hunter', epStart: 1, epEnd: 21, episodes: hxhExame },
            { name: 'Continuar Hunter × Hunter até Yorknew', epStart: 22, epEnd: 58, episodes: hxhYorknew },
            { name: 'Chainsaw Man + Filme da Reze', epStart: 59, epEnd: 71, episodes: chainsawManEps },
            { name: 'Após Yorknew até o fim de Formigas Quimera', epStart: 72, epEnd: 149, episodes: hxhChimera }
        ];
    } else {
        return [
            { name: 'Hunter × Hunter — Exame Hunter', epStart: 1, epEnd: 21, episodes: hxhExame },
            { name: 'Assistir Death Note inteiro', epStart: 22, epEnd: 58, episodes: deathNoteEps },
            { name: 'Chainsaw Man + Filme da Reze', epStart: 59, epEnd: 71, episodes: chainsawManEps }
        ];
    }
}

function getSamuelArcs(samuelRoute) {
    if (samuelRoute === 'rota1') {
        return [
            { name: 'Breaking Bad (Temporadas 1 a 5)', epStart: 1, epEnd: 62, episodes: breakingBadEps },
            { name: 'El Camino: A Breaking Bad Movie', epStart: 63, epEnd: 63, episodes: elCaminoEps },
            { name: 'Better Call Saul (Temporadas 1 a 6)', epStart: 64, epEnd: 126, episodes: betterCallSaulEps }
        ];
    } else {
        return [
            { name: 'Breaking Bad (Temporadas 1 a 5)', epStart: 1, epEnd: 62, episodes: breakingBadEps },
            { name: 'El Camino: A Breaking Bad Movie', epStart: 63, epEnd: 63, episodes: elCaminoEps }
        ];
    }
}

function getActiveKey(currentTab, luisRoute, samuelRoute) {
    if (currentTab === 'luis') {
        return `luis_${luisRoute}`;
    }
    return `samuel_${samuelRoute}`;
}

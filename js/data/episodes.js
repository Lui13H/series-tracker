// Hunter x Hunter - Exame Hunter
const hxhExame = Array.from({ length: 21 }, (_, i) => {
    const num = i + 1;
    const titles = [
        "Destino x e x Companheiros", "Teste x de x Testes", "Rivais x por x Sobrevivência", "Esperança x e x Ambição",
        "Hisoka x é x Perigoso", "Gaucho x no x Alvo", "Confronto x no x Navio", "Decisão x por x Maioria",
        "Cuidado x com x os Trapaceiros", "Início x do x Teste", "Aposta x em x Aventura", "Última x Provação",
        "Carta x de x Gon", "Alvo x é x Hisoka", "Chuva x de x Desespero", "Derrota x e x Vergonha",
        "Armadilha x no x Elevador", "Grande x Entrevista", "Separados x na x Ilha", "Batalha x de x Oportunidades",
        "Fruto x do x Destino"
    ];
    return { num, globalIdx: num - 1, title: titles[i] || `Episódio ${num}`, duration: 23 };
});

// Hunter x Hunter - Yorknew
const hxhYorknew = Array.from({ length: 37 }, (_, i) => {
    const num = 22 + i;
    const titles = [
        "Perigo x em x Yorknew", "Aviso x Fantasma", "Reunião x dos x Zoldyck", "Cobrança x no x Leilão",
        "Acordo x e x Promessa", "Olhos x Escarlates", "Amigos x e x Armadilhas", "Fuga x Subterrânea",
        "Melodia x da x Noite", "Teia x de x Aranha", "Batalha x no x Hotel", "Silêncio x Mortal",
        "Sinfonia x da x Morte", "Cura x e x Vingança", "Olhos x Brilhantes", "Corrente x de x Julgamento",
        "Adivinhação x Corrupta", "Falso x Cadáver", "Caça x ao x Tesouro", "Fugitivos x na x Noite",
        "Contrato x Cumprido", "Líder x dos x Aranhas", "Rei x da x Máfia", "Combate x Supremo",
        "Regras x de x Ouro", "Sentença x Final", "Resgate x de x Chrollo", "Despedida x Temporária",
        "Caminhos x Cruzados", "Amizade x Proibida", "Segredos x de x Greed Island", "Porta x de x Entrada",
        "Ilha x dos x Desejos", "Cartas x Mágicas", "Treinamento x Absoluto", "Força x Oculta", "Partida x Decisiva"
    ];
    return { num, globalIdx: num - 1, title: titles[i] || `Episódio ${num}`, duration: 23 };
});

// Hunter x Hunter - eps 59–148 (Greed Island + Formigas Quimera), globalIdx 58–147
const hxhChimera = Array.from({ length: 90 }, (_, i) => {
    const num = 59 + i;
    return { num, globalIdx: 58 + i, title: `Episódio ${num}`, duration: 23 };
});

// Chainsaw Man — série (12 eps), globalIdx 148–159
const chainsawManEps = [
    { num: 1,  globalIdx: 148, title: "Cão e Chave de Fenda",  duration: 24 },
    { num: 2,  globalIdx: 149, title: "Chegada a Tóquio",       duration: 24 },
    { num: 3,  globalIdx: 150, title: "Onde Mewo Está",          duration: 24 },
    { num: 4,  globalIdx: 151, title: "Resgate",                 duration: 24 },
    { num: 5,  globalIdx: 152, title: "O Sabor do Beijo",        duration: 24 },
    { num: 6,  globalIdx: 153, title: "Matar Denji",             duration: 24 },
    { num: 7,  globalIdx: 154, title: "O Sabor do Vômito",       duration: 24 },
    { num: 8,  globalIdx: 155, title: "Atiro em Gun",            duration: 24 },
    { num: 9,  globalIdx: 156, title: "Vai de Kyoto",            duration: 24 },
    { num: 10, globalIdx: 157, title: "Em Ruínas",               duration: 24 },
    { num: 11, globalIdx: 158, title: "Missão Iniciada",         duration: 24 },
    { num: 12, globalIdx: 159, title: "Katana vs Serra",         duration: 24 },
];

// Chainsaw Man — Filme da Reze, globalIdx 160
const chainsawManFilme = [
    { num: 1, globalIdx: 160, title: "Chainsaw Man: Filme da Reze", duration: 100 }
];

// Death Note — 37 eps, globalIdx 161–197
const deathNoteEps = Array.from({ length: 37 }, (_, i) => {
    const titles = [
        'Renascimento', 'Confronto', 'Negociação', 'Perseguição', 'Estratégia', 'Desmascarado', 'Trama', 'Raio de Sol', 'Contato', 'Dúvida',
        'Assalto', 'Amor', 'Confissão', 'Amigo', 'Aposta', 'Decisão', 'Execução', 'Amigos', 'Matsuda', 'Improviso',
        'Atividade', 'Guia', 'Mania', 'Renascimento', 'Silêncio', 'Renovação', 'Sequestro', 'Impaciência', 'Pai', 'Justiça',
        'Tragédia', 'Seleção', 'Desprezo', 'Vigilância', 'Malícia', '1.28', 'Novo Mundo'
    ];
    return { num: i + 1, globalIdx: 161 + i, title: titles[i] || `Episódio ${i + 1}`, duration: 23 };
});

// Breaking Bad
const breakingBadEps = [
    { num: 1,  globalIdx: 0,  title: "S01 E01 — Pilot",                        duration: 47 },
    { num: 2,  globalIdx: 1,  title: "S01 E02 — Cat's in the Bag...",           duration: 47 },
    { num: 3,  globalIdx: 2,  title: "S01 E03 — ...and the Bag's in the River", duration: 47 },
    { num: 4,  globalIdx: 3,  title: "S01 E04 — Cancer Man",                    duration: 47 },
    { num: 5,  globalIdx: 4,  title: "S01 E05 — Gray Matter",                   duration: 47 },
    { num: 6,  globalIdx: 5,  title: "S01 E06 — Crazy Handful of Nothin'",      duration: 47 },
    { num: 7,  globalIdx: 6,  title: "S01 E07 — A No-Rough-Stuff-Type Deal",    duration: 47 },
    { num: 8,  globalIdx: 7,  title: "S02 E01 — Seven Thirty-Seven",            duration: 47 },
    { num: 9,  globalIdx: 8,  title: "S02 E02 — Grilled",                       duration: 47 },
    { num: 10, globalIdx: 9,  title: "S02 E03 — Bit by a Dead Bee",             duration: 47 },
    { num: 11, globalIdx: 10, title: "S02 E04 — Down",                          duration: 47 },
    { num: 12, globalIdx: 11, title: "S02 E05 — Breakage",                      duration: 47 },
    { num: 13, globalIdx: 12, title: "S02 E06 — Peekaboo",                      duration: 47 },
    { num: 14, globalIdx: 13, title: "S02 E07 — Negro y Azul",                  duration: 47 },
    { num: 15, globalIdx: 14, title: "S02 E08 — Better Call Saul",              duration: 47 },
    { num: 16, globalIdx: 15, title: "S02 E09 — 4 Days Out",                    duration: 47 },
    { num: 17, globalIdx: 16, title: "S02 E10 — Over",                          duration: 47 },
    { num: 18, globalIdx: 17, title: "S02 E11 — Mandala",                       duration: 47 },
    { num: 19, globalIdx: 18, title: "S02 E12 — Phoenix",                       duration: 47 },
    { num: 20, globalIdx: 19, title: "S02 E13 — ABQ",                           duration: 47 },
    { num: 21, globalIdx: 20, title: "S03 E01 — No Más",                        duration: 47 },
    { num: 22, globalIdx: 21, title: "S03 E02 — Caballo Sin Nombre",            duration: 47 },
    { num: 23, globalIdx: 22, title: "S03 E03 — I.F.T.",                        duration: 47 },
    { num: 24, globalIdx: 23, title: "S03 E04 — Green Light",                   duration: 47 },
    { num: 25, globalIdx: 24, title: "S03 E05 — Más",                           duration: 47 },
    { num: 26, globalIdx: 25, title: "S03 E06 — Sunset",                        duration: 47 },
    { num: 27, globalIdx: 26, title: "S03 E07 — One Minute",                    duration: 47 },
    { num: 28, globalIdx: 27, title: "S03 E08 — I See You",                     duration: 47 },
    { num: 29, globalIdx: 28, title: "S03 E09 — Kafkaesque",                    duration: 47 },
    { num: 30, globalIdx: 29, title: "S03 E10 — Fly",                           duration: 47 },
    { num: 31, globalIdx: 30, title: "S03 E11 — Abiquiú",                       duration: 47 },
    { num: 32, globalIdx: 31, title: "S03 E12 — Half Measures",                 duration: 47 },
    { num: 33, globalIdx: 32, title: "S03 E13 — Full Measure",                  duration: 47 },
    { num: 34, globalIdx: 33, title: "S04 E01 — Box Cutter",                    duration: 47 },
    { num: 35, globalIdx: 34, title: "S04 E02 — Thirty-Eight Snub",             duration: 47 },
    { num: 36, globalIdx: 35, title: "S04 E03 — Open House",                    duration: 47 },
    { num: 37, globalIdx: 36, title: "S04 E04 — Bullet Points",                 duration: 47 },
    { num: 38, globalIdx: 37, title: "S04 E05 — Shotgun",                       duration: 47 },
    { num: 39, globalIdx: 38, title: "S04 E06 — Cornered",                      duration: 47 },
    { num: 40, globalIdx: 39, title: "S04 E07 — Problem Dog",                   duration: 47 },
    { num: 41, globalIdx: 40, title: "S04 E08 — Hermanos",                      duration: 47 },
    { num: 42, globalIdx: 41, title: "S04 E09 — Bug",                           duration: 47 },
    { num: 43, globalIdx: 42, title: "S04 E10 — Salud",                         duration: 47 },
    { num: 44, globalIdx: 43, title: "S04 E11 — Crawl Space",                   duration: 47 },
    { num: 45, globalIdx: 44, title: "S04 E12 — End Times",                     duration: 47 },
    { num: 46, globalIdx: 45, title: "S04 E13 — Face Off",                      duration: 47 },
    { num: 47, globalIdx: 46, title: "S05 E01 — Live Free or Die",              duration: 47 },
    { num: 48, globalIdx: 47, title: "S05 E02 — Madrigal",                      duration: 47 },
    { num: 49, globalIdx: 48, title: "S05 E03 — Hazard Pay",                    duration: 47 },
    { num: 50, globalIdx: 49, title: "S05 E04 — Fifty-One",                     duration: 47 },
    { num: 51, globalIdx: 50, title: "S05 E05 — Dead Freight",                  duration: 47 },
    { num: 52, globalIdx: 51, title: "S05 E06 — Buyout",                        duration: 47 },
    { num: 53, globalIdx: 52, title: "S05 E07 — Say My Name",                   duration: 47 },
    { num: 54, globalIdx: 53, title: "S05 E08 — Gliding Over All",              duration: 47 },
    { num: 55, globalIdx: 54, title: "S05 E09 — Blood Money",                   duration: 47 },
    { num: 56, globalIdx: 55, title: "S05 E10 — Buried",                        duration: 47 },
    { num: 57, globalIdx: 56, title: "S05 E11 — Confessions",                   duration: 47 },
    { num: 58, globalIdx: 57, title: "S05 E12 — Rabid Dog",                     duration: 47 },
    { num: 59, globalIdx: 58, title: "S05 E13 — To'hajiilee",                   duration: 47 },
    { num: 60, globalIdx: 59, title: "S05 E14 — Ozymandias",                    duration: 47 },
    { num: 61, globalIdx: 60, title: "S05 E15 — Granite State",                 duration: 47 },
    { num: 62, globalIdx: 61, title: "S05 E16 — Felina",                        duration: 47 },
];

// El Camino
const elCaminoEps = [
    { num: 63, globalIdx: 62, title: 'El Camino: A Breaking Bad Movie', duration: 122 }
];

// Better Call Saul
const betterCallSaulEps = [
    { num: 64,  globalIdx: 63,  title: "S01 E01 — Uno",                    duration: 48 },
    { num: 65,  globalIdx: 64,  title: "S01 E02 — Mijo",                   duration: 48 },
    { num: 66,  globalIdx: 65,  title: "S01 E03 — Nacho",                  duration: 48 },
    { num: 67,  globalIdx: 66,  title: "S01 E04 — Hero",                   duration: 48 },
    { num: 68,  globalIdx: 67,  title: "S01 E05 — Alpine Shepherd Boy",    duration: 48 },
    { num: 69,  globalIdx: 68,  title: "S01 E06 — Five-O",                 duration: 48 },
    { num: 70,  globalIdx: 69,  title: "S01 E07 — Bingo",                  duration: 48 },
    { num: 71,  globalIdx: 70,  title: "S01 E08 — RICO",                   duration: 48 },
    { num: 72,  globalIdx: 71,  title: "S01 E09 — Pimento",                duration: 48 },
    { num: 73,  globalIdx: 72,  title: "S01 E10 — Marco",                  duration: 48 },
    { num: 74,  globalIdx: 73,  title: "S02 E01 — Switch",                 duration: 48 },
    { num: 75,  globalIdx: 74,  title: "S02 E02 — Cobbler",                duration: 48 },
    { num: 76,  globalIdx: 75,  title: "S02 E03 — Amarillo",               duration: 48 },
    { num: 77,  globalIdx: 76,  title: "S02 E04 — Gloves Off",             duration: 48 },
    { num: 78,  globalIdx: 77,  title: "S02 E05 — Rebecca",                duration: 48 },
    { num: 79,  globalIdx: 78,  title: "S02 E06 — Bali Ha'i",              duration: 48 },
    { num: 80,  globalIdx: 79,  title: "S02 E07 — Inflatable",             duration: 48 },
    { num: 81,  globalIdx: 80,  title: "S02 E08 — Fifi",                   duration: 48 },
    { num: 82,  globalIdx: 81,  title: "S02 E09 — Nailed",                 duration: 48 },
    { num: 83,  globalIdx: 82,  title: "S02 E10 — Klick",                  duration: 48 },
    { num: 84,  globalIdx: 83,  title: "S03 E01 — Mabel",                  duration: 48 },
    { num: 85,  globalIdx: 84,  title: "S03 E02 — Witness",                duration: 48 },
    { num: 86,  globalIdx: 85,  title: "S03 E03 — Sunk Costs",             duration: 48 },
    { num: 87,  globalIdx: 86,  title: "S03 E04 — Sabrosito",              duration: 48 },
    { num: 88,  globalIdx: 87,  title: "S03 E05 — Chicanery",              duration: 48 },
    { num: 89,  globalIdx: 88,  title: "S03 E06 — Off Brand",              duration: 48 },
    { num: 90,  globalIdx: 89,  title: "S03 E07 — Expenses",               duration: 48 },
    { num: 91,  globalIdx: 90,  title: "S03 E08 — Slip",                   duration: 48 },
    { num: 92,  globalIdx: 91,  title: "S03 E09 — Fall",                   duration: 48 },
    { num: 93,  globalIdx: 92,  title: "S03 E10 — Lantern",                duration: 48 },
    { num: 94,  globalIdx: 93,  title: "S04 E01 — Smoke",                  duration: 48 },
    { num: 95,  globalIdx: 94,  title: "S04 E02 — Breathe",                duration: 48 },
    { num: 96,  globalIdx: 95,  title: "S04 E03 — Something Beautiful",    duration: 48 },
    { num: 97,  globalIdx: 96,  title: "S04 E04 — Talk",                   duration: 48 },
    { num: 98,  globalIdx: 97,  title: "S04 E05 — Quite a Ride",           duration: 48 },
    { num: 99,  globalIdx: 98,  title: "S04 E06 — Piñata",                 duration: 48 },
    { num: 100, globalIdx: 99,  title: "S04 E07 — Something Stupid",       duration: 48 },
    { num: 101, globalIdx: 100, title: "S04 E08 — Coushatta",              duration: 48 },
    { num: 102, globalIdx: 101, title: "S04 E09 — Wiedersehen",            duration: 48 },
    { num: 103, globalIdx: 102, title: "S04 E10 — Winner",                 duration: 48 },
    { num: 104, globalIdx: 103, title: "S05 E01 — Magic Man",              duration: 48 },
    { num: 105, globalIdx: 104, title: "S05 E02 — 50% Off",                duration: 48 },
    { num: 106, globalIdx: 105, title: "S05 E03 — The Guy for This",       duration: 48 },
    { num: 107, globalIdx: 106, title: "S05 E04 — Namaste",                duration: 48 },
    { num: 108, globalIdx: 107, title: "S05 E05 — Dedicado a Max",         duration: 48 },
    { num: 109, globalIdx: 108, title: "S05 E06 — Wexler v. Goodman",      duration: 48 },
    { num: 110, globalIdx: 109, title: "S05 E07 — JMM",                    duration: 48 },
    { num: 111, globalIdx: 110, title: "S05 E08 — Bagman",                 duration: 48 },
    { num: 112, globalIdx: 111, title: "S05 E09 — Bad Choice Road",        duration: 48 },
    { num: 113, globalIdx: 112, title: "S05 E10 — Something Unforgivable", duration: 48 },
    { num: 114, globalIdx: 113, title: "S06 E01 — Wine and Roses",         duration: 48 },
    { num: 115, globalIdx: 114, title: "S06 E02 — Carrot and Stick",       duration: 48 },
    { num: 116, globalIdx: 115, title: "S06 E03 — Rock and Hard Place",    duration: 48 },
    { num: 117, globalIdx: 116, title: "S06 E04 — Hit and Run",            duration: 48 },
    { num: 118, globalIdx: 117, title: "S06 E05 — Black and Blue",         duration: 48 },
    { num: 119, globalIdx: 118, title: "S06 E06 — Axe and Grind",          duration: 48 },
    { num: 120, globalIdx: 119, title: "S06 E07 — Plan and Execution",     duration: 48 },
    { num: 121, globalIdx: 120, title: "S06 E08 — Point and Shoot",        duration: 48 },
    { num: 122, globalIdx: 121, title: "S06 E09 — Fun and Games",          duration: 48 },
    { num: 123, globalIdx: 122, title: "S06 E10 — Nippy",                  duration: 48 },
    { num: 124, globalIdx: 123, title: "S06 E11 — Breaking Bad",           duration: 48 },
    { num: 125, globalIdx: 124, title: "S06 E12 — Waterworks",             duration: 48 },
    { num: 126, globalIdx: 125, title: "S06 E13 — Saul Gone",              duration: 48 },
];

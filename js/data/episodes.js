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

// Chainsaw Man
const chainsawManEps = Array.from({ length: 13 }, (_, i) => {
    const num = 59 + i;
    const titles = [
        "Cão e Chave de Fenda", "Chegada a Tóquio", "Onde Mewo Está", "Resgate",
        "O Sabor do Beijo", "Matar Denji", "O Sabor do Vômito", "Atiro em Gun",
        "Vai de Kyoto", "Em Ruínas", "Missão Iniciada", "Katana vs Serra", "Chainsaw Man: Filme da Reze"
    ];
    const durations = [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 100];
    return { num, globalIdx: num - 1, title: titles[i], duration: durations[i] };
});

// Hunter x Hunter - Formigas Quimera
const hxhChimera = Array.from({ length: 78 }, (_, i) => {
    const num = 72 + i;
    return { num, globalIdx: 71 + i, title: `Episódio ${num} — Formigas Quimera`, duration: 23 };
});

// Death Note
const deathNoteEps = Array.from({ length: 37 }, (_, i) => {
    const num = 22 + i;
    const titles = [
        'Renascimento', 'Confronto', 'Negociação', 'Perseguição', 'Estratégia', 'Desmascarado', 'Trama', 'Raio de Sol', 'Contato', 'Dúvida',
        'Assalto', 'Amor', 'Confissão', 'Amigo', 'Aposta', 'Decisão', 'Execução', 'Amigos', 'Matsuda', 'Improviso',
        'Atividade', 'Guia', 'Mania', 'Renascimento', 'Silêncio', 'Renovação', 'Sequestro', 'Impaciência', 'Pai', 'Justiça',
        'Tragédia', 'Seleção', 'Desprezo', 'Vigilância', 'Malícia', '1.28', 'Novo Mundo'
    ];
    return { num, globalIdx: 21 + i, title: titles[i] || `Episódio ${num}`, duration: 23 };
});

// Breaking Bad
const breakingBadEps = Array.from({ length: 62 }, (_, i) => {
    const num = i + 1;
    const titles = [
        "Pilot", "Cat's in the Bag...", "...And the Bag's in the River", "Cancer Man", "Gray Matter",
        "Crazy Handful of Nothin'", "A No-Rough-Stuff-Type Deal", "Seven Thirty-Seven", "Grilled", "Bit by a Dead Bee",
        "Down", "Over", "Peekaboo", "Negro y Azul", "Better Call Saul", "4 Days Out", "Over", "ABQ",
        "No Más", "Caballo sin Nombre", "I.F.T.", "Green Light", "Mas", "Sunset", "One Minute", "I See You",
        "Kafkaesque", "Fly", "Half Measures", "Full Measure", "Box Cutter", "Thirty-Eight Snub", "Open House",
        "Bullet Points", "Shotgun", "Cornered", "Problem Dog", "Hermanos", "Bug", "Salud", "Crawl Space",
        "End Times", "Face Off", "Live Free or Die", "Madrigal", "Hazard Pay", "Fifty-One", "Dead Freight",
        "Buyout", "Say My Name", "Gliding Over All", "Confessions", "Rabid Dog", "To'hajiilee", "Ozymandias",
        "Granite State", "Felina"
    ];
    return { num, globalIdx: i, title: `S0${Math.ceil(num/12>5?5:Math.ceil(num/12))} E${String((num-1)%12+1).padStart(2,'0')} — ${titles[i] || 'Episódio ' + num}`, duration: 47 };
});

// El Camino
const elCaminoEps = [
    { num: 63, globalIdx: 62, title: 'El Camino: A Breaking Bad Movie', duration: 122 }
];

// Better Call Saul
const betterCallSaulEps = Array.from({ length: 63 }, (_, i) => {
    const num = 64 + i;
    const titles = [
        "Uno", "Mijo", "Nacho", "Hero", "Alpine Shepherd Boy", "Five-O", "Bingo", "RICO", "Pimento", "Marco",
        "Switch", "Cobbler", "Amarillo", "Gloves Off", "Rebecca", "Bali Ha'i", "Inflatable", "Klick", "Witness", "Sunk Costs",
        "Sabrosito", "Talk About It", "Chicanery", "Fall", "Lantern", "Smoke", "Breathe", "Something Beautiful", "Quite a Ride", "Piñata",
        "Coushatta", "Wiedersehen", "Winner", "Magic Man", "50% Off", "The Guy For This", "Namaste", "Dedicado a Max", "JMM", "Wexler v. Goodman",
        "Bad Choice Road", "Something Unforgivable", "Wine and Roses", "Carrot and Stick", "Rock and Hard Place", "Hit and Run", "Black and Blue", "Axe and Grind", "Point and Shoot", "Fun and Games",
        "Nippy", "Breaking Bad", "Waterworks", "Saul Gone"
    ];
    return { num, globalIdx: 63 + i, title: `S0${Math.ceil((i+1)/10>6?6:Math.ceil((i+1)/10))} E${String(i%10+1).padStart(2,'0')} — ${titles[i] || 'Episódio ' + (i+1)}`, duration: 48 };
});

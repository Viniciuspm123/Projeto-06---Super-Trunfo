// O baralho - Exemplo com tema "Máquinas de Fliperama Clássicas"

const baralho = [
    { 
        nome: "Pac-Man", 
        imagem: "assets/pacman.png", 
        Atributos: { Velocidade: 80, Dificuldade: 65, Lancamento: 1980 } 
    },
    { 
        nome: "Donkey Kong", 
        imagem: "assets/DonkeyKong.png", 
        Atributos: { Velocidade: 60, Dificuldade: 75, Lancamento: 1981 } 
    },
    { 
        nome: "Space Invaders", 
        imagem: "assets/space-invaders.png", 
        Atributos: { Velocidade: 70, Dificuldade: 70, Lancamento: 1978 } 
    },
    { 
        nome: "Street Fighter II", 
        imagem: "assets/street-fighter-ii.png", 
        Atributos: { Velocidade: 90, Dificuldade: 95, Lancamento: 1991 } 
    },
    { 
        nome: "Tetris", 
        imagem: "assets/tetris.png", 
        Atributos: { Velocidade: 85, Dificuldade: 80, Lancamento: 1984 } 
    },
    { 
        nome: "Asteroids", 
        imagem: "assets/asteroids.avif", 
        Atributos: { Velocidade: 75, Dificuldade: 60, Lancamento: 1979 } 
    },
];

let deckJogador = [];
let deckMaquina = [];
let cartaJogador;
let cartaMaquina;
let atributoSelecionado = null;

// Elementos DOM
const elementoCartaVoce = document.getElementById('carta-voce');
const elementoCartaMaquina = document.getElementById('carta-maquina');
const elementoMensagem = document.getElementById('mensagem');
const elementoPontosVoce = document.getElementById('pontos-voce');
const elementoPontosMaquina = document.getElementById('pontos-maquina');
const elementoCartasVoceCount = document.getElementById('cartas-voce-count');
const elementoCartasMaquinaCount = document.getElementById('cartas-maquina-count');
const btnJogar = document.getElementById('btn-jogar');
const btnProximaRodada = document.getElementById('btn-proxima-rodada');
const btnIniciar = document.getElementById('btn-iniciar');

// Elementos do Modal
const elementoModal = document.getElementById('modal-resultado');
const elementoModalMensagem = document.getElementById('modal-mensagem');
const elementoModalBtnOk = document.getElementById('modal-btn-ok');


// Função para embaralhar um array (Algoritmo de Fisher-Yates)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function iniciarJogo() {
    // Resetar o onclick do botão OK para a função padrão (próxima rodada)
    elementoModalBtnOk.onclick = fecharModalPadrao;
    
    // 1. Embaralhar e Distribuir
    embaralhar(baralho);
    const baralhoCopia = [...baralho]; 
    deckJogador = baralhoCopia.splice(0, baralhoCopia.length / 2);
    deckMaquina = baralhoCopia; 

    // 2. Resetar o estado
    elementoModal.classList.add('oculta'); 
    elementoCartaMaquina.innerHTML = `<div class="card-back-opponent"></div>`;
    elementoCartaVoce.innerHTML = '';
    btnJogar.disabled = true;
    btnProximaRodada.disabled = true;
    btnIniciar.disabled = true;
    elementoMensagem.innerHTML = "Aguardando sua jogada...";

    // 3. Iniciar Rodada
    proximaRodada();
}

function proximaRodada() {
    if (deckJogador.length === 0 || deckMaquina.length === 0) {
        finalizarJogo();
        return;
    }

    cartaJogador = deckJogador.shift();
    cartaMaquina = deckMaquina.shift();
    atributoSelecionado = null;

    // Habilita o clique nos atributos ao exibir a carta
    exibirCarta(cartaJogador, elementoCartaVoce, true); 
    elementoCartaMaquina.innerHTML = `<div class="card-back-opponent"></div>`;
    btnJogar.disabled = true;
    btnProximaRodada.disabled = true;
    elementoMensagem.innerHTML = "Escolha um atributo para jogar!";
    
    atualizarPlacar();
}


// Função de exibir carta ATUALIZADA com flag de 'pode-clicar'
function exibirCarta(carta, elemento, podeClicar = false) {
    let html = `<div class="card-titulo">${carta.nome}</div>`;
    html += `<img class="card-imagem" src="${carta.imagem}" alt="Imagem de ${carta.nome}">`;
    html += `<div class="card-atributos">`;

    const atributosMapa = carta.Atributos;

    for (let atributo in atributosMapa) {
        const valor = atributosMapa[atributo];
        const id = `atributo-${atributo}`;

        if (elemento.id === 'carta-voce' && podeClicar) { 
            // Permite o clique apenas na carta do jogador E se 'podeClicar' for true
            html += `<div id="${id}" onclick="selecionarAtributo('${atributo}')">${atributo}: ${valor}</div>`;
        } else {
            // Desabilita o clique
            html += `<div id="${id}">${atributo}: ${valor}</div>`;
        }
    }
    html += `</div>`;
    elemento.innerHTML = html;
}

function selecionarAtributo(atributo) {
    document.querySelectorAll('#carta-voce .card-atributos div').forEach(div => {
        div.classList.remove('selecionado');
    });

    const elementoAtributo = document.querySelector(`#carta-voce #atributo-${atributo}`);
    if (elementoAtributo) {
        elementoAtributo.classList.add('selecionado');
    }
    
    atributoSelecionado = atributo;
    btnJogar.disabled = false;
    elementoMensagem.innerHTML = `Atributo **${atributo}** selecionado. Aperte JOGAR!`;
}

function jogar() {
    if (!atributoSelecionado) {
        elementoMensagem.innerHTML = "Por favor, escolha um atributo antes de jogar.";
        return;
    }
    
    const isLancamento = atributoSelecionado === 'Lancamento';
    const valorJogador = cartaJogador.Atributos[atributoSelecionado];
    const valorMaquina = cartaMaquina.Atributos[atributoSelecionado];
    let resultado = "";

    // Revela a carta da máquina
    exibirCarta(cartaMaquina, elementoCartaMaquina, false); // Não pode clicar na carta da máquina

    // IMPORTANTE: Desabilita o clique na carta do jogador após o jogo!
    exibirCarta(cartaJogador, elementoCartaVoce, false); 

    // Destaca o atributo escolhido na carta da máquina
    const atributoMaquinaElemento = document.querySelector(`#carta-maquina #atributo-${atributoSelecionado}`);
    if (atributoMaquinaElemento) {
        atributoMaquinaElemento.classList.add('selecionado');
    }
    
    let jogadorGanhou = false;
    
    // Lógica de comparação (MENOR ANO VENCE)
    if (isLancamento) {
        if (valorJogador < valorMaquina) {
            jogadorGanhou = true;
        } else if (valorJogador > valorMaquina) {
            jogadorGanhou = false;
        }
    } else {
        // MAIOR VALOR VENCE
        if (valorJogador > valorMaquina) {
            jogadorGanhou = true;
        } else if (valorJogador < valorMaquina) {
            jogadorGanhou = false;
        }
    }
    
    // Atribuição de Cartas
    if (valorJogador === valorMaquina) {
        resultado = "EMPATE! 🤝 Cartas voltam para os respectivos decks.";
        deckJogador.push(cartaJogador);
        deckMaquina.push(cartaMaquina);
    } else if (jogadorGanhou) {
        resultado = "VOCÊ VENCEU! 🥳";
        deckJogador.push(cartaJogador, cartaMaquina);
    } else {
        resultado = "VOCÊ PERDEU! 😢";
        deckMaquina.push(cartaMaquina, cartaJogador);
    }

    // Exibe o resultado no Modal
    elementoModalMensagem.innerHTML = `${resultado} (${atributoSelecionado}: ${valorJogador} vs ${valorMaquina}).`;
    elementoModal.classList.remove('oculta');
    
    // Desabilita JOGAR e aguarda o clique no OK do Modal
    btnJogar.disabled = true;
    btnProximaRodada.disabled = true;
    
    atualizarPlacar();
}

// Função de fechamento padrão (continua o jogo)
function fecharModalPadrao() {
    // 1. Inicia a animação retrô
    elementoModal.classList.add('animando-saida');
    elementoModalBtnOk.disabled = true;

    // 2. Remove a animação e oculta o modal após o tempo da animação (0.8s)
    setTimeout(() => {
        elementoModal.classList.add('oculta');
        elementoModal.classList.remove('animando-saida');
        elementoModalBtnOk.disabled = false;
        
        // 3. Habilita o botão de Próxima Rodada (se não for o fim)
        if (deckJogador.length > 0 && deckMaquina.length > 0) {
            btnProximaRodada.disabled = false;
        }
        
    }, 800); // Tempo da animação CSS
}


function finalizarJogo() {
    let mensagemFinal = "";
    if (deckJogador.length > deckMaquina.length) {
        mensagemFinal = "FIM DE JOGO! VOCÊ é o GRANDE CAMPEÃO! 🏆";
    } else if (deckMaquina.length > deckJogador.length) {
        mensagemFinal = "FIM DE JOGO! A Máquina VENCEU! 🤖";
    } else {
        mensagemFinal = "FIM DE JOGO! EMPATE GERAL! 😲";
    }
    
    // Exibe a mensagem final no modal
    elementoModalMensagem.innerHTML = mensagemFinal;
    elementoModal.classList.remove('oculta');
    
    // Desabilita os botões de rodada
    btnProximaRodada.disabled = true;
    btnJogar.disabled = true;
    
    // SOBRESCREVE o comportamento do botão OK para reiniciar o jogo
    elementoModalBtnOk.onclick = () => {
        // Inicia a animação de saída
        elementoModal.classList.add('animando-saida');
        elementoModalBtnOk.disabled = true;
        
        setTimeout(() => {
            elementoModal.classList.add('oculta');
            elementoModal.classList.remove('animando-saida');
            elementoModalBtnOk.disabled = false;
            
            // Habilita o botão de Iniciar Jogo após a animação
            btnIniciar.disabled = false;
            elementoMensagem.innerHTML = "Jogo finalizado. Clique em INICIAR JOGO.";
            
            // Volta o onclick do botão OK para a função padrão para o próximo jogo
            elementoModalBtnOk.onclick = fecharModalPadrao;
            
        }, 800); // Tempo da animação CSS
    };
}

// Inicializa a contagem ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarPlacar);

function atualizarPlacar() {
    elementoPontosVoce.textContent = deckJogador.length;
    elementoPontosMaquina.textContent = deckMaquina.length;
    elementoCartasVoceCount.textContent = deckJogador.length;
    elementoCartasMaquinaCount.textContent = deckMaquina.length;
}

// Adicionado ao escopo global para o onclick no HTML
window.iniciarJogo = iniciarJogo;
window.proximaRodada = proximaRodada;
window.jogar = jogar;
window.selecionarAtributo = selecionarAtributo;
window.fecharModalPadrao = fecharModalPadrao;
🕹️ Super Trunfo – Máquinas de Fliperama Clássicas

Um jogo estilo Super Trunfo, totalmente funcional em JavaScript, utilizando cartas de fliperamas clássicos como Pac-Man, Tetris, Donkey Kong e outros.
O jogador enfrenta a máquina comparando atributos como Velocidade, Dificuldade e Ano de Lançamento.

🎮 Funcionalidades

Baralho com cartas de máquinas de fliperama clássicas

Atributos disponíveis:

Velocidade

Dificuldade

Lançamento (MENOR ano vence)

Jogo totalmente funcional:

Embaralhamento automático

Distribuição de cartas

Seleção de atributos

Comparação e resultado

Cartas são redistribuídas conforme vitória/derrota

Modal de resultado com animação

Placar dinâmico mostrando cartas restantes

Interface que desabilita/ativa automaticamente cada botão

Fluxo completo de jogo:

Iniciar → Rodadas → Finalização → Reinício

🃏 Como o jogo funciona
1️⃣ Iniciar Jogo

Ao clicar em Iniciar Jogo:

O baralho é embaralhado

Dividido igualmente entre jogador e máquina

A primeira rodada começa automaticamente

2️⃣ Rodada

O jogador recebe sua carta virada para cima

A máquina mantém a carta virada para baixo

Você deve escolher um atributo clicando sobre ele

3️⃣ Jogar

Ao clicar em JOGAR:

A carta da máquina é revelada

O atributo escolhido é comparado:

✔️ Regras:

Velocidade / Dificuldade:
Maior valor vence

Lançamento:
Menor ano vence

4️⃣ Resultado

De acordo com o vencedor:

Se empatar → cada carta retorna para seu dono

Se o jogador vencer → recebe ambas as cartas

Se perder → a máquina recebe ambas

Um modal animado mostra o resultado da rodada.

5️⃣ Próxima Rodada

Após fechar o modal, o botão Próxima Rodada é habilitado, e o ciclo se repete.

6️⃣ Fim de jogo

Quando um dos decks fica vazio:

O jogo exibe o modal final:

Vitória 🏆

Derrota 🤖

Empate 😲

O botão Iniciar Jogo é reabilitado para reiniciar tudo

🛠 Tecnologias Utilizadas

HTML5

CSS3

JavaScript (ES6)

📁 Estrutura do Projeto
/assets
   pacman.png
   DonkeyKong.png
   space-invaders.png
   street-fighter-ii.png
   tetris.png
   asteroids.avif

/css
   style.css

/js
   script.js

index.html
README.md

🧠 Lógica principal (resumo técnico)

Embaralhamento: algoritmo Fisher-Yates

Uso de:

innerHTML para renderização dinâmica

Manipulação de classes para seleção de atributos

Botões ativados/desativados conforme o estado

Modal com animação de saída

Variáveis globais para integração com o HTML via window.

▶️ Como executar

Baixe ou clone o repositório:

git clone https://github.com/seu-usuario/seu-repo.git


Abra o arquivo:

index.html


O jogo funciona direto no navegador — não precisa instalar nada.

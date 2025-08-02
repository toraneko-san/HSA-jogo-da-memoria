import { PARES } from "./const.js";

const cartasEmJogo = [];

function iniciarJogo() {
  // esconder seção "inicio" e revelar seção "carta-ampliada"
  ////
}

// quando clicar no botão "Jogar", chamar função iniciarJogo()
////

function carregarJogadores() {
  // inserir nome e pontuação inicial dos jogadores na seção "jogadores" e
  // atualizar pontuação durante o jogo
  ////
}

function embaralharCartas() {
  // se precisar limitar o número de cartas, fazer aqui
  // P.S.: randomizar a ordem dos pares
  ////

  // separar cada par em duas cartas
  for (let i = 0; i < PARES.length; i++) {
    const par = PARES[i];

    cartasEmJogo.push({ texto: par.carta1, parId: i });
    cartasEmJogo.push({ texto: par.carta2, parId: i });
  }

  // randomizar a ordem das cartas
  for (let i = cartasEmJogo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasEmJogo[i], cartasEmJogo[j]] = [cartasEmJogo[j], cartasEmJogo[i]];
  }
}

function carregarTabuleiro() {
  embaralharCartas();

  // inserir cartas no tabuleiro
  ////
}

// preparar jogo quando o site carregar
carregarJogadores();
carregarTabuleiro();

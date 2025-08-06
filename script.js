import { PARES } from "./const.js";

let jogadores = [
  { nome: "Jogador 1", pontuacao: 0 },
  { nome: "Jogador 2", pontuacao: 0 },
  { nome: "Jogador 3", pontuacao: 0 },
  { nome: "Jogador 4", pontuacao: 0 },
];
let turnoJogador = null;

let cartasEmJogo = [];
let cartasViradas = [];

function iniciarJogo() {
  turnoJogador = 0;
  // esconder seção "inicio" e revelar seção "carta-ampliada"
  ////
  console.log("turnoJogador: ", turnoJogador);
}

// quando clicar no botão "Jogar", chamar função iniciarJogo()
////

// função carregarJogadores(): prepara a seção "jogadores" quando o site carregar
// e atualiza pontuação durante o jogo
function carregarJogadores() {
  // selecionar a seção "jogadores"
  ////
  // mostrar o nome e a pontuação de cada jogador
  ////
  console.log("jogadores: ", jogadores);
}

// função carregarJogadores(): prepara a seção "tabuleiro" quando o site carregar
// só é chamada no começo do jogo
function carregarTabuleiro() {
  embaralharCartas();
  carregarCartas();
}

// preparar o jogo quando o site carregar
carregarJogadores();
carregarTabuleiro();

// função embaralharCartas(): embaralha os pares e separa os pares em cartas individuaias
// só é chamada no começo do jogo
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

  console.log("cartasEmJogo: ", cartasEmJogo);
}

// função carregarCartas(): mostra as cartas embaralhadas
// só é chamada no começo do jogo
function carregarCartas() {
  // selecionar a seção "tabuleiro"
  ////
  // mostrar as cartas
  ////
  // adicionar função virarCarta() às cartas
  ////
}

// função virarCarta(): vira a carta quando o jogador seleciona uma carta
function virarCarta(pos) {
  //
  const cartaInfo = cartasEmJogo[pos];

  // se duas cartas estiverem viradas e o jogador selecionar uma carta que
  // não estiver virada, fazer nada
  if (cartasViradas.length == 2 && false) {
    return;
  }
  ////

  // se o jogador selecionar uma carta que já estiver virada, ampliar
  // o texto na seção "carta-ampliada"
  if (false) {
    ampliarCarta(cartaInfo.texto);
    return;
  }
  ////

  // virar a carta selecionada e ampliar o texto na seção "carta-ampliada"
  cartasViradas.push(cartaInfo);
  console.log(cartasViradas);
  ampliarCarta(cartaInfo.texto);
  ////

  // se duas cartas estiverem viradas, verificar se forma par ou não
  if (cartasViradas.length == 2) {
    if (cartasViradas[0].parId == cartasViradas[1].parId) {
      // adicionar ponto para o jogador
      atualizarPontuacao();

      const parId = cartasViradas[1].parId;
      const textoCompleto =
        PARES[parId].textoCompleto +
        "<br>" +
        `Referência: ${PARES[parId].referenica}`;
      ampliarCarta(textoCompleto);
    }

    // checar se todos os pares foram encontrados
    // se tiver, revelar botão "Fim do Jogo"

    // revelar botão "Próximo jogador"
    ////
  }
}

// função ampliarCartas(): mostra o texto completo da carta quando o jogador vira 
// uma carta ou seleciona uma carta virada
function ampliarCarta(texto) {
  console.log("cartaSelecionada: ", texto);
  // selecionar seção "carta-ampliada"
  ////
  // mostrar texto
  ////
}

// função carregarCartas(): atualiza a pontuacao quando um jogador acerta um par
function atualizarPontuacao() {
  jogadores[turnoJogador].pontuacao += 1;
  carregarJogadores();
}

// função carregarCartas(): passa o turno para o próximo jogador e desvira ou 
// esconde as cartas, dependendo se formou par ou não
function passarTurno() {
  // deletar lista com as cartas viradas
  cartasViradas = [];

  // desvirar as cartas (só funciona se as cartas não tiverem formdo par)

  //[ok] passar o turno para o próximo jogador
  if (turnoJogador <= 3) {
    turnoJogador += 1;
  } else {
    turnoJogador = 0;
  }
  console.log("cartasViradas: ", cartasViradas);
  console.log("turnoJogador: ", turnoJogador);
}

// quando clicar no botão "Próx. Jogador", chamar função passarTurno()
////

// TESTE:
// iniciarJogo();
// virarCarta(0);
// virarCarta(1);
// virarCarta(0);
// virarCarta(2);
// virarCarta(3);
// passarTurno();

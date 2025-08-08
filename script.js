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

  document.querySelector(".inicio").classList.add("escondido"); //esconde o botão
  document.querySelector(".carta-ampliada").classList.remove("escondido"); //revela a carta ampliada ou o que será usado

  carregarJogadores();
  carregarTabuleiro();

  console.log("Jogo iniciado! Turno do jogador:", turnoJogador);
}

// quando clicar no botão "Jogar", chamar função iniciarJogo()
////

// função carregarJogadores(): prepara a seção "jogadores" quando o site carregar
// e atualiza pontuação durante o jogo
// só é chamada após ativação do botão de "Jogar"

function carregarJogadores() {
  const secao = document.querySelector(".jogadores");
  secao.innerHTML = jogadores
  .map((j, i) => `<p>${j.nome}: ${j.pontuacao} ponto(s)</p>`)
  .join("");
}

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
  // selecionar o tabuleiro
  const tabuleiro = document.querySelector("#container");
  
  // mostrar as cartas
  for (let i = 0; i < cartasEmJogo.length; i++) {
    const carta = cartasEmJogo[i];
    tabuleiro.innerHTML += `
      <div class="carta">
         <div class="carta-virada">
           <div class="frente">${i + 1}</div>
           <div class="verso">${carta.texto}</div>
        </div>
      </div>
    `;
  }

  // adicionar função virarCarta() às cartas
  ////
}

// função virarCarta(): vira a carta quando o jogador seleciona uma carta
      function virarCarta(pos) {
       const cartaInfo = cartasEmJogo[pos];
       const cartaEl = document.querySelectorAll(".carta")[pos];

  // Impede clicar em carta já virada ou mais de duas
  if (cartaEl.classList.contains("ativa") || cartasViradas.length === 2) return;

  cartaEl.classList.add("ativa");
  cartasViradas.push({ info: cartaInfo, el: cartaEl });

  ampliarCarta(cartaInfo.texto);

  if (cartasViradas.length === 2) {
    const [c1, c2] = cartasViradas;

    if (c1.info.parId === c2.info.parId) {
      // par feito
      setTimeout(() => {
      c1.el.classList.add("carta-pareada");
      c2.el.classList.add("carta-pareada");
      c1.el.style.visibility = "hidden";
      c2.el.style.visibility = "hidden";

      const parId = c1.info.parId;
      const textoCompleto =
        PARES[parId].textoCompleto +
        "<br>Referência: " +
        PARES[parId].referenica;
        ampliarCarta(textoCompleto);

        atualizarPontuacao();
        cartasViradas = [];
      }, 1000);
    } else {
      // não é par: desvirar
      setTimeout(() => {
      c1.el.classList.remove("ativa");
      c2.el.classList.remove("ativa");
      cartasViradas = [];
      ampliarCarta("");
      }, 1500);
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

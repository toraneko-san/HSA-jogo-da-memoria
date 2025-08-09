import { PARES } from "./const.js";

let jogadores = [
  { nome: "Jogador 1", cor: "red", pontuacao: 0 },
  { nome: "Jogador 2", cor: "green", pontuacao: 0 },
  { nome: "Jogador 3", cor: "yellow", pontuacao: 0 },
  { nome: "Jogador 4", cor: "blue", pontuacao: 0 },
];

let jogadorAtual = 0;

let cartasEmJogo = [];
let cartasViradas = [];

// função iniciarJogo(): inicia o jogo quando o jogador clicar no botão "Jogar"
function iniciarJogo() {
  jogadorAtual = 0;

  carregarJogadores();
  carregarTabuleiro();
}

// quando clicar no botão "Jogar", chamar função iniciarJogo()
////

// função carregarJogadores(): prepara a seção "jogadores" quando o site carregar
// e atualiza pontuação durante o jogo
function carregarJogadores() {
  let container = document.querySelector(".jogadores");
  container.innerHTML = "";

  jogadores.forEach((jogador, index) => {
    let ativo = index === jogadorAtual ? ">" : "";
    container.innerHTML += `<p style="color: ${jogador.cor}">${ativo} ${jogador.nome}: ${jogador.pontuacao}</p>`;
  });
}

function carregarTabuleiro() {
  embaralharCartas();
  carregarCartas();
}

// preparar o jogo quando o site carregar
carregarTabuleiro();

// função embaralharCartas(): embaralha os pares e separa os pares em cartas individuaias
// só é chamada no começo do jogo
function embaralharCartas() {
  // separar cada par em duas cartas
  for (let i = 0; i < PARES.length; i++) {
    const par = PARES[i];

    cartasEmJogo.push({ tipo: "texto", conteudo: par.texto, parId: i });
    cartasEmJogo.push({ tipo: "imagem", conteudo: par.imagem, parId: i });
  }

  // randomizar a ordem das cartas
  for (let i = cartasEmJogo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasEmJogo[i], cartasEmJogo[j]] = [cartasEmJogo[j], cartasEmJogo[i]];
  }
}

// função carregarCartas(): mostra as cartas embaralhadas
// só é chamada no começo do jogo
function carregarCartas() {
  // selecionar o tabuleiro
  const tabuleiro = document.querySelector(".tabuleiro");

  // mostrar as cartas
  for (let i = 0; i < cartasEmJogo.length; i++) {
    const carta = cartasEmJogo[i];

    if (carta.tipo == "imagem") {
      // inserir uma imagem no verso
    } else {
      // inserir um texto no verso
      // classe no número para a borda e fundo
      tabuleiro.innerHTML += `
        <div class="carta">
          <div class="carta-virada">
            <div class="frente"><p class="numero-borda">${i + 1}</p></div>
            <div class="verso">${verso}</div>
          </div>
        </div>
      `;
    }

  }

  // adicionar função virarCarta() às cartas
  const cartasInseridas = document.querySelectorAll(".carta");
  cartasInseridas.forEach((el, index) => {
    el.addEventListener("click", () => virarCarta(index));
  });
}

// função virarCarta(): vira a carta quando o jogador seleciona uma carta
function virarCarta(pos) {
  const cartaInfo = cartasEmJogo[pos];
  const cartaEl = document.querySelectorAll(".carta")[pos];

  // Impede clicar em carta já virada ou mais de duas
  if (cartaEl.classList.contains("ativa") || cartasViradas.length === 2) return;

  cartaEl.classList.add("ativa");
  cartasViradas.push({ info: cartaInfo, el: cartaEl });

  if (cartasViradas.length === 2) {
    const [c1, c2] = cartasViradas;

    // se formar par, as cartas não vão estar mais visíveis
    // P.S.: se não fomrar par, as cartas vão ser desviradas quando passar turno
    if (c1.info.parId === c2.info.parId) {
      // par feito
      setTimeout(() => {
        c1.el.classList.add("carta-pareada");
        c2.el.classList.add("carta-pareada");
      }, 1000);
      atualizarPontuacao();
    }

    // checar se todos os pares foram encontrados
    // se tiver, revelar botão "Fim do Jogo"

    // revelar botão "Próximo jogador"
    ////
  }
}

// função atualizarPontuacao(): atualiza a pontuacao quando um jogador acerta um par
function atualizarPontuacao() {
  jogadores[jogadorAtual].pontuacao += 1;
  carregarJogadores();
}

// função passarTurno(): passa o turno para o próximo jogador e desvira ou
// esconde as cartas, dependendo se formou par ou não
function passarTurno() {
  // desvirar as cartas (só funciona se as cartas não tiverem formdo par)
  const [c1, c2] = cartasViradas;

  c1.el.classList.remove("ativa");
  c2.el.classList.remove("ativa");

  // deletar lista com as cartas viradas
  cartasViradas = [];

  // passar o turno para o próximo jogador
  if (jogadorAtual <= 3) {
    jogadorAtual += 1;
  } else {
    jogadorAtual = 0;
  }

  carregarJogadores();
}

// quando clicar no botão "Próx. Jogador", chamar função passarTurno()
////

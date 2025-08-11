import { PARES } from "./const.js";

let jogadores = [
  { nome: "Jogador 1", cor: "#408f8a", pontuacao: 0 },
  { nome: "Jogador 2", cor: "#000000", pontuacao: 0 },
  { nome: "Jogador 3", cor: "#34a203", pontuacao: 0 },
  { nome: "Jogador 4", cor: "#737373", pontuacao: 0 },
];

let jogadorAtual;
let formouPar = false;

let cartasEmJogo = [];
let cartasViradas = [];

// função iniciarJogo(): inicia o jogo quando o jogador clicar no botão "Jogar"
function iniciarJogo() {  
  jogadores = jogadores.map((jogador) => ({ ...jogador, pontuacao: 0 }));
  jogadorAtual = 0;
  formouPar = false;
  cartasEmJogo = [];
  cartasViradas = [];

  carregarJogadores();
  carregarTabuleiro();

  document.querySelector(".botoes").innerHTML = "";
}

// quando clicar no botão "Jogar", chamar função iniciarJogo()
document.querySelector(".botao-jogar").addEventListener("click", iniciarJogo);
////

// função carregarJogadores(): prepara a seção "jogadores" quando o site carregar
// e atualiza pontuação durante o jogo
function carregarJogadores() {
  if (jogadorAtual === undefined) return;

  let container = document.querySelector(".jogadores");
  container.innerHTML = "";

  let texto = "";
  jogadores.forEach((jogador, index) => {
    let ativo = index === jogadorAtual ? ">" : "";
    texto += `<pre style="color: ${jogador.cor}">${ativo} ${jogador.nome}     Pontuação: ${jogador.pontuacao}</pre>`;
  });

  container.innerHTML = `
    <div class="caixa">
      <div class="caixa">
        ${texto}
      </div>
    </div>
  `;
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
  const jogoEl = document.querySelector(".jogo");
  let cartas = "";

  // mostrar as cartas
  for (let i = 0; i < cartasEmJogo.length; i++) {
    const carta = cartasEmJogo[i];

    if (carta.tipo == "imagem") {
      // inserir uma imagem no verso
      cartas += `
        <div class="carta">
          <div class="carta-virada">
            <div class="frente"><p class="numero-borda">${i + 1}</p></div>
            <div class="verso"><img src="assets/${carta.conteudo}"/></div>
          </div>
        </div>
      `;
    } else {
      // inserir um texto no verso
      // classe no número para a borda e fundo
      cartas += `
        <div class="carta">
          <div class="carta-virada">
            <div class="frente"><p class="numero-borda">${i + 1}</p></div>
            <div class="verso">${carta.conteudo}</div>
          </div>
        </div>
      `;
    }
  }

  jogoEl.innerHTML = `<section class="tabuleiro">${cartas}</section>`;

  // adicionar função virarCarta() às cartas
  const cartasInseridas = document.querySelectorAll(".carta");
  cartasInseridas.forEach((el, index) => {
    el.addEventListener("click", () => virarCarta(index));
  });

  cartasInseridas.forEach((el, index) => {
    const cartaInfo = cartasEmJogo[index];

    if (cartaInfo.tipo == "imagem") {
      el.addEventListener("mouseover", () => semiAmpliarCarta(index));
      el.addEventListener("mouseout", carregarJogadores);
    }
  });
}

// função virarCarta(): vira a carta quando o jogador seleciona uma carta
function virarCarta(pos) {
  if (jogadorAtual == null) return;

  const cartaInfo = cartasEmJogo[pos];
  const cartaEl = document.querySelectorAll(".carta")[pos];

  if (cartaEl.classList.contains("ativa") && cartaInfo.tipo == "imagem") {
    ampliarCarta(pos);
  }

  // Impede clicar em carta já virada ou mais de duas
  if (cartaEl.classList.contains("ativa") || cartasViradas.length === 2) return;

  cartaEl.classList.add("ativa");
  cartasViradas.push({ info: { ...cartaInfo, id: pos }, el: cartaEl });

  if (cartaInfo.tipo == "imagem") {
    semiAmpliarCarta(pos);
  }

  if (cartasViradas.length === 2) {
    const [c1, c2] = cartasViradas;

    // se formar par, as cartas não vão estar mais visíveis
    // P.S.: se não fomrar par, as cartas vão ser desviradas quando passar turno
    if (c1.info.parId === c2.info.parId) {
      jogadores[jogadorAtual].pontuacao += 1;

      formouPar = !formouPar;
      // par feito
      setTimeout(() => {
        c1.el.classList.add("carta-pareada");
        c2.el.classList.add("carta-pareada");
        mostrarParFormado(c1.info.parId);
        carregarJogadores();
      }, 1000);

      // checar se todos os pares foram encontrados
      // se tiver, revelar botão "Fim do Jogo"
      const numParesFormados = jogadores.reduce(
        (soma, jogador) => soma + jogador.pontuacao,
        0
      );

      if (numParesFormados == PARES.length) {
        setTimeout(mostrarResultado, 1000);
        return;
      }
    } else {
      formouPar = false;
    }

    // revelar botão "Próximo jogador"
    setTimeout(() => {
      document.querySelector(".botoes").innerHTML = formouPar
        ? `
        <button class="botao botao-proximo verde-claro">MAIS UMA TENTATIVA</button>
      `
        : `
        <button class="botao botao-proximo">PRÓX. JOGADOR</button>
      `;

      document
        .querySelector(".botao-proximo")
        .addEventListener("click", passarTurno);
    }, 1000);
  }
}

// função semiAmpliarCarta()
function semiAmpliarCarta(pos) {
  const cartaInfo = cartasEmJogo[pos];

  cartasViradas.forEach((item) => {
    if (item.el.classList.contains("ativa") && item.info.id == pos) {
      document.querySelector(".jogadores").innerHTML = `
      <div class="caixa carta-semi-ampliada">
        <div class="caixa">
          <img src="assets/${cartaInfo.conteudo}" alt="${cartaInfo.conteudo}" />
        </div>
      </div>`;
    }
  });
}

function ampliarCarta(pos) {
  const cartaInfo = cartasEmJogo[pos];
  const overlay = document.querySelector(".overlay");

  overlay.classList.remove("escondido");
  overlay.innerHTML = `
    <div class="caixa carta-ampliada">
      <div class="caixa">
        <div class="botao-fechar">X</div>
        <img src="assets/${cartaInfo.conteudo}" />
      </div>
    </div>
  `;

  const fecharBotao = document.querySelector(".botao-fechar");
  overlay.addEventListener("click", esconderOverlay);
  fecharBotao.addEventListener("click", esconderOverlay);
}

function mostrarParFormado(parId, jogo = true) {
  console.log("oi");
  const parInfo = PARES[parId];
  const overlay = document.querySelector(".overlay");

  overlay.classList.remove("escondido");
  overlay.innerHTML = `
    <div class="caixa carta-ampliada">
      <div class="caixa">
        <div class="botao-fechar">X</div>
        <p class="texto-bounce">${jogo ? "Par formado!" : ""}</p>
        <img src="assets/${parInfo.imagem}" />
        <h2>${parInfo.texto}</h2>
      </div>
    </div>
  `;

  const fecharBotao = document.querySelector(".botao-fechar");

  overlay.addEventListener("click", esconderOverlay);
  fecharBotao.addEventListener("click", esconderOverlay);
}

function esconderOverlay(event) {
  if (event.target != event.currentTarget) return;

  const overlay = document.querySelector(".overlay");
  const fecharBotao = document.querySelector(".botao-fechar");

  overlay.classList.add("escondido");
  overlay.removeEventListener("click", esconderOverlay);
  fecharBotao.removeEventListener("click", esconderOverlay);
}

// função passarTurno(): passa o turno para o próximo jogador e desvira ou
// esconde as cartas, dependendo se formou par ou não
function passarTurno() {
  const [c1, c2] = cartasViradas;

  c1.el.classList.remove("ativa");
  c2.el.classList.remove("ativa");

  // deletar lista com as cartas viradas
  cartasViradas = [];

  // passar o turno para o próximo jogador
  if (formouPar) {
    jogadorAtual = jogadorAtual;
  } else if (jogadorAtual < 3) {
    jogadorAtual += 1;
  } else {
    jogadorAtual = 0;
  }

  carregarJogadores();

  // esconder o botão "Próx. Jogador"
  document.querySelector(".botoes").innerHTML = "";
}

function mostrarResultado() {
  jogadorAtual = null;
  carregarJogadores();

  let posVencedor = [];
  let maiorPontuacao = -1;

  for (let i = 0; i < jogadores.length; i++) {
    const { pontuacao } = jogadores[i];
    if (pontuacao > maiorPontuacao) {
      posVencedor = [i];
      maiorPontuacao = pontuacao;
    } else if (pontuacao === maiorPontuacao) {
      posVencedor.push(i);
    }
  }

  let pares = PARES.map(
    (par) => `
    <div class="caixa">
      <div class="caixa">
        <p>${par.texto}</p>
        <img src="assets/${par.imagem}" alt="${par.imagem}" />
      </div>
    </div>
  `
  );

  document.querySelector(".jogo").innerHTML = `
    <div class="resultado">
      <h2>Vencedor:</br> <u>Jogador ${posVencedor
        .map((pos) => pos + 1)
        .join(" + ")}</u></h2>
      <div>${pares.join("")}</div>
    </div>
  `;

  document
    .querySelectorAll(".resultado > div > .caixa")
    .forEach((el, index) => {
      el.addEventListener("click", () => mostrarParFormado(index, false));
    });

  document.querySelector(".botoes").innerHTML = `
    <button class="botao botao-reiniciar">REINICIAR</button>
    
  `;

  document
    .querySelector(".botao-reiniciar")
    .addEventListener("click", iniciarJogo);
}

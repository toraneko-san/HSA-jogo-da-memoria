import { PARES } from "./const.js";

let cartasEmJogo = [];
let cartasViradas = [];
let numParesFormados = null;

// função iniciarJogo(): inicia o jogo quando o jogador clicar no botão "Jogar"
function iniciarJogo() {
  cartasEmJogo = [];
  cartasViradas = [];
  numParesFormados = 0;

  carregarTabuleiro();
  
  document.querySelector(".botoes").innerHTML = "";
}

// quando clicar no botão "Jogar", chamar função iniciarJogo()
document.querySelector(".botao-jogar").addEventListener("click", iniciarJogo);
////

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
    el.addEventListener("mouseover", () => semiAmpliarCarta(index));
    el.addEventListener("mouseout", () => {
      document.querySelector(".carta-semi").innerHTML = "";
    });
  });
}

// função virarCarta(): vira a carta quando o jogador seleciona uma carta
function virarCarta(pos) {
  if (numParesFormados == null) return;

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
      // par feito
      setTimeout(() => {
        c1.el.classList.add("carta-pareada");
        c2.el.classList.add("carta-pareada");
        mostrarParFormado(c1.info.parId);
      }, 1000);

      // checar se todos os pares foram encontrados
      // se tiver, revelar botão "Fim do Jogo"
      numParesFormados++

      if (numParesFormados == PARES.length) {
        setTimeout(mostrarResultado, 1000);
        return;
      }
    } 
    // revelar botão "PRÓX. JOGADA"
    setTimeout(() => {
      document.querySelector(".botoes").innerHTML = `
        <button class="botao botao-proximo verde-claro">PRÓX. JOGADA</button>
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
    if (item.info.id == pos && item.info.tipo == "imagem") {
      document.querySelector(".carta-semi").innerHTML = `
      <div class="caixa carta-semi-ampliada">
        <div class="caixa">
          <img src="assets/${cartaInfo.conteudo}" alt="${cartaInfo.conteudo}" />
        </div>
      </div>`;
    } else if (item.info.id == pos && item.info.tipo == "texto") {
      document.querySelector(".carta-semi").innerHTML = `
      <div class="caixa carta-semi-ampliada">
        <div class="caixa">
          ${cartaInfo.conteudo}
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

function mostrarParFormado(parId, emJogo = true) {
  console.log("oi");
  const parInfo = PARES[parId];
  const overlay = document.querySelector(".overlay");

  overlay.classList.remove("escondido");
  overlay.innerHTML = `
    <div class="caixa carta-ampliada">
      <div class="caixa">
        <div class="botao-fechar">X</div>
        <p class="texto-bounce">${emJogo ? "Par formado!" : ""}</p>
        <h2>${parInfo.texto}</h2>
        <img src="assets/${parInfo.imagem}" />
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

  // esconder o botão "Próx. Jogador"
  document.querySelector(".botoes").innerHTML = "";
}

function mostrarResultado() {
  document.querySelector(".carta-semi").innerHTML = "";

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
      <h2>Fim do Jogo!</h2>
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

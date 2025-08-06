let jogadores = 
[{nome: "Jogador 1", cor: "red", pontuacao: 0} ,
{nome: "Jogador 2", cor: "green", pontuacao: 0},
{ nome: "Jogador 3", cor: "yellow", pontuacao: 0},
{ nome: "Jogador 4", cor: "blue", pontuacao: 0 }]

let jogadorAtual = 0;
let cartasViradas = [];
let bloqueado = false;

// Exibe o nome e pontuação de todos os jogadores

function mostrarPontuacao() {
  const container = document.querySelector(".jogadores"); // seleciona a div onde vai mostrar os jogadores
  container.innerHTML = ""; // limpa o conteúdo antigo

  jogadores.forEach((jogador, index) => {
    const p = document.createElement("p"); // cria um parágrafo
    p.innerText = `${jogador.nome}: ${jogador.pontuacao}`; // escreve nome + pontuação
    p.style.color = index === jogadorAtual ? jogador.cor : "black"; // se for a vez dele, mostra na cor certa
    container.appendChild(p); // adiciona o parágrafo na tela
  });
}

// Atualiza pontuação SOMENTE se acertar
function atualizarPontuacao(acertou) {
  if (acertou) {
    jogadores[jogadorAtual].pontuacao++;
  } else {
    jogadorAtual = (jogadorAtual + 1) % jogadores.length; // passa para o próximo jogador
  }

  mostrarPontuacao();
}
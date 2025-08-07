// Jogadores

let jogadores = 
[{nome: "Jogador 1", cor: "red", pontuacao: 0} ,
{nome: "Jogador 2", cor: "green", pontuacao: 0},
{ nome: "Jogador 3", cor: "yellow", pontuacao: 0},
{ nome: "Jogador 4", cor: "blue", pontuacao: 0 }];

let jogadorAtual = 0; //Índice do jogador que está jogando

function mostrarPontuaco() {
let container = document.querySelector(".jogadores");
container.innerHTML="";

jogadores.forEach((jogador, index) => {
let ativo = index === jogadorAtual ? "(jogando)" : "";
container.innerHTML += `<p style="color: ${jogador.cor}">${jogador.nome}: ${jogador.pontuacao}${ativo}</p>`;
});
}

function verificarPar (foiPar) {
  if (foiPar){
jogadores [jogadorAtual]. pontuacao += 1;
// continua jogando, então não muda o jogador
  } else {
jogadorAtual = (jogadorAtual + 1) % jogadores.length;
  }
mostrarPontuaco ()
}
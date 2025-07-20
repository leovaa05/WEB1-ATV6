const botaoIniciar = document.getElementById('botao-iniciar');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const entradaNome = document.getElementById('entrada-nome');
const inputNome = document.getElementById('nome-jogador');
const areaInformacoes = document.getElementById('area-informacoes');
const corAlvoTexto = document.getElementById('cor-alvo');
const pontuacaoTexto = document.getElementById('pontuacao');
const tempoTexto = document.getElementById('tempo');
const tabuleiro = document.getElementById('tabuleiro');
const telaFinal = document.getElementById('tela-final');
const nomeFinal = document.getElementById('nome-final');
const pontuacaoFinal = document.getElementById('pontuacao-final');

const CORES_DISPONIVEIS = ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja', 'Rosa', 'Marrom'];

const MAPA_CORES = {
  Vermelho: 'red',
  Azul: 'blue',
  Verde: 'green',
  Amarelo: 'yellow',
  Roxo: 'purple',
  Laranja: 'orange',
  Rosa: 'pink',
  Marrom: 'brown'
};

let coresAtuais = [];
let corAlvo = '';
let pontuacao = 0;
let tempoRestante = 30;
let intervaloTempo = null;

function iniciarJogo() {
  const nome = inputNome.value.trim();

  if (!nome) {
    alert('Por favor, digite seu nome antes de jogar!');
    return;
  }

  entradaNome.classList.add('esconder');
  botaoIniciar.classList.add('esconder');
  telaFinal.classList.add('esconder');
  botaoReiniciar.classList.add('esconder');

  areaInformacoes.classList.remove('esconder');
  tabuleiro.classList.remove('esconder');

  pontuacao = 0;
  tempoRestante = 30;
  pontuacaoTexto.textContent = pontuacao;
  tempoTexto.textContent = tempoRestante;

  gerarTabuleiro();
  escolherCorAlvo();
  iniciarCronometro();
}

function gerarTabuleiro() {
  tabuleiro.innerHTML = '';
  coresAtuais = [];

  for (let i = 0; i < 16; i++) {
    const corAleatoria = CORES_DISPONIVEIS[Math.floor(Math.random() * CORES_DISPONIVEIS.length)];
    coresAtuais.push(corAleatoria);

    const quadrado = document.createElement('div');
    quadrado.classList.add('quadrado');
    quadrado.style.backgroundColor = MAPA_CORES[corAleatoria]; // Usar cor em inglês
    quadrado.dataset.cor = corAleatoria;

    quadrado.addEventListener('click', verificarClique);

    tabuleiro.appendChild(quadrado);
  }
}

function escolherCorAlvo() {
  const corSorteada = coresAtuais[Math.floor(Math.random() * coresAtuais.length)];
  corAlvo = corSorteada;
  corAlvoTexto.textContent = corAlvo;
}

function verificarClique(evento) {
  const corClicada = evento.target.dataset.cor;

  if (corClicada === corAlvo) {
    pontuacao += 10;
  } else {
    pontuacao -= 5;
    if (pontuacao < 0) pontuacao = 0;
  }

  pontuacaoTexto.textContent = pontuacao;

  gerarTabuleiro();
  escolherCorAlvo();
}

function iniciarCronometro() {
  if (intervaloTempo) clearInterval(intervaloTempo);

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    tempoTexto.textContent = tempoRestante;

    if (tempoRestante <= 0) {
      finalizarJogo();
    }
  }, 1000);
}

function finalizarJogo() {
  clearInterval(intervaloTempo);

  nomeFinal.textContent = inputNome.value.trim();
  pontuacaoFinal.textContent = pontuacao;

  telaFinal.classList.remove('esconder');
  areaInformacoes.classList.add('esconder');
  tabuleiro.classList.add('esconder');

  botaoReiniciar.classList.remove('esconder');
}

botaoIniciar.addEventListener('click', iniciarJogo);

botaoReiniciar.addEventListener('click', () => {
  // Resetar visual para o início
  telaFinal.classList.add('esconder');
  entradaNome.classList.remove('esconder');
  botaoIniciar.classList.remove('esconder');
  botaoReiniciar.classList.add('esconder');

  pontuacao = 0;
  tempoTexto.textContent = '--';
  pontuacaoTexto.textContent = '0';
  corAlvoTexto.textContent = '---';
  tabuleiro.innerHTML = '';
});
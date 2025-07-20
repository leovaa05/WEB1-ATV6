const botaoIniciar = document.getElementById('botao-iniciar');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const inputNome = document.getElementById('nome-jogador');
const areaInformacoes = document.getElementById('area-informacoes');
const corAlvoTexto = document.getElementById('cor-alvo');
const pontuacaoTexto = document.getElementById('pontuacao');
const tempoTexto = document.getElementById('tempo');
const tabuleiro = document.getElementById('tabuleiro');
const telaFinal = document.getElementById('tela-final');
const nomeFinal = document.getElementById('nome-final');
const pontuacaoFinal = document.getElementById('pontuacao-final');

const CORES_DISPONIVEIS = ['vermelho', 'azul', 'verde', 'amarelo', 'roxo', 'laranja', 'rosa', 'marrom'];

const MAPA_CORES = {
  vermelho: 'red',
  azul: 'blue',
  verde: 'green',
  amarelo: 'yellow',
  roxo: 'purple',
  laranja: 'orange',
  rosa: 'pink',
  marrom: 'brown'
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

  inputNome.classList.add('esconder');
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
    quadrado.style.backgroundColor = MAPA_CORES[corAleatoria]; // Usa cor em inglês para o estilo
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
  telaFinal.classList.add('esconder');
  inputNome.classList.remove('esconder');
  botaoIniciar.classList.remove('esconder');
  botaoReiniciar.classList.add('esconder');
  pontuacao = 0;
  pontuacaoTexto.textContent = pontuacao;
  tempoTexto.textContent = '--';
  corAlvoTexto.textContent = '---';
  tabuleiro.innerHTML = '';
});

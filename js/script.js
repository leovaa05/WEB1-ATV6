const botaoIniciar = document.getElementById('botao-iniciar');
const areaInformacoes = document.getElementById('area-informacoes');
const corAlvoTexto = document.getElementById('cor-alvo');
const pontuacaoTexto = document.getElementById('pontuacao');
const tempoTexto = document.getElementById('tempo');
const tabuleiro = document.getElementById('tabuleiro');

const CORES_DISPONIVEIS = ['vermelho', 'azul', 'verde', 'amarelo', 'roxo', 'laranja', 'rosa', 'marrom'];
let coresAtuais = [];
let corAlvo = '';
let pontuacao = 0;
let tempoRestante = 30;
let intervaloTempo = null;

function iniciarJogo() {
  pontuacao = 0;
  tempoRestante = 30;
  pontuacaoTexto.textContent = pontuacao;
  tempoTexto.textContent = tempoRestante;
  areaInformacoes.classList.remove('esconder');
  tabuleiro.classList.remove('esconder');
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
    quadrado.style.backgroundColor = corAleatoria;
    quadrado.dataset.cor = corAleatoria;

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

function finalizarJogo() {
  clearInterval(intervaloTempo);
  alert(`Fim de jogo!\nSua pontuação: ${pontuacao}`);
  botaoIniciar.textContent = 'Jogar novamente';
  areaInformacoes.classList.add('esconder');
  tabuleiro.classList.add('esconder');
}

botaoIniciar.addEventListener('click', iniciarJogo);

// ... código anterior permanece igual ...

function gerarTabuleiro() {
  tabuleiro.innerHTML = '';
  coresAtuais = [];

  for (let i = 0; i < 16; i++) {
    const corAleatoria = CORES_DISPONIVEIS[Math.floor(Math.random() * CORES_DISPONIVEIS.length)];
    coresAtuais.push(corAleatoria);

    const quadrado = document.createElement('div');
    quadrado.classList.add('quadrado');
    quadrado.style.backgroundColor = corAleatoria;
    quadrado.dataset.cor = corAleatoria;

    quadrado.addEventListener('click', verificarClique);

    tabuleiro.appendChild(quadrado);
  }
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

const perguntas = [
  {
    pergunta: "Qual tag HTML liga um arquivo CSS à página?",
    opcoes: ["<link>", "<style>", "<css>", "<script>"],
    correta: 0
  },
  {
    pergunta: "Qual método do JavaScript seleciona um elemento pelo id?",
    opcoes: [
      "document.getElementById()",
      "document.querySelectorAll()",
      "document.createElement()",
      "document.write()"
    ],
    correta: 0
  },
  {
    pergunta: "Qual propriedade CSS muda a cor do texto?",
    opcoes: ["background-color", "color", "font-style", "border-color"],
    correta: 1
  },
  {
    pergunta: "Qual evento é disparado quando o usuário clica em um botão?",
    opcoes: ["submit", "change", "click", "load"],
    correta: 2
  },
  {
    pergunta: "O que a função parseFloat() faz?",
    opcoes: [
      "Arredonda um número",
      "Converte um texto em número decimal",
      "Remove um elemento da página",
      "Soma dois valores"
    ],
    correta: 1
  }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondida = false;

const secaoQuiz = document.getElementById("quiz");
const secaoResultado = document.getElementById("resultado");
const barra = document.getElementById("barra");
const contador = document.getElementById("contador");
const textoPergunta = document.getElementById("pergunta");
const listaOpcoes = document.getElementById("opcoes");
const botaoProxima = document.getElementById("proxima");
const textoPontuacao = document.getElementById("pontuacao");
const textoMensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("reiniciar");

function mostrarPergunta() {
  const atual = perguntas[indiceAtual];
  respondida = false;

  contador.textContent = "Pergunta " + (indiceAtual + 1) + " de " + perguntas.length;
  textoPergunta.textContent = atual.pergunta;
  barra.style.width = (indiceAtual / perguntas.length) * 100 + "%";
  listaOpcoes.innerHTML = "";

  atual.opcoes.forEach(function (texto, i) {
    const botao = document.createElement("button");
    botao.textContent = texto;
    botao.className = "opcao";
    botao.addEventListener("click", function () {
      verificarResposta(i);
    });
    listaOpcoes.appendChild(botao);
  });

  botaoProxima.textContent =
    indiceAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima";
  botaoProxima.hidden = true;
}

function verificarResposta(escolhida) {
  if (respondida) {
    return;
  }

  respondida = true;

  const correta = perguntas[indiceAtual].correta;
  const botoes = listaOpcoes.querySelectorAll(".opcao");

  botoes.forEach(function (botao, i) {
    botao.disabled = true;

    if (i === correta) {
      botao.classList.add("certa");
    } else if (i === escolhida) {
      botao.classList.add("errada");
    }
  });

  if (escolhida === correta) {
    pontuacao++;
  }

  barra.style.width = ((indiceAtual + 1) / perguntas.length) * 100 + "%";
  botaoProxima.hidden = false;
}

function mostrarResultado() {
  const total = perguntas.length;
  const porcentagem = pontuacao / total;

  secaoQuiz.hidden = true;
  secaoResultado.hidden = false;
  textoPontuacao.textContent = "Você acertou " + pontuacao + " de " + total;

  if (porcentagem === 1) {
    textoMensagem.textContent = "Perfeito! Você dominou a disciplina.";
  } else if (porcentagem >= 0.6) {
    textoMensagem.textContent = "Muito bem! Você está no caminho certo.";
  } else {
    textoMensagem.textContent = "Vale revisar o conteúdo e tentar de novo.";
  }
}

botaoProxima.addEventListener("click", function () {
  indiceAtual++;

  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

botaoReiniciar.addEventListener("click", function () {
  indiceAtual = 0;
  pontuacao = 0;
  secaoResultado.hidden = true;
  secaoQuiz.hidden = false;
  mostrarPergunta();
});

mostrarPergunta();
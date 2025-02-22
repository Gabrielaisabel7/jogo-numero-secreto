//agora estou mexendo para selecionar o titulo da pagina do html (h1) com comandos do JS.
//let title = document.querySelector('h1');
// o title.innerHTML (como já diz a tradução: 'dentro do HTML') é para inserir um texto no h1 q foi o escolhido.
//title.innerHTML = 'Jogo do número secreto!';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Digite um  número entre 1 e 18:';
//usando a função para fazer de forma que seja mais prático, 
let listaNumSorteados = []
let numeroLimite = 10;
let numeroSecreto = criarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMnsgInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', 'Digite um número entre 1 e 10:');
}
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas!' : 'tentativa!';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}
function criarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

  let quantiddadeDeElementosNaLista = listaNumSorteados.length;
    if (quantiddadeDeElementosNaLista == numeroLimite){
      listaNumSorteados = [];
}
  if (listaNumSorteados.includes(numeroEscolhido)) {
    return criarNumeroAleatorio();
  } else {
    listaNumSorteados.push(numeroEscolhido);
    console.log(listaNumSorteados);
    return numeroEscolhido;
  }
}
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = criarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMnsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

exibirMnsgInicial();
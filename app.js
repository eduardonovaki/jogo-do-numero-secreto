let listaDeNumerosSorteados = [];
let numeroSecreto = geradorDeNumero();
let tentativas = 0;
const somAcerto = new Audio("./img/hino.mp3");


function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {
        rate:1.2})
}
function exibirMensagemInicial() {
    exibirTexto('h1','Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        tentativas++;
        somAcerto.currentTime = 0;
        somAcerto.play();
        document.getElementById('ronyDireita').src = "./img/ronypeca.png";
        document.getElementById('ronyDireita').style.width = '600px';
        if (tentativas < 2){
            exibirTexto('h1', `Parabéns!\n Acertou com ${tentativas} tentativa!`);
            exibirTexto('p', 'Você descobriu o número secreto!'); 
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else{
        exibirTexto('h1', `Acertou com ${tentativas} tentativas!`);
        exibirTexto('p', 'Você descobriu o número secreto!');   
        document.getElementById('reiniciar').removeAttribute('disabled');   
    }
    } else{
        if (chute > numeroSecreto){
            tentativas++;
            exibirTexto('p', `O número secreto é menor que ${chute}`);
        } else {
            tentativas++;
            exibirTexto('p', `O número secreto é maior que ${chute}`);
        }
    } limparCampo();
}

function geradorDeNumero(){
   let numeroEscolhido = parseInt(Math.random() * 100 + 1);
   if (listaDeNumerosSorteados.length == 100){
    listaDeNumerosSorteados = [];
   }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return geradorDeNumero();
   } else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log (listaDeNumerosSorteados);
    return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = geradorDeNumero();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    somAcerto.pause();
    somAcerto.currentTime = 0;
    document.getElementById('ronyDireita').src = "./img/ronydpe.png";
    document.getElementById('ronyDireita').style.width = '200px';
}
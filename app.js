
let listaNumeroSorteado = []
let numeroMaximo = 50 
let = numeroSecreto = gerador();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
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

function exibirMensagemInicial(){

    exibirTextoNaTela('h1', 'Bem vindo ao jogo do número secreto');
    exibirTextoNaTela('p', `escolha um número de 1 a ${numeroMaximo}, para começar`);

}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela ('h1', 'acertou');
        let  palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let  mensagemTentativa = `parabéns você acertou com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativa,);
        document.getElementById('reiniciar').removeAttribute('disabled');
        }else{
            if (chute > numeroSecreto){
                exibirTextoNaTela('h1', 'não foi dessa vez');
                exibirTextoNaTela('p', 'número secreto é menor que o chute dado')
            }
            else{
                exibirTextoNaTela('h1', 'não foi dessa vez')
                exibirTextoNaTela('p', 'o número secreto é maior que o chute dado')
            }
            tentativas++;
            limparCampo();
        }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerador() {
    let numeroEscolhido = parseInt(Math.random() *numeroMaximo + 1);
    let quantidadeElementos = listaNumeroSorteado.length;

    if(quantidadeElementos == numeroMaximo){
        listaNumeroSorteado = [];
    }

    if(listaNumeroSorteado.includes(numeroEscolhido)){
        return gerador();
    } else{
        listaNumeroSorteado.push(numeroEscolhido);
        console.log(listaNumeroSorteado)
        return numeroEscolhido;
    }
    
}

function reiniciarJogo(){
    numeroSecreto = gerador();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
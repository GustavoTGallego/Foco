//Objetos://
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.getElementById("alternar-musica")
const startPauseBt = document.getElementById("start-pause")
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')



let tempoDecorridoEmSegundos = 1500
let intervaloID = null; // Corrigir o nome da variável

const musica = new Audio('./sons/luna-rise-part-one.mp3')  
musica.loop = true

const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')


//Eventos//////////////////////////////////////////////////////////
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})


longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
}) 

//FUNÇÕES//////////////////////////////////////////////////////////
function alterarContexto(contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto) //mudar a cor de fundo
    banner.setAttribute('src', `./imagens/${contexto}.png`) //muda a imagem de fundo
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        
        case "descanso-curto":
            titulo.innerHTML = ` Que tal dar uma respirada? <br> <strong class="app__title-strong"> Faça uma pausa curta! </strong>
            `
            break;
        case "descanso-longo": 
            titulo.innerHTML = ` Hora de voltar à superficíe. <br> <strong class="app__title-strong">  Faça uma pausa longa!  </strong>
            `
            break;
    } //muda o texto
    botoes.forEach(function(contexto){
        contexto.classList.remove('active'); //Remove a classe active dos botões
    })


}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        zerar()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloID){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloID = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
}


function zerar() {
    clearInterval(intervaloID) 
    iniciarOuPausarBt.textContent = "Começar"
    intervaloID = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo()


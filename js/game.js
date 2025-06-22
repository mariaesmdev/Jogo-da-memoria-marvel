const grid = document.querySelector('.grid');
let firstCard = '';
let secondCard = '';
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'capitã',
    'capitao',
    'hulk',
    'iron',
    'pantera',
    'spiderman',
    'strange',
    'thor',
    'viuva',
    'arqueir0',
];
let gameTimerInterval; 

function createElement (tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function revealCard ({ target }){
    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
         secondCard = target.parentNode;
    } 

    checkMatch();

} /* */

function createCard (character) { 
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.jpeg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character); /*dar atributo para cada personagem*/
    return card;
}

function checkEndGame(){
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20){
        clearInterval(gameTimerInterval);
        alert (`Você conseguiu! Ganhou o jogo em ${timer.innerHTML}`);
    }
}

function checkMatch(){
    const firstCharacter = firstCard.getAttribute('data-character');
   const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
         firstCard.firstChild.classList.add('disabled-card');
         secondCard.firstChild.classList.add('disabled-card');
         resetBoard();
         clearInterval(this.loop);
         checkEndGame();
        
    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
             resetBoard();
        }, 800);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = ['', '', false];
}

function loadGame (){
    const duplicateCharacters = [...characters, ...characters]; /*espalha o array aqui*/
    const shuffledArray = duplicateCharacters.sort(()=> Math.random() - 0.5);
   
    shuffledArray.forEach((character) => { /*vai criar as cartas por carta */
       const card = createCard(character);
       grid.appendChild(card);
    });
}

let seconds = 0;

function startTime() {
    timer.innerHTML = seconds;
    
    gameTimerInterval = setInterval(() => { 
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }, 1000);
}

window.onload = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    loadGame();
    startTime();
}





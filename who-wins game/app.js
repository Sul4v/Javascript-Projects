/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// Selecting DOM elements
const btnRollDice = document.querySelector('.btn-roll'),
    btnHold = document.querySelector('.btn-hold'),
    btnNewGame = document.querySelector('.btn-new'),
    scoreZero = document.getElementById('score-0'),
    scoreOne = document.getElementById('score-1'),
    diceImg = document.querySelector('.dice'),
    playerZeroDivUI = document.querySelector('.player-0-panel'),
    playerOneDivUI = document.querySelector('.player-1-panel');

let currentScore = 0,
    playerZeroScore = 0,
    playerOneScore = 0,
    activePlayer = 0;
    

//Initializing WebPage

init();

function init(){

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    scoreZero.textContent = '0';
    scoreOne.textContent = '0';

    diceImg.style.display = 'none';
}

// When the rollDice button is clicked

btnRollDice.addEventListener('click', rollDice)

function rollDice(){

    let diceValue = Math.floor((Math.random()*6)+1);
    const currentScoreUI = document.getElementById(`current-${activePlayer}`)

    //checking diceValue whether 1 or else
    if(diceValue === 1){

        nextPlayer();

    }else{
        //Dice
        diceImg.style.display = 'block';
        diceImg.src = `dice-${diceValue}.png`;

        //currentValue
        currentScore += diceValue;
        currentScoreUI.textContent = currentScore;
    }

    // console.log(`dice value is ${diceValue}`);
    // console.log(`current score is ${currentScore}`);
}

//When holdBtn is clicked

btnHold.addEventListener('click', holdValue);

function holdValue(){
    
    if(activePlayer == 0){
        playerZeroScore += currentScore;

        scoreZero.textContent = playerZeroScore;

    }else{
        playerOneScore += currentScore;

        scoreOne.textContent = playerOneScore;
    }
    checkWin();
    nextPlayer();
}

function checkWin(){
    if(playerZeroScore >= 20){
        playerZeroDivUI.classList.add('winner');
    }
    if(playerOneScore >= 20 ){
        playerOneDivUI.classList.add('winner');
    }
}

function nextPlayer(){
    //Changing active player
    activePlayer = (activePlayer == 1) ? 0 : 1;

    //Resetting the current score
    currentScore = 0;

    //Resetting the current score of the previous player
    let previousPlayer = (activePlayer == 1) ? 0 : 1;
    document.getElementById(`current-${previousPlayer}`).textContent = '0';
    
    //Changing the active class
    playerZeroDivUI.classList.toggle('active');
    playerOneDivUI.classList.toggle('active');

    //Removing the dice image
    diceImg.style.display = 'none';
}
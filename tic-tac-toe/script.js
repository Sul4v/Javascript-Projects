// Getting all the dom elements

const restartBtn = document.getElementById('restart-button');
const resetBtn = document.getElementById('reset-button')
const boxes = document.querySelectorAll('.box-container > div')
const boxArr = Array.from(boxes);
const UIscoreX = document.getElementById('score-x');
const UIscoreO = document.getElementById('score-o');
const UIresult = document.querySelector('.result');

const winningCombination = [[boxArr[1], boxArr[2], boxArr[3]],
                            [boxArr[1], boxArr[4], boxArr[7]],
                            [boxArr[1], boxArr[5], boxArr[9]],
                            [boxArr[2], boxArr[5], boxArr[8]],
                            [boxArr[3], boxArr[6], boxArr[9]],
                            [boxArr[7], boxArr[8], boxArr[9]],
                            [boxArr[3], boxArr[5], boxArr[7]],
                            [boxArr[4], boxArr[5], boxArr[6]]]

// Initiating variables

let score0, score1, activePlayer, gamePlaying, xArray = [], oArray = [];

gamePlaying = 1;
activePlayer = 0;

// Initializing The Game
init();

// On clicking the div

for(let el in boxArr){
    boxArr[el].addEventListener('click', function(){
        
        if(gamePlaying){
            if(boxArr[el].textContent === ""){
                if(activePlayer == 0){
                    boxArr[el].textContent = 'X';
                    xArray.push(boxArr[el]);
                    if(checkWin()){
                        console.log('wins');
                    }else{
                        activePlayer = 1;
                    }
                    
                }else{
                    boxArr[el].textContent = 'O';
                    oArray.push(boxArr[el]);
                    if(checkWin()){
                        console.log('wins');
                    }else{
                        activePlayer = 0;
                    }
                }
                UIscoreX.classList.toggle('current-player');
                UIscoreO.classList.toggle('current-player');
            }
        }
    });
}


//Check for win
function checkWin(){
    if(xArray.length >= 3 || oArray.length >= 3){
        if(activePlayer == 0){
            for(i=0; i < 8; i++){
                if(arrayChecker(xArray, winningCombination[i])){
                    return true;
                }
            }
        }else{
            for(i=0; i < 8; i++){
                if(arrayChecker(oArray, winningCombination[i])){
                    return true;
                }
            }
        }
        
    }
}

//confirm the winning combination
function arrayChecker(haveArr, winArr){
    return winArr.every(val => haveArr.includes(val));
}


function init(){
    score0 = 0;
    score1 = 0;
    activePlayer = 0;
    xArray = [];
    oArray = [];

    UIresult.style.display = 'none';

    UIscoreX.classList.remove('current-player');
    UIscoreO.classList.remove('current-player');
    UIscoreX.classList.add('current-player');

    for(const box of boxes){
        box.textContent = '';
    }
}

function restartGame(){
    activePlayer = 0;
    xArray = [];
    oArray = [];

    UIresult.style.display = 'none';

    UIscoreX.classList.remove('current-player');
    UIscoreO.classList.remove('current-player');
    UIscoreX.classList.add('current-player');

    for(const box of boxes){
        box.textContent = '';
    }
}



//On clicking the restart button
resetBtn.addEventListener('click', init);

// ON clicking the restart button
restartBtn.addEventListener('click', restartGame);
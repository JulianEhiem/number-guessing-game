let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lowOrHigh = document.querySelector('.lowOrHigh');
const lastResult = document.querySelector('.lastResult');
const overlay = document.querySelector('.overlay');


const guessField = document.querySelector('.guessField');
const guessFieldSubmit = document.querySelector('.guessFieldSubmit');

let guessCount = 1;
let resetButton;
guessField.focus();


function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = "Previous guesses: ";
    }
    guesses.textContent += userGuess + ', ';

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations!!! You got it right!!!";
        lastResult.style.backgroundColor = '#63F5B7';
        lowOrHigh.textContent = " ";
        setGameOver();
    }
    else if (guessCount === 10) {
        lastResult.textContent = "!!!GAME OVER!!!";
        setGameOver();
    }
    else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = '#FF3636';
        if (userGuess < randomNumber) {
            lowOrHigh.textContent = "Last guess was too low!"
        } else if (userGuess > randomNumber) {
            lowOrHigh.textContent = "Last guess was too high!"
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();

}

guessFieldSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keydown', (e) => {

    if (e.code == 'Enter') {
        checkGuess();
    }
});

function setGameOver() {
    guessField.disabled = true;
    guessFieldSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = "Start new game";
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    overlay.style = "background-color: black; height: 100%; width: 100%; opacity: 0.7; z-index: 1;";
}


function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p')
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessFieldSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    overlay.style = '';

    lastResult.style.backgroundColor = '#F4ADAD';


    randomNumber = Math.floor(Math.random() * 100) + 1;
}
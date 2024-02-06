const wordsList = ["hello", "world", "javascript", "coding", "hangman"]; // Add more words as desired
let wordToGuess = wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
let attempts = 6;
let guessedLetters = [];
let wrongLetters = [];
const hangmanStages = [
  '',
  '  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========\'\'\'', // First failed attempt
  '  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========\'\'\'', // Second failed attempt
  '  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========\'\'\'', // Third failed attempt
  '  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========\'\'\'', // Fourth failed attempt
  '  +---+\n  |   |\n  O   |\n /|\  |\n      |\n      |\n=========\'\'\'', // Fifth failed attempt
  '  +---+\n  |   |\n  O   |\n /|\  |\n /    |\n      |\n=========\'\'\'', // Sixth failed attempt
  '  +---+\n  |   |\n  O   |\n /|\  |\n / \  |\n      |\n=========\'\'\'', // Final state
];

function displayWord() {
    const wordDisplay = document.getElementById('word');
    wordDisplay.innerHTML = wordToGuess
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : "_")
        .join(' ');
}

function updateAttempts() {
    document.getElementById('attempts').innerHTML = `You still have <span>${attempts}</span> attempts`;
}

function updateWrongLetters() {
    document.getElementById('wrong-letters').innerHTML = `Wrong letters you chose: ${wrongLetters.join(', ')}`;
}

function updateHangmanDrawing() {
    const hangmanDrawing = document.getElementById('hangman-drawing');
    const stage = 6 - attempts;
    hangmanDrawing.textContent = hangmanStages[stage];
}

function guessLetter() {
    const userInput = document.getElementById('user-input');
    const guessedLetter = userInput.value.toUpperCase();
    
    if (guessedLetter && /^[A-Z]$/.test(guessedLetter)) {
        if (wordToGuess.includes(guessedLetter)) {
            if (!guessedLetters.includes(guessedLetter)) {
                guessedLetters.push(guessedLetter);
            }
        } else {
            if (!wrongLetters.includes(guessedLetter)) {
                wrongLetters.push(guessedLetter);
                attempts--;
                updateAttempts();
                updateHangmanDrawing();
            }
        }
        displayWord();
        updateWrongLetters();
    }
    userInput.value = ''; 
    checkGameOver();
}

function checkGameOver() {
    // Check if the game is over
    if (attempts <= 0) {
        alert(`Game Over! The word was ${wordToGuess}`);
        document.getElementById('user-input').disabled = true;
        return;
    }
    
    // Check if the word is fully guessed
    if (!wordToGuess.split('').find(letter => !guessedLetters.includes(letter))) {
        alert("Congratulations, You Won!");
        document.getElementById('user-input').disabled = true;
    }
}

// Initial setup
displayWord();
updateAttempts();
updateWrongLetters();
updateHangmanDrawing(); 

// Reset the game for a new word
function resetGame() {
    wordToGuess = wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
    attempts = 6;
    guessedLetters = [];
    wrongLetters = [];
    displayWord();
    updateAttempts();
    updateWrongLetters();
    updateHangmanDrawing();
    document.getElementById('user-input').disabled = false;
}


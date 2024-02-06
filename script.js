const words = ["hangman", "javascript", "programming", "developer", "web"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill("_");
let wrongLetters = [];
let remainingAttempts = 6;

function displayWord() {
    document.getElementById("word-display").textContent = guessedWord.join(" ");
}

function displayWrongLetters() {
    document.getElementById("wrong-letters").textContent = `Wrong Letters: ${wrongLetters.join(", ")}`;
}

function displayAttempts() {
    document.getElementById("remaining-attempts").textContent = remainingAttempts;
}

function guessLetter() {
    const inputElement = document.getElementById("letter-input");
    const letter = inputElement.value.toLowerCase();

    if (letter && /^[a-zA-Z]$/.test(letter)) {
        if (selectedWord.includes(letter)) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                remainingAttempts--;
            }
        }

        displayWord();
        displayWrongLetters();
        displayAttempts();

        if (guessedWord.join("") === selectedWord) {
            alert("Congratulations! You guessed the word.");
            resetGame();
        }

        if (remainingAttempts === 0) {
            alert(`Sorry, you ran out of attempts. The word was: ${selectedWord}`);
            resetGame();
        }

        inputElement.value = "";
    } else {
        alert("Please enter a valid single letter.");
    }
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    wrongLetters = [];
    remainingAttempts = 6;

    displayWord();
    displayWrongLetters();
    displayAttempts();
}

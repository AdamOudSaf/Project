let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function makeMove(index) {
    if (gameOver || board[index] !== "") return;

    const cell = document.querySelectorAll('.cell')[index];
    cell.textContent = currentPlayer;
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            alert(`Player ${board[a]} wins!`);
            highlightWinningCombo(combo);
            return;
        }
    }

    if (!board.includes("") && !gameOver) {
        gameOver = true;
        alert("It's a tie!");
    }
}

function highlightWinningCombo(combo) {
    combo.forEach(index => {
        const cell = document.querySelectorAll('.cell')[index];
        cell.classList.add('winner');
    });
}

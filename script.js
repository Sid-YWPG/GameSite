let currentPlayer = 'X';
let xScore = 0;
let oScore = 0;
let mode = ''; // 'single' or 'multi'
let canPlay = true; // Flag to control user input
const cells = document.querySelectorAll('.cell');
const xScoreDisplay = document.getElementById('x-score');
const oScoreDisplay = document.getElementById('o-score');
const winPopup = document.getElementById('win-popup');
const losePopup = document.getElementById('lose-popup');
const drawPopup = document.getElementById('draw-popup');
const winMessage = document.getElementById('win-message');
const loseMessage = document.getElementById('lose-message');

function selectMode(selectedMode) {
    mode = selectedMode;
    resetBoard();
    if (mode === 'single' && currentPlayer === 'O') {
        makeAIMoveWithDelay();
    }
    updateButtonStyles();
}

function play(cellIndex) {
    if (!cells[cellIndex].textContent && canPlay) {
        cells[cellIndex].textContent = currentPlayer;
        if (checkWin()) {
            displayWinPopup();
            currentPlayer === 'X' ? xScore++ : oScore++;
            updateScore();
            resetBoard();
        } else if (checkDraw()) {
            displayDrawPopup();
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (mode === 'single' && currentPlayer === 'O') {
                canPlay = false; // Disable user input
                makeAIMoveWithDelay();
            }
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(cellIndex =>
            cells[cellIndex].textContent === currentPlayer
        )
    );
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function updateScore() {
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
}

function displayWinPopup() {
    winMessage.textContent = currentPlayer + ' wins!';
    winPopup.style.display = 'flex';
}

function displayDrawPopup() {
    const drawMessage = 'It\'s a Tie!';
    drawPopup.style.display = 'flex';
}

function closePopup() {
    winPopup.style.display = 'none';
    losePopup.style.display = 'none';
    drawPopup.style.display = 'none';
}

function makeAIMoveWithDelay() {
    setTimeout(() => {
        makeAIMove();
        canPlay = true; // Enable user input after AI move
    }, 300); // Delay of 300 milliseconds
}

function makeAIMove() {
    let emptyCells = [];
    cells.forEach((cell, index) => {
        if (cell.textContent === '') {
            emptyCells.push(index);
        }
    });
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiMoveIndex = emptyCells[randomIndex];
    cells[aiMoveIndex].textContent = 'O';
    currentPlayer = 'X';
}

function updateButtonStyles() {
    const singleplayerBtn = document.getElementById('singleplayer-btn');
    const multiplayerBtn = document.getElementById('multiplayer-btn');

    if (mode === 'single') {
        singleplayerBtn.classList.add('selected');
        multiplayerBtn.classList.remove('selected');
    } else if (mode === 'multi') {
        multiplayerBtn.classList.add('selected');
        singleplayerBtn.classList.remove('selected');
    }
}

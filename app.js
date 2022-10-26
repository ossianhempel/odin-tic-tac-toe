const form = document.querySelector('#myForm');
const modal = document.querySelector('#modal');
const restartButton = document.querySelector('#restartButton');
const board = document.querySelector('#board');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    showModal();
    InitializeGame(data);
});

// initialize the object variables
const initializaVariables = (data) => {
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    data.p1 = 'X'
    data.p2 = 'O'
    data.round = 0;
    data.currentPlayer = 'X';
    data.gameOver = false;
}

const addEventListenersToBoard = (data) => {
    const gridCells = document.querySelectorAll('[data-cell]');
    gridCells.forEach(cell => {
        cell.addEventListener('click', (event) => {
            handleClick(event.target, data);
        })
    });

}

// initialize the game
const InitializeGame = (data) => {

    initializaVariables(data);

    addEventListenersToBoard(data);

    
};




// show/hide modal
function showModal() {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
};

// TODO functionality to reset the board 


let circleTurn = true;

// TODO set win conditions

// What happens when player clicks on the board
function handleClick(e, data) {
    
    console.log(e, data);

    addMark(e, data);
    
    // TODO switch player (change class on board)
    // switchPlayer(e, data);

    // TODO check if someone's won
        // * If so - trigger Modal with appropriate winning message

    // Check Winning conditions
    
    
    nextRound(data);
    
};

// Place user's mark on the board and replace the cell's index in the board array with x/o
function addMark(e, data) {
    
    const board = data.board;
    const index = e.id;  

    if (data.currentPlayer === 'X') {
        e.textContent = 'X'
        e.classList.add('X')
        data.board[index] = 'X';
    } else {
        e.textContent = 'O';
        e.classList.add('O')
        data.board[index] = 'O';
    }
}

// Swith player between x/o
function switchPlayer() {
    if (circleTurn === true) {
        circleTurn = false;
        board.setAttribute('class', 'board x');

    } else {
        circleTurn = true;
        board.setAttribute('class', 'board o');

    }
}

// TODO iterate data.round
function nextRound(data) {
    data.round++;
}





// TODO Add AI using MinMax-algorithm


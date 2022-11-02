const form = document.querySelector('#myForm');
const modal = document.querySelector('#modal');
const restartModal = document.querySelector('#restartModal');
restartModal.style.display = 'none';
const restartButton = document.querySelector('#restartButton');
const backToMenuButton = document.querySelector('#backToMenuButton');

const board = document.querySelector('#board');


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]


form.addEventListener('submit', (e) => {
    // prevent page refresh
    e.preventDefault();
    
    // initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    showModal('modal');
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


// TODO turn into module?
const addEventListenersToBoard = (data) => {
    const gridCells = document.querySelectorAll('[data-cell]');
    gridCells.forEach(cell => {
        cell.addEventListener('click', (event) => {
            handleClick(event.target, data);
        });
    });
}

// TODO add eventlisteners to the buttons
    // * turn into module?
const addEventListenersToButtons = (data) => {
    const dataObject = data;
    
    restartButton.addEventListener('click', () => {
        resetBoard(dataObject);
        showModal('restartModal');
    })

    // TODO fix this one!!! similar to the one above 
        // * Rework?
    backToMenuButton.addEventListener('click', () => {
        resetBoard(dataObject);
        showModal('restartModal');
        showModal('modal');
    
    });
}


const InitializeGame = (data) => {

    initializaVariables(data);

    addEventListenersToBoard(data);

    addEventListenersToButtons(data);
    
};



// TODO REWORK show/hide modal based on which modal is passed as an argument 
function showModal(whichModal) {
    if (whichModal === 'modal') {
        if (modal.style.display === 'none') {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    } else if (whichModal === 'restartModal') {
        if (restartModal.style.display === 'none') {
            restartModal.style.display = 'block';
        } else {
            restartModal.style.display = 'none';
        }
    }
};

// const showModal = (data) => {

// }


// // What happens when player clicks on the board
const handleClick = (e, data) => {
    if (data.gameOver && data.round > 8) {
        return
    }
    
    if (data.board[e.id] !== 'X' && data.board[e.id] !== 'O'){
        addMark(e, data);
        // checkIfWin(e, data);
        checkWinner(data);
        nextRound(data);
        switchPlayer(data);
        console.log(data);

    }
};

// Place user's mark on the board and replace the cell's index in the board array with x/o
const addMark = (e, data) => {
    e.textContent = data.currentPlayer;
    e.setAttribute('class', `board-cell ${data.currentPlayer}`);
    data.board[e.id] = data.currentPlayer;
}

// TODO This is the new gameOver
const endConditions = (data) => {
    if (checkWinner(data)) {
        // TODO adjust the dom to reflect win
        return true; 
    } else if (data.round === 9) {
        // TODO adjust the dom to reflect tie 
        return true;
    }
}


// Check if someone's won or if draw
function checkIfWin(e, data) {
    if (data.round >= 8) {
        data.gameOver = true;
        gameOver(e, data, 'draw');

    }
}

// Check if someone's won or if draw
const checkWinner = (data) => {
    let result = false;
    // iterate through winning conditions to check if any of those are filled with the same mark
    winningConditions.forEach(condition => {
        if(data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]) {
            console.log('player has won')
            result = true;
        }
    })
    return result;
}

// TODO IN-PROGRESS/REWORK
    // * USE 'result' variable from checkWinner
    // * arrow function
    // * REPLACE with endConditions and rename to gameOver?
function gameOver(e, data, winner) {
    if (winner === 'p1') {
        document.querySelector('[data-winning-message]').textContent = `${data.p1} WINS!`;
        showModal('restartModal');
    } else if (winner === 'p2') {
        document.querySelector('[data-winning-message]').textContent = `${data.p2} WINS!`;
        showModal('restartModal');
    } else if (winner === 'draw') {
        document.querySelector('[data-winning-message]').textContent = 'DRAW!';
        showModal('restartModal');
    }
}

// Swith player between x/o
const switchPlayer = (data) => {
    if (data.round > 0) {
        // let currentPlayer = data.currentPlayer;
        
        if (data.currentPlayer === 'X') {
            data.currentPlayer = 'O';
            board.setAttribute('class', 'board O')

        } else {
            data.currentPlayer = 'X';
            board.setAttribute('class', 'board X');
        }
    }
}

// Reset the board and start from the beginning with the same players
// function resetBoard(data) {
//     initializaVariables(data);
 
//     const cells = document.querySelectorAll('[data-cell]');
//     cells.forEach(cell => cell.textContent = '');

//     document.querySelector('[data-winning-message]').textContent = '';

// }

// Reset the board and start from the beginning with the same players
const resetBoard = (data) => {
    initializaVariables(data);

    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => cell.textContent = '');

    document.querySelector('[data-winning-message]').textContent = '';

}

// Iterate data.round
const nextRound = (data) => {
    data.round++;
}






// TODO Add AI using MinMax-algorithm



// TODO change so that Xs and Os are nice looking - like webdevesimplified did it

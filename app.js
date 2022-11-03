const form = document.querySelector('#myForm');
const modal = document.querySelector('#modal');
const resetButton = document.querySelector('#resetButton');
const settingsButton = document.querySelector('#settingsButton');
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


const addEventListenersToBoard = (data) => {
    const gridCells = document.querySelectorAll('[data-cell]');
    gridCells.forEach(cell => {
        cell.addEventListener('click', (event) => {
            handleClick(event.target, data);
        });
    });
}

// TODO add eventlisteners to the buttons
const addEventListenersToButtons = (data) => {
    // const dataObject = data;
    
    resetButton.addEventListener('click', () => {
        resetBoard(data);
        initializaVariables(data);

        
    })

    // TODO fix this one!!! similar to the one above 
        // * Rework?
    settingsButton.addEventListener('click', () => {
        resetBoard(data);
        initializaVariables(data);
        addEventListenersToButtons(data);
        showModal();

    });
}


const InitializeGame = (data) => {

    initializaVariables(data);

    addEventListenersToBoard(data);

    addEventListenersToButtons(data);
    
};



// Show or hide modal
const showModal = () => {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
}



// What happens when player clicks on the board
const handleClick = (e, data) => {
    
    // If it's game over, do nothing
    if (data.gameOver || data.round > 8) {
        return;
    }
    
    // check if cell has a letter in it, if so, do nothing
    if (data.board[e.id] == 'X' || data.board[e.id] == 'O'){
        return;
    }
    
    addMark(e, data);
    nextRound(data);
    console.log(data);

    if (endConditions(data)) {
        // 
        return;
    }
    
    switchPlayer(data);

};

// Place user's mark on the board and replace the cell's index in the board array with x/o
const addMark = (e, data) => {
    e.textContent = data.currentPlayer;
    e.setAttribute('class', `board-cell ${data.currentPlayer}`);
    data.board[e.id] = data.currentPlayer;
}


const endConditions = (data) => {

    if (checkWinner(data)) {
        
        document.querySelector('[data-game-message]').textContent = `${data.currentPlayer} WINS!`;
        return true; 

    } else if (data.round === 9) {
        
        document.querySelector('[data-game-message]').textContent = 'DRAW!';
        return true;
    }
    return false;
}

// Check if someone's won or if draw - returns true or false through variable 'result'
const checkWinner = (data) => {
    let result = false;
    
    // iterate through winning conditions (arrays) to check if any of those are filled with the same mark
    winningConditions.forEach(condition => {
        if(
            data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]
        ) {
            console.log('player has won');
            data.gameOver = true;
            result = true;
        }
    });
    return result;
};





// Swith player between x/o
const switchPlayer = (data) => {
    if (data.round > 0) {
        
        if (data.currentPlayer === 'X') {
            data.currentPlayer = 'O';
            board.setAttribute('class', 'board O')
            

        } else {
            data.currentPlayer = 'X';
            board.setAttribute('class', 'board X');
        }
        document.querySelector('[data-game-message]').textContent = `${data.currentPlayer}'s turn`;
    }
}

// Reset the board and start from the beginning with the same players
const resetBoard = (data) => {
    // initializaVariables(data);

    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => cell.textContent = '');

    document.querySelector('[data-game-message]').textContent = `${data.p1}'s turn`;

}

// Iterate data.round
const nextRound = (data) => {
    data.round++;
}






// TODO Add AI using MinMax-algorithm



// TODO change so that Xs and Os are nice looking - like webdevesimplified did it

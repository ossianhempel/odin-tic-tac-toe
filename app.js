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
    data.choice = +data.choice;
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    data.p1 = 'X'
    data.p2 = 'O'
    data.round = 0;
    data.currentPlayer = 'X';
    data.gameOver = false;
    document.querySelector('[data-game-message]').textContent = `${data.p1Name} (X)'s turn`;

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
    
    resetButton.addEventListener('click', () => {
        resetBoard(data);
        initializaVariables(data);

        
    })

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
    
    if (data.opponent === 'human') {
        switchPlayer(data);
    } else if (data.opponent === 'easyAI') {
        // easy AI
        easyAIMove(data);
        // change back to player
        data.currentPlayer = 'X';
    } else if (data.opponent === 'hardAI') {
        // hard AI
        hardAIMove(data);
        // change back to player
        data.currentPlayer = 'X';
    }

};

// Place user's mark on the board and replace the cell's index in the board array with x/o
const addMark = (e, data) => {
    e.textContent = data.currentPlayer;
    e.setAttribute('class', `board-cell ${data.currentPlayer}`);
    data.board[e.id] = data.currentPlayer;
}


const endConditions = (data) => {

    if (checkWinner(data, data.currentPlayer)) {
        // adjust DOM to reflect win
        data.currentPlayer === 'X' ? 
        document.querySelector('[data-game-message]').textContent = `${data.p1Name} WINS!` :
        document.querySelector('[data-game-message]').textContent = `${data.p2Name} WINS!`;
        data.gameOver = true;

        return true; 

    } else if (data.round === 9) {
        
        document.querySelector('[data-game-message]').textContent = 'DRAW!';
        data.gameOver = true;
        return true;
    }
    return false;
}

// Check if someone's won or if draw - returns true or false through variable 'result'
const checkWinner = (data, player) => {
    let result = false;
    
    // iterate through winning conditions (arrays) to check if any of those are filled with the same mark
    winningConditions.forEach(condition => {
        if(
            data.board[condition[0]] === player && 
            data.board[condition[1]] === player && 
            data.board[condition[2]] === player
        ) {
            // data.gameOver = true;
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
            document.querySelector('[data-game-message]').textContent = `${data.p2Name} (O)'s turn`;

        } else {
            data.currentPlayer = 'X';
            board.setAttribute('class', 'board X');
            document.querySelector('[data-game-message]').textContent = `${data.p1Name} (X)'s turn`;

        }
        // document.querySelector('[data-game-message]').textContent = `${data.currentPlayer}'s turn`;
    }
}

// Reset the board and start from the beginning with the same players
const resetBoard = (data) => {

    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => cell.textContent = '');

    document.querySelector('[data-game-message]').textContent = `${data.p1Name} (X)'s turn`;
}

// Iterate data.round
const nextRound = (data) => {
    data.round++;
}


// TODO Add AI using MinMax-algorithm
    // * Can't use settings

const easyAIMove = (data) => {
    switchPlayer(data);
    nextRound(data);

    let availableCells = data.board.filter(
        cell => cell !== 'X' && cell !=='O'
        );

    if (availableCells.length > 0) {
        let move = availableCells[Math.floor(Math.random() * availableCells.length)]
        data.board[move] = data.p2;
        // add delay before AI's move is played
        setTimeout(() => {
            let cell = document.getElementById(`${move}`);
            cell.textContent = data.p2;
            cell.classList.add("O");
        }, 200);
    }

    
    if (endConditions(data)) {
        return;
    }
};

const hardAIMove = (data) => {
    switchPlayer(data);
    nextRound(data);

    const move = minimax(data, 'O').index;
    data.board[move] = data.p2


    setTimeout(() => {
        let cell = document.getElementById(`${move}`);
        cell.textContent = data.p2;
        cell.classList.add("O");
    }, 200);

    if (endConditions(data)) {
        return;
    }
    
}


const minimax = (data, player) => {
    let availableCells = data.board.filter(
        cell => cell !== 'X' && cell !=='O'
        );
    if(checkWinner(data, data.p1)) {
        return {
            score: -100
        }
    } else if (checkWinner(data, data.p2)) {
        return {
            score: 100
        }
    } else if (availableCells.length === 0) {
        return {
            score: 0
        }
    }
    
    // Need to check all possible outcomes recursively to choose next move
        // check if winner, if p1 wins set score to -100
        // if tie, set score to 0
        // if win set score to 100
    // loop over available moves to get list of all potential moves and check if wins
    const potentialMoves = []
    for(let i = 0; i < availableCells.length; i++) {
        let move = {};
        move.index = data.board[availableCells[i]];
        data.board[availableCells[i]] = player;
        if(player === data.p2) {
            move.score = minimax(data, data.p1).score;
        } else {
            move.score = minimax(data, data.p2).score;
        }
        // reset the move on the board
        data.board[availableCells[i]] = move.index;
        // push the potential move to the array
        potentialMoves.push(move)
    }
    let bestMove = 0;
    if(player === data.p2) {
        let bestScore = -10000;
        for(let i = 0; i < potentialMoves.length; i++) {
            if(potentialMoves[i].score > bestScore) {
                bestScore = potentialMoves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for(let i = 0; i < potentialMoves.length; i++) {
            if(potentialMoves[i].score < bestScore) {
                bestScore = potentialMoves[i].score;
                bestMove = i;
            }
        }
    }
    // data.gameOver = false;
    return potentialMoves[bestMove];
}



// TODO change so that Xs and Os are nice looking - like webdevesimplified did it


// TODO refactor recurring "if (currentPlayer = X........)" statements to a function?


// TODO could this be rewritten so that each player is a separate object instead? Would require less if-statements in many places
// if (currentPlayer = X........)

// TODO add alpha-beta pruning?
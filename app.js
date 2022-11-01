const form = document.querySelector('#myForm');
const modal = document.querySelector('#modal');
const restartModal = document.querySelector('#restartModal');
restartModal.style.display = 'none';
const restartButton = document.querySelector('#restartButton');
const backToMenuButton = document.querySelector('#backToMenuButton');

const board = document.querySelector('#board');


form.addEventListener('submit', (e) => {
    e.preventDefault();
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

// function addEventListenersToBoard (data) {
//     const gridCells = document.querySelectorAll('[data-cell]');
//     gridCells.forEach(cell => {
//         cell.addEventListener('click', (event) => {
//             handleClick(event.target, data);
//         }, {once: true});
//     });
// }

const addEventListenersToBoard = (data) => {
    const gridCells = document.querySelectorAll('[data-cell]');
    gridCells.forEach(cell => {
        cell.addEventListener('click', (event) => {
            handleClick(event.target, data);
        });
    });
}

// TODO add eventlisteners to the buttons
function addEventListenerstoButtons(data) {
    const dataObject = data;
    restartButton.addEventListener('click', () => {
        resetBoard(dataObject);
        showModal('restartModal');
    })

    // TODO fix this one!!! similar to the one above 
    backToMenuButton.addEventListener('click', () => {
        resetBoard(dataObject);
        showModal('restartModal');
        showModal('modal');
    
    });
}


const InitializeGame = (data) => {

    initializaVariables(data);

    addEventListenersToBoard(data);

    addEventListenerstoButtons(data);
    
};

// function initializeGame(data) {
//     initializaVariables(data);

//     addEventListenersToBoard(data);

//     addEventListenerstoButtons(data);
// }



// show/hide modal based on which modal is passed as an argument
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


// TODO set win conditions

// What happens when player clicks on the board
function handleClick(e, data) {
    
    if (data.gameOver && data.round > 8) {
        return
    }
    
    if (data.board[e.id] !== 'X' && data.board[e.id] !== 'O'){
        addMark(e, data);
        checkIfWin(e, data);
        nextRound(data);
        switchPlayer(e, data);
        console.log(data);

    }
    
    

    // TODO check if someone's won or draw
        // * If so - trigger Modal with appropriate winning message
    

    
};

// Place user's mark on the board and replace the cell's index in the board array with x/o
function addMark(e, data) {
    
    const board = data.board;
    const index = e.id;  

    e.textContent = data.currentPlayer;
    // e.classList.add(data.currentPlayer);
    e.setAttribute('class', `board-cell ${data.currentPlayer}`);
    board[index] = data.currentPlayer;
    
    // if (data.currentPlayer === 'X') {
        
        
    //     e.textContent = 'X'
    //     e.classList.add('X')
    //     board[index] = 'X';
    // } else {
    //     e.textContent = 'O';
    //     e.classList.add('O')
    //     board[index] = 'O';
    // }
}

// Check if someone's won or if draw
function checkIfWin(e, data) {
    if (data.round >= 8) {
        data.gameOver = true;
        gameOver(e, data, 'draw');
    // } else if (pass) {

    // } else if () {

    }
}

// TODO IN-PROGRESS
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
function switchPlayer(e, data) {
    if (data.round > 0) {
        let currentPlayer = data.currentPlayer;
        
        // currentPlayer === 'X' ? data.currentPlayer = 'O' : data.currentPlayer = 'X';


        if (currentPlayer === 'X') {
            data.currentPlayer = 'O';
            board.setAttribute('class', 'board O')

        } else {
            data.currentPlayer = 'X';
            board.setAttribute('class', 'board X');
        }
    }
    
}

// Reset the board and start from the beginning with the same players
function resetBoard(data) {
    initializaVariables(data);
    // InitializeGame(data);
 
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => cell.textContent = '');

    document.querySelector('[data-winning-message]').textContent = '';

}

// Iterate data.round
function nextRound(data) {
    data.round++;
}



// TODO Add AI using MinMax-algorithm


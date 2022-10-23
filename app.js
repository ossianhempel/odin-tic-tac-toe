

let gameBoardArray = [
    [1, 2],
    [3, 4],
    [5, 6],
    []
]

// TODO eventListener to the modal
const modal = document.querySelector('#modal');
const restartButton = document.querySelector('#restartButton');
const board = document.querySelector('#board');

restartButton.addEventListener('click', () => {
    showModal();
});


function showModal() {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
};


let circleTurn = true;

// TODO set win conditions


function handleClick(e) {
    
    // TODO add x/o to board either directly or through an array that renders the board + add x/o to the cell's class
    addMark(e, circleTurn);
    
    // TODO switch player (change class on board)
    switchPlayer(circleTurn);

    // TODO check if someone's won
        // * If so - trigger Modal with appropriate winning message
};

function addMark(e) {

    if (circleTurn === true) {
        e.target.textContent = 'O';
        e.target.setAttribute('class', 'board-cell o')
    } else {
        e.target.textContent = 'X';
        e.target.setAttribute('class', 'board-cell x')
    }
}

function switchPlayer() {
    if (circleTurn === true) {
        circleTurn = false;
        board.setAttribute('class', 'board x');

    } else {
        circleTurn = true;
        board.setAttribute('class', 'board o');

    }
    // return circleTurn;
}


const gridCells = document.querySelectorAll('[data-cell]');
gridCells.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
        // instead of setting text-content to X we should
        // fill the array with X and then render the board
        // to reflext the array
        // cell.setAttribute('class', 'x')
        
});



// TODO Modal 
    // * Add eventlistener to button
    // * functionality to reset the board 


// TODO Add AI using MinMax-algorithm





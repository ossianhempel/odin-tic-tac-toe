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


const initializaVariables = (data) => {
    data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    data.p1 = 'X'
    data.p2 = 'O'
    data.round = 0;
    data.currentPlayer = 'X';
    data.gameOver = false;
}


const InitializeGame = (data) => {
    
    const gridCells = document.querySelectorAll('[data-cell]');
    gridCells.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
            // instead of setting text-content to X we should
            // fill the array with X and then render the board
            // to reflext the array
            // cell.setAttribute('class', 'x') 
    });

    initializaVariables(data);
    

    
};





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
        e.target.textContent = 'O'
        e.target.classList.add('o')
    } else {
        e.target.textContent = 'X';
        e.target.classList.add('x')
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






// TODO Modal 
    // * Add eventlistener to button
    // * functionality to reset the board 


// TODO Add AI using MinMax-algorithm


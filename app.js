

let gameBoardArray = [
    [1, 2],
    [3, 4],
    [5, 6],
    []
]

// TODO eventListener to the modal
const modal = document.querySelector('#modal');
const restartButton = document.querySelector('#restartButton');

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


// TODO set win conditions


function handleClick(e) {
    // TODO add x/o to board either directly or through an array that renders the board + add x/o to the cell's class 
    // TODO switch player (change class on board)
    // TODO check if someone's won
        // * If so - trigger Modal with appropriate winning message
};

function addMark(e) {
    if (circleTurn === true) {

    } else {
        e.target.textContent
    }
    
    e.target.textContent 
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







let gameBoardArray = [
    [1, 2],
    [3, 4],
    [5, 6],
    []
]




gridCells = document.querySelectorAll('[data-cell]');
gridCells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        // instead of setting text-content to X we should
        // fill the array with X and then render the board
        // to reflext the array
        // cell.setAttribute('class', 'x')
        cell.textContent = 'X';
    })
});




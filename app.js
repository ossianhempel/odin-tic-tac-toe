






gridCells = document.querySelectorAll('.grid-container-cell');
gridCells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        cell.textContent = 'X';
    })
});
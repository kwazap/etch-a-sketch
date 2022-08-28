
const container = document.querySelector('.container')
const slider = document.querySelector('.slider')
const sliderOutputValue = document.querySelector('#sliderValue')
const clearButton = document.querySelector('.clear')

let mouseDown = false;
container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);
slider.addEventListener('input', updateSliderOutput);
slider.addEventListener('change', updateSize);
clearButton.addEventListener('click', clearGrid);
let numberOfSquares;

drawBoard(16);

function drawBoard(gridSize) {
    let squareWidth = 640 / gridSize -2;
    numberOfSquares = gridSize * gridSize;
    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = `${squareWidth}px`;
        square.style.height = `${squareWidth}px`;
        container.appendChild(square);
        square.addEventListener('mouseover', changeColor);
        square.addEventListener('mousedown', changeColor);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    this.style.backgroundColor = 'red';
}

function updateSliderOutput(e) {
    sliderOutputValue.textContent = this.value;
}

function updateSize(e) {
    clearContainer();
    drawBoard(this.value);
}

function clearContainer() {
    for (let i = 0; i < numberOfSquares; i++) {
        document.querySelector('.square').remove();
    }
}

function clearGrid() {
    squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = '#36454f';
    }
}

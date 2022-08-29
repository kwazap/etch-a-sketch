
const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const sliderOutputValue = document.querySelector('#sliderValue');
const clearButton = document.querySelector('.clear');
const brushColorPicker = document.querySelector('.brush-color-picker');
const backgroundColorPicker = document.querySelector('.background-color-picker');
const gridVisibilityButton = document.querySelector('.grid-visibility');

let mouseDown = false;
container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);
slider.addEventListener('input', updateSliderOutput);
slider.addEventListener('change', updateSize);
clearButton.addEventListener('click', clearGrid);
brushColorPicker.addEventListener('change', brushColorUpdate);
backgroundColorPicker.addEventListener('change', backgroundColorUpdate);
gridVisibilityButton.className = 'grid-visibility pressed'
let gridVisibility = 1;
gridVisibilityButton.addEventListener('click', gridToggle);
let numberOfSquares;
let selectedBackgroundColor = '#36454f'
let selectedBrushColor = '#ff0000';

drawBoard(16);

function drawBoard(gridSize) {
    let squareWidth = 640 / gridSize ;
    numberOfSquares = gridSize * gridSize;
    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = `${squareWidth}px`;
        square.style.height = `${squareWidth}px`;
        square.style.backgroundColor = selectedBackgroundColor
        container.appendChild(square);
        square.addEventListener('mouseover', changeColor);
        square.addEventListener('mousedown', changeColor);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    this.style.backgroundColor = selectedBrushColor;
    if (gridVisibility === 0) {
        this.style.borderColor = selectedBrushColor;
    }
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
        squares[i].style.backgroundColor = container.getAttribute('background-color');
    }
}

function brushColorUpdate(e) {
    selectedBrushColor = this.value;
}

function backgroundColorUpdate(e) {
    selectedBackgroundColor = this.value;
}

function gridToggle(e) {
    squares = document.querySelectorAll('.square');

    if (gridVisibility === 1) {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.borderColor = squares[i].style.backgroundColor;
        }
        gridVisibility = 0;
        gridVisibilityButton.style.backgroundColor = '#FCFCFC'
    } else {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.borderColor = 'black';
        }
        gridVisibility = 1;
        gridVisibilityButton.style.backgroundColor = 'aqua'
    }
}


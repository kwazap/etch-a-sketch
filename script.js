
const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const sliderOutputValue = document.querySelector('#sliderValue');
const clearButton = document.querySelector('.clear');
const brushColorPicker = document.querySelector('.brush-color-picker');
const backgroundColorPicker = document.querySelector('.background-color-picker');
const gridVisibilityButton = document.querySelector('.grid-visibility');
const rainbowButton = document.querySelector('.rainbow-button');
const eraseButton = document.querySelector('.erase-button');
const lightenButton = document.querySelector('.lighten-button');
const darkenButton = document.querySelector('.darken-button');

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
rainbowButton.addEventListener('click', toolToggle);
eraseButton.addEventListener('click', toolToggle);
lightenButton.addEventListener('click', toolToggle);
darkenButton.addEventListener('click', toolToggle);
let numberOfSquares;
let selectedBackgroundColor = '#36454f'
let selectedBrushColor = '#ff0000';
let selectedTool = 'brush';

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
        square.addEventListener('mouseover', applyTool);
        square.addEventListener('mousedown', applyTool);
    }
}

function applyTool(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    let target = this;
    switch (selectedTool) {
        case 'brush':
            changeColor(target);
            break;
    
        default:
            break;
    }
}

function changeColor(target) {
    target.style.backgroundColor = selectedBrushColor;
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

function toolToggle(e) {
    switch (this.className) {
        case 'erase-button':
            selectedTool = 'erase';            
            break;
        case 'rainbow-button':
            selectedTool = 'rainbow';
            break;
        case 'lighten-button':
            selectedTool = 'lighten';
            break;
        case 'darken-button':
            selectedTool = 'darken';
            break;    
        default:
            break;
    }
}
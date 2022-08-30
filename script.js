
const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const sliderOutputValue = document.querySelector('#sliderValue');
const clearButton = document.querySelector('.clear');
const brushColorPicker = document.querySelector('.brush-color-picker');
const backgroundColorPicker = document.querySelector('.background-color-picker');
const gridVisibilityButton = document.querySelector('.grid-visibility');
const rainbowButton = document.querySelector('.rainbow');
const eraseButton = document.querySelector('.erase');
const lightenButton = document.querySelector('.lighten');
const darkenButton = document.querySelector('.darken');
const fillButton = document.querySelector('.fill');
const sampleButton = document.querySelector('.sample');
const brushButton = document.querySelector('.brush');

let mouseDown = false;
container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);
slider.addEventListener('input', updateSliderOutput);
slider.addEventListener('change', updateSize);
clearButton.addEventListener('click', clearGrid);
brushColorPicker.addEventListener('change', brushColorUpdate);
backgroundColorPicker.addEventListener('change', backgroundColorUpdate);
gridVisibilityButton.className = 'grid-visibility pressed';
let gridVisibility = 1;
gridVisibilityButton.addEventListener('click', gridToggle);
rainbowButton.addEventListener('click', toolToggle);
eraseButton.addEventListener('click', toolToggle);
lightenButton.addEventListener('click', toolToggle);
darkenButton.addEventListener('click', toolToggle);
fillButton.addEventListener('click', toolToggle);
sampleButton.addEventListener('click', toolToggle);
brushButton.addEventListener('click', toolToggle);
sliderOutputValue.addEventListener('input', updateSliderPosition);
let numberOfSquares;
let gridSize = 16;
let selectedBackgroundColor = backgroundColorPicker.value;
let selectedBrushColor = brushColorPicker.value;
let selectedTool = 'brush';
let squares = document.querySelectorAll('.square');
let squaresArray = [];
let previousTool = 'brush';

drawBoard(gridSize);

function drawBoard(gridSize) {
    let squareWidth = 640 / gridSize ;
    numberOfSquares = gridSize * gridSize;
    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = `${squareWidth}px`;
        square.style.height = `${squareWidth}px`;
        square.style.backgroundColor = selectedBackgroundColor;
        square.setAttribute('id', `${i}`);
        container.appendChild(square);
        square.addEventListener('mouseover', applyTool);
        square.addEventListener('mousedown', applyTool);
        
    }
    squares = document.querySelectorAll('.square');
    squaresArray = Array.from(squares);
}

function applyTool(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    switch (selectedTool) {
        case 'brush':
            changeColor(this);
            break;
        case 'rainbow':
            applyRainbow(this);
            break;
        case 'lighten':
            applyLighten(this);
            break
        case 'darken':
            applyDarken(this);
            break
        case 'erase':
            applyErase(this)
            break;
        case 'fill':
            applyFill(this)
            break;
        case 'sample':
            applySample(this);
            break;    
        default:
            break;
    }
}

function changeColor(target) {
    target.style.backgroundColor = selectedBrushColor;
    if (gridVisibility === 0) {
        target.style.borderColor = selectedBrushColor;
    }
}

function applyRainbow(target) {
    let hue = Math.ceil(Math.random() * 360);
    target.style.backgroundColor = `hsl(${hue},100%,50%)`;
    if (gridVisibility === 0) {
        target.style.borderColor = `hsl(${hue},100%,50%)`;
    }
}

function applyLighten(target) {
    let color = target.style.backgroundColor;
    let rgb = color.slice(4, -1).split(',');
    for (let i = 0; i < 3; i++) {
        rgb[i] = Number(rgb[i]) + 26;
        if (rgb[i] > 255) { rgb[i] = 255 }        
    }
    target.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    if (gridVisibility === 0) {
        target.style.borderColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }
}

function applyDarken(target) {
    let color = target.style.backgroundColor;
    let rgb = color.slice(4, -1).split(',')
    for (let i = 0; i < 3; i++) {
        rgb[i] = Number(rgb[i]) - 26;
        if (rgb[i] < 0) { rgb[i] = 0}
    }
    target.style.backgroundColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    if (gridVisibility === 0) {
        target.style.borderColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }
}

function applyErase(target) {
    selectedBackgroundColor = backgroundColorPicker.value;
    target.style.backgroundColor = selectedBackgroundColor;
    if (gridVisibility === 0) {
        target.style.borderColor = selectedBackgroundColor;
    }
}

function updateSliderOutput(e) {
    sliderOutputValue.value = this.value;
    gridSize = Number(this.value);
}

function updateSliderPosition (e) {
    if (this.value > 100) {
        sliderOutputValue.value = 100;
    }
    if (this.value < 1) {
        sliderOutputValue.value = 1;        
    }
    clearContainer();
    drawBoard(sliderOutputValue.value);
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
    for (let i = 0; i < squares.length; i++) {
     squares[i].style.backgroundColor = selectedBackgroundColor;
    }
    if (gridVisibility === 1) {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.borderColor = 'black';            
        }
    } else {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.borderColor = squares[i].style.backgroundColor;            
        }
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
    previousTool = selectedTool;
    eraseButton.className = 'erase';
    rainbowButton.className = 'rainbow';
    darkenButton.className = 'darken';
    lightenButton.className = 'lighten';
    fillButton.className = 'fill';
    sampleButton.className = 'sample';
    brushButton.className = 'brush';
    if (selectedTool === this.className) {
        selectedTool = 'brush';
        brushButton.className = 'brush pressed';
        return;
    }
    switch (this.className) {
        case 'erase':
            selectedTool = 'erase';
            eraseButton.className = 'erase pressed';
            break;
        case 'rainbow':
            selectedTool = 'rainbow';
            rainbowButton.className = 'rainbow pressed';
            break;
        case 'lighten':
            selectedTool = 'lighten';
            lightenButton.className = 'lighten pressed';
            break;
        case 'darken':
            selectedTool = 'darken';
            darkenButton.className = 'darken pressed';
            break;    
        case 'fill':
            selectedTool = 'fill';
            fillButton.className = 'fill pressed';
            break;
        case 'sample':
            selectedTool = 'sample';
            sampleButton.className = 'sample pressed';
            break;
        case 'brush':
            selectedTool = 'brush';
            brushButton.className = 'brush pressed';
            break;
        default:
            break;
    }
}

function applySample(target) {
    selectedBrushColor = rgbToHex(target.style.backgroundColor);
    if (previousTool === 'erase') {
        backgroundColorPicker.value = rgbToHex(target.style.backgroundColor);
    } else {
        brushColorPicker.value = rgbToHex(target.style.backgroundColor);
    }
    selectedTool = previousTool;    
    toolToggle();    
    document.querySelector(`.${previousTool}`).className = `${previousTool} pressed`;
}

function applyFill(target) {
    const colorCriteria = target.style.backgroundColor;
    squares = document.querySelectorAll('.square');

    fillRecursive(target, colorCriteria);

    function fillRecursive(target, colorCriteria) {
        if (rgbToHex(target.style.backgroundColor) === selectedBrushColor) return;

        target.style.backgroundColor = selectedBrushColor;
        if (gridVisibility === 0) {
            target.style.borderColor = selectedBrushColor;
        }
        let point = Number(target.id); 
        
        if (!(point % gridSize === 0) && squaresArray[point - 1].style.backgroundColor === colorCriteria) {
            fillRecursive(squaresArray[point - 1], colorCriteria);
        }
        if (!((point + 1) % gridSize === 0) && squaresArray[point + 1].style.backgroundColor === colorCriteria) {
            fillRecursive(squaresArray[point + 1], colorCriteria);
        }
        if (!((point + gridSize) > (gridSize * gridSize - 1)) && squaresArray[point + gridSize].style.backgroundColor === colorCriteria) {
            fillRecursive(squaresArray[point + gridSize], colorCriteria);
        }
        if (!((point - gridSize) < 0) && squaresArray[point - gridSize].style.backgroundColor === colorCriteria) {
            fillRecursive(squaresArray[point - gridSize], colorCriteria);
        }
    }     
}

function colorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function rgbToHex(rgbString) {
    let rgb = rgbString.slice(4, -1).split(',')
    red = Number(rgb[0]);
    green = Number(rgb[1]);
    blue = Number(rgb[2]);
    return "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue);
}
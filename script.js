
const container = document.querySelector('.container')
const slider = document.querySelector('.slider')
const sliderOutputValue = document.querySelector('#sliderValue')

let mouseDown = false;
container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);
slider.addEventListener('input', updateSliderOutput);


let gridSize = 16;
let squareWidth = 640 / gridSize - 2;


for (let i = 0; i < gridSize*gridSize; i++){
    const square = document.createElement('div');
    square.className = 'square';
    square.style.width = `${squareWidth}px`;
    square.style.height = `${squareWidth}px`;
    container.appendChild(square);
    square.addEventListener('mouseover', changeColor);
    square.addEventListener('mousedown', changeColor);    
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    this.style.backgroundColor = 'red';
}

function updateSliderOutput(e) {
    sliderOutputValue.textContent = this.value;
}

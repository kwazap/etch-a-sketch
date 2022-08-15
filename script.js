
const container = document.querySelector('.container')

let mouseDown = false;
container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);


for (let i = 0; i < 256; i++){
    const square = document.createElement('div');
    square.className = 'square';
    square.style.width = '38px'
    square.style.height = '38px';
    container.appendChild(square);
    square.addEventListener('mouseover', changeColor);
    square.addEventListener('mousedown', changeColor);
    
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    this.style.backgroundColor = 'red';
}
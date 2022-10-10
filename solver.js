
const board = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7],
];

var squareSelected;
var canSelect;

window.onload = function () {

    funcId("startsolver").addEventListener("click", start);

    for(let i=0; i<9; i++){
        funcId("numbers").children[i].addEventListener("click", function () {
            
                if(this.classList.contains("selected")) {
                    this.classList.remove("selected");
                }
                else {
                    for(let i=0; i<9; i++) {
                        funcId("numbers").children[i].classList.remove("selected");
                    }
                    this.classList.add("selected")
                }
            
        });
    }
}


function start () {
    canSelect = false;
    startsolver.style.display = 'none';
    numbers.style.display = 'block';
    body.style.overflowY = 'auto';
    makeBoard();
}

function makeBoard () {

    clearOldBoard();

    let id = 0;

    for(let i=0; i<81; i++){
        let square = document.createElement("p");
        square.textContent = '1';
        square.classList.add("square");

        if((id>17 && id<27) || (id>44 && id<54)) {
            square.classList.add("borderBottom");
        }

        if((id+1) %9 == 3 || (id+1) %9 == 6) {
            square.classList.add("borderRight");
        }

        id++;

        funcId("board").appendChild(square);
        
    }
    
}

function clearOldBoard () {

    let squares = document.querySelectorAll(".square");
    selectedSquare = null;
    selectedNum = null;

    for(let i=0; i<squares.length; i++) {
        squares[i].remove();
    }
}

function funcId(id) {
    return document.getElementById(id);
}


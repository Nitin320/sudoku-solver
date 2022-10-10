
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

    let one = document.createElement("p");
    one.textContent = '1';
    one.classList.add("one");
    funcId("numbers").appendChild(one);

    let two = document.createElement("p");
    two.textContent = '2';
    two.classList.add("two");
    funcId("numbers").appendChild(two);

    let three = document.createElement("p");
    three.textContent = '3';
    three.classList.add("three");
    funcId("numbers").appendChild(three);

    let four = document.createElement("p");
    four.textContent = '4';
    four.classList.add("four");
    funcId("numbers").appendChild(four);

    let five = document.createElement("p");
    five.textContent = '5';
    five.classList.add("five");
    funcId("numbers").appendChild(five);

    let six = document.createElement("p");
    six.textContent = '6';
    six.classList.add("six");
    funcId("numbers").appendChild(six);

    let seven = document.createElement("p");
    seven.textContent = '7';
    seven.classList.add("seven");
    funcId("numbers").appendChild(seven);

    let eight = document.createElement("p");
    eight.textContent = '8';
    eight.classList.add("eight");
    funcId("numbers").appendChild(eight);

    let nine = document.createElement("p");
    nine.textContent = '9';
    nine.classList.add("nine");
    funcId("numbers").appendChild(nine);

    let ten = document.createElement("p");
    ten.textContent = '10';
    ten.classList.add("ten");
    funcId("numbers").appendChild(ten);
    
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


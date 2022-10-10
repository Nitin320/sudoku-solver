
const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var numToAdd;

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
                numToAdd = funcId("numbers").children[i].innerHTML;

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

        const idnum = String(i);

        let square = document.createElement("p");
        square.textContent = '';
        square.classList.add("square");
        square.id = idnum


        if((id>17 && id<27) || (id>44 && id<54)) {
            square.classList.add("borderBottom");
        }

        if((id+1) %9 == 3 || (id+1) %9 == 6) {
            square.classList.add("borderRight");
        }

        id++;

        funcId("board").appendChild(square);

        funcId("board").children[i].addEventListener("click", function () {

            funcId("board").children[i].innerHTML = numToAdd;

            const numid = parseInt(funcId("board").children[i].id) + 1

            if(numid%9 != 0) {
                board[Math.floor(numid/9)][(numid%9)-1] = numToAdd;
            }
            else {
                board[Math.floor((numid-1)/9)][8] = numToAdd;
            }

            console.log(board)

        });
        
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


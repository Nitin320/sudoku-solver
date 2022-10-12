
var board = [
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
var allowed = true;

window.onload = function () {

    funcId("startsolver").addEventListener("click", start);
    funcId("newBoard").addEventListener("click", start);

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
    body.style.overflowY = 'scroll';
    heading.style.marginRight = '7vw';
    makeBoard();
}

var index1;
var index2;

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

            

            const numid = parseInt(funcId("board").children[i].id) + 1

            if(numid%9 != 0) {
                index1 = Math.floor(numid/9);
                index2 = (numid%9)-1;
            }
            else {
                index1 = Math.floor((numid-1)/9);
                index2 = 8;
            }
            
            var finalIndexes = [index1, index2];

            if(allowed == true && checkDuplicates(board, parseInt(numToAdd), finalIndexes) == true && numToAdd != undefined) {

                funcId("board").children[i].innerHTML = numToAdd;

                if(numid%9 != 0) {board[Math.floor(numid/9)][(numid%9)-1] = parseInt(numToAdd);}
                else {board[Math.floor((numid-1)/9)][8] = parseInt(numToAdd);}
            }

            funcId("solver").addEventListener("click", solve);

        });
        
    }
    
}

function clearOldBoard () {

    let squares = document.querySelectorAll(".square");

    for(let i=0; i<squares.length; i++) {
        squares[i].remove();
    }

    allowed = true;
    
    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            board[i][j] = 0;
        }
    }

}

function funcId(id) {
    return document.getElementById(id);
}



// -------------------------------- MAIN SUDOKU SOLVER ----------------------------------------------

var indexOfAnswer;
var finalInd;


function solve () {

    allowed = false;
    var empty = findEmptySpace();

    if(!empty) {
        return true;
    }

    for(let i=1; i<10; i++) {

        if(checkDuplicates(board, i, empty)) {

            board[empty[0]][empty[1]] = i;
            finalInd = (empty[0]*9) + empty[1];

            indexOfAnswer = i;

            funcId("board").children[finalInd].innerHTML = i;

            if(solve(board)) {
                return true;
            }

            board[empty[0]][empty[1]] = 0;

            funcId("board").children[finalInd].innerHTML = 0;
        }
    }

    funcId("board").children[0].innerHTML = board[0][0];
    return false;

}


function checkDuplicates (board, num, empty) {
    for(let i=0; i<9; i++) {
        if(board[empty[0]][i] == num && empty[1] != i) {
            return false;
        }
    }

    for(let i=0; i<9; i++) {
        if(board[i][empty[1]] == num && empty[0] != i) {
            return false;
        }
    }

    var x = Math.floor(empty[1]/3);
    var y = Math.floor(empty[0]/3);

    for(let i=(y*3); i<(y*3)+3; i++) {
        for(let j=(x*3); j<(x*3)+3; j++) {
            if(board[i][j] == num && i != empty[0] && j != empty[1]) {
                return false;
            }
        }
    }

    return true;

}


function findEmptySpace () {

    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            if(board[i][j] == 0) {
                return [i, j];
            }
        }
    }

}



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


window.onload = function () {

    makeBoard();
    funcId("newBoard").addEventListener("click", makeBoard);

    for(let i=0; i<10; i++){
        funcId("numbers").children[i].addEventListener("click", function () {
            
            if(this.classList.contains("selected")) {

                this.classList.remove("selected");
                numToAdd = undefined;
            }
            else {

                for(let i=0; i<10; i++) {
                    funcId("numbers").children[i].classList.remove("selected");
                }

                this.classList.add("selected")
                numToAdd = funcId("numbers").children[i].innerHTML;

            }    
        });
    }

}


var index1;
var index2;
var fault1 = 0;
var fault2 = 0;
var fault3 = 0;
var isSolved = false;
var delChecker = 0;

function makeBoard () {

    clearOldBoard();

    let id = 0;

    for(let i=0; i<81; i++){

        const idnum = String(i);

        let square = document.createElement("p");
        square.textContent = '';
        square.classList.add("square");
        square.id = idnum

        if(i>=0 && i<9) {square.classList.add("borderUp");}

        if(i>=72 && i<=81) {square.classList.add("borderBottom");}

        if((i+1)%9 == 0) {square.classList.add("borderRight");}

        if(i%9 == 0) {square.classList.add("borderLeft");}

        if((id>17 && id<27) || (id>44 && id<54)) {square.classList.add("borderBottom");}

        if((id+1) %9 == 3 || (id+1) %9 == 6) {square.classList.add("borderRight");}

        id++;

        funcId("board").appendChild(square);

        funcId("board").children[i].addEventListener("click", async function () {

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

            if(funcId("board").children[i].innerHTML != '' && numToAdd == 'del' && delChecker == 0) {

                funcId("board").children[i].innerHTML = ''; 
                funcId("board").children[i].classList.remove("solveColour");
                if(numid%9 != 0) {board[Math.floor(numid/9)][(numid%9)-1] = 0;}
                else {board[Math.floor((numid-1)/9)][8] = 0;}
                delChecker = 1;
            }

            if(checkDuplicates(board, parseInt(numToAdd), finalIndexes) == true && numToAdd != undefined && delChecker == 0) {

                funcId("board").children[i].innerHTML = numToAdd;
                funcId("board").children[i].classList.add("solveColour")

                if(numid%9 != 0) {board[Math.floor(numid/9)][(numid%9)-1] = parseInt(numToAdd);}
                else {board[Math.floor((numid-1)/9)][8] = parseInt(numToAdd);}
            }

            delChecker = 0;

            if(checkDuplicates(board, parseInt(numToAdd), finalIndexes) == false && isSolved == false){

                funcId('warning1').classList.remove('warn1anim');
                funcId('warning2').classList.remove('warn2anim');
                funcId('warning3').classList.remove('warn3anim');

                await sleep1();
                
                if(fault1 == 1) {funcId('warning1').classList.add('warn1anim'); fault1=0;}
                if(fault2 == 1) {funcId('warning2').classList.add('warn2anim'); fault2=0;}
                if(fault3 == 1) {funcId('warning3').classList.add('warn3anim'); fault3=0;}


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


    
    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            board[i][j] = 0;
        }
    }

    fault1 = 0;
    fault2 = 0;
    fault3 = 0;
    isSolved = false;

}

function funcId(id) {
    return document.getElementById(id);
}



// -------------------------------- MAIN SUDOKU SOLVER ----------------------------------------------

var finalInd;

function sleep1() {
    return new Promise(resolve => setTimeout(resolve, 4));
}


async function solve () {

    delChecker = 1;
    var empty = findEmptySpace();

    if(!empty) {
        isSolved = true;
        return true;
    }

    for(let i=1; i<10; i++) {

        if(checkDuplicates(board, i, empty)) {

            board[empty[0]][empty[1]] = i;
            finalInd = (empty[0]*9) + empty[1];

            funcId("board").children[finalInd].classList.remove("solveColour")
            await sleep1()
            funcId("board").children[finalInd].classList.add("solveColour");
            funcId("board").children[finalInd].innerHTML = i;

            if(await solve()) {
                return true;
            }

            board[empty[0]][empty[1]] = 0;

            funcId("board").children[finalInd].classList.remove("solveColour")
            await sleep1()
            funcId("board").children[finalInd].classList.add("solveColour");
            funcId("board").children[finalInd].innerHTML = 0;
            
            
        }
    }

    funcId("board").children[0].innerHTML = board[0][0];
    return false;

}


function checkDuplicates (board, num, empty) {
    for(let i=0; i<9; i++) {
        if(board[empty[0]][i] == num && empty[1] != i) {
            fault1 = 1;
            return false;
        }
    }

    for(let i=0; i<9; i++) {
        if(board[i][empty[1]] == num && empty[0] != i) {
            fault2 = 1;
            return false;
        }
    }

    var x = Math.floor(empty[1]/3);
    var y = Math.floor(empty[0]/3);

    for(let i=(y*3); i<(y*3)+3; i++) {
        for(let j=(x*3); j<(x*3)+3; j++) {
            if(board[i][j] == num && i != empty[0] && j != empty[1]) {
                fault3 = 1;
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


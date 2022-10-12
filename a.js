function findout1 () {
    funcId("board").children[(empty[0]*9) + empty[1]].innerHTML = i;
}
function findout2 () {

    funcId("board").children[(empty[0]*9) + empty[1]].innerHTML = 0;
}

setTimeout(findout1, 1000);
//funcId("board").children[finalInd].innerHTML = i;

if(solve(board)) {
    return true;
}

board[empty[0]][empty[1]] = 0;

setTimeout(findout2, 1000);
//funcId("board").children[finalInd].innerHTML = 0;
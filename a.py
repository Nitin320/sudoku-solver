'''
board = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7],
]'''

board = [
    [0, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]


def solve(board):
    
    empty = find_emptySpace()

    if not empty:
        return True

    for i in range(1, 10):
        if check_duplicates(board, i, empty):
            board[empty[0]][empty[1]] = i

            if solve(board):
                return True

            board[empty[0]][empty[1]] = 0
    
    return False
    


def display_board():

    for i in range(9):
        if i%3 == 0 and i != 0:
            print("- - - - - - - - - - - - - - - - - -")

        for j in range(9):

            if j == 0:
                print("|", end=" ")
                print(board[i][j], end="  ")
            else:
                print(board[i][j], end="  ")

            if (j+1)%3 == 0:
                print("|", end=" ")
                
        print("\n")


def check_duplicates(board, num, empty):

    for i in range(9):
        if board[empty[0]][i] == num and empty[1] != i:
            return False

    for i in range(9):
        if board[i][empty[1]] == num and empty[0] != i:
            return False

    x = empty[1]//3
    y = empty[0]//3

    for i in range(y*3, (y*3)+3):
        for j in range(x*3, (x*3)+3):
            if board[i][j] == num and [i, j]!= empty:
                return False
    
    return True


def find_emptySpace():
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                return [i, j]

    return None

solve(board)

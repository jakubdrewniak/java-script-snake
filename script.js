const windowDimension = (window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight)
const BOARD_DIMENSION = 50;
const CELL_DIMENSION = windowDimension/BOARD_DIMENSION;

const HALF_BOARD_DIMENSION = Math.round(BOARD_DIMENSION/2)-1
const GAME_TICK = 500
let _board = null
let _direction = 'up'
let _snake = [
    {x:HALF_BOARD_DIMENSION, y:HALF_BOARD_DIMENSION},
    {x:HALF_BOARD_DIMENSION, y:HALF_BOARD_DIMENSION + 1},
    {x:HALF_BOARD_DIMENSION, y:HALF_BOARD_DIMENSION + 2}
]

const gameTick = () => {
    checkIfMoveIsAvailable()
    renderBoard()
}

const checkIfMoveIsAvailable = () => {
    let nextHeadPosition = null
    switch(_direction){
        case 'up': 
            nextHeadPosition = {x: _snake[0].x, y: _snake[0].y-1} 
            break
        case 'down': 
            nextHeadPosition = {x: _snake[0].x, y: _snake[0].y+1} 
            break
        case 'left': 
            nextHeadPosition = {x: _snake[0].x-1, y: _snake[0].y} 
            break
        case 'right': 
            nextHeadPosition = {x: _snake[0].x+1, y: _snake[0].y} 
            break        
    }

    if(
        _board[nextHeadPosition.y] && _board[nextHeadPosition.y][nextHeadPosition.x]
    ) {
        move(nextHeadPosition)
    } else {
        endGame()
    }

}

const move = (nextHeadPosition) => {
    _snake = [nextHeadPosition].concat(_snake).slice(0, -1)
}

const endGame = () => {
    alert('YOU LOST')
    window.location = ''
}

const init = () => {
addArrowsListener()
    setInterval(
        gameTick, GAME_TICK
    )
    renderBoard()
}

const placeSnakeOnBoard = () => {
    _board = makeBoardArray(BOARD_DIMENSION);
    _snake.forEach((snakePosition, i) => {
        if(i===0) {
            _board[snakePosition.y][snakePosition.x] = 'H'
        } else {
            _board[snakePosition.y][snakePosition.x] = 0
        }
    })
}

const makeBoardArray = (dimension) => {
    return (new Array(dimension))
        .fill(1)
        .map(
            (e,i,a)=> (new Array(dimension)).fill(1)
        )
}

const renderBoard = () => {
    document.body.innerText = ''
    placeSnakeOnBoard()
    _board.forEach(renderRow) 
}

const renderRow = (row) => {
    const rowDiv = document.createElement('div')

    row.forEach((cell, i, a) => renderCell(cell, rowDiv))

    rowDiv.style.height = CELL_DIMENSION +'px'
    document.body.appendChild(rowDiv)
}

const renderCell = (cell, rowDiv) => {
    const cellDiv = document.createElement('div')
    cellDiv.style.width = CELL_DIMENSION +'px'
    cellDiv.style.height = CELL_DIMENSION +'px'
    cellDiv.style.display = 'inline-block'

    switch(cell) {
        case 0: 
            cellDiv.style.backgroundColor = 'black'
            break
        case 1:
            cellDiv.style.backgroundColor = 'grey'
            break
        case 'H':
            cellDiv.style.backgroundColor = 'green'
            break
    }

    rowDiv.appendChild(cellDiv)
}

const addArrowsListener = () => {
    window.addEventListener(
        'keydown',
        (event) => {
            switch(event.key){
                case 'ArrowUp':
                event.preventDefault()
                _direction = 'up'
                break
                case 'ArrowDown':
                event.preventDefault()
                _direction = 'down'
                break
                case 'ArrowLeft':
                event.preventDefault()
                _direction = 'left'
                break
                case 'ArrowRight':
                event.preventDefault()
                _direction = 'right'
                break
            }
        }

    )
}

init()
const playerFactory = (name, team) => {
    const printName = () => {return name};
    return {printName, team};
}

const playerOne = playerFactory('greg', 'x')
const playerTwo = playerFactory('eanus', 'o')
const tile1 = document.getElementById('tile1');
const tile2 = document.getElementById('tile2');
const tile3 = document.getElementById('tile3');
const tile4 = document.getElementById('tile4');
const tile5 = document.getElementById('tile5');
const tile6 = document.getElementById('tile6');
const tile7 = document.getElementById('tile7');
const tile8 = document.getElementById('tile8');
const tile9 = document.getElementById('tile9');

const gameBoard = {
    0: [tile1,tile2,tile3],
    1: [tile4,tile5,tile6],
    2: [tile7,tile8,tile9]
}
const gameBoard2 = [
    [tile1,tile2,tile3],
    [tile4,tile5,tile6],
    [tile7,tile8,tile9]
]


function objectLooper(array, func = '') {
    for (let key in array) {
        for(let i = 0; i < array[key].length; i++) {
            if (typeof func ==='function') {
                let current = array[key][i]
                console.log(array[key][i].textContent);
                func(current)
            } else {
                console.log(array[key][i].textContent);
            }
        }
    }
}
function objectLooper2(array, func = '') {
    for (let j = 0; j < array.length; j++) {
        for(let i = 0; i < array[j].length; i++) {
            if (typeof func ==='function') {
                let current = array[j][i]
                console.log(array[j][i].textContent);
                func(current)
            } else {
                console.log(array[j][i].textContent);
            }
        }
    }
}
function clearBoard(param) {
    param.textContent = ''
}
function createBoard(param) {
    param.textContent = '<3'
}
function checkBoard() {
    let cleanBoard = []
    function tile(tile){
        return tile.textContent
    }
    for (let i = 0; i < gameBoard2.length; i ++) {
        let currentLine = gameBoard2[i].map(tile)
        cleanBoard.push(currentLine);
    }
    return cleanBoard;
}
const victoryCheck = (array) => {
    if (
        array[0][0] !== '' && array[1][1] !== '' && array[2][2] !== '' &&
        ((array[0][0] === array[0][1] && array[0][0] === array[0][2]) ||
        (array[1][0] === array[1][1] && array[1][0] === array[1][2]) ||
        (array[2][0] === array[2][1] && array[2][0] === array[2][2]) ||
        (array[0][0] === array[1][0] && array[0][0] === array[2][0]) ||
        (array[0][1] === array[1][1] && array[0][1] === array[2][1]) ||
        (array[0][2] === array[1][2] && array[0][2] === array[2][2]) ||
        (array[0][0] === array[1][1] && array[0][0] === array[2][2]) ||
        (array[2][0] === array[1][1] && array[2][0] === array[0][2]))
    ) {
        console.log('vicory')
    } else {
        console.log('not victory')
    }
}
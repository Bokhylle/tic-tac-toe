
gameMod = (function(){
let turnsPlayed = 0;
    players = (function(){
        const playerFactory = (name, team) => {
            const printName = () => {return name};
            const printTeam = () => {return team};
            const printIcon = () => {return iconTag}
            return {printName, printTeam, name}
        }
        
        const playerOne = playerFactory('', 'x')
        const playerTwo = playerFactory('', 'o')
        
        return {
            playerOne, playerTwo
        }
        })()
const playBtn = document.getElementById('playBtn')
const oneName = document.getElementById('oneName')
const twoName = document.getElementById('twoName')
const gameInfo = document.querySelector('.infotext')

let whosGo = players.playerOne
const turnSwapper = () => {
    if (whosGo === players.playerOne) {
        whosGo = players.playerTwo;
    } else if (whosGo === players.playerTwo) {
        whosGo = players.playerOne;
    }
};
function setGameInfo() {
    gameInfo.textContent = whosGo.name + `'s turn\r\nfor team ` + whosGo.printTeam().toUpperCase()
}
function makeMove (e){
    const elem = this.elementFromPoint(e.clientX, e.clientY);
    console.log(elem)
    if (elem.classList.contains('boardTile')) {
        if(elem.textContent === '') {
            elem.textContent = whosGo.printTeam();
            elem.classList.add(whosGo.printTeam())
            turnsPlayed++
            victoryCheck()
            gameInfo.classList.remove(whosGo.printTeam() + 2)
            turnSwapper()
            gameInfo.classList.add(whosGo.printTeam() + 2)
            setGameInfo()
            return
        } else {
            console.log('na bo, das taken G')
        }
    }
}
function enablePlay() {
        document.addEventListener('click', makeMove)
    }
function disablePlay() {
        document.removeEventListener('click', makeMove)
    }
    playBtn.addEventListener('touchstart', function() {
        play()});
    
    function play() {
        console.log(oneName)
        if (oneName.value == '' || twoName.value == ''){
            gameInfo.textContent = 'Please enter player names!'
            return
        }
        if (playBtn.textContent === 'Reset') {
            disablePlay()
            playBtn.textContent = 'Play'
            oneName.disabled = false;
            twoName.disabled = false;
            gameBoardMod.clearBoard()
            gameInfo.textContent = ''
            turnsPlayed = 0;
            return
        }
        enablePlay()
        oneName.disabled = true;
        twoName.disabled = true;
        players.playerOne.name = oneName.value
        players.playerTwo.name = twoName.value
        playBtn.textContent = 'Reset'
        turnsPlayed = 0;
        setGameInfo()
    }
function gameover(name) {
    const victoryCont = document.createElement('div')
    const victoryBackground = document.createElement('div')
    const winTitle = document.createElement('h1')
    const winText = document.createElement('p')
    const replay = document.createElement('p')
    if(name === 'draw') {
        winTitle.textContent = 'DRAW'
        winText.textContent = ''
        replay.textContent = 'Play again?'
    } else {
    winTitle.textContent = 'WINNER'
    winText.textContent = name
    replay.textContent = 'Play again?'
    }
    victoryCont.classList.add('vicCont')
    victoryBackground.classList.add('vicBck')
    victoryCont.appendChild(winTitle);
    victoryCont.appendChild(winText);
    victoryCont.appendChild(replay);

    document.body.appendChild(victoryBackground)
    document.body.appendChild(victoryCont);

    replay.onclick = () => {
        play()
        document.body.removeChild(victoryBackground)
        document.body.removeChild(victoryCont)
        
    };
}
    function victory(arr) {
        const allEqual = arr => arr.every( v => v === arr[0] )
        //checks if any column, row or diagonal on board contains all same markers
        //also checks to prevent an empty line from giving a false poisitive
        for(let i = 0; i < arr.length; i++){
          if(allEqual(arr[i]) && !arr[i].includes('')) {
              return gameover(whosGo.name)
            }
        }
        console.log('na bo')
      }
      const victoryCheck = () => {
          if (turnsPlayed >= 9){
              gameover('draw')
          }
        victory(gameBoardMod.checkLines())
    }

return {
    whosGo
}
})()


// const tile1 = document.getElementById('tile1');
// const tile2 = document.getElementById('tile2');
// const tile3 = document.getElementById('tile3');
// const tile4 = document.getElementById('tile4');
// const tile5 = document.getElementById('tile5');
// const tile6 = document.getElementById('tile6');
// const tile7 = document.getElementById('tile7');
// const tile8 = document.getElementById('tile8');
// const tile9 = document.getElementById('tile9');

const gameBoardMod = (function(){
    //game tiles in DOM
    const tile1 = document.getElementById('tile1');
    const tile2 = document.getElementById('tile2');
    const tile3 = document.getElementById('tile3');
    const tile4 = document.getElementById('tile4');
    const tile5 = document.getElementById('tile5');
    const tile6 = document.getElementById('tile6');
    const tile7 = document.getElementById('tile7');
    const tile8 = document.getElementById('tile8');
    const tile9 = document.getElementById('tile9');

    const gameBoard = [
        [tile1,tile2,tile3],
        [tile4,tile5,tile6],
        [tile7,tile8,tile9]
    ];
    // loops through gameBoard array and applies a function for each tile
    function objectLooper(array, func = '') {
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
    function clearBoard() {
        objectLooper(gameBoard, function(param){
            param.textContent = ''
            param.classList.remove('x')
            param.classList.remove('o')
            param.classList.remove('c')
        })
    }
    function checkBoard() {
        let cleanBoard = []
        function tile(tile){
            return tile.textContent
        }
        for (let i = 0; i < gameBoard.length; i ++) {
            let currentLine = gameBoard[i].map(tile)
            cleanBoard.push(currentLine);
        }
        return cleanBoard;
    }
    // creates an array with all rows, columns and full diagonals of a given 2d array
    function arrayMaker(array) {
        if(array.length !== array[0].length){return console.log('not a 2d array')}
        let lines = []
        let x = array.length -1
        let diagonal1 = []
        let diagonal2 = []
        for (let i = 0; i < array.length; i ++) {
            let currentRow = []
            let currentColumn =[]
            for (let j = 0; j < array[i].length; j++){
              currentRow.push(array[i][j])
              currentColumn.push(array[j][i])
            }
            lines.push(currentRow, currentColumn);
            // adds arrays for the two diagonals of the board
            diagonal1.push(array[i][i])
            diagonal2.push(array[x][i])
            x--
        }
        lines.push(diagonal2, diagonal1)
        return lines;
      }


    // const victoryCondition = (array) => {
    //     if (
    //         array[0][0] !== '' && array[1][1] !== '' && array[2][2] !== '' &&
    //         ((array[0][0] === array[0][1] && array[0][0] === array[0][2]) ||
    //         (array[1][0] === array[1][1] && array[1][0] === array[1][2]) ||
    //         (array[2][0] === array[2][1] && array[2][0] === array[2][2]) ||
    //         (array[0][0] === array[1][0] && array[0][0] === array[2][0]) ||
    //         (array[0][1] === array[1][1] && array[0][1] === array[2][1]) ||
    //         (array[0][2] === array[1][2] && array[0][2] === array[2][2]) ||
    //         (array[0][0] === array[1][1] && array[0][0] === array[2][2]) ||
    //         (array[2][0] === array[1][1] && array[2][0] === array[0][2]))
    //     ) {
    //         console.log('vicory')
    //     } else {
    //         console.log('not victory')
    //     }
    // }

    const checkLines = () => {
        return arrayMaker(checkBoard())
    }
    return {
        clearBoard,
        checkBoard,
        checkLines
    }
})()
//end of module / object

// const gameBoard = {
//     0: [tile1,tile2,tile3],
//     1: [tile4,tile5,tile6],
//     2: [tile7,tile8,tile9]
// }



// // function objectLooper(array, func = '') {
//     for (let key in array) {
//         for(let i = 0; i < array[key].length; i++) {
//             if (typeof func ==='function') {
//                 let current = array[key][i]
//                 console.log(array[key][i].textContent);
//                 func(current)
//             } else {
//                 console.log(array[key][i].textContent);
//             }
//         }
//     }
// }

//clears current tile, for use with objectLooper

// takes an array as parameter and checks if any line or diagonal contains the same symbol
// const victoryCheck = (array) => {
//     if (
//         array[0][0] !== '' && array[1][1] !== '' && array[2][2] !== '' &&
//         ((array[0][0] === array[0][1] && array[0][0] === array[0][2]) ||
//         (array[1][0] === array[1][1] && array[1][0] === array[1][2]) ||
//         (array[2][0] === array[2][1] && array[2][0] === array[2][2]) ||
//         (array[0][0] === array[1][0] && array[0][0] === array[2][0]) ||
//         (array[0][1] === array[1][1] && array[0][1] === array[2][1]) ||
//         (array[0][2] === array[1][2] && array[0][2] === array[2][2]) ||
//         (array[0][0] === array[1][1] && array[0][0] === array[2][2]) ||
//         (array[2][0] === array[1][1] && array[2][0] === array[0][2]))
//     ) {
//         console.log('vicory')
//     } else {
//         console.log('not victory')
//     }
// }
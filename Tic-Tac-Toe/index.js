const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;//default value = X
let gameGrid;//all empty

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
//let's create a function to initiliase a game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  newGameBtn.classList.remove("active");
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
  //whenerver initGame is called you have to make UI empty
  for (let i = 0; i < 9; i++) {
    boxes[i].innerHTML = '';
    boxes[i].style.pointerEvents = "all";
    //reinitialise the css properties
    if(boxes[i].classList.contains('win')){
      boxes[i].classList.remove('win');
    }
  }

}

initGame();
function checkGameOver() {
  let ans = "";
  winningPositions.forEach((position) => {
    //all boxes should be non empty and should have same value
    if ((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[0]] != "")
      && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])
    ) {
      ans = gameGrid[position[0]];//game is won by anyone
      boxes.forEach((box)=>{
        box.style.pointerEvents = "none";
      })
      //now we know that O/X is winner -> so mark them green
      boxes[position[0]].classList.add('win');
      boxes[position[1]].classList.add('win');
      boxes[position[2]].classList.add('win');
      
    }
  });
  if(ans != ""){
  //means winner is found
    newGameBtn.style.display = "unset";
    gameInfo.textContent = `Game Winner - ${ans}`;
    return ;
  }
  //We know, NO Winner Found, let's check whether there is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
      if(box !== "" )
          fillCount++;
  });

  //board is Filled, game is TIE
  if(fillCount === 9) {
      gameInfo.innerText = "Game Tied !";
      newGameBtn.classList.add("active");
  }

}
function handleClick(i) {
  gameGrid[i] = currentPlayer;
  boxes[i].innerHTML = currentPlayer;
  //swapping the turn of player 
  if (currentPlayer == 'O') {
    currentPlayer = 'X';
  }
  else {
    currentPlayer = "O";
  }

  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
  if (checkIsFull()) {
    newGameBtn.style.display = "unset";
  }
  checkGameOver();
  //gameInfo.innerHTML =  `${currentPlayer} Wins`; 
}

function checkIsFull() {
  for (let i = 0; i < 9; i++) {
    if (gameGrid[i] == "") {
      return false; 
    }
  }
  return true;
}

for (let i = 0; i < 9; i++) {
  boxes[i].addEventListener('click', () => {
    if (gameGrid[i] == "") {
      handleClick(i);
    }
  });
}

newGameBtn.addEventListener('click', () => {
  initGame();
});


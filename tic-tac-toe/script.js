let winMsg = document.querySelector(".msg");
let boxes = document.querySelectorAll(".box");

let resetGameButton = document.querySelector(".resetGame");
let newGameButton = document.querySelector(".newGame");

let turnO = true; // First turn is O, next is X
let isGameOver = false;
let turn = 0;

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]


// Game logic to switch button states
const updateButtonStates = () => {
    if (isGameOver) {
        newGameButton.disabled = false;
        resetGameButton.disabled = true;
    } else {
        newGameButton.disabled = true;
        resetGameButton.disabled = false;
    }
};

// Game logic to check for winner after each turn
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            winMsg.innerText = `Winner is:- ${pos1}`;
            winMsg.classList.add("show");
            isGameOver = true;
            boxes.forEach((box) => box.disabled = true);
            updateButtonStates();
            return; 
        }
    }

    // No winner, check for draw
    if (turn === 9) {
        winMsg.innerText = "It is a Draw!";
        winMsg.classList.add("show");
        isGameOver = true;
        updateButtonStates();
    }
};

// Game logic for alternate O and X turns
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true){
            box.innerText = "O";
            turn++;
            turnO = false;
        } else{
            box.innerText = "X";
            turn++;
            turnO = true;
        }
         box.disabled = true;
        checkWinner();
    });
});

// Reset Game Function
const resetGame = () => {
    isGameOver = false;
    winMsg.classList.remove("show");
    turn = 0;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;

    }); 

    updateButtonStates(); 
};

// Reset Game Function Call
resetGameButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click",resetGame);

updateButtonStates();
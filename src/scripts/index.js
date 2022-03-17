let ticTacToe = new TicTacToe(3, 3, 3);

let field = document.getElementById("field");
let cells = document.getElementsByClassName("cell");

let popupContainer = document.getElementById("popupContainer");
let newGameButton = document.getElementById("newGame");
let gameResult = document.getElementById("gameResult");

function createField() {
    let row = `<div class="row"></div>`;

    for (let x = 0; x < ticTacToe.width; x++) {
        field.insertAdjacentHTML("beforeend", row);
        for (let y = 0; y < ticTacToe.height; y++) {
            let currentRow = field.lastChild;
            let cell = `<div class="cell" data-x="${x}" data-y="${y}"></div>`;
            currentRow.insertAdjacentHTML("beforeend", cell);
        }
    }

    for (let cell of cells) {
        cell.addEventListener("click", takePosition);
    }
}

function clearField() {
    for (let cell of cells) {
        cell.innerHTML = '';
    }
}

function newGame() {
    clearField();
    hidePopup();
    ticTacToe.newGame();
}

function takePosition(event) {
    x = Number(event.target.dataset.x);
    y = Number(event.target.dataset.y);

    let step = ticTacToe.takePosition(x, y, ticTacToe.player);
    if (step.success) {
        event.target.innerHTML = ticTacToe.player;
        if (step.gameResult !== '') {
            gameResult.innerHTML = step.gameResult;
            showPopup();
        }
    }
}

function showPopup() {
    popupContainer.classList.remove("hidden")
}

function hidePopup() {
    popupContainer.classList.add("hidden")
}

createField();
newGameButton.addEventListener("click", newGame);
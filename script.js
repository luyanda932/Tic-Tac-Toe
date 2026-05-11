let gameBoard = {
  board: Array(9).fill(""),
};

let players = {
  player1: {
    name: "",
    marker: "X",
  },
  player2: {
    name: "",
    marker: "O",
  },
};

let gameController = {
  currentPlayer: players.player1,
  winner: "",
  togglePlayer() {
    if (this.currentPlayer === players.player1) {
      this.currentPlayer = players.player2;
    } else {
      this.currentPlayer = players.player1;
    }
  },
  checkWinner() {
    console.log(gameBoard.board);
    if (
      gameBoard.board[0] !== "" &&
      gameBoard.board[0] === gameBoard.board[1] &&
      gameBoard.board[1] === gameBoard.board[2]
    ) {
      this.announceWinner(gameBoard.board[0]);
    } else if (
      gameBoard.board[3] !== "" &&
      gameBoard.board[3] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[5]
    ) {
      this.announceWinner(gameBoard.board[3]);
    } else if (
      gameBoard.board[6] !== "" &&
      gameBoard.board[6] === gameBoard.board[7] &&
      gameBoard.board[7] === gameBoard.board[8]
    ) {
      this.announceWinner(gameBoard.board[6]);
    } else if (
      gameBoard.board[0] !== "" &&
      gameBoard.board[0] === gameBoard.board[3] &&
      gameBoard.board[3] === gameBoard.board[6]
    ) {
      this.announceWinner(gameBoard.board[0]);
    } else if (
      gameBoard.board[1] !== "" &&
      gameBoard.board[1] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[7]
    ) {
      this.announceWinner(gameBoard.board[1]);
    } else if (
      gameBoard.board[2] !== "" &&
      gameBoard.board[2] === gameBoard.board[5] &&
      gameBoard.board[5] === gameBoard.board[8]
    ) {
      this.announceWinner(gameBoard.board[2]);
    } else if (
      gameBoard.board[0] !== "" &&
      gameBoard.board[0] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[8]
    ) {
      this.announceWinner(gameBoard.board[0]);
    } else if (
      gameBoard.board[2] !== "" &&
      gameBoard.board[2] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[6]
    ) {
      this.announceWinner(gameBoard.board[2]);
    }
  },
  announceWinner(marker) {
    if (marker === "X") {
      winnerDialog.innerText = players.player1.name + " is the winner";
      winnerDialog.showModal();
    } else {
      winnerDialog.innerText = players.player2.name + " is the winner";
      winnerDialog.showModal();
    }
  },
  announceDraw() {
    winnerDialog.innerText = "It's a draw";
    winnerDialog.showModal();
  },
};

const grid = document.querySelector(".grid");
const player1Dialog = document.querySelector("#player1-dialog");
const player2Dialog = document.querySelector("#player2-dialog");
const winnerDialog = document.createElement("dialog");
winnerDialog.style.cssText = "display: flex; align-items: center; justify-content: center; width: 200px; height: 150px; border: none; border-radius: 10px; font-family:Arial, Helvetica, sans-serif; font-size: 1.2rem;";
winnerDialog.closedBy = "any";
document.body.appendChild(winnerDialog);
const resetButton = document.querySelector("#reset-button");

player1Dialog.addEventListener("submit", function (event) {
  event.preventDefault();
  players.player1.name = player1Dialog.querySelector("#player1-name").value;
  player1Dialog.close();
  player2Dialog.showModal();
});

player2Dialog.addEventListener("submit", function (event) {
  event.preventDefault();
  players.player2.name = player2Dialog.querySelector("#player2-name").value;
  player2Dialog.close();
});

player1Dialog.showModal();

grid.addEventListener("click", (event) => {
  let cells = document.querySelectorAll(".cell");
  for (let index = 0; index < cells.length; index++) {
    if (event.target === cells[index]) {
      if (gameBoard.board[index] === "X" || gameBoard.board[index] === "O") {
        alert("This cell is already taken");
        return;
      }
      if (gameBoard.board[index] === "") {
        event.target.innerText = gameController.currentPlayer.marker;
        gameBoard.board[index] = gameController.currentPlayer.marker;
        gameController.togglePlayer();
        gameController.checkWinner();
      }
    }
  }
  if (gameBoard.board.includes('') === false) {
    gameController.announceDraw();
  }
});

resetButton.addEventListener("click", function () {
  let cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    cell.innerText = "";
  }
  gameBoard.board = Array(9).fill("");
  gameController.currentPlayer = players.player1;
  gameController.winner = "";
});


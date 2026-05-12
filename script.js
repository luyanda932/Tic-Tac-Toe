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
  running: true,
  togglePlayer() {
    this.currentPlayer = this.currentPlayer === players.player1 ? players.player2 : players.player1; 
  },
  checkWinner() {
    if (
      gameBoard.board[0] !== "" &&
      gameBoard.board[0] === gameBoard.board[1] &&
      gameBoard.board[1] === gameBoard.board[2]
    ) {
      gameController.running = false;
      this.showWinningPattern(0, 1, 2);
      this.announceWinner(gameBoard.board[0]);
    } else if (
      gameBoard.board[3] !== "" &&
      gameBoard.board[3] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[5]
    ) {
      gameController.running = false;
      this.showWinningPattern(3, 4, 5);
      this.announceWinner(gameBoard.board[3]);
    } else if (
      gameBoard.board[6] !== "" &&
      gameBoard.board[6] === gameBoard.board[7] &&
      gameBoard.board[7] === gameBoard.board[8]
    ) {
      gameController.running = false;
      this.showWinningPattern(6, 7, 8);
      this.announceWinner(gameBoard.board[6]);
    } else if (
      gameBoard.board[0] !== "" &&
      gameBoard.board[0] === gameBoard.board[3] &&
      gameBoard.board[3] === gameBoard.board[6]
    ) {
      gameController.running = false;
      this.showWinningPattern(0, 3, 6);
      this.announceWinner(gameBoard.board[0]);
    } else if (
      gameBoard.board[1] !== "" &&
      gameBoard.board[1] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[7]
    ) {
      gameController.running = false;
      this.showWinningPattern(1, 4, 7);
      this.announceWinner(gameBoard.board[1]);
    } else if (
      gameBoard.board[2] !== "" &&
      gameBoard.board[2] === gameBoard.board[5] &&
      gameBoard.board[5] === gameBoard.board[8]
    ) {
      gameController.running = false;
      this.showWinningPattern(2, 5, 8);
      this.announceWinner(gameBoard.board[2]);
    } else if (
      gameBoard.board[0] !== "" &&
      gameBoard.board[0] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[8]
    ) {
      gameController.running = false;
      this.showWinningPattern(0, 4, 8);
      this.announceWinner(gameBoard.board[0]);
    } else if (
      gameBoard.board[2] !== "" &&
      gameBoard.board[2] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[6]
    ) {
      gameController.running = false;
      this.showWinningPattern(2, 4, 6);
      this.announceWinner(gameBoard.board[2]);
    } else if (gameBoard.board.includes("") === false) {
      gameController.running = false;
      this.announceDraw();
    }
  },
  announceWinner(marker) {
    if (marker === "X") {
      gameDialog.innerText = "Player 1 is the winner";
      gameDialog.showModal();
    } else {
      gameDialog.innerText = "Player 2 is the winner";
      gameDialog.showModal();
    }
  },
  announceDraw() {
    gameDialog.innerText = "It's a draw";
    gameDialog.showModal();
  },
  showWinningPattern(cell1, cell2, cell3) {
    const cells = document.querySelectorAll(".cell");
    for (let index = 0; index < cells.length; index++) {
      if (index === cell1 || index === cell2 || index === cell3) {
        cells[index].style.color = "rgb(105, 182, 212)";
        cells[index].style.background = "rgba(255, 255, 255, 0.89)";
      }
    }
  },
};

const grid = document.querySelector(".grid");
const player1Dialog = document.querySelector("#player1-dialog");
const player2Dialog = document.querySelector("#player2-dialog");
const gameDialog = document.querySelector("#game-dialog"); 
gameDialog.closedBy = "any";
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

// player1Dialog.showModal();

grid.addEventListener("click", (event) => {
  if (gameController.running === false) {
    return;
  }
  let cells = document.querySelectorAll(".cell");
  for (let index = 0; index < cells.length; index++) {
    if (event.target === cells[index]) {
      if (gameBoard.board[index] === "X" || gameBoard.board[index] === "O") {
        gameDialog.innerText = "This cell is already taken";
        gameDialog.showModal();
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
});

resetButton.addEventListener("click", function () {
  let cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    cell.innerText = "";
    cell.style.color = "white";
    cell.style.background = "rgb(105, 182, 212)";
  }
  gameBoard.board = Array(9).fill("");
  gameController.currentPlayer = players.player1;
  gameController.winner = "";
  gameController.running = true;
});

const size = 3;
let timer = 0, moves = 0, interval;
let imgUrl = "image.png"; // if noo image is given,  default

document.getElementById("imageUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imgUrl = event.target.result; // base64 image
      startGame();
    };
    reader.readAsDataURL(file);
  }
});

function startGame() {
  clearInterval(interval); //stops repeating actions`
  timer = 0; moves = 0;
  document.getElementById("timer").innerText = "Time: 0s";
  document.getElementById("moves").innerText = "Moves: 0";

  const board = document.getElementById("puzzle-board");
  const tale = document.getElementById("puzzle-pieces");
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  board.innerHTML = "";
  tale.innerHTML = "";
  
  // reference image for player 
  document.getElementById("reference").style.backgroundImage = `url(${imgUrl})`;

  // building slots
  for (let i = 0; i < size * size; i++) {
    let slot = document.createElement("div");
    slot.classList.add("slot");
    slot.dataset.id = i;
    board.appendChild(slot);

    slot.addEventListener("dragover", (e) => e.preventDefault());
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const piece = document.querySelector(".dragging");
      if (!piece) return;

      let col = slot.dataset.id % size;
      let row = Math.floor(slot.dataset.id / size);
      let correct = `${row}-${col}`;

      if (piece.dataset.correct === correct && !slot.hasChildNodes()) {
        slot.appendChild(piece);
        piece.setAttribute("draggable", "false");
        checkWin();
      } else {
        tale.appendChild(piece);
      }
      moves++;
      document.getElementById("moves").innerText = `Moves: ${moves}`;
    });
  }

  // creating shuffled pieces
  let positions = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      positions.push({row, col});
    }
  }
  positions.sort(() => Math.random() - 0.5);

  positions.forEach(pos => {
    let piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundImage = `url(${imgUrl})`;
    piece.style.backgroundPosition = `-${pos.col * 100}px -${pos.row * 100}px`;
    piece.dataset.correct = `${pos.row}-${pos.col}`;

    piece.setAttribute("draggable", "true");
    piece.addEventListener("dragstart", () => piece.classList.add("dragging"));
    piece.addEventListener("dragend", () => piece.classList.remove("dragging"));

    tale.appendChild(piece);
  });

  interval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerText = `Time: ${timer}s`;
  }, 1000);
}

function checkWin() {
  const slots = document.querySelectorAll(".slot");
  let win = true;
  slots.forEach(slot => {
    if (slot.hasChildNodes()) {
      const piece = slot.firstChild;
      let col = slot.dataset.id % size;
      let row = Math.floor(slot.dataset.id / size);
      let correct = `${row}-${col}`;
      if (piece.dataset.correct !== correct) {
        win = false;
      }
    } else {
      win = false;
    }
  });

  if (win) {
    clearInterval(interval);
    const modal = document.getElementById("modal");
    const msg = document.getElementById("congrats-msg");
    msg.innerText = `Congratulations! You solved it in ${timer}s and ${moves} moves.Great!`;
    modal.style.display = "flex";
  }
}

window.onload = startGame;

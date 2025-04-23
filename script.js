let image = null;

document.getElementById("imageUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      image = new Image();
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function generatePuzzle() {
  if (!image) {
    alert("Please upload an image first.");
    return;
  }

  const difficulty = parseInt(document.getElementById("difficulty").value);
  const puzzleContainer = document.getElementById("puzzleContainer");
  puzzleContainer.innerHTML = "";
  puzzleContainer.style.gridTemplateColumns = `repeat(${difficulty}, 80px)`;

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const pieceWidth = Math.floor(canvas.width / difficulty);
  const pieceHeight = Math.floor(canvas.height / difficulty);
  const pieces = [];

  for (let y = 0; y < difficulty; y++) {
    for (let x = 0; x < difficulty; x++) {
      const pieceCanvas = document.createElement("canvas");
      pieceCanvas.width = pieceWidth;
      pieceCanvas.height = pieceHeight;
      const pieceCtx = pieceCanvas.getContext("2d");
      pieceCtx.drawImage(canvas, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
      pieces.push(pieceCanvas.toDataURL());
    }
  }

  shuffleArray(pieces);

  pieces.forEach((src) => {
    const div = document.createElement("div");
    div.classList.add("piece");
    div.style.width = "80px";
    div.style.height = "80px";
    div.style.backgroundImage = `url(${src})`;
    puzzleContainer.appendChild(div);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

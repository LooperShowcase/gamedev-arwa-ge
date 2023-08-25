const cardscontainer = document.getElementById("cards");
let cards = [];
let firstcard, secondcard;
let lockboard = false;
let score = 0;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shufflecards();
    generatecards();
    console.log(cards);
  });

function shufflecards() {
  let randomindex;
  let currentindex = cards.length;
  let temp;

  while (currentindex !== 0) {
    randomindex = Math.floor(Math.random() * currentindex);
    currentindex--;
    temp = cards[currentindex];
    cards[currentindex] = cards[randomindex];
    cards[randomindex] = temp;
  }
}

function generatecards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
    <div class="front">
      <img class="front-image" src="${card.image}">
    </div>
    <div class="back"></div>
    `;
    cardscontainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipcard);
    cardElement.addEventListener("touchstart", flipcard);
  }
}

function flipcard() {
  if (lockboard) return;
  if (this === firstcard) ReadableStreamDefaultController;

  this.classList.add("flipped");

  if (!firstcard) {
    firstcard = this;
    return;
  }
  secondcard = this;
  lockboard = true;

  checkForMatch();
}

function checkForMatch() {
  let ismatch = firstcard.dataset.name === secondcard.dataset.name;

  if (ismatch) {
    disablecards();
  } else {
    unflipCard();
  }
}

function disablecards() {
  firstcard.removeEventListener("click", flipcard);
  firstcard.removeEventListener("touchstart", flipcard);
  secondcard.removeEventListener("touchstart", flipcard);
  secondcard.removeEventListener("click", flipcard);
  score++;
  if (score === 9) startConfetti();
  unlockBoard();
}

function unlockBoard() {
  firstcard = null;
  secondcard = null;
  lockboard = false;
}

function unflipCard() {
  setTimeout(() => {
    firstcard.classList.remove("flipped");
    secondcard.classList.remove("flipped");
    unlockBoard();
  }, 1000);
}

function restart() {
  shufflecards();
  unlockBoard();
  score = 0;
  document.getElementById("score").textContent = score;
  cardscontainer.innerHTML = "";
  generatecards();
  stopConfetti();
}

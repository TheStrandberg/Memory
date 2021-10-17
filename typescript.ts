const section = document.querySelector("section")! as HTMLElement;
const playerLivesCount = document.getElementById(
  "playerLivesCount"
)! as HTMLElement;
let playerLives: number = 6;

//Link text
playerLivesCount.textContent = "" + playerLives;

//Get the image data
const getData = () => [
  { imgSrc: "./images/Bart_Simpson.png", name: "bart" },
  { imgSrc: "./images/Duff_man.png", name: "duff man" },
  { imgSrc: "./images/Edna_Krabappel.png", name: "edna krabappel" },
  { imgSrc: "./images/Flandersjunksale.jpg", name: "flanders junk sale" },
  { imgSrc: "./images/Homer_Simpson.png", name: "homer simpson" },
  { imgSrc: "./images/Lisa_Simpson.png", name: "lisa simpson" },
  { imgSrc: "./images/Montgomery_Burns.png", name: "burns" },
  { imgSrc: "./images/comic_book_man.png", name: "comic book guy" },
  { imgSrc: "./images/Bart_Simpson.png", name: "bart" },
  { imgSrc: "./images/Duff_man.png", name: "duff man" },
  { imgSrc: "./images/Edna_Krabappel.png", name: "edna krabappel" },
  { imgSrc: "./images/Flandersjunksale.jpg", name: "flanders junk sale" },
  { imgSrc: "./images/Homer_Simpson.png", name: "homer simpson" },
  { imgSrc: "./images/Lisa_Simpson.png", name: "lisa simpson" },
  { imgSrc: "./images/Montgomery_Burns.png", name: "burns" },
  { imgSrc: "./images/comic_book_man.png", name: "comic book guy" },
];

//Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {
  const cardData = randomize();
  //Generate HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    //.add in ts, classlist = "card" in js
    card.classList.add("card");
    face.classList.add("face");
    back.classList.add("back");
    //Attach the image to the face
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attach cards to section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  console.log(flippedCards);
  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card: any) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = "" + playerLives;
    }
    if (playerLives === 0) {
      setTimeout(() => {
        alert("You Lost");
        playerLives = 6;
        playerLivesCount.textContent = "" + playerLives;
        restart();
      }, 1000);
    }
  }
};

function restart() {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item: any, index: number) => {
    cards[index].classList.remove("toggleCard");
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
    }, 1100);
  });
  section.style.pointerEvents = "all";
}

cardGenerator();

const section = document.querySelector("section")! as HTMLElement;
const body = document.querySelector("body")! as HTMLElement;
const gameWindow = document.querySelector(".game")! as HTMLElement;
const startWindow = document.querySelector(".start")! as HTMLElement;
const main = document.querySelector("main")! as HTMLAreaElement;
const aside = document.querySelector("aside")! as HTMLAreaElement;
const playAgainButton = document.querySelector(".playAgainButton")! as HTMLButtonElement;
const quitButton = document.querySelector(".quitButton")! as HTMLButtonElement;
const playAgainButton2 = document.querySelector(".playAgainButton-2")! as HTMLButtonElement;
const quitButton2 = document.querySelector(".quitButton-2")! as HTMLButtonElement;
const playerLivesCount = document.getElementById("playerLivesCount")! as HTMLElement;
let choice: boolean = false;


let playerLives: number = 6;

//Link text
playerLivesCount.textContent = "" + playerLives;

const simpsonsButton = document.getElementById("simpsons")! as HTMLButtonElement;
simpsonsButton.addEventListener("click", playSimpsons);
function playSimpsons() {
    startWindow.style.display = "none";
    gameWindow.style.visibility = "visible";
    body.style.background = "url(images/thesimpsons/background.jpg)";
    body.style.backgroundSize = "cover;"
    // body.style.background = "linear-gradient(rgb(112, 209, 254), rgb(149, 222, 255))";
    cardGenerator();
}

const familyGuyButton = document.getElementById("familyguy")! as HTMLButtonElement;
familyGuyButton.addEventListener("click", playFamilyGuy);
function playFamilyGuy() {
  startWindow.style.display = "none";
    gameWindow.style.visibility = "visible";
    body.style.background = "url(images/familyguy/background.jpg)";
    body.style.backgroundSize = "cover;"
    choice = true;
    cardGenerator();
}

//Randomize
function randomize() {
  let cardData = [];
  if (choice === false)
  {
    cardData = getSimpsonsData();
  }
  else {
    cardData = getFamilyGuyData();
  }
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
    //.add in ts, "classlist = "card""" in js
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
  clickedCard.style.pointerEvents = "none";
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  console.log(flippedCards);
  //Logic
  if (flippedCards.length === 2) {
    section.style.pointerEvents = "none";
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      setTimeout(() => {
        section.style.pointerEvents = "all";
      flippedCards.forEach((card: any) => {
        card.classList.remove("flipped");
      });
      }, 1000);
    } 
    else {
      playerLives--;
      playerLivesCount.textContent = "" + playerLives;
      if (playerLives === 0) {
        section.style.pointerEvents = "none";
        flippedCards.forEach((card: any) => {
          card.classList.remove("flipped");
          card.style.pointerEvents = "none";
        });
        setTimeout(() => {
          section.setAttribute("class", "blur");
          main.style.visibility = "visible";
          playAgainButton.addEventListener("click", restart);
          quitButton.onclick = (event) => {
            close();
          };
        }, 1000);
      }
      else {
        section.style.pointerEvents = "none";
        flippedCards.forEach((card: any) => {
          card.classList.remove("flipped");
          card.style.pointerEvents = "none";
          setTimeout(() => {
            card.style.pointerEvents = "revert";
            section.style.pointerEvents = "all";
            card.classList.remove("toggleCard");
          }, 1000);
        });
      }
    }
  }
  if (toggleCard.length === 16) {
    setTimeout(() => {
      section.setAttribute("class", "blur");
      aside.style.visibility = "visible";
      playAgainButton2.addEventListener("click", restart);
      quitButton2.onclick = (event) => {
        close();
      };
    }, 1000);
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
      cards[index].style.pointerEvents = "revert";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
    }, 1000);
  });
  setTimeout(() => {
    section.style.pointerEvents = "all";
    section.removeAttribute("class");
    main.style.visibility = "hidden";
    aside.style.visibility = "hidden";
    playerLives = 6;
    playerLivesCount.textContent = "" + playerLives;
  }, 2000);
}

//Get the image data
const getSimpsonsData = () => [
  { imgSrc: "./images/thesimpsons/Bart_Simpson.png", name: "bart" },
  { imgSrc: "./images/thesimpsons/Duff_man.png", name: "duff man" },
  { imgSrc: "./images/thesimpsons/Edna_Krabappel.png", name: "edna krabappel" },
  { imgSrc: "./images/thesimpsons/Flandersjunksale.jpg", name: "flanders junk sale" },
  { imgSrc: "./images/thesimpsons/Homer_Simpson.png", name: "homer simpson" },
  { imgSrc: "./images/thesimpsons/Lisa_Simpson.png", name: "lisa simpson" },
  { imgSrc: "./images/thesimpsons/Montgomery_Burns.png", name: "burns" },
  { imgSrc: "./images/thesimpsons/comic_book_man.png", name: "comic book guy" },
  { imgSrc: "./images/thesimpsons/Bart_Simpson.png", name: "bart" },
  { imgSrc: "./images/thesimpsons/Duff_man.png", name: "duff man" },
  { imgSrc: "./images/thesimpsons/Edna_Krabappel.png", name: "edna krabappel" },
  { imgSrc: "./images/thesimpsons/Flandersjunksale.jpg", name: "flanders junk sale" },
  { imgSrc: "./images/thesimpsons/Homer_Simpson.png", name: "homer simpson" },
  { imgSrc: "./images/thesimpsons/Lisa_Simpson.png", name: "lisa simpson" },
  { imgSrc: "./images/thesimpsons/Montgomery_Burns.png", name: "burns" },
  { imgSrc: "./images/thesimpsons/comic_book_man.png", name: "comic book guy" },
];

const getFamilyGuyData = () => [
  { imgSrc: "./images/familyguy/brian_griffin.png", name: "brian griffin" },
  { imgSrc: "./images/familyguy/chris_griffin.png", name: "chris griffin" },
  { imgSrc: "./images/familyguy/cleveland_brown.png", name: "cleveland brown" },
  { imgSrc: "./images/familyguy/glen_quagmire.png", name: "glen_quagmire" },
  { imgSrc: "./images/familyguy/lois_griffin.png", name: "lois griffin" },
  { imgSrc: "./images/familyguy/meg_griffin.jpg", name: "meg griffin" },
  { imgSrc: "./images/familyguy/peter_griffin.png", name: "peter griffin" },
  { imgSrc: "./images/familyguy/stewie_griffin.jpg", name: "stewie griffin" },
  { imgSrc: "./images/familyguy/brian_griffin.png", name: "brian griffin" },
  { imgSrc: "./images/familyguy/chris_griffin.png", name: "chris griffin" },
  { imgSrc: "./images/familyguy/cleveland_brown.png", name: "cleveland brown" },
  { imgSrc: "./images/familyguy/glen_quagmire.png", name: "glen_quagmire" },
  { imgSrc: "./images/familyguy/lois_griffin.png", name: "lois griffin" },
  { imgSrc: "./images/familyguy/meg_griffin.jpg", name: "meg griffin" },
  { imgSrc: "./images/familyguy/peter_griffin.png", name: "peter griffin" },
  { imgSrc: "./images/familyguy/stewie_griffin.jpg", name: "stewie griffin" },
];
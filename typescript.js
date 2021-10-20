var section = document.querySelector("section");
var gameWindow = document.querySelector(".game");
var startWindow = document.querySelector(".start");
var main = document.querySelector("main");
var aside = document.querySelector("aside");
var playAgainButton = document.querySelector(".playAgainButton");
var quitButton = document.querySelector(".quitButton");
var playAgainButton2 = document.querySelector(".playAgainButton-2");
var quitButton2 = document.querySelector(".quitButton-2");
var playerLivesCount = document.getElementById("playerLivesCount");
var choice = false;
var playerLives = 6;
//Link text
playerLivesCount.textContent = "" + playerLives;
var simpsonsButton = document.getElementById("simpsons");
simpsonsButton.addEventListener("click", playSimpsons);
function playSimpsons() {
    startWindow.style.display = "none";
    gameWindow.style.visibility = "visible";
    cardGenerator();
}
var familyGuyButton = document.getElementById("familyguy");
familyGuyButton.addEventListener("click", playFamilyGuy);
function playFamilyGuy() {
    startWindow.style.display = "none";
    gameWindow.style.visibility = "visible";
    choice = true;
    cardGenerator();
}
//Randomize
function randomize() {
    var cardData = [];
    if (choice === false) {
        cardData = getSimpsonsData();
    }
    else {
        cardData = getFamilyGuyData();
    }
    cardData.sort(function () { return Math.random() - 0.5; });
    return cardData;
}
;
var cardGenerator = function () {
    var cardData = randomize();
    //Generate HTML
    cardData.forEach(function (item) {
        var card = document.createElement("div");
        var face = document.createElement("img");
        var back = document.createElement("div");
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
        card.addEventListener("click", function (e) {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};
var checkCards = function (e) {
    var clickedCard = e.target;
    clickedCard.style.pointerEvents = "none";
    clickedCard.classList.add("flipped");
    var flippedCards = document.querySelectorAll(".flipped");
    var toggleCard = document.querySelectorAll(".toggleCard");
    console.log(flippedCards);
    //Logic
    if (flippedCards.length === 2) {
        section.style.pointerEvents = "none";
        if (flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")) {
            section.style.pointerEvents = "all";
            flippedCards.forEach(function (card) {
                card.classList.remove("flipped");
            });
        }
        else {
            playerLives--;
            playerLivesCount.textContent = "" + playerLives;
            if (playerLives === 0) {
                section.style.pointerEvents = "none";
                flippedCards.forEach(function (card) {
                    card.classList.remove("flipped");
                    card.style.pointerEvents = "none";
                });
                setTimeout(function () {
                    section.setAttribute("class", "blur");
                    main.style.visibility = "visible";
                    playAgainButton.addEventListener("click", restart);
                    quitButton.onclick = function (event) {
                        close();
                    };
                }, 1000);
            }
            else {
                section.style.pointerEvents = "none";
                flippedCards.forEach(function (card) {
                    card.classList.remove("flipped");
                    card.style.pointerEvents = "none";
                    setTimeout(function () {
                        card.style.pointerEvents = "revert";
                        section.style.pointerEvents = "all";
                        card.classList.remove("toggleCard");
                    }, 1000);
                });
            }
        }
    }
    if (toggleCard.length === 16) {
        setTimeout(function () {
            section.setAttribute("class", "blur");
            aside.style.visibility = "visible";
            playAgainButton2.addEventListener("click", restart);
            quitButton2.onclick = function (event) {
                close();
            };
        }, 1000);
    }
};
function restart() {
    var cardData = randomize();
    var faces = document.querySelectorAll(".face");
    var cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach(function (item, index) {
        cards[index].classList.remove("toggleCard");
        setTimeout(function () {
            cards[index].style.pointerEvents = "revert";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
        }, 1000);
    });
    setTimeout(function () {
        section.style.pointerEvents = "all";
        section.removeAttribute("class");
        main.style.visibility = "hidden";
        aside.style.visibility = "hidden";
        playerLives = 6;
        playerLivesCount.textContent = "" + playerLives;
    }, 2000);
}
//Get the image data
var getSimpsonsData = function () { return [
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
]; };
var getFamilyGuyData = function () { return [
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
]; };

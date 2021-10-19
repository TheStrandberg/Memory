var section = document.querySelector("section");
var main = document.querySelector("main");
var aside = document.querySelector("aside");
var playAgainButton = document.querySelector(".playAgainButton");
var quitButton = document.querySelector(".quitButton");
var playAgainButton2 = document.querySelector(".playAgainButton-2");
var quitButton2 = document.querySelector(".quitButton-2");
var playerLivesCount = document.getElementById("playerLivesCount");
var playerLives = 6;
//Link text
playerLivesCount.textContent = "" + playerLives;
//Get the image data
var getData = function () { return [
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
]; };
//Randomize
var randomize = function () {
    var cardData = getData();
    cardData.sort(function () { return Math.random() - 0.5; });
    return cardData;
};
var cardGenerator = function () {
    var cardData = randomize();
    //Generate HTML
    cardData.forEach(function (item) {
        var card = document.createElement("div");
        var face = document.createElement("img");
        var back = document.createElement("div");
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
        card.addEventListener("click", function (e) {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};
var checkCards = function (e) {
    var clickedCard = e.target;
    clickedCard.classList.add("flipped");
    var flippedCards = document.querySelectorAll(".flipped");
    var toggleCard = document.querySelectorAll(".toggleCard");
    console.log(flippedCards);
    //Logic
    if (flippedCards.length === 2) {
        section.style.pointerEvents = "none";
        if (flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")) {
            console.log("match");
            section.style.pointerEvents = "all";
            flippedCards.forEach(function (card) {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        }
        else {
            console.log("wrong");
            flippedCards.forEach(function (card) {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
                setTimeout(function () {
                    card.style.pointerEvents = "all";
                    section.style.pointerEvents = "all";
                    card.classList.remove("toggleCard");
                }, 1000);
            });
            playerLives--;
            playerLivesCount.textContent = "" + playerLives;
        }
        if (playerLives === 0) {
            var card_1 = document.querySelectorAll(".card");
            card_1.forEach(function (item, index) {
                card_1[index].style.pointerEvents = "none";
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
            cards[index].style.pointerEvents = "all";
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
    }, 1000);
}
cardGenerator();

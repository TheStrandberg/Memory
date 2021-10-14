var section = document.querySelector("section");
var playerLivesCount = document.getElementById("playerLivesCount");
var playerLives = 5;
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
    console.log(flippedCards);
    //Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("match");
            flippedCards.forEach(function (card) {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        }
        else {
            console.log("wrong");
            flippedCards.forEach(function (card) {
                card.classList.remove("flipped");
                setTimeout(function () { return card.classList.remove("toggleCard"); }, 1500);
            });
            playerLives--;
            playerLivesCount.textContent = "" + playerLives;
        }
    }
};
cardGenerator();
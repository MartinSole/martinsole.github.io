document.addEventListener("DOMContentLoaded", () => {
    const cardArray = [
        {
            name: "one",
            text: "<p>1</p>"
        },
        {
            name: "one",
            text: "<p>1</p>"
        },
        {
            name: "two",
            text: "<p>2</p>"
        },
        {
            name: "two",
            text: "<p>2</p>"
        },
        {
            name: "three",
            text: "<p>3</p>"
        },
        {
            name: "three",
            text: "<p>3</p>"
        },
        {
            name: "four",
            text: "<p>4</p>"
        },
        {
            name: "four",
            text: "<p>4</p>"
        },
        {
            name: "five",
            text: "<p>5</p>"
        },
        {
            name: "five",
            text: "<p>5</p>"
        },
        {
            name: "six",
            text: "<p>6</p>"
        },
        {
            name: "six",
            text: "<p>6</p>"
        },
        {
            name: "seven",
            text: "<p>7</p>"
        },
        {
            name: "seven",
            text: "<p>7</p>"
        },
        {
            name: "eight",
            text: "<p>8</p>"
        },
        {
            name: "eight",
            text: "<p>8</p>"
        },
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    const easy = 500;
    const medium = 250;
    const hard = 125;
    const ludicrous = 75;
    let difficulty = easy;
    let difficultyName = "Easy";
    let attempts = 0;
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    document.getElementById("easy").addEventListener("click", function () {
        difficulty = easy;
        difficultyName = "Easy";
        hideDifficultyButtons();
    });
    document.getElementById("medium").addEventListener("click", function () {
        difficulty = medium;
        difficultyName = "Medium";
        hideDifficultyButtons();
    });
    document.getElementById("hard").addEventListener("click", function () {
        difficulty = hard;
        difficultyName = "Hard";
        hideDifficultyButtons();
    });
    document.getElementById("ludicrous").addEventListener("click", function () {
        difficulty = ludicrous;
        difficultyName = "Ludicrous speed!";
        hideDifficultyButtons();
    });

    function hideDifficultyButtons() {
        document.getElementById("difficulty").style.display = "none";
    }


    function createCard() {

        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement("div");
            card.className = "card";
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    function checkForMatch() {
        let cards = document.querySelectorAll(".card");
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] == cardsChosen[1]) {
            cards[optionOneId].classList.add("match");
            cards[optionTwoId].classList.add("match");
            cards[optionOneId].textContent = "";
            cards[optionTwoId].textContent = "";
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].classList.remove("selectedCard");
            cards[optionTwoId].classList.remove("selectedCard");
        }
        cardsChosen = [];
        cardsChosenId = [];
        attempts += 1;
        document.querySelector("#attempts").textContent = attempts;
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            alert(`Congratulations, you have won! in ${attempts} attempts out of a possible 8! on ${difficultyName}`);
        }
    }

    function flipCard() {
        hideDifficultyButtons();
        let cardId = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.innerHTML = cardArray[cardId].text;
        this.classList.add("selectedCard");
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, difficulty);
        }
    }


    createCard();
    document.getElementById("newGame").addEventListener("click", function () {
        window.location.reload();
    });
})
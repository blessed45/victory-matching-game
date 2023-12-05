document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const cardArray = [
        { name: 'card1', img: 'images/image1.jpeg' },
        { name: 'card1', img: 'images/image1.jpeg' },
        { name: 'card2', img: 'images/image2.jpeg' },
        { name: 'card2', img: 'images/image2.jpeg' },
        { name: 'card3', img: 'images/image3.jpeg' },
        { name: 'card3', img: 'images/image3.jpeg' },
        { name: 'card4', img: 'images/image4.jpeg' },
        { name: 'card4', img: 'images/image4.jpeg' },
        { name: 'card5', img: 'images/image5.jpeg' },
        { name: 'card5', img: 'images/image5.jpeg' },
        { name: 'card6', img: 'images/image6.jpeg' },
        { name: 'card6', img: 'images/image6.jpeg' },
        { name: 'card7', img: 'images/image7.jpeg' },
        { name: 'card7', img: 'images/image7.jpeg' },
        { name: 'card8', img: 'images/image8.jpeg' },
        { name: 'card8', img: 'images/image8.jpeg' },
        { name: 'card9', img: 'images/image9.jpeg' },
        { name: 'card9', img: 'images/image9.jpeg' },
        { name: 'card10', img: 'images/image10.jpeg' },
        { name: 'card10', img: 'images/image10.jpeg' },
        
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.jpeg');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.jpeg');
            cards[secondCardId].setAttribute('src', 'images/blank.jpeg');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
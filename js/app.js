

shuffleCards();

/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var restart = document.querySelector('.restart');
restart.addEventListener('click', shuffleCards);
   
function shuffleCards() {
    var cards = [...document.querySelectorAll('.card')];
    cards = shuffle(cards);
    var html='';
    for(var i=0; i<cards.length; i++){
        html+=cards[i].outerHTML;
    }

    document.querySelector('.deck').innerHTML=html;

    initializeAllCards();
    
    var cards=document.querySelectorAll('.card');
    for (const card of cards){
        card.classList.remove('match');
        card.classList.remove('open');
        card.classList.remove('show');
    }
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function initializeAllCards() {
    var clickedcard = null;
    var cards = document.querySelectorAll('.card');
    for (const card of cards) {
        card.addEventListener('click', function(e){
            var card = e.target;
    
            card.classList.add('open');
            card.classList.add('show');
            if(clickedcard==null){
                clickedcard = card;
            } else {
                if(clickedcard.innerHTML===card.innerHTML){
                    clickedcard.classList.remove('open');
                    clickedcard.classList.remove('show');
                    card.classList.remove('open');
                    card.classList.remove('show');
                    clickedcard.classList.add('match');
                    card.classList.add('match');

                    clickedcard=null;
                } else {
                    clickedcard.classList.add('error');
                    card.classList.add('error');
                    setTimeout(function() {
                        clickedcard.classList.remove('open');
                        clickedcard.classList.remove('show');
                        clickedcard.classList.remove('error');
                        card.classList.remove('open');
                        card.classList.remove('show');
                        card.classList.remove('error');

                        clickedcard=null;
                    }, 500);
                    
                }
                
            }
        });
    }
}



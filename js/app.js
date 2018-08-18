let moves = -1
let timer

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = array => {
  let currentIndex = array.length, temporaryValue, randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

const startTimer = () => {
  const startTime = new Date()
  timer = setInterval(() => {
    let elapsedMs = Math.round((new Date() - startTime) / 1000)
    document.querySelector('.timer').innerHTML = elapsedMs
    document.querySelector('.modal-timer').innerHTML = elapsedMs
  }, 1000)
}

const resetGame = () => {
  let cards = [...document.querySelectorAll('.card')]

  // Reset cards style.
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('error', 'show', 'match', 'open')
  }
  // Shuffle cards.
  cards = shuffle(cards)
  let html = ''
  for (let i = 0; i < cards.length; i++) {
    html += cards[i].outerHTML
  }
  document.querySelector('.deck').innerHTML = html
  // Attach event listeners.
  initializeCards()
  // Reset moves counter and stars.
  moves = -1
  setStars(3)
  updateMoves()
  startTimer()
}

const setStars = (num) => {
  let html = ''
  for (let i = 0; i < num; i++) {
    html += '<li><i class="fa fa-star"></i></li>'
  }
  document.querySelector('.stars').innerHTML = html
  document.querySelector('.modal-stars').innerHTML = html
}

const updateMoves = () => {
  moves++
  if (moves <= 1) {
    document.querySelector('.moves').innerHTML = moves + ' Move'
  } else {
    document.querySelector('.moves').innerHTML = moves + ' Moves'
  }
  if (moves >= 20) {
    setStars(2)
  }
  if (moves >= 30) {
    setStars(1)
  }
}

const won = () => {
  return document.querySelectorAll('.match').length === 16
}

const deckMask = document.querySelector('.deck-mask')
const initializeCards = () => {
  let clickedcard = null
  let cards = document.querySelectorAll('.card')
  for (const card of cards) {
    card.addEventListener('click', function (e) {
      let card = e.target
      card.classList.add('open', 'show')
      // Check if we're clicking the first card.
      if (clickedcard == null) {
        clickedcard = card
      } else {
        // Check if the two cards match.
        if (clickedcard.innerHTML === card.innerHTML) {
          // We got a match.
          clickedcard.classList.remove('open', 'show')
          card.classList.remove('open', 'show')
          clickedcard.classList.add('match')
          card.classList.add('match')
          clickedcard = null
        } else {
          // Didn't match.
          clickedcard.classList.add('error')
          card.classList.add('error')
          deckMask.removeAttribute('style')
          // Flip both cards back after 500ms.
          setTimeout(() => {
            clickedcard.classList.remove('open', 'show', 'error')
            card.classList.remove('open', 'show', 'error')
            clickedcard = null
            deckMask.setAttribute('style', 'display:none')
          }, 500)
        }
        updateMoves()
        if (won()) {
          clearInterval(timer)
          document.querySelector('.modal').setAttribute('style', 'display:block')
        }
      }
    })
  }
}

// when clicking restart button, shuffle cards
document.querySelector('.restart').addEventListener('click', resetGame)

document.querySelector('#close').addEventListener('click', () => {
  document.querySelector('.modal').setAttribute('style', 'display:none')
})

// Shuffle cards, attach event listeners, reset moves and stars.
resetGame()

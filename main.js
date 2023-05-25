const hit = document.querySelector('.hit')
const deal = document.querySelector('.deal')
const send = document.querySelector('.send')
const youScoreResults = document.querySelector('#you_score_result')
const dealerScoreResult = document.querySelector('#dealer_score_result')
const playText = document.querySelector('.play')
const blackGameHit = {
  'you': {'yourScoreCard': "#you_h1", 'div': '#you_img_container', 'score': 0, 'updateWin': [], 'updatedWin': []},
  'dealer': {'dealerScoreCard': "#dealer_h1", 'div': '#dealer_img_container', 'score': 0, 'updateWin': [], 'updatedWin': []},
  'card': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
  'scoreMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'K':10, 'Q':10, 'A':[11, 1]}
}
// const card = blackGameHit.card
const YOU = blackGameHit['you']
const DEALER = blackGameHit['dealer']
const card = blackGameHit['card']
const scoreMap = blackGameHit['scoreMap']
const hitSound = new Audio('./sounds/swish.m4a')
const winSound = new Audio('./sounds/cash.mp3')
const lostSound = new Audio('./sounds/aww.mp3')

let yourCurrentPlay = 3
let dealerCurrentPlay = 3


let win = 0;
let draw = 0;
let loss = 0;

const getHit = () => {
  if(yourCurrentPlay <=0){
    youScoreResults.textContent = 'BUSTED!'
    youScoreResults.style.color = 'red'
  }else {
    const randNumber = Math.floor(Math.random() *13)
    const cardRandom =card[randNumber]
    displayCard(YOU, cardRandom)
    updateCore(cardRandom, YOU)
    hitSound.play()
   reducerScore(YOU)
  }
   yourCurrentPlay--
}

hit.addEventListener('click', getHit)


const dealerBot = () => {
  const randNumber = Math.floor(Math.random() *13)
  const cardRandom =card[randNumber]
    displayCard(DEALER, cardRandom)
   updateCore(cardRandom, DEALER)
   hitSound.play()
   reducerScore(DEALER)
}

const reducerScore = (activePlayer) => {
  if(activePlayer['updateWin'].length === 3){
    activePlayer['updateWin'].reduce((cur, cul) => {
    activePlayer['updatedWin'].push(cur+cul)
    })
  }
}

const getSend =() => {
   if(dealerCurrentPlay <=0){
    dealerScoreResult.textContent = 'BUSTED!'
    dealerScoreResult.style.color = 'red'
   }else {
    setTimeout(() => {
      dealerBot()
      dealerCurrentPlay --
     }, 800)
     setTimeout(() => {
      dealerBot()
      dealerCurrentPlay --
     }, 1600)
     setTimeout(() => {
      dealerBot()
      dealerCurrentPlay --
      if(YOU['score'] > DEALER['score']){
        console.log('win');
        playText.textContent = 'Win'
        playText.style.color = 'green'
        win++
        document.querySelector('.win').textContent = win
        winSound.play()
      } else if (YOU['score'] === DEALER['score']){
        playText.textContent = 'Draw'
        playText.style.color = 'orange'
        lostSound.play()
        draw++
        document.querySelector('.draw').textContent = draw
      }else {
        playText.textContent = 'Loss'
        playText.style.color = 'red'
        lostSound.play()
        loss++
        document.querySelector('.loss').textContent = loss
      }
      // console.log(`Win${Win}, Draw${Draw}, Loss${Loss}`);
     }, 2400)
   }
}

const displayCard = (active, card) => {
  let cardImg = document.createElement('img')
  cardImg.src = `./images/${card}.png`
  document.querySelector(active['div']).appendChild(cardImg)
}
send.addEventListener('click', getSend)

const updateCore = (cardIndex, activePlayer) => {
  if(cardIndex === 'A') {
    if(activePlayer['score'] + scoreMap[cardIndex][1] <= 21){
      activePlayer['score'] +=scoreMap[cardIndex][1]
    } else {
      activePlayer['score'] +=scoreMap[cardIndex][2]
    }
  }else {
    activePlayer['score'] +=scoreMap[cardIndex]
  activePlayer
  }
  document.querySelector('#you_score_result').textContent = YOU['score']
  document.querySelector('#dealer_score_result').textContent = DEALER['score']
  activePlayer['updateWin'].push(scoreMap[cardIndex])
}
const upDate =() => {
  console.log('clicked');
 const yourImg = document.querySelector('#you_img_container').querySelectorAll('img')
 const dealerImg = document.querySelector('#dealer_img_container').querySelectorAll('img')
 for(let i = 0; i < yourImg.length; i++){
  yourImg[i].remove()
 }
 for(let i = 0; i < dealerImg.length; i++){
  dealerImg[i].remove()
 }
 yourCurrentPlay = 3;
 dealerCurrentPlay = 3
 YOU['score'] = 0;
 DEALER['score']= 0;
 document.querySelector('#you_score_result').textContent = YOU['score']
 document.querySelector('#dealer_score_result').textContent = DEALER['score']
 playText.textContent = "Let's Play"
 youScoreResults.style.color = 'white'
}
deal.addEventListener('click', upDate)


const suits = ["♠", "♣", "♥", "♦"];
const ranks = [
    { name: "에이스", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "잭", value: 10 },
    { name: "퀸", value: 10 },
    { name: "킹", value: 10 },
];

var deck = [];
var dealerHand = [];
var playerHand = [];
var dealerScore = 0;
var playerScore = 0;
var isPlaying = false;

function createDeck(){
    for(var i = 0; i < suits.length; i++){
        for(var j = 0; j < ranks.length; j++){
            deck.push({
                suit: suits[i],
                rank: ranks[j].name,
                value: ranks[j].value,
            })
        }
    }
}

function shuffleDeck(){
    for(var i = 0; i < deck.length; i++){
        var randomIndex = Math.floor(Math.random() * deck.length);
        var temp = deck[i];
        deck[i] = deck[randomIndex];
        dexk[randomIndex] = temp;
    }
}

function dealCards(){
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
}

function calculateScore(hand){
    var score = 0;
    var hasAce = false;

    for(var i = 0; i < hand.length; i++){
        score += hand[i].value;
        if(hand[i].rank === "에이스"){
            hasAce = true;
        }
    }
    if(hasAce && score <= 11){
        score += 10;
    }
    return score;
}

function updateScore(){
    dealerScore = calculateScore(dealerHand);
    playerScore = calculateScore(playerHand);

    document.getElementById("dealer-hand").textContent = "딜러의 카드: " + dealerHand[0].suit + "" + dealerHand[0].rank + "?";
    document.getElementById("player-hand").textContent = "플레이어의 카드: " + getHandText(playerHand) + "(" + playerScore + ")";

    if(dealerScore === 21){
        endGame("딜러의 승리! 블랙잭!");
    } else if(playerScore === 21){
        endGame("플레이어의 승리! 블랙잭!");
    } else if(dealerScore > 21){
        endGame("플레이어의 승리! 딜러가 버스트!");
    } else if(playerScore > 21){
        endGame("딜러의 승리! 플레이어가 버스트!")
    }
}

function getHandText(hand){
    var text = "";

    for(var i = 0; i < hand.length; i++){
        text += hand[i].suit + " " + hand[i].rank + " ";
    }
    return text;
}

function hit(){
    if(isPlaying){
        playerHand.push(deck.pop());
        updateScore();
        if(playerScore > 21){
            endGame("딜러의 승리! 플레이어가 버스트!");
        }
    }
}

function stand(){
    if(isPlaying){
        while(dealerScore < 17){
            dealerHand.push(deck.pop());
            updateScore();
        }
        if(dealerScore > 21){
            endGame("플레이어의 승리! 딜러가 버스트!");
        } else if(dealerScore > playerScore){
            endGame("딜러의 승리!");
        } else if(dealerScore < playerScore){
            endGame("플레이어의 승리!");
        } else {
            endGame("무승부!");
        }
    }
}

function start(){
    deck = [];
    dealerHand = [];
    playerHand = [];
    isPlaying = true;

    createDeck();
    shuffleDeck();
    dealCards();
    updateScore();
}

function endGame(message){
    isPlaying = false;

    document.getElementById("dealer-hand").textContent = "딜러의 카드: " + getHandText(dealerHand) + "(" + dealerScore + ")";
    document.getElementById("result").textContent = message;
}

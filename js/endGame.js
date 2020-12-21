// HTML Dom elements
let finalMessageHTML = document.querySelector('.winlose-message')

if (localStorage.getItem('playerWon') == 1) {
    console.log("player won")
    finalMessageHTML.innerHTML = 'You won the game!'
} else {
    console.log("player lost")
    finalMessageHTML.innerHTML = 'You lost the game!'
}
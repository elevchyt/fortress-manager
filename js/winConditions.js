function setWinConditions(cond) {
    let winConditions = cond // 1 = points, 2 = ranking, 3 = infinite

    localStorage.setItem('winConditions', cond)

    // Go to menu
    redirectToMenu()
}
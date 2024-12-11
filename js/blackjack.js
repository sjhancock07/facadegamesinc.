// Define deck and card values
const cardValues = {
    2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 10, Q: 10, K: 10, A: 11
  };
  
  // Initialize game variables
  let deck, playerHand, computerHand, playerScore, computerScore, isGameOver;
  let playerWins = 0;
  let computerWins = 0;
  
  // Helper functions
  function shuffleDeck() {
    let deckArray = [];
    for (let value in cardValues) {
      for (let i = 0; i < 4; i++) {
        deckArray.push(value); // 4 of each card
      }
    }
    return deckArray.sort(() => Math.random() - 0.5); // Shuffle deck
  }
  
  function getCardValue(card) {
    return cardValues[card];
  }
  
  function drawCard() {
    return deck.pop(); // Draw a card from the deck
  }
  
  function updateHandDisplay() {
    document.getElementById("player-hand").innerHTML = playerHand.join(" ");
    
    // Hide computer's cards and score until the game is over
    if (isGameOver) {
      document.getElementById("computer-hand").innerHTML = computerHand.join(" "); // Reveal computer's cards
      document.getElementById("computer-score").textContent = `Score: ${computerScore}`;
    } else {
      document.getElementById("computer-hand").innerHTML = "??? ???"; // Hide computer's cards
      document.getElementById("computer-score").textContent = `Score: ?`; // Hide score
    }
  
    document.getElementById("player-score").textContent = `Score: ${playerScore}`;
  }
  
  function checkForBust() {
    if (playerScore > 21) {
      document.getElementById("message").textContent = `You busted! You lose. Final score - You: ${playerScore}, Computer: ${computerScore}`;
      isGameOver = true;
      computerWins++; // Increase computer's win tally
      showPlayAgainButton();
    }
  }
  
  function checkForWinner() {
    // Reveal computer's cards and score
    document.getElementById("computer-hand").innerHTML = computerHand.join(" ");
    document.getElementById("computer-score").textContent = `Score: ${computerScore}`;
    
    if (computerScore > 21) {
      document.getElementById("message").textContent = `Computer busted! You win! Final score - You: ${playerScore}, Computer: ${computerScore}`;
      playerWins++; // Increase player's win tally
    } else if (playerScore > computerScore) {
      document.getElementById("message").textContent = `You win! Final score - You: ${playerScore}, Computer: ${computerScore}`;
      playerWins++; // Increase player's win tally
    } else if (playerScore < computerScore) {
      document.getElementById("message").textContent = `You lose! Final score - You: ${playerScore}, Computer: ${computerScore}`;
      computerWins++; // Increase computer's win tally
    } else {
      document.getElementById("message").textContent = `It's a tie! Final score - You: ${playerScore}, Computer: ${computerScore}`;
    }
    isGameOver = true;
    showPlayAgainButton();
    updateWinTally(); // Update win tally display
  }
  
  function showPlayAgainButton() {
    document.getElementById("play-again").style.display = "inline-block"; // Show play again button
  }
  
  // Function to update win tally display
  function updateWinTally() {
    document.getElementById("player-wins").textContent = `Player Wins: ${playerWins}`;
    document.getElementById("computer-wins").textContent = `Computer Wins: ${computerWins}`;
  }
  
  // Game start function
  function startGame() {
    deck = shuffleDeck();
    playerHand = [drawCard(), drawCard()];
    computerHand = [drawCard(), drawCard()];
    playerScore = getCardValue(playerHand[0]) + getCardValue(playerHand[1]);
    computerScore = getCardValue(computerHand[0]) + getCardValue(computerHand[1]);
    isGameOver = false;
  
    updateHandDisplay();
    document.getElementById("message").textContent = "";
    document.getElementById("play-again").style.display = "none"; // Hide play again button
  }
  
  // Hit function
  function hit() {
    if (isGameOver) return;
    
    playerHand.push(drawCard());
    playerScore += getCardValue(playerHand[playerHand.length - 1]);
    updateHandDisplay();
    checkForBust();
  }
  
  // Stand function
  function stand() {
    if (isGameOver) return;
  
    // Reveal computer's cards and score
    while (computerScore < 17) { // Computer must hit until 17 or higher
      computerHand.push(drawCard());
      computerScore += getCardValue(computerHand[computerHand.length - 1]);
    }
  
    updateHandDisplay();
    checkForWinner();
  }
  
  // Play Again function
  function playAgain() {
    startGame(); // Restart the game
    document.getElementById("message").textContent = "";
    document.getElementById("play-again").style.display = "none"; // Hide play again button
  }
  
  // Initialize game when the page loads
  document.addEventListener('DOMContentLoaded', (event) => {
    startGame(); // Start the game once the DOM is loaded
  
    const hitButton = document.getElementById("hit");
    const standButton = document.getElementById("stand");
    const playAgainButton = document.getElementById("play-again");
  
    hitButton.addEventListener("click", hit);
    standButton.addEventListener("click", stand);
    playAgainButton.addEventListener("click", playAgain);
  });
  
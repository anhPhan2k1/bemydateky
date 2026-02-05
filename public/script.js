const questionCard = document.getElementById("question-card");
const successCard = document.getElementById("success-card");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const buttonsContainer = document.getElementById("buttons-container");
const hintText = document.getElementById("hint-text");
const floatingHeartsContainer = document.getElementById("floating-hearts");
const confettiContainer = document.getElementById("confetti-container");

// State
let noClickCount = 0;
let yesButtonScale = 1;

// No button messages
const noMessages = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "You can't escape love!",
  "Nope, try again!",
  "I'm not giving up!",
  "Come on! 💕",
  "Please? 🥺",
];

// Create floating hearts background
function createFloatingHearts() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "background-heart";
    heart.textContent = "❤️";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heart.style.animationDuration = `${6 + Math.random() * 4}s`;
    heart.style.fontSize = `${12 + Math.random() * 24}px`;
    floatingHeartsContainer.appendChild(heart);
  }
}

// Create confetti
function createConfetti() {
  const colors = [
    "hsl(350, 80%, 55%)",
    "hsl(340, 70%, 60%)",
    "hsl(20, 100%, 70%)",
    "hsl(350, 100%, 88%)",
    "hsl(0, 0%, 100%)",
  ];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-piece";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(confetti);
  }
}

// Move the No button
function moveNoButton() {
  const containerRect = buttonsContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate max positions within container
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  // Generate random position
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  // Apply escaping class and position
  noBtn.classList.add("escaping");
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // Update message
  noClickCount = Math.min(noClickCount + 1, noMessages.length - 1);
  noBtn.textContent = noMessages[noClickCount];

  // Make Yes button bigger (increase font size and padding instead of transform,
  // so it doesn't conflict with existing CSS animations on the button)
  yesButtonScale = Math.min(yesButtonScale + 0.15, 2);
  const baseFontSizeRem = 1.25; // matches .btn-yes font-size in CSS
  const basePaddingYRem = 1; // matches .btn-yes padding in CSS (vertical)
  const basePaddingXRem = 3; // matches .btn-yes padding in CSS (horizontal)
  yesBtn.style.fontSize = `${baseFontSizeRem * yesButtonScale}rem`;
  yesBtn.style.padding = `${basePaddingYRem * yesButtonScale}rem ${
    basePaddingXRem * yesButtonScale
  }rem`;

  // Show hint after first escape
  // if (noClickCount > 0) {
  //   hintText.textContent = "Hint: The Yes button is getting bigger... 😉";
  // }
}

// Handle Yes click
function handleYesClick() {
  questionCard.style.display = "none";
  successCard.style.display = "block";
  createConfetti();
}

// Event Listeners
yesBtn.addEventListener("click", handleYesClick);
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

// Initialize
createFloatingHearts();

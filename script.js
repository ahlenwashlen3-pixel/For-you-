
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const enterBtn = document.getElementById("enterBtn");
const flower = document.querySelector(".flower");
const glow = document.querySelector(".glow");
const bloomBtn = document.getElementById("bloomBtn");
const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");
const stars = document.getElementById("stars");
const petals = document.getElementById("petals");
const sparkleBtn = document.getElementById("sparkleBtn");

// Create stars
for (let i = 0; i < 100; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 4 + "s";
  star.style.animationDuration = (2 + Math.random() * 4) + "s";
  stars.appendChild(star);
}

// Enter the experience
enterBtn.addEventListener("click", () => {
  intro.classList.add("hide");
  main.classList.add("show");

  setTimeout(() => {
    flower.classList.add("bloomed");
    glow.style.opacity = ".35";
  }, 900);

  startPetals();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Bloom interaction
bloomBtn.addEventListener("click", () => {
  flower.classList.toggle("bloomed");

  if (flower.classList.contains("bloomed")) {
    glow.style.opacity = ".45";
    bloomBtn.innerHTML = "<span>✿</span> Let it shine";
    burst(window.innerWidth / 2, window.innerHeight * .55);
  } else {
    glow.style.opacity = ".18";
    bloomBtn.innerHTML = "<span>✿</span> Make it bloom";
  }
});

// Open letter
letterBtn.addEventListener("click", () => {
  letter.classList.toggle("open");

  if (letter.classList.contains("open")) {
    letterBtn.innerHTML = "Close your letter ♡";
    letter.scrollIntoView({ behavior: "smooth", block: "center" });
    burst(window.innerWidth / 2, window.innerHeight * .6);
  } else {
    letterBtn.innerHTML = "Open your little letter ♡";
  }
});

// Falling petals
let petalTimer;

function startPetals() {
  if (petalTimer) return;

  petalTimer = setInterval(() => {
    const petal = document.createElement("span");
    petal.className = "floating-petal";
    petal.innerHTML = Math.random() > .5 ? "✿" : "♡";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (10 + Math.random() * 15) + "px";
    petal.style.opacity = .3 + Math.random() * .6;
    petal.style.animationDuration = (6 + Math.random() * 7) + "s";
    petal.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");

    petals.appendChild(petal);

    setTimeout(() => petal.remove(), 14000);
  }, 650);
}

// Sparkle burst
function burst(x, y) {
  const symbols = ["✧", "♡", "✦", "·", "✿"];

  for (let i = 0; i < 18; i++) {
    const item = document.createElement("span");
    item.className = "sparkle";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = x + (Math.random() * 180 - 90) + "px";
    item.style.top = y + (Math.random() * 130 - 65) + "px";
    item.style.fontSize = (12 + Math.random() * 15) + "px";

    document.body.appendChild(item);
    setTimeout(() => item.remove(), 1100);
  }
}

// Tap anywhere to create little sparkles
document.addEventListener("click", (e) => {
  if (e.target.closest("button")) return;
  if (!main.classList.contains("show")) return;

  const item = document.createElement("span");
  item.className = "sparkle";
  item.textContent = "✧";
  item.style.left = e.clientX + "px";
  item.style.top = e.clientY + "px";

  document.body.appendChild(item);
  setTimeout(() => item.remove(), 1000);
});

// Special sparkle button
sparkleBtn.addEventListener("click", () => {
  burst(
    window.innerWidth - 40,
    window.innerHeight - 40
  );
});

// Small vibration on supported phones
function vibrate() {
  if ("vibrate" in navigator) {
    navigator.vibrate(25);
  }
}

enterBtn.addEventListener("click", vibrate);
bloomBtn.addEventListener("click", vibrate);
letterBtn.addEventListener("click", vibrate);

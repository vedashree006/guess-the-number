let randomNumber = 0;
let maxNumber = 50;
let attemptsLeft = 0;
let level = 0;

// ---------------- LEVEL SETUP ----------------
function setLevel(lvl) {
    level = lvl;

    if (lvl === 1) {
        maxNumber = 50;
        attemptsLeft = 10;
    } 
    else if (lvl === 2) {
        maxNumber = 100;
        attemptsLeft = 7;
    } 
    else if (lvl === 3) {
        maxNumber = 200;
        attemptsLeft = 5;
    }

    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    document.getElementById("levelBox").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    document.getElementById("levelText").innerText =
        `Level ${lvl} Selected (1 - ${maxNumber})`;

    updateAttempts();

    document.getElementById("msg").innerText = "";
    document.getElementById("guessInput").value = "";
}

// ---------------- CHECK GUESS ----------------
function checkGuess() {
    let guess = Number(document.getElementById("guessInput").value);
    let msg = document.getElementById("msg");

    if (!guess) {
        msg.innerText = "Enter a number!";
        return;
    }

    attemptsLeft--;
    updateAttempts();

    let diff = Math.abs(guess - randomNumber);

    // WIN CONDITION
    if (guess === randomNumber) {
        msg.innerText = `🎉 Correct! Answer was ${randomNumber}`;
        return;
    }

    // GAME OVER
    if (attemptsLeft === 0) {
        msg.innerText = `💀 Game Over! Answer was ${randomNumber}`;
        return;
    }

    // HIGH / LOW + CLOSE FEEDBACK
    if (guess < randomNumber) {
        if (diff <= 5) {
            msg.innerText = "📈 It's higher — you're VERY close!";
        } else if (diff <= 10) {
            msg.innerText = "📈 It's higher — you're close!";
        } else {
            msg.innerText = "📈 It's higher!";
        }
    } 
    else {
        if (diff <= 5) {
            msg.innerText = "📉 It's lower — you're VERY close!";
        } else if (diff <= 10) {
            msg.innerText = "📉 It's lower — you're close!";
        } else {
            msg.innerText = "📉 It's lower!";
        }
    }
}

// ---------------- UPDATE ATTEMPTS ----------------
function updateAttempts() {
    document.getElementById("attemptText").innerText =
        `Attempts Left: ${attemptsLeft}`;
}

// ---------------- RESET GAME ----------------
function resetGame() {
    document.getElementById("levelBox").style.display = "block";
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("msg").innerText = "";
    document.getElementById("guessInput").value = "";
}

// ---------------- ENTER KEY SUPPORT ----------------
document.getElementById("guessInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        checkGuess();
    }
});

// ---------------- SPARKLY BACKGROUND ----------------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 120; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        s.x += s.dx;
        s.y += s.dy;

        if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
    }

    requestAnimationFrame(animateStars);
}

animateStars();

// ---------------- RESIZE FIX ----------------
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

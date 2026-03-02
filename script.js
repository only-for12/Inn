// =============================
// ELEMENTS
// =============================
const introScreen = document.getElementById("introScreen");
const mainScreen = document.getElementById("mainScreen");
const finalScreen = document.getElementById("finalScreen");

const enterBtn = document.getElementById("enterBtn");
const safeBtn = document.getElementById("safeBtn");
const targetBtn = document.getElementById("targetBtn");

const analysisBox = document.getElementById("analysisBox");
const analysisText = document.getElementById("analysisText");
const finalMessage = document.getElementById("finalMessage");
const finalTitle = document.getElementById("finalTitle");

// =============================
// STATE
// =============================
let tapCount = 0;
let isMoving = false;
let analysisTimeout = null;

let baseLeft = 0;
let baseTop = 0;

let glowAnimationId = null;
let glowAngle = 0;

let finalGlowAngle = 0;
let finalGlowId = null;

const teasingTexts = [
  "I m overthinker 😭",
  "I m childish😡",
  "i have trust issues👀",
  "I also have attachment issues",
  "I cry loudly at night💀",
  "Me nakhry b dikhati😇",
  "I m very deeep😋"
];

// =============================
// VIBRATION
// =============================
function vibrate(pattern = 40) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

// =============================
// MAIN SCREEN GLOW
// =============================
function startGlow() {
  function animateGlow() {
    glowAngle += 0.01;

    const centerX = window.innerWidth / 2 + Math.cos(glowAngle) * 120;
    const centerY = window.innerHeight / 2 + Math.sin(glowAngle) * 120;

    document.body.style.background =
      `radial-gradient(circle at ${centerX}px ${centerY}px, rgba(255,50,90,0.25), #0a0a0a 70%)`;

    glowAnimationId = requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

function stopGlow() {
  if (glowAnimationId) {
    cancelAnimationFrame(glowAnimationId);
    glowAnimationId = null;
  }
}

// =============================
// ENTER BUTTON
// =============================
enterBtn.addEventListener("click", () => {
  introScreen.classList.remove("active");
  mainScreen.classList.add("active");

  setTimeout(() => {
    const rect = targetBtn.getBoundingClientRect();
    baseLeft = rect.left;
    baseTop = rect.top;
  }, 50);

  startGlow();
  vibrate([40, 20, 40]);
});

// =============================
// SAFE BUTTON
// =============================
safeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  vibrate(30);

  if (analysisTimeout) clearTimeout(analysisTimeout);

  analysisText.innerText = "Sach bolo...";
  analysisBox.classList.add("active");

  analysisTimeout = setTimeout(() => {
    analysisBox.classList.remove("active");
  }, 2500);
});

// =============================
// TARGET BUTTON
// =============================
targetBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isMoving) return;
  handleTap();
});

// =============================
// TAP HANDLER
// =============================
function handleTap() {
  vibrate(40);

  if (tapCount < teasingTexts.length) {
    targetBtn.innerText = teasingTexts[tapCount];
  }

  if (tapCount >= teasingTexts.length) {
    stopGlow();

    // 🔥 PERFECT CINEMATIC CROSSFADE
    finalScreen.classList.add("active");

    finalScreen.style.opacity = "0";
    finalScreen.style.transition = "opacity 1s ease";

    mainScreen.style.transition = "opacity 0.8s ease";

    requestAnimationFrame(() => {
      mainScreen.style.opacity = "0";
      finalScreen.style.opacity = "1";
    });

    setTimeout(() => {
      mainScreen.classList.remove("active");
      mainScreen.style.opacity = "";
    }, 800);

    // Final content
    finalTitle.innerText = "";
finalTitle.style.display = "none";

    finalMessage.innerHTML = `
<span class="line">I’m glad you trusted me enough to share that side of you ✨</span>
<span class="line">I don’t see flaws in it…</span>
<span class="line">I see honesty.</span>
<span class="line">And that makes me understand you better 🔗</span>
<span class="line">Not just what you say,</span>
<span class="line">but what you feel inside 🌙</span>
<span class="whisper">And that matters to me.</span>
`;

    vibrate([60, 40, 100]);
    startFinalScreenGlow();

    return;
  }

  tapCount++;
  moveButton();
}

// =============================
// MOVE BUTTON
// =============================
function moveButton() {
  isMoving = true;

  const rect = targetBtn.getBoundingClientRect();
  const padding = 40;

  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  const minX = padding;
  const minY = padding;

  let newX, newY, tries = 0;

  do {
    newX = Math.random() * (maxX - minX) + minX;
    newY = Math.random() * (maxY - minY) + minY;
    tries++;
  } while (distanceFromCurrent(newX, newY) < 150 && tries < 20);

  animateMove(newX, newY);
}

function distanceFromCurrent(x, y) {
  const rect = targetBtn.getBoundingClientRect();
  const dx = rect.left - x;
  const dy = rect.top - y;
  return Math.sqrt(dx * dx + dy * dy);
}

function animateMove(x, y) {
  const speed = 450;

  const translateX = x - baseLeft;
  const translateY = y - baseTop;

  targetBtn.style.transition = `transform ${speed}ms cubic-bezier(.22,1,.36,1)`;
  targetBtn.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;

  setTimeout(() => {
    isMoving = false;
  }, speed);
}

// =============================
// RESIZE SAFETY
// =============================
window.addEventListener("resize", () => {
  const rect = targetBtn.getBoundingClientRect();
  baseLeft = rect.left;
  baseTop = rect.top;

  targetBtn.style.transform = "translate3d(0,0,0)";
});

// =============================
// FINAL SCREEN GLOW
// =============================
function startFinalScreenGlow() {
  function animateFinalGlow() {
    finalGlowAngle += 0.008;

    const glowX = 50 + Math.cos(finalGlowAngle) * 30;
    const glowY = 50 + Math.sin(finalGlowAngle) * 20;

    finalScreen.style.background =
      `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,120,140,0.15), rgba(120,80,255,0.08), #050505 70%)`;

    finalGlowId = requestAnimationFrame(animateFinalGlow);
  }

  animateFinalGlow();
}
// =============================
// TYPEWRITER EFFECT (LINES ONLY)
// =============================
function typeWriterFinalLines() {

  const finalMsg = document.getElementById("finalMessage");
  finalMsg.classList.add("typing");

  const lines = finalMsg.querySelectorAll(".line");

  let lineIndex = 0;

  function typeLine(line, callback) {
    const text = line.textContent;
    line.textContent = "";
    let i = 0;

    function typing() {
      if (i < text.length) {
        line.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 30);
      } else {
        setTimeout(callback, 500);
      }
    }

    typing();
  }

  function next() {
    if (lineIndex < lines.length) {
      typeLine(lines[lineIndex], () => {
        lineIndex++;
        next();
      });
    }
  }

  next();
}

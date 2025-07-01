// Inicial
const texts = document.querySelectorAll(".text");
const textContainer = document.getElementById("text-container");
const hairGame = document.getElementById("hair-game");
const hairGameTitle = hairGame.querySelector("h1");
const compliment = document.getElementById("compliment");
const quizSection = document.getElementById("quiz-section");
const questionBox = document.getElementById("question");
const quizResult = document.getElementById("quiz-result");
const chatContainer = document.getElementById("chat-container");
const weirdMsg = document.getElementById("weird-msg");
const finalMessage = document.getElementById("final-message");
const pedido = document.getElementById("pedido");
const btnSim = document.getElementById("btn-sim");
const btnNao = document.getElementById("btn-nao");

let currentIndex = 0;

function fadeOut(element, duration = 1000) {
  return new Promise((res) => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = "none";
      res();
    }, duration);
  });
}

function fadeIn(element, duration = 1000, display = "block") {
  element.style.opacity = 0;
  element.style.display = display;
  setTimeout(() => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = 1;
  }, 20);
  return new Promise((res) => setTimeout(res, duration));
}


async function showNextText() {
  texts[currentIndex].classList.remove('active');
  currentIndex++;

  if (currentIndex < texts.length) {
    texts[currentIndex].classList.add('active');
    setTimeout(showNextText, 4000);
  } else {
    await fadeOut(textContainer);
    await fadeIn(hairGame, 800, 'flex');
  }
}

setTimeout(showNextText, 1000);

function hideCard(card) {
  textList = [
    "errou feio",
    "tu tá linda aqui",
    "errou demais, querida",
    "como tu acha isso??",
    "nunca seria essa",
    "me apaixonei por essa daqui",
  ];

  const wrong = document.createElement("div");
  wrong.classList.add("wrong-text");
  wrong.innerText = textList[Math.floor(Math.random() * 6)];
  card.appendChild(wrong);

  setTimeout(() => {
    card.style.display = "none";
    checkRemaining();
  }, 1200);
}

async function checkRemaining() {
  const remaining = document.querySelectorAll('#hair-game .card:not([style*="display: none"])');
  if (remaining.length === 0) {
    await fadeOut(hairGame, 700);
    await fadeIn(compliment);
    setTimeout(async () => {
      await fadeOut(compliment);
      await fadeIn(quizSection);
      showQuestion();
    }, 2500);
  }
}


// Quiz
const questions = [
  "Você ri das besteiras que eu falo?",
  "Você acha minha mãe uma diva?",
  "Você iria num show de babymetal comigo?",
  "Você tá cansada dessa enrolação toda?",
];
let questionIndex = 0;

function showQuiz() {
  quizSection.style.display = "block";
  quizSection.style.opacity = 0;
  setTimeout(() => {
    quizSection.style.opacity = 1;
    showQuestion();
  }, 20);
}

function showQuestion() {
  if (questionIndex < questions.length) {
    questionBox.innerText = questions[questionIndex];
  } else {
    questionBox.style.display = "none";
    document.querySelector(".quiz-buttons").style.display = "none";
    quizResult.innerText = "Tá bom, acho que você tá pronta...";
    setTimeout(showWeirdMsg, 1500);
  }
}

function nextQuestion(answer) {
  questionIndex++;
  showQuestion();
}

// Mensagem estranha antes do chat
async function showWeirdMsg() {
  quizSection.style.display = "none";
  weirdMsg.style.display = "block";
  weirdMsg.style.opacity = 0;
  setTimeout(() => (weirdMsg.style.opacity = 1), 20);
  await new Promise((r) => setTimeout(r, 4500));
  await fadeOut(weirdMsg);
  weirdMsg.style.display = "none";
  showChat();
}

// Chat fake

async function showChat() {
  chatContainer.style.display = "flex";
  chatContainer.style.opacity = 0;
  setTimeout(() => (chatContainer.style.opacity = 1), 20);

  await addChatMessage(
    "caramba chatgpt, ela é tudo que eu sempre quis",
    "user",
    500
  );
  await showTypingIndicator(500);

  await addChatMessage("ela é linda, carinhosa, e uma fofa....", "user", 500);
  await showTypingIndicator(2500);

  await addChatMessage("acho que tô apaixonado", "user", 500);

  await addChatMessage(
    "Você tá todo bobo... por que não pede ela em namoro logo?",
    "bot",
    1500
  );

  await showTypingIndicator(1500);

  await addChatMessage("boa ideia, chatgbt...", "user", 0);
  await showTypingIndicator(1500);
  await addChatMessage("tomara que ela aceite 😔", "user", 500);

  // mensagem final após o chat
  await new Promise((r) => setTimeout(r, 5000));
  chatContainer.style.display = "none";
  await fadeIn(finalMessage, 1000, "block");
  setTimeout(() => {
    finalMessage.style.opacity = 1;
    showPedido();
  }, 1000);
}

function addChatMessage(text, who, delay) {
  return new Promise((res) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = "chat-msg " + who;
      div.textContent = text;
      chatContainer.appendChild(div);
      div.style.animation = "slideFadeIn 0.5s forwards";
      chatContainer.scrollTop = chatContainer.scrollHeight;
      res();
    }, delay);
  });
}
function showTypingIndicator(duration) {
  return new Promise((res) => {
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.textContent = "Você digitando...";
    chatContainer.appendChild(typing);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
      typing.remove();
      res();
    }, duration);
  });
}

// Pedido final

function showPedido() {
  pedido.style.display = "block";
  pedido.style.opacity = 0;
  setTimeout(() => {
    pedido.style.transition = "opacity 1s ease";
    pedido.style.opacity = 1;
  }, 20);
}

// Botão sim - agradecimento simples
btnSim.addEventListener("click", () => {
  window.location.replace("https://i.pinimg.com/originals/6c/b0/cf/6cb0cf83706b6da79c8b0741fbcecfa6.gif");
});

// Botão não foge do mouse
btnNao.addEventListener("mouseenter", () => {
  const xMax = window.innerWidth - btnNao.offsetWidth - 20;
  const yMax = window.innerHeight - btnNao.offsetHeight - 20;
  const randomX = Math.floor(Math.random() * xMax);
  const randomY = Math.floor(Math.random() * yMax);

  btnNao.style.position = "fixed";
  btnNao.style.left = randomX + "px";
  btnNao.style.top = randomY + "px";
});

// Reset botão não quando clicar no sim, só pra garantir
btnSim.addEventListener("click", () => {
  btnNao.style.position = "";
  btnNao.style.left = "";
  btnNao.style.top = "";
});

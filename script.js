const pathParts = window.location.pathname.split("/").filter(Boolean);
const isGitHubPages = window.location.hostname.endsWith("github.io");
const repoBase = isGitHubPages && pathParts.length > 0 ? `/${pathParts[0]}` : "";
const assetBase = `${repoBase}/assets`;

const images = [
  `${assetBase}/1.png`,
  `${assetBase}/2.png`,
  `${assetBase}/3.png`,
  `${assetBase}/4.png`,
  `${assetBase}/5.png`,
  `${assetBase}/6.png`,
  `${assetBase}/7.png`,
];

const questions = [
  {
    imageIndex: 1,
    title: "Сколько вакансий / HR-задач у вас одновременно в работе?",
    answers: ["1–3", "4–7", "8+", "Всё и сразу 😅"],
  },
  {
    imageIndex: 2,
    title: "Сколько времени уходит на разбор резюме вручную?",
    answers: ["До 30 минут", "1–2 часа", "3+ часа", "Лучше не считать 😵"],
  },
  {
    imageIndex: 3,
    title: "Как часто вы пишете однотипные тексты?",
    answers: ["Редко", "Иногда", "Каждый день", "Постоянно"],
  },
  {
    imageIndex: 4,
    title: "Что больше всего забирает силы?",
    answers: ["Подбор персонала", "Документы", "Отчёты", "Руководители 😅", "Всё сразу"],
  },
  {
    imageIndex: 5,
    title: "Используете ли ИИ в работе?",
    answers: ["Уже использую", "Пробовал(а)", "Нет", "Боюсь, что сложно"],
  },
];

const quizImage = document.querySelector("#quizImage");
const introScreen = document.querySelector("#introScreen");
const questionScreen = document.querySelector("#questionScreen");
const resultScreen = document.querySelector("#resultScreen");
const startBtn = document.querySelector("#startBtn");
const questionTitle = document.querySelector("#questionTitle");
const answersWrap = document.querySelector("#answers");
const progressLabel = document.querySelector("#progressLabel");
const progressPercent = document.querySelector("#progressPercent");
const progressFill = document.querySelector("#progressFill");
const leadForm = document.querySelector("#leadForm");
const successMessage = document.querySelector("#successMessage");
const giftBtn = document.querySelector("#giftBtn");

let currentQuestionIndex = 0;
quizImage.src = images[0];

function switchWithFade(screen) {
  screen.classList.remove("hidden");
  screen.classList.remove("fade");
  void screen.offsetWidth;
  screen.classList.add("fade");
}

function updateProgress(index) {
  const step = index + 1;
  const percent = Math.round((step / questions.length) * 100);
  progressLabel.textContent = `Вопрос ${step} из ${questions.length}`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function renderQuestion(index) {
  const question = questions[index];
  updateProgress(index);
  questionTitle.textContent = question.title;
  quizImage.src = images[question.imageIndex];
  answersWrap.innerHTML = "";

  question.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => {
      currentQuestionIndex += 1;
      if (currentQuestionIndex < questions.length) {
        renderQuestion(currentQuestionIndex);
        switchWithFade(questionScreen);
      } else {
        showResult();
      }
    });
    answersWrap.appendChild(btn);
  });
}

function startQuiz() {
  introScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  currentQuestionIndex = 0;
  renderQuestion(currentQuestionIndex);
  switchWithFade(questionScreen);
}

function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  quizImage.src = images[6];
  switchWithFade(resultScreen);
}

startBtn.addEventListener("click", startQuiz);

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!leadForm.checkValidity()) {
    leadForm.reportValidity();
    return;
  }

  leadForm.classList.add("hidden");
  successMessage.classList.remove("hidden");
  switchWithFade(successMessage);
});

giftBtn.addEventListener("click", () => {
  giftBtn.textContent = "Подарок будет отправлен вместе с деталями курса";
  giftBtn.disabled = true;
});

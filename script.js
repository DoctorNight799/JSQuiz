document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide');
});

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizAppElement = document.getElementById('quiz-app');
const resultsElement = document.createElement('div');
resultsElement.setAttribute('id', 'results');
resultsElement.classList.add('results', 'hide');
quizAppElement.appendChild(resultsElement);

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
          button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', () => selectAnswer(button));
      answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(selectedButton) {
  Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true;
      setStatusClass(button, button.dataset.correct);
  });

  const correct = selectedButton.dataset.correct;
  if (correct) {
      score++;
  }
  setStatusClass(selectedButton, correct);

  setTimeout(() => {
      if (shuffledQuestions.length > currentQuestionIndex + 1) {
          nextButton.classList.remove('hide');
      } else {
          concludeQuiz();
      }
  }, 1000);
 
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
      element.classList.add('correct');
  } else {
      element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function concludeQuiz() {
  questionContainerElement.classList.add('hide');
  nextButton.classList.add('hide');

  resultsElement.classList.remove('hide');
  resultsElement.innerHTML = `
      <h2>Квиз пройден!</h2>
      <p>Ваш счет: ${score} из ${shuffledQuestions.length}</p>
      <button onclick="restartQuiz()">Перезапустить квиз?</button>
  `;
  quizAppElement.appendChild(resultsElement);
}

function restartQuiz() {
  resultsElement.classList.add('hide');
  score = 0;
  currentQuestionIndex = 0;
  startGame();
}

const questions = [
  {
      question: "Что такое переменная в JavaScript?",
      answers: [
          { text: "Секция веб-страницы", correct: false },
          { text: "Контейнер хранящий значение", correct: true },
          { text: "Тип функции в avaScript", correct: false },
          { text: "Операция в математике", correct: false }
      ]
  },
  {
      question: "Что используется для создания переменной в JavaScript?",
      answers: [
          { text: "var", correct: false },
          { text: "let", correct: false },
          { text: "const", correct: false },
          { text: "All of the above", correct: true }
      ]
  },
  {
      question: "Что проверяет оператор `===`?",
      answers: [
          { text: "Эквивалентность значений", correct: false },
          { text: "Эквивалентонсть типов", correct: false },
          { text: "Эквивалнтонсть значения и типа", correct: true },
          { text: "Эквивалентонсть ни по значению, ни по типу", correct: false }
      ]
  },
  {
      question: "Чем является массив в JavaScript?",
      answers: [
          { text: "Функцией выполняющей операцию", correct: false },
          { text: "Одиночной переменной, которая хранит различные значения", correct: true },
          { text: "Набором символов", correct: false },
          { text: "Условным выражением", correct: false }
      ]
  },
  {
      question: "Какой метод добавляет один или несколько элементов в конец массива?",
      answers: [
          { text: "array.unshift()", correct: false },
          { text: "array.push()", correct: true },
          { text: "array.pop()", correct: false },
          { text: "array.slice()", correct: false }
      ]
  },
  {
      question: "Как создаются функции в JavaScript?",
      answers: [
          { text: "function myFunction()", correct: true },
          { text: "create myFunction()", correct: false },
          { text: "function: myFunction()", correct: false },
          { text: "function = myFunction()", correct: false }
      ]
  },
  {
      question: "Что из этого является условным оператором?",
      answers: [
          { text: "for", correct: false },
          { text: "while", correct: false },
          { text: "if", correct: true },
          { text: "switch", correct: false }
      ]
  },
  {
      question: "В чем смысл цикла в JavaScript?",
      answers: [
          { text: "Чтобы выполнить одно действие один раз", correct: false },
          { text: "Чтобы сохранить несколько значений в одной переменной", correct: false },
          { text: "Чтобы выполнить блок кода несколько раз", correct: true },
          { text: "Чтобы ускорить выполнение кода", correct: false }
      ]
  },
  {
      question: "Какой объект является объектом верхнего уровня в среде браузера?",
      answers: [
          { text: "Document", correct: false },
          { text: "Window", correct: true },
          { text: "Console", correct: false },
          { text: "Navigator", correct: false }
      ]
  },
  {
      question: "Каков правильный синтаксис для ссылки на внешний скрипт под названием `app.js`?",
      answers: [
          { text: "<script href='app.js'>", correct: false },
          { text: "<script source='app.js'>", correct: false },
          { text: "<script src='app.js'>", correct: true },
          { text: "<script link='app.js'>", correct: false }
      ]
  }
];
const questionsElement = document.getElementById('questions');
const scoreElement = document.getElementById('score');
const submitBtn = document.getElementById('submit');

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let score = JSON.parse(localStorage.getItem('score')) || 0;

// Initialize userAnswers properly
let userAnswers = JSON.parse(sessionStorage.getItem('quizAnswer')) || new Array(questions.length).fill(null);

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // if user clicks on answer, check the score
      choiceElement.onchange = function () {
        if (question.answer === choice) {
          score += 1;
          localStorage.setItem('score', JSON.stringify(score));
        }
        // add the answer to the answer array for session
        userAnswers[i] = choice;
        // save any change to session storage
        sessionStorage.setItem('quizAnswer', JSON.stringify(userAnswers));
      };

      // Check if the answer is already selected from session storage
      if (userAnswers[i] && userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

renderQuestions();

if(localStorage.getItem('score')){
    score = JSON.parse(localStorage.getItem('score'));
    scoreElement.textContent = `Your score is ${score} out of 5.`;
}

submitBtn.addEventListener('click', () => {
  score = JSON.parse(localStorage.getItem('score'));
  scoreElement.textContent = `Your score is ${score} out of 5.`;
});

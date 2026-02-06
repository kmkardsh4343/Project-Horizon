const questions = [
    {
        question: "What is the primary purpose of a business plan?",
        options: ["To outline company goals and strategies", "To calculate taxes", "To hire employees", "To design products"],
        answer: 0
    },
    {
        question: "What does SWOT stand for in business analysis?",
        options: ["Strengths, Weaknesses, Opportunities, Threats", "Sales, Wins, Objectives, Targets", "Systems, Workflows, Operations, Teams", "Strategies, Wins, Objectives, Tactics"],
        answer: 0
    },
    {
        question: "Which marketing strategy focuses on building long-term customer relationships?",
        options: ["Direct selling", "Relationship marketing", "Price skimming", "Product bundling"],
        answer: 1
    },
    {
        question: "What is the main goal of financial management in a business?",
        options: ["To maximize shareholder value", "To minimize employee salaries", "To increase product prices", "To reduce marketing costs"],
        answer: 0
    },
    {
        question: "What does ROI stand for in business?",
        options: ["Return on Investment", "Rate of Interest", "Revenue on Income", "Risk of Inflation"],
        answer: 0
    },
    {
        question: "Which of the following is a key characteristic of entrepreneurship?",
        options: ["Risk-taking", "Avoiding innovation", "Following strict rules", "Minimizing competition"],
        answer: 0
    },
    {
        question: "What is the primary function of human resources in a company?",
        options: ["Managing employee relations and development", "Designing products", "Handling customer complaints", "Overseeing financial audits"],
        answer: 0
    },
    {
        question: "What is supply chain management primarily concerned with?",
        options: ["Coordinating the flow of goods and services", "Creating marketing campaigns", "Developing software", "Conducting market research"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
    nextBtn.style.display = 'none';
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    nextBtn.style.display = 'block';
    if (index === questions[currentQuestionIndex].answer) {
        score++;
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    resultElement.style.display = 'block';
    resultElement.classList.add('show');
    animateScore();
    setTimeout(() => {
        const thankYouElement = document.createElement('p');
        thankYouElement.textContent = 'THANK YOU FOR PLAYING!';
        thankYouElement.style.fontSize = '2em';
        thankYouElement.style.fontWeight = 'bold';
        thankYouElement.style.color = '#ff4444';
        thankYouElement.style.textShadow = '0 0 10px rgba(255, 68, 68, 0.8)';
        thankYouElement.style.animation = 'thankYouGlow 2s ease-in-out infinite alternate';
        resultElement.appendChild(thankYouElement);
    }, 3000);
}

function animateScore() {
    let currentScore = 0;
    const targetScore = score;
    const increment = Math.ceil(targetScore / 50); // Adjust speed
    const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(interval);
        }
        scoreElement.textContent = `You scored ${currentScore} out of ${questions.length}`;
    }, 50);
}

loadQuestion();

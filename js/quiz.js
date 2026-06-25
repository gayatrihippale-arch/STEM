// Fallback quiz data in case fetch() fails due to local CORS restrictions
const FALLBACK_QUIZZES = [
  {
    "id": "q1",
    "category": "science",
    "classRange": "6-8",
    "title": "Fractions Adventure & Solar Heat",
    "questions": [
      {
        "id": "q1_1",
        "question": "If you divide a solar panel into 4 equal parts and cover 3 parts, what fraction of the panel is exposed to the sun?",
        "options": ["1/4", "1/2", "3/4", "2/3"],
        "correct": 0,
        "explanation": "Since 3 out of 4 parts are covered, only 1 part is left exposed. The fraction is 1/4."
      },
      {
        "id": "q1_2",
        "question": "Which color absorbs the most solar heat and would make a solar cooker heat up fastest?",
        "options": ["White", "Silver", "Black", "Green"],
        "correct": 2,
        "explanation": "Black surfaces absorb almost all wavelengths of light and convert them to heat, making it perfect for solar cookers!"
      }
    ],
    "xpReward": 50,
    "coinsReward": 10
  },
  {
    "id": "q2",
    "category": "math",
    "classRange": "9-10",
    "title": "Algebraic Farming",
    "questions": [
      {
        "id": "q2_1",
        "question": "A village farm has a rectangular shape with length 2x and width x. If the area is 200 square meters, what is the length?",
        "options": ["10m", "20m", "15m", "30m"],
        "correct": 1,
        "explanation": "Area = 2x * x = 2x^2 = 200 => x^2 = 100 => x = 10m. The length is 2x = 20m."
      },
      {
        "id": "q2_2",
        "question": "If you need 3 seeds per square meter, how many seeds are required for a 200 square meter farm?",
        "options": ["300", "400", "600", "800"],
        "correct": 2,
        "explanation": "Total seeds = Area * density = 200 * 3 = 600 seeds."
      }
    ],
    "xpReward": 60,
    "coinsReward": 15
  },
  {
    "id": "q3",
    "category": "technology",
    "classRange": "9-10",
    "title": "Coding Basics",
    "questions": [
      {
        "id": "q3_1",
        "question": "In programming, which block is used to repeat an action a specific number of times?",
        "options": ["If-Else block", "Variable block", "Repeat/Loop block", "Print block"],
        "correct": 2,
        "explanation": "A Loop or Repeat block allows us to run the same code multiple times without rewriting it."
      },
      {
        "id": "q3_2",
        "question": "What will be the output of a program that sets X = 5, then sets X = X + 3, and prints X?",
        "options": ["5", "8", "3", "15"],
        "correct": 1,
        "explanation": "Initial X is 5. Adding 3 makes it 5 + 3 = 8. So X is now 8."
      }
    ],
    "xpReward": 60,
    "coinsReward": 15
  },
  {
    "id": "q4",
    "category": "engineering",
    "classRange": "11-12",
    "title": "IoT & Smart Farming Concepts",
    "questions": [
      {
        "id": "q4_1",
        "question": "Which sensor would you use to measure the dryness of soil in an automated irrigation system?",
        "options": ["Ultrasonic Sensor", "Soil Moisture Sensor", "Barometric Pressure Sensor", "LDR Light Sensor"],
        "correct": 1,
        "explanation": "A Soil Moisture Sensor measures the volumetric water content in soil, helping automate watering."
      },
      {
        "id": "q4_2",
        "question": "What is the primary role of a microcontroller (like Arduino) in a smart farming device?",
        "options": ["To supply high electric power", "To store heavy databases", "To read sensor data and control actuators based on logic", "To display high definition videos"],
        "correct": 2,
        "explanation": "Microcontrollers act as the brain of the IoT system: reading inputs from sensors and deciding actions for pumps/actuators."
      }
    ],
    "xpReward": 80,
    "coinsReward": 20
  }
];

class QuizManager {
  constructor() {
    this.quizzes = [];
    this.currentQuiz = null;
    this.currentQuestionIdx = 0;
    this.score = 0;
    this.selectedOption = null;
    
    this.init();
  }

  async init() {
    try {
      const response = await fetch("data/quizzes.json");
      if (response.ok) {
        this.quizzes = await response.json();
      } else {
        throw new Error("Could not fetch data");
      }
    } catch (e) {
      console.warn("CORS/Fetch error: falling back to offline quiz array.", e);
      this.quizzes = FALLBACK_QUIZZES;
    }
  }

  // Starts a specific quiz by id
  startQuiz(quizId, containerElementId) {
    this.currentQuiz = this.quizzes.find(q => q.id === quizId);
    if (!this.currentQuiz) return;

    this.currentQuestionIdx = 0;
    this.score = 0;
    this.selectedOption = null;
    this.container = document.getElementById(containerElementId);
    
    this.renderQuestion();
  }

  renderQuestion() {
    if (!this.currentQuiz || !this.container) return;

    const question = this.currentQuiz.questions[this.currentQuestionIdx];
    const progress = ((this.currentQuestionIdx) / this.currentQuiz.questions.length) * 100;

    this.container.innerHTML = `
      <div class="quiz-card animate-fade-in-up">
        <div class="quiz-header">
          <h3>${this.currentQuiz.title}</h3>
          <span class="quiz-progress-text">Question ${this.currentQuestionIdx + 1} of ${this.currentQuiz.questions.length}</span>
        </div>
        
        <div class="quiz-progress-bar-bg" style="width:100%;height:8px;background:var(--bg-tertiary);border-radius:4px;margin:15px 0;overflow:hidden;">
          <div class="quiz-progress-bar-fg" style="width:${progress}%;height:100%;background:var(--gradient-stem);transition:width 0.4s ease;"></div>
        </div>

        <p class="quiz-question-text" style="font-size:1.15rem;font-weight:600;margin-bottom:20px;color:var(--text-primary);">${question.question}</p>
        
        <div class="quiz-options-list" style="display:flex;flex-direction:column;gap:12px;">
          ${question.options.map((opt, idx) => `
            <button class="quiz-option-btn" data-index="${idx}" style="text-align:left;padding:14px 20px;border-radius:var(--radius-md);border:1px solid var(--border-color);background:var(--bg-secondary);color:var(--text-primary);cursor:pointer;font-family:inherit;font-size:0.95rem;transition:var(--transition);display:flex;align-items:center;justify-content:space-between;">
              <span>${opt}</span>
              <span class="option-marker"></span>
            </button>
          `).join('')}
        </div>

        <div class="quiz-explanation-panel" style="display:none;margin-top:20px;padding:15px;border-radius:var(--radius-md);background:var(--primary-light);border:1px solid var(--primary);font-size:0.9rem;">
          <strong>Explanation:</strong> <span class="explanation-text">${question.explanation}</span>
        </div>

        <div class="quiz-footer" style="display:flex;justify-content:flex-end;margin-top:25px;">
          <button class="btn btn-primary" id="next-question-btn" style="display:none;">Next Question &rarr;</button>
        </div>
      </div>
    `;

    // Attach click events to option buttons
    const optionBtns = this.container.querySelectorAll(".quiz-option-btn");
    optionBtns.forEach(btn => {
      btn.addEventListener("click", (e) => this.handleOptionSelection(e.currentTarget));
    });

    const nextBtn = this.container.querySelector("#next-question-btn");
    nextBtn.addEventListener("click", () => this.handleNextQuestion());
  }

  handleOptionSelection(button) {
    if (this.selectedOption !== null) return; // Prevent multiple clicks

    const idx = parseInt(button.getAttribute("data-index"));
    this.selectedOption = idx;

    const question = this.currentQuiz.questions[this.currentQuestionIdx];
    const isCorrect = idx === question.correct;

    const optionBtns = this.container.querySelectorAll(".quiz-option-btn");
    
    // Apply styling for correct/incorrect answers
    optionBtns.forEach(btn => {
      const btnIdx = parseInt(btn.getAttribute("data-index"));
      btn.style.cursor = "default";
      
      if (btnIdx === question.correct) {
        btn.style.background = "rgba(16, 185, 129, 0.15)";
        btn.style.borderColor = "var(--success)";
        btn.querySelector(".option-marker").innerHTML = "🟢";
      } else if (btnIdx === idx) {
        btn.style.background = "rgba(239, 68, 68, 0.15)";
        btn.style.borderColor = "var(--error)";
        btn.querySelector(".option-marker").innerHTML = "🔴";
      }
    });

    if (isCorrect) {
      this.score++;
      if (window.gamification) {
        window.gamification.showToast("Correct! +10 XP", "success");
        window.gamification.addXP(10);
      }
    } else {
      if (window.gamification) {
        window.gamification.showToast("Oops! Incorrect.", "default");
      }
    }

    // Show explanation panel
    const explanationPanel = this.container.querySelector(".quiz-explanation-panel");
    explanationPanel.style.display = "block";

    // Show next button
    const nextBtn = this.container.querySelector("#next-question-btn");
    nextBtn.style.display = "inline-flex";
  }

  handleNextQuestion() {
    this.currentQuestionIdx++;
    this.selectedOption = null;

    if (this.currentQuestionIdx < this.currentQuiz.questions.length) {
      this.renderQuestion();
    } else {
      this.renderResults();
    }
  }

  renderResults() {
    const totalQuestions = this.currentQuiz.questions.length;
    const pct = Math.round((this.score / totalQuestions) * 100);
    const xpReward = pct === 100 ? this.currentQuiz.xpReward + 20 : Math.round((this.score / totalQuestions) * this.currentQuiz.xpReward);
    const coinsReward = Math.round((this.score / totalQuestions) * this.currentQuiz.coinsReward);

    // Save state update in gamification engine
    if (window.gamification) {
      window.gamification.completeQuiz(this.currentQuiz.id, this.score, totalQuestions);
      window.gamification.addXP(xpReward);
      window.gamification.addCoins(coinsReward);
    }

    this.container.innerHTML = `
      <div class="quiz-results-card glass-panel animate-fade-in-up" style="text-align:center;padding:40px;border-radius:var(--radius-lg);max-width:500px;margin:0 auto;border:1px solid var(--border-color);">
        <div class="result-badge" style="font-size:4rem;margin-bottom:15px;">🏆</div>
        <h3 style="font-size:1.8rem;margin-bottom:10px;">Quiz Completed!</h3>
        <p style="font-size:1.1rem;color:var(--text-secondary);margin-bottom:20px;">You scored <strong>${this.score} / ${totalQuestions}</strong> (${pct}%)</p>
        
        <div class="result-rewards" style="display:flex;justify-content:center;gap:20px;margin-bottom:30px;">
          <div class="reward-pill" style="background:var(--primary-light);color:var(--primary);padding:10px 20px;border-radius:var(--radius-full);font-weight:600;font-size:0.95rem;">
            ⚡ +${xpReward} XP
          </div>
          <div class="reward-pill" style="background:rgba(245, 158, 11, 0.1);color:var(--accent);padding:10px 20px;border-radius:var(--radius-full);font-weight:600;font-size:0.95rem;">
            🪙 +${coinsReward} Coins
          </div>
        </div>

        <p class="congrats-message" style="color:var(--text-secondary);font-size:0.95rem;margin-bottom:30px;">
          ${pct === 100 ? "Incredible! A perfect score! You unlocked the 'Math Master' badge!" : "Great effort! Review the topics to score even higher next time!"}
        </p>

        <div class="result-actions" style="display:flex;gap:15px;justify-content:center;">
          <button class="btn btn-primary" onclick="window.location.reload()">Back to Quests</button>
          <button class="btn btn-secondary" onclick="quizManager.startQuiz('${this.currentQuiz.id}', '${this.container.id}')">Try Again</button>
        </div>
      </div>
    `;
  }
}

// Global instance
const quizManager = new QuizManager();
window.quizManager = quizManager;

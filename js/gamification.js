// Gamification System Config
const LEVEL_THRESHOLDS = [
  { level: 1, name: "Beginner Explorer", minXp: 0, maxXp: 199 },
  { level: 2, name: "STEM Learner", minXp: 200, maxXp: 499 },
  { level: 3, name: "Problem Solver", minXp: 500, maxXp: 899 },
  { level: 4, name: "Innovator", minXp: 900, maxXp: 1399 },
  { level: 5, name: "Future Scientist", minXp: 1400, maxXp: 1999 },
  { level: 6, name: "STEM Hero", minXp: 2000, maxXp: Infinity }
];

const BADGE_DEFINITIONS = [
  { id: "sci_explorer", name: "Science Explorer", desc: "Completed your first Science Challenge", icon: "🔬", category: "science" },
  { id: "math_master", name: "Math Master", desc: "Got a perfect score in a Mathematics Quiz", icon: "📐", category: "math" },
  { id: "code_ninja", name: "Coding Ninja", desc: "Completed coding playground quest", icon: "🥷", category: "technology" },
  { id: "stem_hero", name: "STEM Hero", desc: "Reached 1,500+ XP", icon: "🦸", category: "overall" },
  { id: "innovator_champ", name: "Innovation Leader", desc: "Submitted an idea to Rural Innovation Hub", icon: "💡", category: "innovation" }
];

class GamificationEngine {
  constructor() {
    this.state = this.loadState();
    this.checkDailyStreak();
  }

  // Load state from localStorage or initialize defaults
  loadState() {
    const saved = localStorage.getItem("stemquest_user_state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing user state, resetting to defaults", e);
      }
    }
    
    // Default initial user state
    return {
      xp: 120, // start with a small amount of initial XP for demonstration
      coins: 30,
      level: 1,
      levelName: "Beginner Explorer",
      streak: 4, // 4-day streak to start with
      badges: ["sci_explorer"], // Start with one unlocked badge
      lastLoginDate: new Date().toDateString(),
      completedQuizzes: []
    };
  }

  // Save current state
  saveState() {
    localStorage.setItem("stemquest_user_state", JSON.stringify(this.state));
    // Dispatch state changed event
    window.dispatchEvent(new CustomEvent("gamificationStateChanged", { detail: this.state }));
  }

  // Add XP and handle potential level-up
  addXP(amount) {
    this.state.xp += amount;
    const oldLevel = this.state.level;
    this.recalculateLevel();
    this.checkBadgesThresholds();
    this.saveState();

    // Trigger visual notification
    this.showToast(`+${amount} XP Earned!`);

    if (this.state.level > oldLevel) {
      this.showToast(`🎉 LEVEL UP! You are now Level ${this.state.level}: ${this.state.levelName}`, "success");
    }
  }

  // Add coins
  addCoins(amount) {
    this.state.coins += amount;
    this.saveState();
    this.showToast(`+${amount} STEM Coins!`);
  }

  // Calculate level based on current XP
  recalculateLevel() {
    let currentLevel = 1;
    let levelName = LEVEL_THRESHOLDS[0].name;

    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (this.state.xp >= LEVEL_THRESHOLDS[i].minXp) {
        currentLevel = LEVEL_THRESHOLDS[i].level;
        levelName = LEVEL_THRESHOLDS[i].name;
      }
    }

    this.state.level = currentLevel;
    this.state.levelName = levelName;
  }

  // Check and update streaks
  checkDailyStreak() {
    const todayStr = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (this.state.lastLoginDate === yesterdayStr) {
      this.state.streak += 1;
      this.state.lastLoginDate = todayStr;
      this.saveState();
      setTimeout(() => this.showToast(`🔥 Streak Active! Day ${this.state.streak} consistent learning!`, "info"), 1500);
    } else if (this.state.lastLoginDate !== todayStr) {
      // If it's been more than a day, streak resets to 1
      this.state.streak = 1;
      this.state.lastLoginDate = todayStr;
      this.saveState();
    }
  }

  // Award a specific badge if not already unlocked
  unlockBadge(badgeId) {
    if (!this.state.badges.includes(badgeId)) {
      const badge = BADGE_DEFINITIONS.find(b => b.id === badgeId);
      if (badge) {
        this.state.badges.push(badgeId);
        this.saveState();
        this.showToast(`🏆 Badge Unlocked: ${badge.icon} ${badge.name}!`, "success");
      }
    }
  }

  // Auto-check badges based on XP levels
  checkBadgesThresholds() {
    if (this.state.xp >= 1500) {
      this.unlockBadge("stem_hero");
    }
  }

  // Marks a quiz as completed
  completeQuiz(quizId, score, perfectScore) {
    if (!this.state.completedQuizzes.includes(quizId)) {
      this.state.completedQuizzes.push(quizId);
    }
    
    if (score === perfectScore) {
      this.unlockBadge("math_master"); // Perfect score badge
    }
    this.saveState();
  }

  // Helper for popup toasts
  showToast(message, type = "default") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.style.position = "fixed";
      container.style.bottom = "20px";
      container.style.right = "20px";
      container.style.zIndex = "9999";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "10px";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `glass-panel animate-fade-in-up`;
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "var(--radius-md)";
    toast.style.fontSize = "0.95rem";
    toast.style.fontWeight = "600";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.boxShadow = "var(--card-shadow)";
    toast.style.border = "1px solid var(--primary)";
    
    if (type === "success") {
      toast.style.background = "var(--gradient-success)";
      toast.style.color = "white";
      toast.style.borderColor = "transparent";
    } else if (type === "info") {
      toast.style.background = "var(--gradient-stem)";
      toast.style.color = "white";
      toast.style.borderColor = "transparent";
    } else {
      toast.style.background = "var(--bg-secondary)";
      toast.style.color = "var(--text-primary)";
    }

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.4s ease";
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  resetProgress() {
    localStorage.removeItem("stemquest_user_state");
    this.state = this.loadState();
    this.saveState();
    this.showToast("Progress Reset Successful!", "info");
    setTimeout(() => window.location.reload(), 1000);
  }
}

// Global engine instance
const gamification = new GamificationEngine();
window.gamification = gamification;

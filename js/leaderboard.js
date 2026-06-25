// Fallback database of students for the leaderboard
const FALLBACK_STUDENTS = [
  {
    "id": "s1",
    "name": "Savita Patil",
    "class": "11",
    "school": "Jila Parishad High School",
    "village": "Shirpur",
    "district": "Dhule",
    "xp": 1450,
    "level": 4,
    "streak": 12,
    "badges": ["Science Explorer", "Innovation Leader", "STEM Hero"]
  },
  {
    "id": "s2",
    "name": "Ramesh Rathod",
    "class": "8",
    "school": "Netaji Subhash School",
    "village": "Shirpur",
    "district": "Dhule",
    "xp": 980,
    "level": 2,
    "streak": 5,
    "badges": ["Math Master", "Science Explorer"]
  },
  {
    "id": "s3",
    "name": "Amit Kumar",
    "class": "9",
    "school": "Model School Baramati",
    "village": "Baramati",
    "district": "Pune",
    "xp": 1250,
    "level": 3,
    "streak": 8,
    "badges": ["Coding Champion", "Science Explorer"]
  },
  {
    "id": "s4",
    "name": "Pooja Sharma",
    "class": "10",
    "school": "Jila Parishad High School",
    "village": "Shirpur",
    "district": "Dhule",
    "xp": 1150,
    "level": 3,
    "streak": 15,
    "badges": ["Math Master", "Coding Champion"]
  },
  {
    "id": "s5",
    "name": "Ganesh Kadam",
    "class": "7",
    "school": "Netaji Subhash School",
    "village": "Shirpur",
    "district": "Dhule",
    "xp": 820,
    "level": 2,
    "streak": 3,
    "badges": ["Science Explorer"]
  },
  {
    "id": "s6",
    "name": "Neha Joshi",
    "class": "12",
    "school": "Model School Baramati",
    "village": "Baramati",
    "district": "Pune",
    "xp": 1550,
    "level": 5,
    "streak": 22,
    "badges": ["STEM Hero", "Math Master", "Innovation Leader", "Coding Champion"]
  },
  {
    "id": "s7",
    "name": "Rahul Deshmukh",
    "class": "6",
    "school": "Gram Panchayat School",
    "village": "Koregaon",
    "district": "Satara",
    "xp": 600,
    "level": 1,
    "streak": 4,
    "badges": ["Science Explorer"]
  },
  {
    "id": "s8",
    "name": "Jyoti Patil",
    "class": "8",
    "school": "Gram Panchayat School",
    "village": "Koregaon",
    "district": "Satara",
    "xp": 950,
    "level": 2,
    "streak": 7,
    "badges": ["Math Master"]
  }
];

class LeaderboardManager {
  constructor() {
    this.students = [];
    this.currentFilter = "state"; // default
    this.container = null;
  }

  async init(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    try {
      const response = await fetch("data/students.json");
      if (response.ok) {
        this.students = await response.json();
      } else {
        throw new Error("Could not fetch students");
      }
    } catch (e) {
      console.warn("CORS/Fetch error: falling back to offline student database.", e);
      this.students = JSON.parse(JSON.stringify(FALLBACK_STUDENTS));
    }

    this.render();
  }

  setFilter(filterType) {
    this.currentFilter = filterType;
    this.render();
  }

  render() {
    if (!this.container) return;

    // Get live user state
    const userState = window.gamification ? window.gamification.state : null;
    let combinedList = [...this.students];

    // Inject user if they exist
    if (userState) {
      const userRecordIndex = combinedList.findIndex(s => s.id === "user");
      const userRecord = {
        id: "user",
        name: "You (Student Explorer)",
        class: "8",
        school: "Jila Parishad High School",
        village: "Shirpur",
        district: "Dhule",
        xp: userState.xp,
        level: userState.level,
        streak: userState.streak,
        badges: userState.badges,
        isUser: true
      };

      if (userRecordIndex !== -1) {
        combinedList[userRecordIndex] = userRecord;
      } else {
        combinedList.push(userRecord);
      }
    }

    // Apply Filter
    let filteredList = combinedList;
    if (this.currentFilter === "school") {
      filteredList = combinedList.filter(s => s.school === "Jila Parishad High School");
    } else if (this.currentFilter === "village") {
      filteredList = combinedList.filter(s => s.village === "Shirpur");
    } else if (this.currentFilter === "district") {
      filteredList = combinedList.filter(s => s.district === "Dhule");
    }

    // Sort by XP
    filteredList.sort((a, b) => b.xp - a.xp);

    // Build Table HTML
    if (filteredList.length === 0) {
      this.container.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-secondary);">No rankings in this category yet. Complete challenges to rank up!</div>`;
      return;
    }

    const tableRows = filteredList.map((student, idx) => {
      const rank = idx + 1;
      let rankBadge = rank;
      if (rank === 1) rankBadge = "🥇";
      else if (rank === 2) rankBadge = "🥈";
      else if (rank === 3) rankBadge = "🥉";

      const isUserRow = student.isUser ? 'style="background: var(--primary-light); font-weight: 600; border-left: 4px solid var(--primary);"' : '';

      return `
        <tr ${isUserRow}>
          <td style="padding:15px;text-align:center;font-size:1.1rem;">${rankBadge}</td>
          <td style="padding:15px;display:flex;align-items:center;gap:10px;">
            <span style="font-size:1.25rem;">${student.isUser ? "👤" : "🎓"}</span>
            <div>
              <span>${student.name}</span>
              <div style="font-size:0.75rem;color:var(--text-muted);font-weight:400;">
                Class ${student.class} | ${student.school}
              </div>
            </div>
          </td>
          <td style="padding:15px;text-align:center;">${student.village}</td>
          <td style="padding:15px;text-align:center;font-weight:700;color:var(--primary);">
            ⚡ ${student.xp}
          </td>
          <td style="padding:15px;text-align:center;">
            <span style="background:var(--bg-tertiary);padding:4px 8px;border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-secondary);">
              Lvl ${student.level}
            </span>
          </td>
        </tr>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="table-container" style="overflow-x:auto;width:100%;">
        <table style="width:100%;border-collapse:collapse;text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color);color:var(--text-secondary);font-size:0.9rem;">
              <th style="padding:15px;text-align:center;width:80px;">Rank</th>
              <th style="padding:15px;">Student</th>
              <th style="padding:15px;text-align:center;">Village</th>
              <th style="padding:15px;text-align:center;">XP</th>
              <th style="padding:15px;text-align:center;">Level</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  }
}

// Global instance
const leaderboardManager = new LeaderboardManager();
window.leaderboardManager = leaderboardManager;

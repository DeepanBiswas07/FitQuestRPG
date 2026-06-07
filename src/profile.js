// ===== PROFILE & STATS OPERATIONS =====

function getRequiredXPForLevel(lvl) {
  return lvl * 500;
}

// Adjust player XP and check levels
function adjustXP(amount, category) {
  let finalAmount = amount;
  
  // Apply passive class buffs (+10% XP for matching categories)
  if (amount > 0 && category && state.class) {
    if (state.class === "goliath" && (category === "push" || category === "legs")) {
      finalAmount = Math.round(amount * 1.1);
    } else if (state.class === "acrobat" && (category === "mobility" || category === "wall")) {
      finalAmount = Math.round(amount * 1.1);
    } else if (state.class === "monk" && category === "core") {
      finalAmount = Math.round(amount * 1.1);
    }
    
    if (finalAmount > amount) {
      setTimeout(() => {
        showToast(`✨ Class Passive Bonus: +${finalAmount - amount} XP!`);
      }, 300);
    }
  }

  state.xp += finalAmount;
  if (state.xp < 0) state.xp = 0;
  
  let requiredXP = getRequiredXPForLevel(state.level);
  
  while (state.xp >= requiredXP) {
    state.level++;
    if (state.statPoints !== undefined) state.statPoints += 2;
    requiredXP = getRequiredXPForLevel(state.level);
    setTimeout(() => {
      playSound("levelup");
      showToast(`🎉 LEVEL UP! You are now Level ${state.level}! (+2 Stat Points)`);
    }, 500);
  }
  
  while (state.level > 1 && state.xp < getRequiredXPForLevel(state.level - 1)) {
    state.level--;
    showToast(`Level decreased to ${state.level}`);
  }
}

// Allocate available stat point
function allocateStat(statName) {
  if (state.statPoints > 0) {
    state.statPoints--;
    if (!state.stats) state.stats = { strength: 0, agility: 0, balance: 0 };
    state.stats[statName]++;
    playSound("click");
    saveState();
    updateProfile();
  } else {
    showToast("No stat points available! Level up to earn more.");
  }
}

// Update dashboard stats widgets
function updateDashboard() {
  const unlockedCount = state.mastered.length;
  document.getElementById("skills-unlocked").innerText = unlockedCount;
  document.getElementById("total-xp-display").innerText = state.xp;
  document.getElementById("hero-level").innerText = state.level;
  const totalEl = document.getElementById("skills-total");
  if (totalEl) totalEl.innerText = calisthenicsSkills.length;
}

// Update profile view details
function updateProfile() {
  document.getElementById("current-level").innerText = state.level;
  
  const classNameMap = {
    "goliath": "Goliath",
    "acrobat": "Acrobat",
    "monk": "Monk"
  };
  const classNameDisplay = document.getElementById("warrior-class-name");
  if (classNameDisplay) {
    classNameDisplay.innerText = state.class ? classNameMap[state.class] : "Home Warrior";
  }
  
  const statsAvailableEl = document.getElementById("stat-points-avail");
  if (statsAvailableEl) {
    if (state.statPoints > 0) {
      statsAvailableEl.style.display = "inline-block";
      statsAvailableEl.innerText = `Available: ${state.statPoints} pts`;
    } else {
      statsAvailableEl.style.display = "none";
    }
  }
  
  if (state.stats) {
    const valStrength = document.getElementById("val-strength");
    if (valStrength) valStrength.innerText = state.stats.strength || 0;
    const valAgility = document.getElementById("val-agility");
    if (valAgility) valAgility.innerText = state.stats.agility || 0;
    const valBalance = document.getElementById("val-balance");
    if (valBalance) valBalance.innerText = state.stats.balance || 0;
  }
  
  const streakBadge = document.getElementById("streak-badge");
  if (streakBadge && state.streak !== undefined) {
    streakBadge.innerText = `🔥 Streak: ${state.streak} Days`;
  }
  
  const xpCurrent = state.xp;
  const prevXPThreshold = getRequiredXPForLevel(state.level - 1);
  const nextXPThreshold = getRequiredXPForLevel(state.level);
  
  const xpInCurrentLevel = xpCurrent - prevXPThreshold;
  const xpNeededForCurrentLevel = nextXPThreshold - prevXPThreshold;
  
  const levelProgressPct = Math.max(0, Math.min(100, (xpInCurrentLevel / xpNeededForCurrentLevel) * 100));
  document.getElementById("level-bar-fill").style.width = `${levelProgressPct}%`;
  document.getElementById("xp-current").innerText = xpInCurrentLevel;
  document.getElementById("xp-next").innerText = xpNeededForCurrentLevel;
  
  let title = "Initiate";
  let avatarEmoji = "🥉";
  if (state.level >= 15) {
    title = "Ascended Legend";
    avatarEmoji = "👑";
  } else if (state.level >= 10) {
    title = "Calisthenics Master";
    avatarEmoji = "💎";
  } else if (state.level >= 6) {
    title = "Vanguard Warrior";
    avatarEmoji = "🥇";
  } else if (state.level >= 3) {
    title = "Apprentice Gladiator";
    avatarEmoji = "🥈";
  }
  document.getElementById("warrior-title").innerText = title;
  document.getElementById("avatar-emoji").innerText = avatarEmoji;
  
  const categories = ["push", "core", "legs", "wall", "mobility"];
  categories.forEach(cat => {
    const total = calisthenicsSkills.filter(s => s.category === cat).length;
    const mastered = calisthenicsSkills.filter(s => s.category === cat && state.mastered.includes(s.id)).length;
    const pct = total > 0 ? (mastered / total) * 100 : 0;
    
    const fillEl = document.querySelector(`#stat-${cat} .stat-fill`);
    if (fillEl) {
      fillEl.style.width = `${pct}%`;
    }
  });
  
  const totalSkills = calisthenicsSkills.length;
  const masteredSkills = state.mastered.length;
  const totalPct = totalSkills > 0 ? Math.round((masteredSkills / totalSkills) * 100) : 0;
  
  document.getElementById("ring-pct").innerText = `${totalPct}%`;
  
  const ringFill = document.getElementById("ring-fill");
  if (ringFill) {
    const offset = 314 - (314 * totalPct) / 100;
    ringFill.style.strokeDashoffset = offset;
  }
  
  const avatarRing = document.getElementById("avatar-ring");
  if (avatarRing) {
    avatarRing.style.setProperty("--pct", `${totalPct}%`);
  }
  
  // Sync volume slider and voice toggle states in Profile
  const volSlider = document.getElementById("volume-slider");
  const volLbl = document.getElementById("volume-lbl");
  if (volSlider && volLbl) {
    const volVal = Math.round((state.volume !== undefined ? state.volume : 1.0) * 100);
    volSlider.value = volVal;
    volLbl.innerText = `${volVal}%`;
  }
  
  const voiceBtn = document.getElementById("voice-narrator-btn");
  if (voiceBtn) {
    if (state.voiceEnabled !== false) {
      voiceBtn.innerText = "Enabled";
      voiceBtn.style.borderColor = "var(--accent3)";
      voiceBtn.style.color = "var(--accent3)";
    } else {
      voiceBtn.innerText = "Disabled";
      voiceBtn.style.borderColor = "var(--border)";
      voiceBtn.style.color = "var(--muted)";
    }
  }
  
  const musicBtn = document.getElementById("music-toggle-btn");
  if (musicBtn) {
    if (state.musicEnabled !== false) {
      musicBtn.innerText = "Enabled";
      musicBtn.style.borderColor = "var(--accent)";
      musicBtn.style.color = "var(--accent)";
    } else {
      musicBtn.innerText = "Disabled";
      musicBtn.style.borderColor = "var(--border)";
      musicBtn.style.color = "var(--muted)";
    }
  }
}

// Class check and selection
function checkClassSelected() {
  const overlay = document.getElementById("class-overlay");
  if (overlay) {
    if (!state.class) {
      overlay.style.display = "flex";
    } else {
      overlay.style.display = "none";
    }
  }
}

function selectClass(className) {
  state.class = className;
  if (!state.stats) state.stats = { strength: 0, agility: 0, balance: 0 };
  if (className === "goliath") {
    state.stats.strength += 2;
  } else if (className === "acrobat") {
    state.stats.balance += 2;
  } else if (className === "monk") {
    state.stats.agility += 2;
  }
  const overlay = document.getElementById("class-overlay");
  if (overlay) overlay.style.display = "none";
  playSound("levelup");
  saveState();
  updateProfile();
}

// Checkbox items for workout HUD form
function toggleCheckItem(cb) {
  playSound("click");
  const allChecked = Array.from(document.querySelectorAll("#checklist-items input")).every(i => i.checked);
  const btn = document.querySelector(".btn-start-session[onclick='confirmChecklistAndStart()']");
  if (btn) {
    if (allChecked) {
      btn.disabled = false;
      btn.style.opacity = "1";
      playSound("chime");
    } else {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    }
  }
}

// Calendar Date helper
function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}

// Streak logic
function updateStreak() {
  const today = getTodayDateString();
  if (!state.workoutHistory) state.workoutHistory = [];
  if (state.lastWorkoutDate === today) return;
  
  if (state.lastWorkoutDate) {
    const lastDate = new Date(state.lastWorkoutDate);
    const todayDate = new Date(today);
    const diffTime = Math.abs(todayDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      if (!state.streak) state.streak = 0;
      state.streak++;
    } else {
      state.streak = 1;
    }
  } else {
    state.streak = 1;
  }
  
  state.lastWorkoutDate = today;
  if (!state.workoutHistory.includes(today)) {
    state.workoutHistory.push(today);
  }
}

// Render Calendar Log cells
function renderCalendarLogs() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  grid.innerHTML = "";
  
  if (!state.workoutHistory) state.workoutHistory = [];
  const today = new Date();
  
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
    
    const dayDiv = document.createElement("div");
    dayDiv.style.aspectRatio = "1";
    dayDiv.style.borderRadius = "4px";
    dayDiv.style.backgroundColor = state.workoutHistory.includes(dateStr) ? "var(--green)" : "var(--bg3)";
    dayDiv.style.border = "1px solid var(--border)";
    dayDiv.title = dateStr;
    
    if (dateStr === getTodayDateString()) {
      dayDiv.style.border = "2px solid var(--accent)";
    }
    
    grid.appendChild(dayDiv);
  }
}

// ===== CALIPATH BOOTSTRAPPER & GENERAL EVENTS =====

// Sync environment filters and triggers tree re-render
function toggleEnvFilter(envType) {
  playSound("click");
  state.envFilter[envType] = document.getElementById(`env-${envType}`).checked;
  saveState();
  renderTree();
}

// Toast indicator helper
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Float floating XP text popups
function triggerXpPopup(xp) {
  const xpPopup = document.getElementById("xp-popup");
  if (!xpPopup) return;
  xpPopup.innerText = `+${xp} XP`;
  xpPopup.classList.add("show");
  
  setTimeout(() => {
    xpPopup.classList.remove("show");
  }, 1000);
}

// Hero banner floating backdrop particles
function createParticles() {
  const container = document.getElementById("hero-particles");
  if (!container) return;
  container.innerHTML = "";
  
  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    const size = Math.random() * 5 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 8 + 4}s`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    const colors = ["rgba(240, 165, 0, 0.5)", "rgba(124, 58, 237, 0.5)", "rgba(6, 182, 212, 0.5)"];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = `0 0 ${size * 2}px ${p.style.background}`;
    container.appendChild(p);
  }
}

// Real-time search entry point
function onSearchInput() {
  const searchInput = document.getElementById("skill-search");
  if (searchInput) {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderTree();
  }
}

// ===== FORGE PROGRESS BANNER =====
function updateForgeBanner() {
  const envOk = s => state.envFilter[s.env] !== false;
  const masteredCount = calisthenicsSkills.filter(s => state.mastered.includes(s.id) && envOk(s)).length;
  const availableCount = calisthenicsSkills.filter(s => canUnlock(s) && !state.mastered.includes(s.id) && envOk(s)).length;
  const inProgressCount = calisthenicsSkills.filter(s => state.inprogress.includes(s.id) && !state.mastered.includes(s.id) && envOk(s)).length;
  const almostReadyCount = calisthenicsSkills.filter(s => {
    if (state.mastered.includes(s.id) || canUnlock(s) || !envOk(s)) return false;
    const prereqsMet = s.prereqs.filter(pid => state.mastered.includes(pid)).length;
    return prereqsMet > 0 && prereqsMet < s.prereqs.length;
  }).length;
  
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  setEl("forge-mastered-count", masteredCount);
  setEl("forge-available-count", availableCount);
  setEl("forge-inprogress-count", inProgressCount);
  setEl("forge-next-tier-count", almostReadyCount);
}

// ===== QUEST LOG RENDERER =====
function updateQuestLog() {
  const masteredList = document.getElementById("mastered-list");
  const inprogressList = document.getElementById("inprogress-list");
  const achievementsGrid = document.getElementById("achievements-grid");
  
  if (masteredList) {
    if (state.mastered.length === 0) {
      masteredList.innerHTML = `<div class="empty-state">No skills mastered yet.<br/>Start your journey!</div>`;
    } else {
      masteredList.innerHTML = "";
      state.mastered.forEach(id => {
        const skill = calisthenicsSkills.find(s => s.id === id);
        if (!skill) return;
        const item = document.createElement("div");
        item.className = "quest-item mastered-item";
        item.innerHTML = `<span style="font-size:1.1rem;">${getSkillEmoji(skill)}</span>
          <div style="flex:1;"><div class="quest-item-name">${skill.name}</div>
          <div class="quest-item-sub">${skill.category.toUpperCase()} · Tier ${skill.tier}</div></div>
          <span class="quest-item-xp">🏆 +${skill.xp} XP</span>`;
        item.addEventListener("click", () => openModal(skill.id));
        masteredList.appendChild(item);
      });
    }
  }
  
  if (inprogressList) {
    const activeSkills = state.inprogress.filter(id => !state.mastered.includes(id));
    if (activeSkills.length === 0) {
      inprogressList.innerHTML = `<div class="empty-state">Mark skills as in-progress<br/>to track here.</div>`;
    } else {
      inprogressList.innerHTML = "";
      activeSkills.forEach(id => {
        const skill = calisthenicsSkills.find(s => s.id === id);
        if (!skill) return;
        const item = document.createElement("div");
        item.className = "quest-item inprogress-item";
        item.innerHTML = `<span style="font-size:1.1rem;">${getSkillEmoji(skill)}</span>
          <div style="flex:1;"><div class="quest-item-name">${skill.name}</div>
          <div class="quest-item-sub">${skill.category.toUpperCase()} · Tier ${skill.tier}</div></div>
          <span class="quest-item-status">⚡ Active</span>`;
        item.addEventListener("click", () => openModal(skill.id));
        inprogressList.appendChild(item);
      });
    }
  }
  
  if (achievementsGrid) {
    const achievements = [
      { id: "first_blood", label: "First Blood", desc: "Master your first skill", icon: "🩸", earned: state.mastered.length >= 1 },
      { id: "ten_mastered", label: "Gladiator", desc: "Master 10 skills", icon: "⚔️", earned: state.mastered.length >= 10 },
      { id: "twenty_mastered", label: "Champion", desc: "Master 20 skills", icon: "🏆", earned: state.mastered.length >= 20 },
      { id: "fifty_mastered", label: "Legend", desc: "Master 50 skills", icon: "👑", earned: state.mastered.length >= 50 },
      { id: "level_5", label: "Apprentice", desc: "Reach Level 5", icon: "🥈", earned: state.level >= 5 },
      { id: "level_10", label: "Warrior", desc: "Reach Level 10", icon: "🥇", earned: state.level >= 10 },
      { id: "streak_7", label: "Iron Will", desc: "7-day workout streak", icon: "🔥", earned: state.streak >= 7 },
      { id: "streak_30", label: "Unstoppable", desc: "30-day streak", icon: "💎", earned: state.streak >= 30 },
    ];
    achievementsGrid.innerHTML = "";
    achievements.forEach(a => {
      const card = document.createElement("div");
      card.className = "achievement-card " + (a.earned ? " earned" : " locked-ach");
      card.innerHTML = `<div class="achievement-card-icon">${a.icon}</div>
        <div class="achievement-card-label">${a.label}</div>
        <div class="achievement-card-desc">${a.desc}</div>`;
      achievementsGrid.appendChild(card);
    });
  }
}

// ===== PROGRESS BACKUP & RESTORE =====
function exportProgress() {
  playSound("click");
  const code = btoa(JSON.stringify(state));
  const textarea = document.getElementById("backup-code-area");
  if (textarea) {
    textarea.value = code;
    textarea.select();
    try { document.execCommand("copy"); showToast("Progress code copied to clipboard!"); }
    catch(e) { showToast("Code generated — copy it manually!"); }
  }
}

function importProgress() {
  const textarea = document.getElementById("backup-code-area");
  if (!textarea || !textarea.value.trim()) {
    showToast("Paste your backup code in the text area first.");
    return;
  }
  try {
    const decoded = JSON.parse(atob(textarea.value.trim()));
    if (!decoded.mastered || !decoded.xp) throw new Error("Invalid");
    Object.assign(state, decoded);
    saveState();
    playSound("levelup");
    renderTree();
    updateDashboard();
    updateProfile();
    renderCalendarLogs();
    showToast("Progress restored successfully!");
  } catch(e) {
    showToast("Invalid backup code. Check and try again.");
  }
}

// ===== RESET PROGRESS =====
function confirmReset() {
  if (confirm("⚠️ Are you sure you want to RESET ALL progress? This cannot be undone!")) {
    localStorage.removeItem("calpath_state");
    location.reload();
  }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // 1. Load progress
  loadState();
  
  // 2. Setup systems
  initNav();
  initFilters();
  createParticles();
  renderTree();
  updateDashboard();
  setupResizeHandler();
  setupZoomAndPan();
  checkClassSelected();
  
  // 2b. Start Tavern Music if enabled on page interaction
  const startMusicOnInteract = () => {
    if (typeof initAudio === "function") {
      initAudio();
    }
    if (state.musicEnabled && !state.muted && (typeof updateMusicStyle === "function")) {
      updateMusicStyle("tavern");
    }
    document.removeEventListener("click", startMusicOnInteract);
    document.removeEventListener("keydown", startMusicOnInteract);
  };
  document.addEventListener("click", startMusicOnInteract);
  document.addEventListener("keydown", startMusicOnInteract);
  
  // 3. Sync environment checkboxes with loaded state
  if (state.envFilter) {
    ['floor', 'wall', 'furniture', 'bar', 'dip_bar', 'rings'].forEach(env => {
      const cb = document.getElementById(`env-${env}`);
      if (cb) {
        cb.checked = state.envFilter[env] !== false;
      }
    });
  }
  
  // 4. Setup minimap and tier focus interactions
  setupMinimapClicks();
  initTierLabelScroll();
  
  // 5. Sync volume slider & speaker icon
  const volumeSlider = document.getElementById("volume-slider");
  if (volumeSlider) {
    volumeSlider.value = Math.round((state.volume !== undefined ? state.volume : 1.0) * 100);
  }
  
  const muteBtn = document.getElementById("sound-toggle");
  if (muteBtn) {
    muteBtn.innerText = state.muted ? "🔇" : "🔊";
  }
  
  // 6. Draw lines & logs
  updateMinimap();
  renderCalendarLogs();
  
  // 7. Scroll hint action
  const scrollHint = document.querySelector(".hero-scroll-hint");
  if (scrollHint) {
    scrollHint.addEventListener("click", () => {
      playSound("click");
      document.querySelector(".main-content")?.scrollIntoView({ behavior: "smooth" });
    });
  }
  
  // 8. Small delayed sync to ensure layouts stabilize
  setTimeout(() => {
    checkClassSelected();
    renderCalendarLogs();
    drawLines();
    applyTransform();
  }, 500);
});

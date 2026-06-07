// ===== WORKOUT FORGE GENERATOR & HUD ENGINE =====

const BOSS_TEMPLATES = [
  { name: "Lactate Golem", emoji: "🪨", hp: 300 },
  { name: "Gravity Drake", emoji: "🐉", hp: 500 },
  { name: "Hypertrophy Titan", emoji: "👹", hp: 700 },
  { name: "Stiffness Phantom", emoji: "👻", hp: 250 },
  { name: "Vascular Vampire", emoji: "🧛", hp: 400 },
  { name: "Cardio Chimera", emoji: "🦁", hp: 600 },
  { name: "Plateau Beholder", emoji: "👁️", hp: 800 },
  { name: "Fatigue Wyrm", emoji: "🐍", hp: 450 },
  { name: "Atrophy Archmage", emoji: "🧙‍♂️", hp: 650 },
  { name: "DOMS Destroyer", emoji: "🔨", hp: 900 },
  { name: "Soreness Specter", emoji: "🌫️", hp: 350 },
  { name: "Flexibility Sphinx", emoji: "🧝", hp: 550 }
];

let restTimerCallback = null;

function generateWorkout() {
  playSound("chime");
  
  const intensity = document.getElementById("forge-intensity").value;
  const focus = document.getElementById("forge-focus").value;
  const mode = (document.getElementById("forge-mode") || {}).value || "smart";
  
  // ---- Classify all skills by readiness ----
  const envOk = s => state.envFilter[s.env] !== false;
  
  const mastered   = calisthenicsSkills.filter(s => state.mastered.includes(s.id) && envOk(s));
  const inProgress = calisthenicsSkills.filter(s => state.inprogress.includes(s.id) && !state.mastered.includes(s.id) && envOk(s));
  const available  = calisthenicsSkills.filter(s => canUnlock(s) && !state.mastered.includes(s.id) && envOk(s));
  // "almost ready" = 1 prerequisite away (at least one prereq mastered, but not all)
  const almostReady = calisthenicsSkills.filter(s => {
    if (state.mastered.includes(s.id) || canUnlock(s)) return false;
    if (!envOk(s)) return false;
    const prereqsMet = s.prereqs.filter(pid => state.mastered.includes(pid)).length;
    return prereqsMet > 0 && prereqsMet < s.prereqs.length;
  });
  
  // ---- Update progress banner ----
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  setEl("forge-mastered-count",   mastered.length);
  setEl("forge-available-count",  available.length);
  setEl("forge-inprogress-count", inProgress.length);
  setEl("forge-next-tier-count",  almostReady.length);
  
  // ---- Build pool from chosen mode ----
  let pool = [];
  let modeLabel = "";
  
  if (mode === "mastered") {
    pool = mastered;
    modeLabel = "🔄 Practice Mode";
  } else if (mode === "stretch") {
    // 50% mastered, 50% available/almost-ready — trains towards next skills
    pool = [...mastered, ...available, ...almostReady];
    modeLabel = "📈 Stretch Mode";
  } else if (mode === "any") {
    pool = calisthenicsSkills.filter(envOk);
    modeLabel = "🌐 Open Mode";
  } else {
    // smart (default): prioritise in-progress, then available, pad with mastered
    // Weight: in-progress × 3, available × 2, mastered × 1
    const weighted = [
      ...inProgress.flatMap(s => [s, s, s]),
      ...available.flatMap(s => [s, s]),
      ...mastered
    ];
    // Deduplicate by id while preserving weighting order
    const seen = new Set();
    pool = weighted.filter(s => { if (seen.has(s.id)) return false; seen.add(s.id); return true; });
    modeLabel = "🧠 Smart Mode";
  }
  
  // Apply category focus
  let focusedPool = focus === "all" ? pool : pool.filter(s => s.category === focus);
  
  // Fallback: if focused pool is empty, widen to all-category pool
  if (focusedPool.length === 0) {
    focusedPool = pool;
    if (focus !== "all") showToast("No skills in that focus for this mode — using all categories.");
  }
  
  // Final fallback: if still empty (e.g. no skills unlocked + mastered mode), use env-filtered all
  if (focusedPool.length === 0) {
    focusedPool = calisthenicsSkills.filter(envOk);
    showToast("No matching skills found. Showing all available for your environment.");
  }
  
  if (focusedPool.length === 0) {
    showToast("No skills match your environment filters. Enable some toggles above.");
    return;
  }
  
  // ---- Determine count ----
  let count = 5;
  if (intensity === "easy") count = 3;
  else if (intensity === "hard") count = 7;
  
  // ---- Pick exercises (shuffle, no repeats) ----
  const shuffled = [...focusedPool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // ---- Map to workout items ----
  activeWorkout = {
    exercises: selected.map(ex => {
      let goal, isHold = false, holdSec = 15;
      
      if (ex.desc.toLowerCase().includes("hold") || ex.desc.toLowerCase().includes("static") || ex.name.toLowerCase().includes("hold")) {
        isHold = true;
        holdSec = Math.max(10, ex.tier * 10);
        goal = `3 × ${holdSec}s hold`;
      } else {
        const reps = Math.max(4, 12 - ex.tier * 2);
        goal = `3 × ${reps} reps`;
      }
      
      // Readiness tag
      let readiness = "any";
      if (state.mastered.includes(ex.id)) readiness = "mastered";
      else if (state.inprogress.includes(ex.id)) readiness = "inprogress";
      else if (canUnlock(ex)) readiness = "available";
      else readiness = "stretch";
      
      return { 
        ...ex, 
        goal, 
        isHold, 
        holdSec, 
        readiness,
        currentSet: 1,
        totalSets: 3,
        isCompleted: false
      };
    }),
    currentIdx: 0,
    timerVal: 0,
    timerInterval: null,
    timerRunning: false
  };
  
  // ---- Render exercise list ----
  const listContainer = document.getElementById("workout-exercises-list");
  if (listContainer) {
    listContainer.innerHTML = "";
    
    const readinessMeta = {
      mastered:   { label: "✅ Mastered",   color: "var(--green)" },
      inprogress: { label: "⚡ Training",   color: "var(--accent3)" },
      available:  { label: "🔓 Available",  color: "var(--accent)" },
      stretch:    { label: "💪 Challenge",  color: "var(--accent2)" },
    };
    
    activeWorkout.exercises.forEach(ex => {
      const meta = readinessMeta[ex.readiness] || readinessMeta.available;
      const item = document.createElement("div");
      item.className = "workout-ex-item";
      item.style.cursor = "pointer";
      item.innerHTML = `
        <span class="node-icon">${getSkillEmoji(ex)}</span>
        <div class="workout-ex-name">
          ${ex.name}
          <div style="display:flex;gap:0.4rem;align-items:center;margin-top:0.2rem;flex-wrap:wrap;">
            <span class="workout-ex-tag cat-${ex.category}">${ex.category}</span>
            <span style="font-size:0.7rem;font-family:var(--font-alt);font-weight:700;color:${meta.color};">${meta.label}</span>
            <span style="font-size:0.7rem;color:var(--muted);font-family:var(--font-alt);">Tier ${ex.tier} · +${ex.xp} XP</span>
          </div>
        </div>
        <div class="workout-ex-goal">${ex.goal}</div>
      `;
      item.addEventListener("click", () => openModal(ex.id));
      listContainer.appendChild(item);
    });
  }
  
  // Update quest tag label
  const tag = document.getElementById("forge-quest-tag");
  if (tag) tag.innerText = modeLabel;
  
  // Boss battle
  generateBossForWorkout(intensity);
  
  // Procedural Quest Lore
  const loreEl = document.getElementById("forge-quest-lore");
  if (loreEl) {
    const bossName = activeBoss ? activeBoss.name : "Lactate Golem";
    loreEl.innerText = generateQuestLore(bossName, selected);
  }
  
  document.getElementById("forge-empty-state").style.display = "none";
  document.getElementById("forge-active-quest").style.display = "block";
  
  const modeNames = { smart: "Smart", mastered: "Practice", stretch: "Stretch", any: "Open" };
  showToast(`⚒️ ${modeNames[mode] || "Smart"} Quest forged — ${selected.length} exercises!`);
}

function generateBossForWorkout(intensity) {
  const baseBoss = BOSS_TEMPLATES[Math.floor(Math.random() * BOSS_TEMPLATES.length)];
  let mult = 1.0;
  if (intensity === "easy") mult = 0.8;
  if (intensity === "hard") mult = 1.4;
  
  const maxHp = Math.round(baseBoss.hp * mult);
  
  activeBoss = {
    name: baseBoss.name,
    emoji: baseBoss.emoji,
    maxHp: maxHp,
    currentHp: maxHp
  };
  
  updateBossUI();
}

function updateBossUI() {
  if (!activeBoss) return;
  
  document.getElementById("boss-name").innerText = activeBoss.name;
  document.getElementById("boss-emoji").innerText = activeBoss.emoji;
  document.getElementById("boss-hp-text").innerText = `${activeBoss.currentHp} / ${activeBoss.maxHp} HP`;
  
  const pct = Math.max(0, (activeBoss.currentHp / activeBoss.maxHp) * 100);
  document.getElementById("boss-hp-bar").style.width = `${pct}%`;
}

function damageBoss(amount) {
  if (!activeBoss || activeBoss.currentHp <= 0) return;
  
  activeBoss.currentHp = Math.max(0, activeBoss.currentHp - amount);
  updateBossUI();
  playSound("slash");
  
  // Screen shake and particle hit splash effects
  const hud = document.querySelector(".boss-battle-hud");
  if (hud) {
    hud.classList.remove("boss-shake-active");
    void hud.offsetWidth; // Force reflow
    hud.classList.add("boss-shake-active");
    
    const emoji = document.getElementById("boss-emoji");
    let startX = hud.clientWidth / 2;
    let startY = hud.clientHeight / 2;
    if (emoji) {
      startX = emoji.offsetLeft + emoji.offsetWidth / 2;
      startY = emoji.offsetTop + emoji.offsetHeight / 2;
    }
    
    const colors = ["#f1c40f", "#e74c3c", "#e67e22", "#f39c12", "#ff7675"];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "hit-particle";
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.background = color;
      p.style.boxShadow = `0 0 6px ${color}, 0 0 12px ${color}`;
      p.style.left = `${startX}px`;
      p.style.top = `${startY}px`;
      
      hud.appendChild(p);
      void p.offsetWidth; // Force reflow for transitions
      
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 80;
      const size = 0.4 + Math.random() * 0.8;
      
      p.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(${size})`;
      p.style.opacity = "0";
      
      setTimeout(() => { p.remove(); }, 500);
    }
  }
  
  const indicator = document.getElementById("boss-damage-indicator");
  if (indicator) {
    indicator.innerText = `-${amount} HP`;
    indicator.className = "boss-damage-indicator boss-damage-pop";
    indicator.style.opacity = "1";
    
    setTimeout(() => {
      indicator.className = "boss-damage-indicator";
      indicator.style.opacity = "0";
    }, 800);
  }
  
  if (activeBoss.currentHp <= 0) {
    speakText(`The ${activeBoss.name} has been defeated! Complete the quest to reap rewards.`);
    showToast(`🎉 DEFEATED ${activeBoss.name}!`);
    playSound("levelup");
  } else {
    const callouts = ["Direct hit!", "Great form!", "Hit him again!", "Keep pushing!"];
    if (Math.random() > 0.6) {
      speakText(callouts[Math.floor(Math.random() * callouts.length)]);
    }
  }
}

function damageBossForExerciseCompletion() {
  if (!activeBoss || !activeWorkout) return;
  
  const totalExercises = activeWorkout.exercises.length;
  const completedCount = activeWorkout.exercises.filter(ex => ex.isCompleted).length;
  
  if (completedCount === totalExercises) {
    const finalDamage = activeBoss.currentHp;
    damageBoss(finalDamage);
  } else {
    const slice = Math.round(activeBoss.maxHp / totalExercises);
    let damage = Math.round(slice * (0.85 + Math.random() * 0.3));
    if (damage >= activeBoss.currentHp) {
      damage = Math.max(1, activeBoss.currentHp - 1);
    }
    damageBoss(damage);
  }
}

// ===== ACTIVE WORKOUT HUD OVERLAY =====
function startWorkoutSession() {
  if (!activeWorkout || activeWorkout.exercises.length === 0) return;
  playSound("click");
  
  // Show checklist card, hide HUD
  const checklistCard = document.getElementById("session-checklist-card");
  const hudContainer = document.getElementById("session-hud-container");
  if (checklistCard && hudContainer) {
    checklistCard.style.display = "block";
    hudContainer.style.display = "none";
  }
  
  const checklist = document.getElementById("checklist-items");
  if (checklist) {
    checklist.innerHTML = "";
    const points = [
      "I have cleared a safe space for my workout.",
      "I will focus on proper form, not just rep counts.",
      "I am hydrated and ready for battle.",
      "I will respect my body's limits."
    ];
    points.forEach(p => {
      const div = document.createElement("div");
      div.innerHTML = `<label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-family: var(--font-alt); font-size: 0.95rem; color: var(--text);"><input type="checkbox" onchange="toggleCheckItem(this)" style="width:18px;height:18px;"> <span>${p}</span></label>`;
      checklist.appendChild(div);
    });
  }
  
  const btn = document.querySelector(".btn-start-session[onclick='confirmChecklistAndStart()']");
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = "0.5";
  }
  
  const overlay = document.getElementById("session-overlay");
  if (overlay) overlay.classList.add("open");
  
  if (typeof startAmbientWorkoutHum === "function") startAmbientWorkoutHum();
}

function confirmChecklistAndStart() {
  playSound("levelup");
  document.getElementById("session-checklist-card").style.display = "none";
  document.getElementById("session-hud-container").style.display = "block";
  
  if (typeof updateMusicStyle === "function") updateMusicStyle("battle");
  
  activeWorkout.currentIdx = 0;
  loadSessionExercise();
}

function terminateSession() {
  playSound("click");
  if (confirm("Abandon today's active quest? Progress so far won't be rewarded.")) {
    stopAmbientWorkoutHum();
    closeSessionOverlay();
  }
}

function closeSessionOverlay() {
  const overlay = document.getElementById("session-overlay");
  if (overlay) overlay.classList.remove("open");
  
  if (activeWorkout && activeWorkout.timerInterval) {
    clearInterval(activeWorkout.timerInterval);
  }
  stopRestTimer();
  stopAmbientWorkoutHum();
  if (typeof updateMusicStyle === "function") updateMusicStyle("tavern");
}

function loadSessionExercise() {
  const current = activeWorkout.exercises[activeWorkout.currentIdx];
  stopRestTimer();
  restTimerCallback = null;
  
  document.getElementById("session-current-idx").innerText = activeWorkout.currentIdx + 1;
  document.getElementById("session-total-idx").innerText = activeWorkout.exercises.length;
  
  document.getElementById("session-ex-icon").innerText = getSkillEmoji(current);
  document.getElementById("session-ex-title").innerText = current.name;
  document.getElementById("session-ex-category").innerText = `${current.category.toUpperCase()} BRANCH`;
  document.getElementById("session-ex-goal").innerText = `Goal: ${current.goal}`;
  
  // Load steps instructions
  const instructions = document.getElementById("session-instructions");
  instructions.innerHTML = "";
  current.howTo.forEach(step => {
    const p = document.createElement("p");
    p.innerText = step;
    instructions.appendChild(p);
  });
  
  // Timer vs Set Tracker representation
  const timerSection = document.getElementById("timer-section");
  const repTrackerSection = document.getElementById("rep-tracker-section");
  
  if (activeWorkout.timerInterval) {
    clearInterval(activeWorkout.timerInterval);
  }
  activeWorkout.timerRunning = false;
  document.getElementById("btn-timer-toggle").innerText = "▶ Start";
  
  // Clean up and place any hold-sets display dynamically
  let holdSetsDisplay = document.getElementById("hold-sets-display");
  if (!holdSetsDisplay) {
    holdSetsDisplay = document.createElement("div");
    holdSetsDisplay.id = "hold-sets-display";
    holdSetsDisplay.style.cssText = "font-family: var(--font-alt); font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--accent3); text-align: center;";
    timerSection.parentNode.insertBefore(holdSetsDisplay, timerSection);
  }
  
  if (current.isHold) {
    timerSection.style.display = "flex";
    repTrackerSection.style.display = "none";
    holdSetsDisplay.style.display = "block";
    
    if (current.isCompleted) {
      holdSetsDisplay.innerText = "All sets complete!";
      activeWorkout.timerVal = 0;
      document.getElementById("btn-timer-toggle").disabled = true;
      document.getElementById("btn-timer-toggle").style.opacity = "0.5";
    } else {
      holdSetsDisplay.innerText = `Set ${current.currentSet} of ${current.totalSets}`;
      activeWorkout.timerVal = current.holdSec;
      document.getElementById("btn-timer-toggle").disabled = false;
      document.getElementById("btn-timer-toggle").style.opacity = "1";
    }
    updateTimerDisplay();
  } else {
    timerSection.style.display = "none";
    repTrackerSection.style.display = "block";
    holdSetsDisplay.style.display = "none";
    
    const btnRep = repTrackerSection.querySelector("button");
    if (current.isCompleted) {
      document.getElementById("current-set-num").innerText = current.totalSets;
      document.getElementById("total-sets-num").innerText = current.totalSets;
      if (btnRep) {
        btnRep.innerText = "Exercise Completed!";
        btnRep.disabled = true;
        btnRep.style.opacity = "0.5";
      }
    } else {
      document.getElementById("current-set-num").innerText = current.currentSet;
      document.getElementById("total-sets-num").innerText = current.totalSets;
      if (btnRep) {
        btnRep.innerText = "Set Completed";
        btnRep.disabled = false;
        btnRep.style.opacity = "1";
      }
    }
  }
  
  // Navigation Buttons Toggle
  const btnPrev = document.getElementById("btn-session-prev");
  const btnNext = document.getElementById("btn-session-next");
  const btnFinish = document.getElementById("btn-session-finish");
  
  btnPrev.disabled = activeWorkout.currentIdx === 0;
  
  if (activeWorkout.currentIdx === activeWorkout.exercises.length - 1) {
    btnNext.style.display = "none";
    btnFinish.style.display = "block";
  } else {
    btnNext.style.display = "block";
    btnFinish.style.display = "none";
  }
}

function prevExercise() {
  if (activeWorkout.currentIdx > 0) {
    playSound("click");
    activeWorkout.currentIdx--;
    loadSessionExercise();
  }
}

function nextExercise() {
  if (activeWorkout.currentIdx < activeWorkout.exercises.length - 1) {
    playSound("click");
    activeWorkout.currentIdx++;
    loadSessionExercise();
  }
}

// Timer Logic
function updateTimerDisplay() {
  const m = Math.floor(activeWorkout.timerVal / 60).toString().padStart(2, "0");
  const s = (activeWorkout.timerVal % 60).toString().padStart(2, "0");
  document.getElementById("timer-display").innerText = `${m}:${s}`;
}

function toggleTimer() {
  const current = activeWorkout.exercises[activeWorkout.currentIdx];
  if (current.isCompleted) return;
  if (restTimerInterval) return;
  
  if (activeWorkout.timerVal <= 0 && !activeWorkout.timerRunning) {
    activeWorkout.timerVal = current.holdSec;
    updateTimerDisplay();
  }
  
  playSound("click");
  if (activeWorkout.timerRunning) {
    clearInterval(activeWorkout.timerInterval);
    activeWorkout.timerRunning = false;
    document.getElementById("btn-timer-toggle").innerText = "▶ Start";
  } else {
    activeWorkout.timerRunning = true;
    document.getElementById("btn-timer-toggle").innerText = "⏸ Pause";
    
    activeWorkout.timerInterval = setInterval(() => {
      activeWorkout.timerVal--;
      updateTimerDisplay();
      
      if (activeWorkout.timerVal <= 0) {
        clearInterval(activeWorkout.timerInterval);
        activeWorkout.timerRunning = false;
        document.getElementById("btn-timer-toggle").innerText = "▶ Start";
        playSound("alarm");
        
        if (current.currentSet < current.totalSets) {
          current.currentSet++;
          document.getElementById("hold-sets-display").innerText = `Set ${current.currentSet} of ${current.totalSets}`;
          showToast("Hold Complete! Prepare to rest.");
          
          let restDuration = 90;
          if (state.class === "monk") {
            restDuration = Math.round(90 * 0.95);
          }
          startRestTimer(restDuration, () => {
            activeWorkout.timerVal = current.holdSec;
            updateTimerDisplay();
          });
        } else {
          current.isCompleted = true;
          document.getElementById("hold-sets-display").innerText = "All sets complete!";
          document.getElementById("btn-timer-toggle").disabled = true;
          document.getElementById("btn-timer-toggle").style.opacity = "0.5";
          showToast("All sets complete for this hold!");
          damageBossForExerciseCompletion();
        }
      }
    }, 1000);
  }
}

function resetTimer() {
  const current = activeWorkout.exercises[activeWorkout.currentIdx];
  if (current.isCompleted) return;
  if (restTimerInterval) return;
  
  playSound("click");
  if (activeWorkout.timerInterval) {
    clearInterval(activeWorkout.timerInterval);
  }
  activeWorkout.timerRunning = false;
  document.getElementById("btn-timer-toggle").innerText = "▶ Start";
  activeWorkout.timerVal = current.holdSec;
  updateTimerDisplay();
}

function nextSetRepCount() {
  const current = activeWorkout.exercises[activeWorkout.currentIdx];
  if (current.isCompleted) return;
  if (restTimerInterval) return;
  
  playSound("click");
  
  if (current.currentSet < current.totalSets) {
    current.currentSet++;
    document.getElementById("current-set-num").innerText = current.currentSet;
    showToast(`Set Completed! Prepare to rest.`);
    
    let restDuration = 90;
    if (state.class === "monk") {
      restDuration = Math.round(90 * 0.95);
    }
    startRestTimer(restDuration);
  } else {
    current.isCompleted = true;
    stopRestTimer();
    showToast("All sets complete for this exercise!");
    damageBossForExerciseCompletion();
    
    const btnRep = document.getElementById("btn-rep-completed");
    if (btnRep) {
      btnRep.innerText = "Exercise Completed!";
      btnRep.disabled = true;
      btnRep.style.opacity = "0.5";
    }
  }
}

function finishWorkoutSession() {
  playSound("levelup");
  
  // Award 300 XP bonus for completing the daily forge quest
  const bonusXp = 300;
  adjustXP(bonusXp);
  
  if (typeof updateStreak === "function") updateStreak();
  saveState();
  
  closeSessionOverlay();
  
  // Hide active quest card in forge view
  document.getElementById("forge-active-quest").style.display = "none";
  
  showCompletionOverlay(activeBoss ? activeBoss.name : "Lactate Golem", bonusXp);
}

function setActionButtonsDisabled(disabled) {
  const current = (activeWorkout && activeWorkout.exercises) ? activeWorkout.exercises[activeWorkout.currentIdx] : null;
  if (current && current.isCompleted && !disabled) {
    return;
  }
  
  const btnRep = document.getElementById("btn-rep-completed");
  if (btnRep) {
    btnRep.disabled = disabled;
    btnRep.style.opacity = disabled ? "0.5" : "1";
    btnRep.style.pointerEvents = disabled ? "none" : "auto";
  }
  const btnStart = document.getElementById("btn-timer-toggle");
  if (btnStart) {
    btnStart.disabled = disabled;
    btnStart.style.opacity = disabled ? "0.5" : "1";
    btnStart.style.pointerEvents = disabled ? "none" : "auto";
  }
  const btnReset = document.getElementById("btn-timer-reset");
  if (btnReset) {
    btnReset.disabled = disabled;
    btnReset.style.opacity = disabled ? "0.5" : "1";
    btnReset.style.pointerEvents = disabled ? "none" : "auto";
  }
}

// ===== REST TIMER FOR ACTIVE WORKOUT =====
function startRestTimer(duration, onComplete) {
  stopRestTimer();
  restTimerVal = duration;
  restTimerCallback = onComplete || null;
  
  setActionButtonsDisabled(true);
  
  const restSection = document.getElementById("rest-timer-section");
  const restDisplay = document.getElementById("rest-timer-display");
  if (restSection && restDisplay) {
    restSection.style.display = "block";
    updateRestTimerDisplay();
    
    speakText("Initiating rest period. Relax and catch your breath.");
    
    restTimerInterval = setInterval(() => {
      restTimerVal--;
      updateRestTimerDisplay();
      
      if (restTimerVal <= 0) {
        stopRestTimer();
        playSound("chime");
        speakText("Rest over! Get ready for your next set.");
        showToast("Rest Over! Next set begins now.");
        
        if (restTimerCallback) {
          restTimerCallback();
          restTimerCallback = null;
        }
      }
    }, 1000);
  }
}

function updateRestTimerDisplay() {
  const restDisplay = document.getElementById("rest-timer-display");
  if (restDisplay) {
    const m = Math.floor(restTimerVal / 60).toString().padStart(2, "0");
    const s = (restTimerVal % 60).toString().padStart(2, "0");
    restDisplay.innerText = `${m}:${s}`;
  }
}

function stopRestTimer() {
  if (restTimerInterval) {
    clearInterval(restTimerInterval);
    restTimerInterval = null;
  }
  setActionButtonsDisabled(false);
  const restSection = document.getElementById("rest-timer-section");
  if (restSection) {
    restSection.style.display = "none";
  }
}

function adjustRestTimer(seconds) {
  playSound("click");
  restTimerVal = Math.max(0, restTimerVal + seconds);
  updateRestTimerDisplay();
}

function skipRest() {
  playSound("click");
  stopRestTimer();
  speakText("Rest skipped. Let's push on.");
  showToast("Rest skipped.");
  
  if (restTimerCallback) {
    restTimerCallback();
    restTimerCallback = null;
  }
}

// ===== QUEST COMPLETION OVERLAY =====
function showCompletionOverlay(bossName, xpAwarded) {
  const overlay = document.getElementById("completion-overlay");
  if (overlay) {
    document.getElementById("completion-boss-defeated").innerText = `${bossName} Slain!`;
    document.getElementById("completion-xp-gained").innerText = `+${xpAwarded} XP`;
    document.getElementById("completion-streak-val").innerText = `🔥 ${state.streak} Days`;
    document.getElementById("completion-level-val").innerText = `Lv. ${state.level}`;
    overlay.style.display = "flex";
  }
  
  speakText(`Congratulations, Gladiator! The ${bossName} has been defeated, and you have completed today's quest. Keep up the streak!`);
}

function closeCompletionOverlay() {
  const overlay = document.getElementById("completion-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
  playSound("click");
}

function generateQuestLore(bossName, exercises) {
  const primaryCategory = exercises.length > 0 ? exercises[0].category.toLowerCase() : "calisthenics";
  
  const intros = [
    `The peaceful valley of FitQuest is under siege!`,
    `A dark shadow has fallen across the ancient training grounds.`,
    `Rumors are spreading of a terrible presence in the forgotten ruins.`,
    `The Guild Master has issued an urgent decree!`,
    `A distress signal arrives from the local borders.`
  ];
  
  const midsections = {
    push: [
      `A towering ${bossName} blocks the passage, threatening to crush any who pass. You must summon your raw pushing power, striking with fiery force to pierce its heavy armor.`,
      `The sky glows red as the ${bossName} summons a wall of flame. Attune your chest, shoulders, and triceps to withstand the thermal heat and blow back its defences!`,
      `The mighty ${bossName} has taken over the outer ramparts. Direct pushes and heavy shoulder presses are needed to breach the gates and drive the creature away.`
    ],
    pull: [
      `The elusive ${bossName} resides high up in the craggy mountains. You must scale the vertical cliffs with absolute pulling grip, positioning yourself to strike from above.`,
      `From the canopy of the Dread Lats Forest, the ${bossName} swoops down on villagers. Attune your back and bicep rows to drag the beast down to earth and defeat it!`,
      `The ${bossName} is pulling the ancient towers into the abyss. Attune your pull skills to pull the foundations back and counter its gravity spell.`
    ],
    core: [
      `The ${bossName} is casting a crushing pressure spell over the training fields. Your core compression must be rock-solid to resist the gravitational force.`,
      `A swirling vortex of wind shields the ${bossName}. Only a warrior with a core of iron can hold their ground in the center of the storm and deliver the final blow.`,
      `The ${bossName} feeds on loose posture! Lock your core and perform perfect compression exercises to disrupt its energy channel and shatter its focus.`
    ],
    legs: [
      `The earth trembles as the ${bossName} stomps. You must leap and drive power through your lower body to jump over its shockwaves and shatter its stone base.`,
      `To reach the high platform where the ${bossName} sits, you must scale the massive steps of power. Build explosive leg force to reach the top and face the beast.`,
      `The ${bossName} is guarding the deep mines. You must anchor your stance and squat deep to carry the heavy loads of the cavern and force it into retreat.`
    ],
    wall: [
      `The ${bossName} resides in an inverted dimension where up is down. Attune your balance against the temple walls and turn gravity on its head to strike.`,
      `Hovering high above, the ${bossName} laughs at ground-based warriors. Kick up against the wall, align your handstand balance, and meet it face-to-face!`,
      `An inversion spell has locked the sanctuary doors. Reverse your posture, climb the vertical walls, and break the spell to confront the guardian ${bossName}.`
    ],
    mobility: [
      `A curse of stiffening cold is freezing the villagers solid! You must perform fluid joint stretches and mobility reaches to warm your blood and melt the ${bossName}'s icy cage.`,
      `The ${bossName} traps its prey in a web of tight cords. Stretch your hamstrings and open your hips to slip through its traps and cleanse the territory.`,
      `A hidden chamber of flexibility holds the key. Perform deep mobility arches and splits prep to stretch your range and unlock the ancient relic guarding the ${bossName}.`
    ],
    default: [
      `The mighty ${bossName} is terrorizing the region. Gather your strength, steel your focus, and execute these FitQuest techniques to purge the darkness once and for all!`,
      `An epic battle is brewing. The ${bossName} has challenged the guild! Complete these training exercises to build your level and claim your ultimate victory.`,
      `A rare beast, the ${bossName}, has emerged from the wild. Steady your heart, align your form, and engage in combat to collect its bounty!`
    ]
  };
  
  const outros = [
    `Align your mind, protect your form, and let the battle begin!`,
    `Draw your weapon, prepare your breath, and clear the area for combat.`,
    `Do not yield, warrior! Form is your shield and consistency is your blade.`,
    `To victory! The tavern songs will remember your deeds this day.`
  ];
  
  const intro = intros[Math.floor(Math.random() * intros.length)];
  const catMids = midsections[primaryCategory] || midsections.default;
  const mid = catMids[Math.floor(Math.random() * catMids.length)];
  const outro = outros[Math.floor(Math.random() * outros.length)];
  
  return `${intro} ${mid} ${outro}`;
}

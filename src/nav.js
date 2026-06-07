// ===== VIEW NAVIGATION AND MODAL ROUTING =====

// Tab navigation routing
function initNav() {
  const navButtons = document.querySelectorAll(".nav-btn");
  const views = document.querySelectorAll(".view");
  
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetView = btn.getAttribute("data-view");
      if (!targetView) return; // Skip non-routing buttons like sound-toggle
      
      playSound("click");
      
      navButtons.forEach(b => b.classList.remove("active"));
      views.forEach(v => v.classList.remove("active"));
      
      btn.classList.add("active");
      const viewEl = document.getElementById(`view-${targetView}`);
      if (viewEl) viewEl.classList.add("active");

      // Auto-scroll window to the main content area so everything is instantly visible
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: "smooth" });
      }

      if (targetView === "tree") {
        setTimeout(() => {
          if (typeof drawLines === "function") drawLines();
          if (typeof applyTransform === "function") applyTransform();
        }, 100);
      } else if (targetView === "forge") {
        // Refresh forge banner counts on tab open
        if (typeof updateForgeBanner === "function") updateForgeBanner();
      } else if (targetView === "log") {
        if (typeof updateQuestLog === "function") updateQuestLog();
      } else if (targetView === "profile") {
        if (typeof updateProfile === "function") updateProfile();
      }
    });
  });
}

// Filter chips for skills tree
function initFilters() {
  const filterChips = document.querySelectorAll(".chip");
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      playSound("click");
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.getAttribute("data-filter");
      if (typeof renderTree === "function") renderTree();
    });
  });
}

// Mute sound effects toggle button
function toggleMute() {
  state.muted = !state.muted;
  const btn = document.getElementById("sound-toggle");
  if (btn) {
    btn.innerText = state.muted ? "🔇" : "🔊";
  }
  if (state.muted) {
    if (typeof stopAmbientWorkoutHum === "function") stopAmbientWorkoutHum();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } else {
    playSound("click");
  }
  saveState();
}

// ===== SKILL DETAILS MODAL =====
function openModal(skillId) {
  const skill = calisthenicsSkills.find(s => s.id === skillId);
  if (!skill) return;
  
  activeModalSkillId = skillId;
  
  document.getElementById("modal-icon").innerText = getSkillEmoji(skill);
  document.getElementById("modal-title").innerText = skill.name;
  document.getElementById("modal-category").innerText = `${skill.category.toUpperCase()} BRANCH`;
  document.getElementById("modal-tier-badge").innerText = `Tier ${"I".repeat(skill.tier)}`;
  document.getElementById("modal-desc").innerText = skill.desc;
  document.getElementById("modal-xp").innerText = `+${skill.xp} XP`;
  document.getElementById("modal-difficulty").innerText = "⭐".repeat(skill.difficulty);
  document.getElementById("modal-target").innerText = skill.target;
  
  const howList = document.getElementById("modal-how");
  howList.innerHTML = "";
  skill.howTo.forEach(step => {
    const li = document.createElement("li");
    li.innerText = step;
    howList.appendChild(li);
  });
  
  const prereqsSection = document.getElementById("modal-prereqs-section");
  const prereqsList = document.getElementById("modal-prereqs");
  prereqsList.innerHTML = "";
  
  if (skill.prereqs.length > 0) {
    prereqsSection.style.display = "block";
    skill.prereqs.forEach(prereqId => {
      const prereq = calisthenicsSkills.find(s => s.id === prereqId);
      if (prereq) {
        const tag = document.createElement("span");
        tag.className = "prereq-tag";
        tag.innerText = `${getSkillEmoji(prereq)} ${prereq.name}`;
        tag.onclick = () => openModal(prereq.id);
        prereqsList.appendChild(tag);
      }
    });
  } else {
    prereqsSection.style.display = "none";
  }
  
  const unlocksSection = document.getElementById("modal-unlocks-section");
  const unlocksList = document.getElementById("modal-unlocks");
  unlocksList.innerHTML = "";
  
  const unlocks = calisthenicsSkills.filter(s => s.prereqs.includes(skillId));
  if (unlocks.length > 0) {
    unlocksSection.style.display = "block";
    unlocks.forEach(unlock => {
      const tag = document.createElement("span");
      tag.className = "unlock-tag";
      tag.innerText = `${getSkillEmoji(unlock)} ${unlock.name}`;
      tag.onclick = () => openModal(unlock.id);
      unlocksList.appendChild(tag);
    });
  } else {
    unlocksSection.style.display = "none";
  }
  
  // Next Skill Suggestions — skills that this skill unlocks or that are now available
  const suggestSection = document.getElementById("modal-suggest-section");
  const suggestList = document.getElementById("modal-suggest-list");
  if (suggestSection && suggestList) {
    suggestList.innerHTML = "";
    const nextSkills = calisthenicsSkills.filter(s => {
      if (state.mastered.includes(s.id)) return false;
      return canUnlock(s);
    }).slice(0, 4);
    if (nextSkills.length > 0) {
      suggestSection.style.display = "block";
      nextSkills.forEach(s => {
        const tag = document.createElement("span");
        tag.className = "unlock-tag";
        tag.style.cursor = "pointer";
        tag.innerText = `${getSkillEmoji(s)} ${s.name}`;
        tag.onclick = () => openModal(s.id);
        suggestList.appendChild(tag);
      });
    } else {
      suggestSection.style.display = "none";
    }
  }
  
  const isMastered = state.mastered.includes(skillId);
  const isInProgress = state.inprogress.includes(skillId);
  const isAvailable = canUnlock(skill);
  
  const btnInprogress = document.getElementById("btn-inprogress");
  const btnMaster = document.getElementById("btn-master");
  
  btnInprogress.classList.remove("active");
  btnMaster.classList.remove("active");
  
  document.getElementById("inprogress-text").innerText = isInProgress ? "In Progress" : "Mark In Progress";
  document.getElementById("master-text").innerText = isMastered ? "Mastered!" : "Mark Mastered";
  
  if (isInProgress) btnInprogress.classList.add("active");
  if (isMastered) btnMaster.classList.add("active");
  
  if (!isAvailable && !isMastered) {
    btnInprogress.disabled = true;
    btnMaster.disabled = true;
    btnInprogress.style.opacity = "0.3";
    btnMaster.style.opacity = "0.3";
  } else {
    btnInprogress.disabled = false;
    btnMaster.disabled = false;
    btnInprogress.style.opacity = "1";
    btnMaster.style.opacity = "1";
  }
  
  // Highlight active rune card
  const activeRune = state.runes[skillId] || "none";
  activeModalRune = activeRune;
  document.querySelectorAll(".rune-slot").forEach(slot => {
    slot.classList.remove("active");
  });
  const activeSlot = document.getElementById(`rune-${activeRune}`);
  if (activeSlot) {
    activeSlot.classList.add("active");
  }
  
  // Update dynamic rune description in the modal
  const runeDescEl = document.getElementById("modal-rune-desc");
  if (runeDescEl) {
    runeDescEl.innerText = runeDescriptions[activeRune] || runeDescriptions["none"];
    const colors = {
      "none": "var(--border)",
      "tempo": "var(--accent)",
      "plyo": "var(--accent3)",
      "weight": "var(--red)"
    };
    runeDescEl.style.borderColor = colors[activeRune] || "var(--border)";
  }
  
  // Update XP value display in modal based on rune multiplier
  let mult = 1.0;
  if (activeRune === "tempo") mult = 1.5;
  else if (activeRune === "plyo") mult = 1.3;
  else if (activeRune === "weight") mult = 2.0;
  document.getElementById("modal-xp").innerText = `+${Math.round(skill.xp * mult)} XP`;
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.add("open");
}

function selectRune(runeName) {
  if (!activeModalSkillId) return;
  playSound("click");
  activeModalRune = runeName;
  state.runes[activeModalSkillId] = runeName;
  saveState();
  
  document.querySelectorAll(".rune-slot").forEach(slot => {
    slot.classList.remove("active");
  });
  const activeSlot = document.getElementById(`rune-${runeName}`);
  if (activeSlot) {
    activeSlot.classList.add("active");
  }
  
  // Update dynamic rune description in the modal
  const runeDescEl = document.getElementById("modal-rune-desc");
  if (runeDescEl) {
    runeDescEl.innerText = runeDescriptions[runeName] || runeDescriptions["none"];
    const colors = {
      "none": "var(--border)",
      "tempo": "var(--accent)",
      "plyo": "var(--accent3)",
      "weight": "var(--red)"
    };
    runeDescEl.style.borderColor = colors[runeName] || "var(--border)";
  }
  
  const skill = calisthenicsSkills.find(s => s.id === activeModalSkillId);
  if (skill) {
    let mult = 1.0;
    if (runeName === "tempo") mult = 1.5;
    else if (runeName === "plyo") mult = 1.3;
    else if (runeName === "weight") mult = 2.0;
    
    document.getElementById("modal-xp").innerText = `+${Math.round(skill.xp * mult)} XP`;
  }
}

function closeModal(e) {
  const overlay = document.getElementById("modal-overlay");
  if (!e || e.target === overlay || e.target.id === "modal-close") {
    playSound("click");
    overlay.classList.remove("open");
    activeModalSkillId = null;
  }
}

// ===== TOGGLE STATE CHECKS =====
function toggleInProgress() {
  if (!activeModalSkillId) return;
  const id = activeModalSkillId;
  
  if (state.mastered.includes(id)) {
    showToast("Skill is already mastered!");
    return;
  }
  
  const index = state.inprogress.indexOf(id);
  if (index > -1) {
    state.inprogress.splice(index, 1);
    playSound("click");
    showToast("Removed from Quest Log.");
  } else {
    state.inprogress.push(id);
    playSound("levelup");
    showToast("Added to your Active Quests!");
  }
  
  saveState();
  renderTree();
  updateDashboard();
  openModal(id);
}

function toggleMaster() {
  if (!activeModalSkillId) return;
  const id = activeModalSkillId;
  const skill = calisthenicsSkills.find(s => s.id === id);
  if (!skill) return;
  
  const index = state.mastered.indexOf(id);
  if (index > -1) {
    state.mastered.splice(index, 1);
    adjustXP(-skill.xp, skill.category);
    playSound("click");
    showToast(`Removed mastery: -${skill.xp} XP`);
  } else {
    state.mastered.push(id);
    
    const ipIndex = state.inprogress.indexOf(id);
    if (ipIndex > -1) state.inprogress.splice(ipIndex, 1);
    
    // Calculate final XP with runes multiplier
    const rune = state.runes[id] || "none";
    let mult = 1.0;
    if (rune === "tempo") mult = 1.5;
    else if (rune === "plyo") mult = 1.3;
    else if (rune === "weight") mult = 2.0;
    
    const finalXp = Math.round(skill.xp * mult);
    adjustXP(finalXp, skill.category);
    triggerXpPopup(finalXp);
    playSound("levelup");
    showToast(`Mastered: +${finalXp} XP!`);
  }
  
  saveState();
  renderTree();
  updateDashboard();
  if (typeof updateQuestLog === "function") updateQuestLog();
  openModal(id);
}

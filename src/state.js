// ===== GLOBAL STATE MANAGEMENT & SHARED STATE VARIABLES =====
let state = {
  mastered: [],    // Array of skill IDs
  inprogress: [],  // Array of skill IDs
  xp: 0,
  level: 1,
  muted: false,    // Toggle sound effects
  class: null,     // "goliath" | "acrobat" | "monk"
  statPoints: 0,
  stats: { strength: 0, agility: 0, balance: 0 },
  streak: 0,
  lastWorkoutDate: null,
  workoutHistory: [], // Array of date strings "YYYY-MM-DD"
  envFilter: { floor: true, wall: true, furniture: true, bar: true, dip_bar: true, rings: true },
  runes: {},        // Mapping of skillId -> activeRune name
  volume: 1.0,      // Volume control (0.0 to 1.0)
  voiceEnabled: true, // Toggle TTS Narrator
  musicEnabled: true // Toggle BG Music
};

// Global search query
let searchQuery = "";

// Rest Timer state
let restTimerVal = 0;
let restTimerInterval = null;

// Tree layout settings
let zoom = 1.0;
let panX = 0;
let panY = 0;
let isDragging = false;
let startDragX = 0;
let startDragY = 0;
let activeFilter = "all";

// Workout & Battle states
let activeWorkout = null;
let activeBoss = null;

// Modal Routing state
let activeModalSkillId = null;
let activeModalRune = "none";

const runeDescriptions = {
  "none": "No modifier active. Standard bodyweight workout pace.",
  "tempo": "Perform slow, controlled eccentric movements (e.g. 4 seconds lowering) to maximize time under tension. +50% XP",
  "plyo": "Execute the concentric phase as explosively as possible (e.g. jump/push up fast), and return controlled. +30% XP",
  "weight": "Add external household resistance (backpack, weighted vest, water jugs) to scale up difficulty. +100% XP"
};

// Save progress to LocalStorage
function saveState() {
  localStorage.setItem("fitquest_state", JSON.stringify(state));
  if (typeof updateDashboard === "function") updateDashboard();
  if (typeof renderTree === "function") renderTree();
  if (typeof updateQuestLog === "function") updateQuestLog();
  if (typeof updateProfile === "function") updateProfile();
}

// Load progress from LocalStorage
function loadState() {
  const saved = localStorage.getItem("fitquest_state") || localStorage.getItem("calpath_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        state = { ...state, ...parsed };
        
        // Ensure envFilter has all standard environment keys
        if (!state.envFilter) {
          state.envFilter = { floor: true, wall: true, furniture: true, bar: true, dip_bar: true, rings: true };
        } else {
          if (state.envFilter.floor === undefined) state.envFilter.floor = true;
          if (state.envFilter.wall === undefined) state.envFilter.wall = true;
          if (state.envFilter.furniture === undefined) state.envFilter.furniture = true;
          if (state.envFilter.bar === undefined) state.envFilter.bar = true;
          if (state.envFilter.dip_bar === undefined) state.envFilter.dip_bar = true;
          if (state.envFilter.rings === undefined) state.envFilter.rings = true;
        }
        
        // Ensure stats and runes are safe
        if (!state.stats) state.stats = { strength: 0, agility: 0, balance: 0 };
        if (!state.runes) state.runes = {};
        if (!state.workoutHistory) state.workoutHistory = [];
        if (state.volume === undefined) state.volume = 1.0;
        if (state.voiceEnabled === undefined) state.voiceEnabled = true;
        if (state.musicEnabled === undefined) state.musicEnabled = true;
      }
    } catch (e) {
      console.error("Failed to parse fitquest_state:", e);
    }
  }
}

// Confirm and Reset Progress
function confirmReset() {
  if (typeof playSound === "function") playSound("chime");
  if (confirm("Are you sure you want to reset all progress, level, class, stats, and XP? This action is irreversible.")) {
    state = {
      mastered: [],
      inprogress: [],
      xp: 0,
      level: 1,
      muted: state.muted,
      class: null,
      statPoints: 0,
      stats: { strength: 0, agility: 0, balance: 0 },
      streak: 0,
      lastWorkoutDate: null,
      workoutHistory: [],
      envFilter: { floor: true, wall: true, furniture: true, bar: true, dip_bar: true, rings: true },
      runes: {},
      volume: state.volume !== undefined ? state.volume : 1.0,
      voiceEnabled: state.voiceEnabled !== undefined ? state.voiceEnabled : true,
      musicEnabled: state.musicEnabled !== undefined ? state.musicEnabled : true
    };
    saveState();
    if (typeof checkClassSelected === "function") checkClassSelected();
    if (typeof showToast === "function") showToast("Progress successfully reset!");
  }
}

// Export Progress to base64 code block
function exportProgress() {
  if (typeof playSound === "function") playSound("click");
  const codeArea = document.getElementById("backup-code-area");
  if (codeArea) {
    const dataStr = btoa(encodeURIComponent(JSON.stringify(state)));
    codeArea.value = dataStr;
    codeArea.select();
    navigator.clipboard.writeText(dataStr).then(() => {
      if (typeof showToast === "function") showToast("📋 Progress code copied to clipboard!");
      if (typeof speakText === "function") speakText("Progress code copied to clipboard.");
    }).catch(() => {
      if (typeof showToast === "function") showToast("Progress code generated in the text box.");
    });
  }
}

// Restore Progress from base64 code block
function importProgress() {
  if (typeof playSound === "function") playSound("click");
  const codeArea = document.getElementById("backup-code-area");
  if (!codeArea || !codeArea.value.trim()) {
    if (typeof showToast === "function") showToast("Please paste a valid progress code first!");
    return;
  }
  
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(codeArea.value.trim())));
    if (decoded && typeof decoded === "object" && decoded.xp !== undefined && decoded.level !== undefined) {
      state = {
        mastered: Array.isArray(decoded.mastered) ? decoded.mastered : [],
        inprogress: Array.isArray(decoded.inprogress) ? decoded.inprogress : [],
        xp: typeof decoded.xp === "number" ? decoded.xp : 0,
        level: typeof decoded.level === "number" ? decoded.level : 1,
        muted: !!decoded.muted,
        class: decoded.class || null,
        statPoints: typeof decoded.statPoints === "number" ? decoded.statPoints : 0,
        stats: decoded.stats || { strength: 0, agility: 0, balance: 0 },
        streak: typeof decoded.streak === "number" ? decoded.streak : 0,
        lastWorkoutDate: decoded.lastWorkoutDate || null,
        workoutHistory: Array.isArray(decoded.workoutHistory) ? decoded.workoutHistory : [],
        envFilter: decoded.envFilter || { floor: true, wall: true, furniture: true, bar: true, dip_bar: true, rings: true },
        runes: decoded.runes || {},
        volume: decoded.volume !== undefined ? decoded.volume : 1.0,
        voiceEnabled: decoded.voiceEnabled !== undefined ? decoded.voiceEnabled : true,
        musicEnabled: decoded.musicEnabled !== undefined ? decoded.musicEnabled : true
      };
      
      saveState();
      
      if (typeof checkClassSelected === "function") checkClassSelected();
      if (typeof updateDashboard === "function") updateDashboard();
      if (typeof updateProfile === "function") updateProfile();
      if (typeof renderTree === "function") renderTree();
      if (typeof renderCalendarLogs === "function") renderCalendarLogs();
      
      // Update UI components
      const slider = document.getElementById("volume-slider");
      if (slider) slider.value = Math.round(state.volume * 100);
      const volLbl = document.getElementById("volume-lbl");
      if (volLbl) volLbl.innerText = `${Math.round(state.volume * 100)}%`;
      
      const muteBtn = document.getElementById("sound-toggle");
      if (muteBtn) muteBtn.innerText = state.muted ? "🔇" : "🔊";
      
      const voiceBtn = document.getElementById("voice-narrator-btn");
      if (voiceBtn) voiceBtn.innerText = state.voiceEnabled ? "Enabled" : "Disabled";
      
      const musicBtn = document.getElementById("music-toggle-btn");
      if (musicBtn) musicBtn.innerText = state.musicEnabled ? "Enabled" : "Disabled";
      
      codeArea.value = "";
      if (typeof showToast === "function") showToast("🎉 Progress successfully restored!");
      if (typeof speakText === "function") speakText("Your progress has been successfully restored, warrior.");
    } else {
      if (typeof showToast === "function") showToast("Invalid backup code format!");
    }
  } catch (err) {
    if (typeof showToast === "function") showToast("Failed to parse code. Please make sure you copied it correctly.");
  }
}

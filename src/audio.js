// ===== WEB AUDIO SYNTHESIZER & NARRATOR =====
let audioCtx = null;
let ambientOsc = null;
let ambientGain = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(e => console.warn(e));
  }
}

function playSound(type) {
  if (state.muted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const masterGain = audioCtx.createGain();
    
    const vol = state.volume !== undefined ? state.volume : 1.0;
    masterGain.gain.setValueAtTime(vol, audioCtx.currentTime);
    
    osc.connect(gain);
    gain.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "click") {
      // Medieval click: nice wooden block/shield tap
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } 
    else if (type === "chime") {
      // Harp/Lute double pluck
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.36);
      gain2.gain.setValueAtTime(0.1, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.36);
      
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.36);
    } 
    else if (type === "levelup") {
      // Grand medieval brass fanfare arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = "sawtooth";
        
        // Organic detune
        o.detune.setValueAtTime((Math.random() - 0.5) * 15, now);
        
        const startTime = now + (idx * 0.12);
        o.frequency.setValueAtTime(freq, startTime);
        
        g.gain.setValueAtTime(0.0, now);
        g.gain.setValueAtTime(0.08, startTime);
        g.gain.linearRampToValueAtTime(0.06, startTime + 0.15);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.85);
        
        o.connect(g);
        g.connect(masterGain);
        
        o.start(startTime);
        o.stop(startTime + 0.85);
      });
    }
    else if (type === "alarm") {
      osc.type = "square";
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
    else if (type === "slash") {
      // Metallic sword draw slash sweep
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.28);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);

      const oscBlade = audioCtx.createOscillator();
      const gainBlade = audioCtx.createGain();
      oscBlade.type = "sine";
      oscBlade.frequency.setValueAtTime(2000, now);
      oscBlade.frequency.exponentialRampToValueAtTime(400, now + 0.22);
      gainBlade.gain.setValueAtTime(0.08, now);
      gainBlade.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      
      oscBlade.connect(gainBlade);
      gainBlade.connect(masterGain);
      oscBlade.start(now);
      oscBlade.stop(now + 0.22);
    }
  } catch (e) {
    console.warn("Audio Context blocked or not supported", e);
  }
}

// Loopable Ambient Synth Hum for Workout Session Focus
function startAmbientWorkoutHum() {
  if (state.muted) return;
  try {
    initAudio();
    if (!audioCtx) return;
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    if (ambientOsc) {
      stopAmbientWorkoutHum();
    }
    
    ambientOsc = audioCtx.createOscillator();
    ambientGain = audioCtx.createGain();
    
    ambientOsc.type = "sine";
    ambientOsc.frequency.setValueAtTime(110, audioCtx.currentTime); // Low A2 hum
    
    const vol = state.volume !== undefined ? state.volume : 1.0;
    ambientGain.gain.setValueAtTime(0.02 * vol, audioCtx.currentTime); // Very quiet
    
    ambientOsc.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);
    
    ambientOsc.start();
  } catch (e) {
    console.warn("Ambient hum failed", e);
  }
}

function stopAmbientWorkoutHum() {
  if (ambientOsc) {
    try {
      ambientOsc.stop();
      ambientOsc.disconnect();
    } catch(e) {}
    ambientOsc = null;
  }
}

// ===== TEXT TO SPEECH NARRATOR =====
function speakText(text) {
  if (state.muted || state.voiceEnabled === false) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Clear any running TTS queues
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    utterance.volume = state.volume !== undefined ? state.volume : 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

// ===== AUDIO & VOICE SETTINGS DOM BINDINGS =====
function changeVolume(val) {
  state.volume = parseFloat(val) / 100;
  const volLbl = document.getElementById("volume-lbl");
  if (volLbl) volLbl.innerText = `${val}%`;
  
  playSound("click");
  saveState();
}

function toggleVoiceNarrator() {
  state.voiceEnabled = !state.voiceEnabled;
  playSound("click");
  saveState();
  if (typeof updateProfile === "function") updateProfile();
  
  if (state.voiceEnabled) {
    speakText("Voice narrator enabled.");
  }
}

// ===== SOUNDTRACK SEQUENCER =====
let musicInterval = null;
let musicStep = 0;
let musicStyle = "none"; // "tavern" | "battle" | "none"

function playPluckNode(freq, time, duration, volume) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const masterGain = audioCtx.createGain();
    
    const vol = state.volume !== undefined ? state.volume : 1.0;
    masterGain.gain.setValueAtTime(vol * volume, time);

    osc.connect(gain);
    gain.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);
    osc.detune.setValueAtTime((Math.random() - 0.5) * 8, time);
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(1.0, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
    osc.start(time);
    osc.stop(time + duration + 0.1);
  } catch (e) {}
}

function playDrumThump(time, volume) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const masterGain = audioCtx.createGain();
    
    const vol = state.volume !== undefined ? state.volume : 1.0;
    masterGain.gain.setValueAtTime(vol * volume, time);

    osc.connect(gain);
    gain.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(80, time);
    osc.frequency.exponentialRampToValueAtTime(25, time + 0.18);
    
    gain.gain.setValueAtTime(1.0, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    
    osc.start(time);
    osc.stop(time + 0.22);
  } catch (e) {}
}

function startMusicLoop() {
  if (musicInterval) clearInterval(musicInterval);
  
  musicInterval = setInterval(() => {
    if (state.muted || !state.musicEnabled || musicStyle === "none") return;
    
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      const playTime = audioCtx.currentTime + 0.05;
      
      if (musicStyle === "tavern") {
        // 4-Bar Arpeggios: A minor, D minor, G major, E minor
        const tavernArp = [
          // A Minor
          110.00, 165.00, 220.00, 261.63, 220.00, 165.00, 220.00, 165.00,
          // D Minor
          146.83, 220.00, 293.66, 349.23, 293.66, 220.00, 293.66, 220.00,
          // G Major
          98.00, 146.83, 196.00, 246.94, 196.00, 146.83, 196.00, 146.83,
          // E Minor
          82.41, 164.81, 246.94, 329.63, 246.94, 164.81, 246.94, 164.81
        ];
        
        const baseNote = tavernArp[musicStep % tavernArp.length];
        playPluckNode(baseNote, playTime, 0.55, 0.22);
        
        if (musicStep % 2 === 0) {
          const tavernMelody = [
            329.63, 0, 392.00, 0, 440.00, 0, 493.88, 0,
            587.33, 0, 523.25, 0, 440.00, 0, 392.00, 0
          ];
          const melNote = tavernMelody[(musicStep / 2) % tavernMelody.length];
          if (melNote > 0) {
            playPluckNode(melNote, playTime, 0.45, 0.14);
          }
        }
      } 
      else if (musicStyle === "battle") {
        const battleBass = [
          110.00, 110.00, 116.54, 110.00, 110.00, 116.54, 130.81, 116.54,
          110.00, 110.00, 116.54, 110.00, 110.00, 116.54, 98.00, 87.31
        ];
        const drumPattern = [1, 0, 1, 1, 1, 0, 1, 1];
        
        if (drumPattern[musicStep % drumPattern.length]) {
          playDrumThump(playTime, 0.22);
        }
        
        const bassNote = battleBass[musicStep % battleBass.length];
        playPluckNode(bassNote, playTime, 0.25, 0.26);
        
        if (musicStep % 2 === 0) {
          const battleMelody = [
            293.66, 311.13, 349.23, 415.30, 392.00, 349.23, 311.13, 293.66
          ];
          const melNote = battleMelody[(musicStep / 2) % battleMelody.length];
          playPluckNode(melNote, playTime, 0.22, 0.16);
        }
      }
      
      musicStep++;
    } catch (err) {
      console.warn("Soundtrack synthesis error", err);
    }
  }, 280);
}

function updateMusicStyle(style) {
  musicStyle = style;
  musicStep = 0;
  if (style !== "none" && state.musicEnabled && !state.muted) {
    if (!musicInterval) {
      startMusicLoop();
    }
  } else {
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }
}

function toggleMusic() {
  state.musicEnabled = !state.musicEnabled;
  playSound("click");
  saveState();
  
  const musicBtn = document.getElementById("music-toggle-btn");
  if (musicBtn) {
    musicBtn.innerText = state.musicEnabled ? "Enabled" : "Disabled";
  }
  
  if (state.musicEnabled) {
    initAudio();
    if (activeWorkout) {
      updateMusicStyle("battle");
    } else {
      updateMusicStyle("tavern");
    }
  } else {
    updateMusicStyle("none");
  }
}

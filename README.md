# ⚔️ CalPath: Calisthenics RPG Skill Tree & Quest Forge

> *"Train with hearth, wall, and iron will. Ascend from a humble Initiate to a Sovereign Calisthenics Overlord."*

**CalPath** is a gamified, client-side Calisthenics Progressive RPG web application. It turns physical training into an immersive roleplaying game by mapping real-world calisthenics skills to a progressive skill tree, featuring smart workout generation, procedural fantasy boss fights, custom achievements, and an offline synthesizer engine.

---

## 🗺️ Key Features

### 1. 🗂️ Core Class Specializations
Before beginning, choose your class to receive permanent training modifiers:
* **🔴 Goliath**: Earns double Strength XP (+100% Strength Bonus).
* **🔵 Acrobat**: Earns double Agility XP (+100% Agility Bonus).
* **🟣 Monk**: Earns double Balance XP (+100% Balance Bonus).

### 2. 🌲 Progressive Skill Tree
* Over **100+ progressive calisthenics skills** mapped across **6 specialized disciplines**:
  * **Push** (Wall Push-ups to One-Arm Push-ups)
  * **Pull** (Incline Rows to One-Arm Chin-ups / Front Lever Rows)
  * **Core** (L-Sits, Dragon Flags, and Ab Wheel rollouts)
  * **Legs** (Assisted Squats to Pistol Squats & Shrimp Squats)
  * **Wall** (Crow Stands, Wall Walks, and Handstand Push-ups)
  * **Mobility** (Active stretches, Bridge progressions, and splits preparation)
* Divided into **5 Tiers of Mastery**: Initiate (Tier I) up to Legend (Tier V).
* Filters allow you to toggle branches or restrict skills by available equipment/environment (Floor, Wall, Pull-up Bar, Dip Bars, Rings, Ledges).

### 3. ✨ Animated Skill Pathing (Glowing Tree Lines)
* A dynamically drawing SVG grid connects prerequisites.
* Active paths (where the prerequisite is mastered) feature a flowing, animated **river-sapphire blue glow** flowing down the line.
* Fully completed paths glow with a flowing **forest-emerald green**.

### 4. ⚒️ Smart Workout Forge
Instead of planning workouts, **Forge a Quest**:
* **Practice Mode**: Focuses on exercises you have already mastered.
* **Smart Mode**: Dynamically groups skills you are training and prioritizes new skills you are close to unlocking.
* **Stretch Mode**: Challenges you with skills just beyond your comfort zone.
* Generates **Procedural Quest Lore** tailored to the primary movement type of your routine.

### 5. 👹 Boss Battles, Screenshakes & Particle Hits
* Every quest summons a unique fantasy boss (e.g. *DOMS Destroyer*, *Vascular Vampire*, *Soreness Specter*).
* Completing exercises inflicts physical damage to the Boss HUD.
* Hits trigger a structural **Screen Shake** and send a burst of **15 radial spark particles** shooting across your screen.

### 6. 🎸 The Bard's Guild (Web Audio Synth Loops)
* Synthesizes live, procedural soundtracks completely offline using the browser's native **Web Audio API**:
  * **Tavern Theme**: Warm lute arpeggios in A-minor / D-minor.
  * **Battle Theme**: Tense Phrygian bass lines under an organic war-drum thump.
* Synthesizer is volume-controlled and can be toggled in the Settings menu.

---

## 🚀 Live Hosting with GitHub Pages (github.io)

Since CalPath is a pure static web application (HTML, CSS, and client-side JavaScript) with offline state saving (`localStorage`), it can be hosted for free on **GitHub Pages** in under 2 minutes.

### Step-by-Step Deployment Guide:

1. **Create a GitHub Repository**:
   * Go to [github.com](https://github.com) and click **New Repository**.
   * Name your repository (e.g. `calpath` or `calisthenics-rpg`).
   * Set it to **Public** and click **Create repository**.

2. **Upload Your Files**:
   * Initialize git locally or upload files directly through the GitHub web interface:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - CalPath RPG Release"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```
   * Ensure your files are uploaded in the root folder of the repository:
     * `index.html` (Must be in the root directory)
     * `style.css`
     * `app.js`
     * `data.js`
     * `src/` (containing `state.js`, `audio.js`, `tree.js`, `nav.js`, `profile.js`, `workout.js`)

3. **Enable GitHub Pages**:
   * In your GitHub repository page, click the **Settings** tab (the gear icon on the top right).
   * Scroll down the left sidebar and click on **Pages**.
   * Under **Build and deployment** -> **Source**, choose **Deploy from a branch**.
   * Under **Branch**, select **`main`** (or `master`) and click **Save**.

4. **Access Your Live Server**:
   * Wait 30–60 seconds for GitHub to deploy the pages action.
   * Refresh the page; you will see a banner at the top of the **Pages** settings page saying:
     > 🌐 **Your site is live at** `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   * Click the link to open your live CalPath server on any desktop, laptop, or phone!

---

## 🛠️ Local Development

To run or tweak the game locally on your computer:
1. Clone or download the directory.
2. Open `index.html` directly in any modern web browser.
3. *Alternative (Recommended)*: Run a quick local development server to test with a clean cache (e.g. using VS Code Live Server extension or running `npx serve .` / `python -m http.server`).

---

## 📜 Licenses & Attribution
* **Fonts**: Outfit, MedievalSharp, and Grenze Gotisch via Google Fonts.
* **Vector Decorations**: Custom inline SVGs representing RPG leaves, shields, swords, potions, scrolls, and arches.

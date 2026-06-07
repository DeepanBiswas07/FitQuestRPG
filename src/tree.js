// ===== SKILL TREE RENDERING AND ZOOM/PAN CONTROLS =====

// Setup zoom/pan and mouse drag behaviors
function setupZoomAndPan() {
  // Panning and zooming disabled to guarantee pixel-perfect SVG lines alignment
}

function zoomIn() {}
function zoomOut() {}
function resetZoom() {}

function applyTransform() {
  const treeGrid = document.getElementById("tree-grid");
  if (treeGrid) {
    treeGrid.style.transform = "";
  }
  drawLines();
}

function addZoomControlsHTML() {}

// Check if prereqs are mastered (bypassing equipment that is disabled)
function canUnlock(skill) {
  if (skill.prereqs.length === 0) return true;
  // Get all prerequisite skill objects that are enabled by the user's environment checkboxes
  const enabledPrereqs = skill.prereqs
    .map(pid => calisthenicsSkills.find(s => s.id === pid))
    .filter(prereq => prereq && state.envFilter[prereq.env] !== false);
    
  if (enabledPrereqs.length === 0) return true; // Bypass lock if all prereqs require disabled gear
  return enabledPrereqs.every(prereq => state.mastered.includes(prereq.id));
}

// Emoji helper
function getSkillEmoji(skill) {
  if (skill.boss) return "👑";
  switch (skill.category) {
    case "push": return "🔥";
    case "pull": return "🏹";
    case "core": return "⚡";
    case "legs": return "🦵";
    case "wall": return "🧱";
    case "mobility": return "🌀";
    default: return "💪";
  }
}

// Render the 2D path visualizer grid
function renderTree() {
  const treeGrid = document.getElementById("tree-grid");
  if (!treeGrid) return;
  treeGrid.innerHTML = "";
  
  const isFiltering = !!searchQuery;
  
  // Switch grid layout: tier-based (5 fixed columns) vs free-flow (auto-fill) for search
  if (isFiltering) {
    treeGrid.style.display = "flex";
    treeGrid.style.flexWrap = "wrap";
    treeGrid.style.gap = "1.5rem";
    treeGrid.style.gridTemplateColumns = "";
    treeGrid.style.gridTemplateRows = "";
  } else {
    treeGrid.style.display = "grid";
    treeGrid.style.gridTemplateColumns = "repeat(5, 1fr)";
    treeGrid.style.flexWrap = "";
    treeGrid.style.gap = "2rem 1.5rem";

    // Inject 5 column background banners aligned with grid tracks
    for (let tier = 1; tier <= 5; tier++) {
      const bg = document.createElement("div");
      bg.className = `grid-column-bg tier-bg-${tier}`;
      bg.style.gridColumn = tier;
      treeGrid.appendChild(bg);
    }
  }

  const countsPerTier = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  calisthenicsSkills.forEach(skill => {
    // Determine visibility
    const envChecked = state.envFilter[skill.env] !== false;
    const matchesSearch = !searchQuery || 
      skill.name.toLowerCase().includes(searchQuery) || 
      skill.target.toLowerCase().includes(searchQuery) ||
      skill.desc.toLowerCase().includes(searchQuery) ||
      skill.category.toLowerCase().includes(searchQuery);
    const matchesFilter = activeFilter === "all" || skill.category === activeFilter;
    const isVisible = envChecked && matchesSearch && matchesFilter;
    
    const isMastered = state.mastered.includes(skill.id);
    const isInProgress = state.inprogress.includes(skill.id);
    const isAvailable = canUnlock(skill);
    const isLocked = !isAvailable && !isMastered;
    
    const node = document.createElement("div");
    node.className = `skill-node tier-${skill.tier}`;
    if (isMastered) node.classList.add("mastered");
    else if (isInProgress) node.classList.add("inprogress");
    else if (isAvailable) node.classList.add("available");
    else node.classList.add("locked");
    
    // Check for runes
    const socketedRune = state.runes[skill.id];
    if (socketedRune && socketedRune !== "none") {
      node.classList.add(`rune-${socketedRune}`);
    }
    
    if (skill.boss) node.classList.add("boss");
    
    // Hide entirely when filtered — no placeholder, no dimming
    if (!isVisible) {
      node.style.display = "none";
    }
    
    node.id = `node-${skill.id}`;
    
    const dot = document.createElement("div");
    dot.className = `node-category-dot cat-${skill.category}`;
    node.appendChild(dot);
    
    const statusIcon = document.createElement("span");
    statusIcon.className = "node-status";
    if (isMastered) statusIcon.innerText = "🏆";
    else if (isInProgress) statusIcon.innerText = "⚡";
    else if (isLocked) statusIcon.innerText = "🔒";
    node.appendChild(statusIcon);
    
    const emojiSpan = document.createElement("span");
    emojiSpan.className = "node-icon";
    emojiSpan.innerText = getSkillEmoji(skill);
    node.appendChild(emojiSpan);
    
    const nameSpan = document.createElement("span");
    nameSpan.className = "node-name";
    nameSpan.innerText = skill.name;
    node.appendChild(nameSpan);
    
    const xpSpan = document.createElement("span");
    xpSpan.className = "node-xp";
    xpSpan.innerHTML = `<span>+${skill.xp}</span> XP`;
    node.appendChild(xpSpan);
    
    // Grid position only matters in the non-filtering (tier) layout
    if (!isFiltering) {
      if (isVisible) {
        countsPerTier[skill.tier]++;
        const row = countsPerTier[skill.tier];
        node.style.gridColumn = skill.tier;
        node.style.gridRow = row;
      } else {
        node.style.gridColumn = "";
        node.style.gridRow = "";
      }
    } else {
      node.style.gridColumn = "";
      node.style.gridRow = "";
      // Fix width so flex items look consistent
      node.style.width = "180px";
      node.style.minHeight = "120px";
    }
    
    node.style.cursor = "pointer";
    node.addEventListener("click", () => {
      playSound("chime");
      if (typeof openModal === "function") openModal(skill.id);
    });
    
    treeGrid.appendChild(node);
  });
  
  // Hide the connection SVG during search/filter — lines would be meaningless
  const svg = document.getElementById("connection-svg");
  if (svg) svg.style.display = isFiltering ? "none" : "block";

  // Update hero total count
  const totalEl = document.getElementById("skills-total");
  if (totalEl) totalEl.innerText = calisthenicsSkills.length;
  
  setTimeout(() => {
    if (!isFiltering) drawLines();
    updateMinimap();
  }, 50);
}

// Setup SVG lines connecting prerequisites
function drawLines() {
  const connectionSvg = document.getElementById("connection-svg");
  const treeGrid = document.getElementById("tree-grid");
  const treeContainer = document.getElementById("tree-container");
  if (!connectionSvg || !treeGrid || !treeContainer) return;
  
  connectionSvg.innerHTML = "";
  connectionSvg.style.display = "block";
  
  // Size SVG to fit scrollable container contents
  connectionSvg.setAttribute("width", treeContainer.scrollWidth);
  connectionSvg.setAttribute("height", treeContainer.scrollHeight);
  
  // tree-grid is positioned relative to tree-container (the SVG's parent)
  const gridOffsetX = treeGrid.offsetLeft;
  const gridOffsetY = treeGrid.offsetTop;
  
  calisthenicsSkills.forEach(skill => {
    skill.prereqs.forEach(prereqId => {
      const parentNode = document.getElementById(`node-${prereqId}`);
      const childNode = document.getElementById(`node-${skill.id}`);
      
      if (parentNode && childNode) {
        // Skip if either node is hidden (filtered out)
        if (parentNode.style.display === "none" || childNode.style.display === "none") return;
        
        const x1 = gridOffsetX + parentNode.offsetLeft + parentNode.offsetWidth / 2;
        const y1 = gridOffsetY + parentNode.offsetTop + parentNode.offsetHeight / 2;
        
        const x2 = gridOffsetX + childNode.offsetLeft + childNode.offsetWidth / 2;
        const y2 = gridOffsetY + childNode.offsetTop + childNode.offsetHeight / 2;
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        
        const parentMastered = state.mastered.includes(prereqId);
        const childMastered = state.mastered.includes(skill.id);
        
        if (parentMastered && childMastered) {
          line.setAttribute("class", "mastered-line");
          connectionSvg.appendChild(line);
          
          // Overlay animated glow flow line
          const flow = document.createElementNS("http://www.w3.org/2000/svg", "line");
          flow.setAttribute("x1", x1);
          flow.setAttribute("y1", y1);
          flow.setAttribute("x2", x2);
          flow.setAttribute("y2", y2);
          flow.setAttribute("class", "glow-flow-line mastered-flow");
          connectionSvg.appendChild(flow);
        } else if (parentMastered) {
          line.setAttribute("class", "active-line");
          connectionSvg.appendChild(line);
          
          // Overlay animated glow flow line
          const flow = document.createElementNS("http://www.w3.org/2000/svg", "line");
          flow.setAttribute("x1", x1);
          flow.setAttribute("y1", y1);
          flow.setAttribute("x2", x2);
          flow.setAttribute("y2", y2);
          flow.setAttribute("class", "glow-flow-line unlocked-flow");
          connectionSvg.appendChild(flow);
        } else {
          line.setAttribute("stroke-dasharray", "6 4");
          line.setAttribute("stroke", "var(--border)");
          line.setAttribute("stroke-width", "2");
          connectionSvg.appendChild(line);
        }
      }
    });
  });
}

function setupResizeHandler() {
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      drawLines();
    }, 150);
  });
}

// Minimap removed — stubs kept to avoid reference errors
function updateMinimap() {}
function updateMinimapViewfinder() {}
function setupMinimapClicks() {}

// Click to focus tier columns
function initTierLabelScroll() {
  const labels = document.querySelectorAll(".tier-label");
  const treeContainer = document.getElementById("tree-container");
  if (!labels || !treeContainer) return;
  
  labels.forEach(lbl => {
    lbl.style.cursor = "pointer";
    lbl.addEventListener("click", () => {
      const tier = parseInt(lbl.getAttribute("data-tier"));
      if (!tier) return;
      playSound("click");
      
      const tierNodes = Array.from(document.querySelectorAll(`.skill-node.tier-${tier}`)).filter(n => n.style.display !== "none");
      if (tierNodes.length > 0) {
        let sumX = 0;
        tierNodes.forEach(n => {
          sumX += n.offsetLeft;
        });
        const avgX = sumX / tierNodes.length;
        
        // Scroll container horizontally to center the tier
        const scrollTarget = avgX - (treeContainer.clientWidth / 2) + (tierNodes[0].offsetWidth / 2);
        treeContainer.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: "smooth"
        });
        showToast(`Focusing Tier ${tier} Skills`);
      }
    });
  });
}

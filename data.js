const calisthenicsSkills = [
  // ==================== PUSH BRANCH (20 skills) ====================
  {
    id: "push_1", name: "Wall Push-up", category: "push", tier: 1, xp: 100, difficulty: 1,
    target: "Chest, Shoulders, Triceps", desc: "Absolute beginner entry point. Establishes alignment & joint conditioning.",
    howTo: ["Stand 2-3 feet from wall, facing it.", "Place hands flat on wall at shoulder height.", "Lower chest to wall, keeping body straight.", "Push back to starting position."],
    prereqs: [], boss: false, env: "wall"
  },
  {
    id: "push_2", name: "High Incline Push-up", category: "push", tier: 1, xp: 120, difficulty: 1,
    target: "Lower Chest, Triceps", desc: "Hands elevated on a counter-height surface to scale down bodyweight.",
    howTo: ["Place hands on a high ledge or counter.", "Keep body in a straight line.", "Lower chest to counter under control.", "Push back up to full lockout."],
    prereqs: ["push_1"], boss: false, env: "furniture"
  },
  {
    id: "push_3", name: "Low Incline Push-up", category: "push", tier: 1, xp: 140, difficulty: 1,
    target: "Lower Chest, Triceps, Core", desc: "Hands on a knee-height surface (couch/chair) for increased resistance.",
    howTo: ["Place hands on a sturdy chair or couch.", "Align shoulders over hands.", "Lower chest to touch the platform edge.", "Press up to arm extension."],
    prereqs: ["push_2"], boss: false, env: "furniture"
  },
  {
    id: "push_4", name: "Knee Push-up", category: "push", tier: 1, xp: 160, difficulty: 1,
    target: "Chest, Triceps, Delts", desc: "Pivoting from the knees to learn full floor push-up mechanics.",
    howTo: ["Start on hands and knees.", "Hips forward so body is straight from head to knees.", "Lower chest to floor, elbows at 45 degrees.", "Push back up to lockout."],
    prereqs: ["push_3"], boss: false, env: "floor"
  },
  {
    id: "push_5", name: "Regular Push-up", category: "push", tier: 2, xp: 200, difficulty: 2,
    target: "Chest, Shoulders, Triceps, Core", desc: "The timeless gold standard of upper body push power.",
    howTo: ["High plank, hands slightly wider than shoulders.", "Squeeze glutes & core.", "Lower chest to an inch off the floor.", "Push floor away back to top."],
    prereqs: ["push_4"], boss: false, env: "floor"
  },
  {
    id: "push_6", name: "Hand-Release Push-up", category: "push", tier: 2, xp: 220, difficulty: 2,
    target: "Chest, Triceps, Upper Back", desc: "Releasing hands at the bottom to eliminate elastic bounce.",
    howTo: ["Lower to floor in regular push-up stance.", "Lift hands off floor briefly at the bottom.", "Re-plant hands and press up powerfully.", "Maintain tight plank shape."],
    prereqs: ["push_5"], boss: false, env: "floor"
  },
  {
    id: "push_7", name: "Decline Push-up", category: "push", tier: 2, xp: 240, difficulty: 2,
    target: "Upper Chest, Anterior Deltoids", desc: "Feet elevated on a chair or bed, shifting load to upper chest.",
    howTo: ["Place feet on a sturdy elevated surface.", "Hands flat on floor, body aligned.", "Lower head & chest to floor.", "Push back to full lockout."],
    prereqs: ["push_5"], boss: false, env: "furniture"
  },
  {
    id: "push_8", name: "Diamond Push-up", category: "push", tier: 2, xp: 260, difficulty: 2,
    target: "Triceps, Inner Chest", desc: "Hands close together forming a diamond to load the arms.",
    howTo: ["Set hands together under chest, thumbs touching.", "Lower chest to index finger center.", "Keep elbows tucked to sides.", "Push up, squeezing triceps."],
    prereqs: ["push_5"], boss: false, env: "floor"
  },
  {
    id: "push_9", name: "Archer Push-up", category: "push", tier: 3, xp: 400, difficulty: 3,
    target: "Chest, Delts, Unilateral Strength", desc: "Sliding weight to one side, straight stabilizer arm.",
    howTo: ["Wide hands stance on floor.", "Lower to left side, keeping right arm locked.", "Push up using left side strength.", "Repeat or alternate sides."],
    prereqs: ["push_8"], boss: false, env: "floor"
  },
  {
    id: "push_10", name: "Parallel Bar Dip", category: "push", tier: 3, xp: 420, difficulty: 3,
    target: "Chest, Shoulders, Triceps", desc: "Lowering and raising bodyweight between parallel bars.",
    howTo: ["Grip parallel bars, lock elbows.", "Lower shoulders below elbows, leaning slightly forward.", "Drive back up, squeezing triceps at lockout.", "Keep core tight throughout."],
    prereqs: ["push_5"], boss: false, env: "dip_bar"
  },
  {
    id: "push_11", name: "Parallel Bar L-Sit Dip", category: "push", tier: 3, xp: 450, difficulty: 3,
    target: "Shoulders, Triceps, Abs", desc: "Performing dip reps while holding legs parallel to floor.",
    howTo: ["From parallel bar lockout, lift legs to 90 degrees.", "Maintain L-sit position.", "Lower hips between bars and press back up.", "Lock arms at top of rep."],
    prereqs: ["push_10"], boss: false, env: "dip_bar"
  },
  {
    id: "push_12", name: "Gymnastic Ring Dip", category: "push", tier: 4, xp: 600, difficulty: 4,
    target: "Chest, Shoulders, Triceps, Stabilizers", desc: "Dips on unstable rings, requiring extreme stabilization control.",
    howTo: ["Support yourself on rings, turn rings out.", "Lower under control, keeping rings close to body.", "Press back up to lock out rings.", "Maintain hollow body posture."],
    prereqs: ["push_10"], boss: false, env: "rings"
  },
  {
    id: "push_13", name: "One-Arm Push-up", category: "push", tier: 4, xp: 650, difficulty: 4,
    target: "Unilateral Chest, Core Stability", desc: "Pushing full bodyweight with one arm. High core twist resistance.",
    howTo: ["Place one hand on floor center, feet wide.", "Keep free arm behind back.", "Lower chest, keeping body straight.", "Press back up, resisting hip rotation."],
    prereqs: ["push_9"], boss: false, env: "floor"
  },
  {
    id: "push_14", name: "Straddle Planche Hold", category: "push", tier: 4, xp: 700, difficulty: 4,
    target: "Shoulders, Lower Back, Glutes", desc: "Floating parallel to the floor with legs spread wide.",
    howTo: ["Enter tuck planche, lean further forward.", "Extend legs out wide to the sides.", "Keep hips level with shoulders.", "Hold for 3-5 seconds."],
    prereqs: ["push_10"], boss: false, env: "floor"
  },
  {
    id: "push_15", name: "Full Planche Hold", category: "push", tier: 5, xp: 900, difficulty: 5,
    target: "Shoulders, Core, Lower Back, Legs", desc: "Floating horizontal to floor with legs fully together.",
    howTo: ["From straddle, pull legs together.", "Lean further forward to balance weight.", "Maintain locked arms, rounded upper back.", "Hold horizontal line static."],
    prereqs: ["push_14"], boss: false, env: "floor"
  },
  {
    id: "push_16", name: "Full Planche Push-up", category: "push", tier: 5, xp: 1200, difficulty: 5,
    target: "Shoulders, Chest, Core, Full Body", desc: "BOSS SKILL. Pressing up/down while floating in full planche.",
    howTo: ["Establish full planche hold.", "Bend elbows, lower chest to floor.", "Push back up to full planche lockout.", "Maintain straight leg alignment."],
    prereqs: ["push_15", "push_13"], boss: true, env: "floor"
  },
  {
    id: "push_17", name: "Clapping Push-up", category: "push", tier: 3, xp: 480, difficulty: 3,
    target: "Chest, Shoulders, Explosive Power", desc: "Exploding off the floor and clapping hands in mid-air.",
    howTo: ["Lower to floor in push-up stance.", "Push up explosively, launching torso into air.", "Clap hands quickly under chest.", "Land with bent elbows to absorb impact."],
    prereqs: ["push_5"], boss: false, env: "floor"
  },
  {
    id: "push_18", name: "Ring Archer Push-up", category: "push", tier: 4, xp: 750, difficulty: 4,
    target: "Shoulders, Chest, Unilateral Stabilization", desc: "Sliding rings to one side in a push-up.",
    howTo: ["Start in push-up support on rings.", "Extend one arm straight to side while lowering chest.", "Press back up, pulling straight arm back to center.", "Keep core fully engaged."],
    prereqs: ["push_9", "push_12"], boss: false, env: "rings"
  },
  {
    id: "push_19", name: "Ring Planche Hold", category: "push", tier: 5, xp: 1300, difficulty: 5,
    target: "Shoulders, Stabilizers, Full Body Control", desc: "Planche hold on unstable gymnastics rings.",
    howTo: ["Support yourself on rings, lean forward.", "Lift legs back and lock body horizontal.", "Balance rings static, keeping them from shaking.", "Keep elbows locked and straight."],
    prereqs: ["push_15", "push_12"], boss: false, env: "rings"
  },
  {
    id: "push_20", name: "One-Arm Planche Hold", category: "push", tier: 5, xp: 1500, difficulty: 5,
    target: "Unilateral Shoulders, Core, Obliques", desc: "ULTIMATE CHAMPION SKILL. Floating horizontal on one hand.",
    howTo: ["Establish solid straddle planche.", "Shift weight completely onto one arm.", "Extend free arm along body.", "Balance static, keeping hips level."],
    prereqs: ["push_15"], boss: true, env: "floor"
  },

  // ==================== CORE BRANCH (20 skills) ====================
  {
    id: "core_1", name: "Dead Hang", category: "core", tier: 1, xp: 100, difficulty: 1,
    target: "Forearms, Grip, Scapula", desc: "Passive hang from pull-up bar to build grip and joint strength.",
    howTo: ["Grip bar with overhand, shoulder-width grip.", "Let body hang completely limp.", "Keep core slightly active to avoid excessive arching.", "Hold static for 30s."],
    prereqs: [], boss: false, env: "bar"
  },
  {
    id: "core_2", name: "Active Scapular Hang", category: "core", tier: 1, xp: 120, difficulty: 1,
    target: "Scapula Depressors, Upper Back", desc: "Hanging from bar while pulling shoulders away from ears.",
    howTo: ["Hang from bar with grip locked.", "Pull scapula down and back (depress shoulders).", "Keep elbows fully straight.", "Hold or repeat for reps."],
    prereqs: ["core_1"], boss: false, env: "bar"
  },
  {
    id: "core_3", name: "Plank Hold", category: "core", tier: 1, xp: 140, difficulty: 1,
    target: "Transverse Abdominis, Glutes, Shoulders", desc: "Isometric forearm support maintaining straight posterior chain.",
    howTo: ["Forearms on floor, shoulders stacked above elbows.", "Extend legs back, toes tucked.", "Squeeze glutes and round upper back slightly (protraction).", "Hold flat line, do not let hips sag."],
    prereqs: [], boss: false, env: "floor"
  },
  {
    id: "core_4", name: "Hollow Body Hold", category: "core", tier: 1, xp: 160, difficulty: 1,
    target: "Rectus Abdominis, Obliques, Quads", desc: "Lying floor posture flattening lumbar spine under load.",
    howTo: ["Lie flat on back, legs straight.", "Flatten lower back into floor completely.", "Lift shoulders and feet 2-3 inches off floor.", "Extend arms overhead, squeeze thighs."],
    prereqs: ["core_3"], boss: false, env: "floor"
  },
  {
    id: "core_5", name: "Hanging Knee Raise", category: "core", tier: 2, xp: 200, difficulty: 2,
    target: "Abs, Hip Flexors", desc: "Lifting knees to chest while hanging from a bar.",
    howTo: ["Hang from bar with active shoulders.", "Squeeze knees together, pull them to chest.", "Control descent, avoiding swinging.", "Keep shoulders locked."],
    prereqs: ["core_2"], boss: false, env: "bar"
  },
  {
    id: "core_6", name: "Hanging Leg Raise", category: "core", tier: 2, xp: 220, difficulty: 2,
    target: "Abs, Obliques, Hip Flexors", desc: "Lifting straight legs to touch the bar while hanging.",
    howTo: ["Hang from bar, active shoulders.", "Keep legs locked straight, toes pointed.", "Raise legs to touch bar.", "Lower slowly, avoiding momentum/swing."],
    prereqs: ["core_5"], boss: false, env: "bar"
  },
  {
    id: "core_7", name: "L-Sit Prep (Tuck L-Sit)", category: "core", tier: 2, xp: 240, difficulty: 2,
    target: "Lower Abs, Triceps, Scapula Depressors", desc: "Floating on a chair/parallettes with knees tucked close.",
    howTo: ["Place hands on chair edges or ledge.", "Push down to depress shoulders, raising hips.", "Tuck knees close to chest, feet off floor.", "Keep chest tall, look forward."],
    prereqs: ["core_4"], boss: false, env: "furniture"
  },
  {
    id: "core_8", name: "Floor L-Sit Hold", category: "core", tier: 2, xp: 260, difficulty: 2,
    target: "Triceps, Abs, Hip Flexors, Lats", desc: "Static L-position support directly on flat floor.",
    howTo: ["Sit on floor, legs straight in front.", "Place hands flat next to thighs.", "Depress shoulders, lifting hips.", "Lift straight legs parallel to floor."],
    prereqs: ["core_7"], boss: false, env: "floor"
  },
  {
    id: "core_9", name: "Hanging L-Sit Hold", category: "core", tier: 3, xp: 400, difficulty: 3,
    target: "Abs, Hip Flexors, Back, Grip", desc: "Holding legs horizontal in 90 degrees while hanging from bar.",
    howTo: ["Hang from bar with active shoulders.", "Lift straight legs to 90 degrees.", "Hold legs parallel to floor.", "Squeeze thighs and point toes."],
    prereqs: ["core_6", "core_8"], boss: false, env: "bar"
  },
  {
    id: "core_10", name: "Tuck Front Lever Hold", category: "core", tier: 3, xp: 420, difficulty: 3,
    target: "Lats, Upper Back, Core, Shoulders", desc: "Hanging face-up under bar, body horizontal, knees tucked.",
    howTo: ["Hang from bar, pull shoulders down.", "Lean back, pulling bar to hips with locked arms.", "Tuck knees to chest, keep back flat.", "Hold body horizontal to floor."],
    prereqs: ["core_9"], boss: false, env: "bar"
  },
  {
    id: "core_11", name: "Advanced Tuck Front Lever", category: "core", tier: 3, xp: 450, difficulty: 3,
    target: "Lats, Rear Delts, Lower Back, Core", desc: "Tuck front lever, but pulling knees out to 90 degrees.",
    howTo: ["Enter tuck front lever.", "Move knees away from chest until thighs are vertical.", "Flatten entire back, keep arms straight.", "Hold horizontal alignment."],
    prereqs: ["core_10"], boss: false, env: "bar"
  },
  {
    id: "core_12", name: "Straddle Front Lever", category: "core", tier: 4, xp: 600, difficulty: 4,
    target: "Lats, Glutes, Lower Back, Delts", desc: "Floating horizontal face-up under bar with legs spread wide.",
    howTo: ["Enter advanced tuck front lever.", "Extend legs straight out to sides.", "Keep hips fully locked and back straight.", "Pull bar down with locked arms."],
    prereqs: ["core_11"], boss: false, env: "bar"
  },
  {
    id: "core_13", name: "Full Front Lever", category: "core", tier: 5, xp: 1200, difficulty: 5,
    target: "Lats, Rear Delts, Core, Glutes, Legs", desc: "BOSS SKILL. Floating straight line face-up under bar.",
    howTo: ["From straddle, squeeze legs together.", "Keep body fully straight parallel to floor.", "Push bar down, arms locked.", "Hold static horizontal line."],
    prereqs: ["core_12"], boss: true, env: "bar"
  },
  {
    id: "core_14", name: "Full Dragon Flag Hold", category: "core", tier: 4, xp: 650, difficulty: 4,
    target: "Abs, Glutes, Hamstrings, Lats", desc: "Holding a straight body line horizontal, anchored by shoulders.",
    howTo: ["Grip anchor (bench or sofa lip), lift entire body vertically.", "Lower body as a straight rod to horizontal.", "Do not bend at the hips.", "Hold just above floor for 5s."],
    prereqs: ["core_11"], boss: false, env: "furniture"
  },
  {
    id: "core_15", name: "Gymnastic Ring L-Sit", category: "core", tier: 4, xp: 700, difficulty: 4,
    target: "Abs, Triceps, Chest, Shoulder Stabilizers", desc: "L-sit held on unstable gymnastics rings.",
    howTo: ["Establish active support on rings, turn rings out.", "Lift straight legs to 90 degrees.", "Keep rings close to hips and avoid shaking.", "Point toes, keep chest tall."],
    prereqs: ["core_9"], boss: false, env: "rings"
  },
  {
    id: "core_16", name: "Gymnastic Ring Muscle Up", category: "core", tier: 5, xp: 1200, difficulty: 5,
    target: "Lats, Chest, Shoulders, Triceps, Grip", desc: "BOSS SKILL. Pulling and pressing from hang to support on rings.",
    howTo: ["Hang from rings with false grip.", "Pull chest to rings, transition shoulders forward.", "Press up into full ring support.", "Lock out rings at the top."],
    prereqs: ["core_15", "core_13"], boss: true, env: "rings"
  },
  {
    id: "core_17", name: "Hollow Body Rock", category: "core", tier: 1, xp: 170, difficulty: 1,
    target: "Abs, Lower Back alignment", desc: "Rocking back and forth while maintaining hollow body tension.",
    howTo: ["Establish tight hollow body position.", "Initiate rocking motion from hips.", "Do not let lower back arch or leave contact.", "Keep breathing shallow and controlled."],
    prereqs: ["core_4"], boss: false, env: "floor"
  },
  {
    id: "core_18", name: "Windshield Wipers", category: "core", tier: 2, xp: 280, difficulty: 2,
    target: "Obliques, Lower Abs, Lower Back", desc: "Lying floor rotation of straight legs for oblique power.",
    howTo: ["Lie flat on back, arms out wide for support.", "Lift legs straight to 90 degrees.", "Rotate legs side to side, hovering off floor.", "Keep upper back flat on ground."],
    prereqs: ["core_5"], boss: false, env: "floor"
  },
  {
    id: "core_19", name: "Dragon Flag Flutter Kicks", category: "core", tier: 4, xp: 750, difficulty: 4,
    target: "Abs, Glutes, Hamstrings, Obliques", desc: "Performing flutter kicks while holding a dragon flag hover.",
    howTo: ["Enter full dragon flag hold parallel to floor.", "Alternate kicking legs up and down.", "Keep core and glutes fully engaged.", "Avoid sagging hips."],
    prereqs: ["core_14"], boss: false, env: "furniture"
  },
  {
    id: "core_20", name: "Bar Muscle Up", category: "core", tier: 5, xp: 1400, difficulty: 5,
    target: "Lats, Triceps, Chest, Shoulders", desc: "BOSS SKILL. Explosive pull-up transitioning into bar dip support.",
    howTo: ["Hang from bar, pull up explosively.", "Lean chest over bar at peak of pull.", "Transition grip, push up to lockout.", "Lock out arms at top of bar."],
    prereqs: ["core_13"], boss: true, env: "bar"
  },

  // ==================== LEGS BRANCH (20 skills) ====================
  {
    id: "legs_1", name: "Assisted Squat", category: "legs", tier: 1, xp: 100, difficulty: 1,
    target: "Quads, Glutes", desc: "Squatting while holding doorframe or wall for support.",
    howTo: ["Stand facing doorframe or wall.", "Hold it lightly, stand feet shoulder width.", "Squat back, lowering hips.", "Push back up using legs & light arm pull."],
    prereqs: [], boss: false, env: "wall"
  },
  {
    id: "legs_2", name: "Bodyweight Squat", category: "legs", tier: 1, xp: 120, difficulty: 1,
    target: "Quads, Glutes, Hamstrings", desc: "Standard deep air squat, hips dipping below parallel.",
    howTo: ["Stand feet shoulder width, toes out.", "Squat, sending hips back and down.", "Keep chest up and knees over toes.", "Drive back up, locking out hips."],
    prereqs: ["legs_1"], boss: false, env: "floor"
  },
  {
    id: "legs_3", name: "Prisoner Squat", category: "legs", tier: 1, xp: 140, difficulty: 1,
    target: "Quads, Glutes, Thoracic Extensors", desc: "Squatting with hands behind head to challenge posture.",
    howTo: ["Interlace fingers behind head, elbows wide.", "Squat down, maintaining upright spine.", "Keep elbows pulled back.", "Stand up, squeezing glutes."],
    prereqs: ["legs_2"], boss: false, env: "floor"
  },
  {
    id: "legs_4", name: "Bulgarian Split Squat", category: "legs", tier: 1, xp: 160, difficulty: 1,
    target: "Quads, Glutes, Balance", desc: "Single-leg squat with rear foot elevated on sofa/chair.",
    howTo: ["Stand 2 feet in front of sofa.", "Place rear foot laces-down on sofa seat.", "Squat on front leg until rear knee hovers.", "Drive up through front heel."],
    prereqs: ["legs_3"], boss: false, env: "furniture"
  },
  {
    id: "legs_5", name: "Archer Squat", category: "legs", tier: 2, xp: 200, difficulty: 2,
    target: "Quads, Adductors, Hips", desc: "Squatting to one side while extending opposite leg straight.",
    howTo: ["Wide stance, feet twice shoulder width.", "Squat to left, extending right leg fully.", "Keep left heel flat on floor.", "Push back to center wide stance."],
    prereqs: ["legs_2"], boss: false, env: "floor"
  },
  {
    id: "legs_6", name: "Airborne Lunge", category: "legs", tier: 2, xp: 220, difficulty: 2,
    target: "Quads, Glutes, Knee Stability", desc: "Single leg lunge where rear foot does not touch floor.",
    howTo: ["Stand on one foot.", "Bend knee, reach opposite leg back.", "Touch rear knee lightly to floor, foot in air.", "Drive back up to standing."],
    prereqs: ["legs_4"], boss: false, env: "floor"
  },
  {
    id: "legs_7", name: "Assisted Pistol Squat", category: "legs", tier: 2, xp: 240, difficulty: 2,
    target: "Quads, Hips, Knee Joints", desc: "Single-leg squat using wall/doorframe for light support.",
    howTo: ["Stand near wall, lift one leg forward.", "Hold wall lightly, squat on standing leg.", "Lower hip past knee level.", "Push up while holding wall balance."],
    prereqs: ["legs_6", "legs_5"], boss: false, env: "wall"
  },
  {
    id: "legs_8", name: "Counterweight Pistol Squat", category: "legs", tier: 2, xp: 260, difficulty: 2,
    target: "Quads, Hip Flexors, Ankle mobility", desc: "Pistol squat holding a light weight out to prevent falling back.",
    howTo: ["Hold light item (2-5 lbs) in front.", "Extend one leg forward.", "Squat deep, arms extended forward.", "Drive back up, maintaining balance."],
    prereqs: ["legs_7"], boss: false, env: "floor"
  },
  {
    id: "legs_9", name: "Bench/Chair Pistol Squat", category: "legs", tier: 2, xp: 280, difficulty: 2,
    target: "Quads, Glutes, Ankle Mobility", desc: "Squatting on one leg down to sit briefly on a chair.",
    howTo: ["Stand in front of a sturdy chair/couch.", "Extend one leg forward, squat down.", "Touch hips to chair seat briefly.", "Stand back up without bouncing."],
    prereqs: ["legs_8"], boss: false, env: "furniture"
  },
  {
    id: "legs_10", name: "Full Pistol Squat", category: "legs", tier: 3, xp: 500, difficulty: 3,
    target: "Quads, Glutes, Ankles, Core", desc: "BOSS SKILL. Unassisted, single leg squat to floor, opposite leg straight.",
    howTo: ["Extend one leg straight forward.", "Squat deep on standing leg.", "Keep chest as upright as possible.", "Drive up through heel to lock out."],
    prereqs: ["legs_9"], boss: true, env: "floor"
  },
  {
    id: "legs_11", name: "Harop Curl (Eccentric Knee Flex)", category: "legs", tier: 3, xp: 420, difficulty: 3,
    target: "Hamstrings, Calves", desc: "Kneeling, lowering hips forward with feet anchored, controlled fall.",
    howTo: ["Kneel, anchor feet under sofa.", "Lower hips forward, maintaining straight torso.", "Lower as slow as possible to floor.", "Push back up with hands."],
    prereqs: ["legs_3"], boss: false, env: "floor"
  },
  {
    id: "legs_12", name: "Assisted Shrimp Squat", category: "legs", tier: 3, xp: 450, difficulty: 3,
    target: "Quads, Knee Stabilizers, Hips", desc: "Squat holding back foot, holding doorframe for support.",
    howTo: ["Reach back, hold one ankle with same-side hand.", "Hold wall/doorframe with free hand.", "Squat, touching bent knee to floor.", "Stand back up, using hand support."],
    prereqs: ["legs_6"], boss: false, env: "wall"
  },
  {
    id: "legs_13", name: "Intermediate Shrimp Squat", category: "legs", tier: 4, xp: 600, difficulty: 4,
    target: "Quads, Glutes, Hip Extension", desc: "Shrimp squat holding back foot, hands free.",
    howTo: ["Hold back foot with same-side hand.", "Extend opposite arm forward for balance.", "Squat down, touch knee to floor.", "Drive up to standing, do not drop foot."],
    prereqs: ["legs_12"], boss: false, env: "floor"
  },
  {
    id: "legs_14", name: "Elevated Shrimp Squat", category: "legs", tier: 4, xp: 700, difficulty: 4,
    target: "Quads, Glutes, Ankles", desc: "Standing on low step to allow bent knee to drop deeper than foot level.",
    howTo: ["Stand on low step/ledge.", "Hold back foot, squat down.", "Lower back knee below standing foot level.", "Drive back up to top."],
    prereqs: ["legs_11"], boss: false, env: "furniture"
  },
  {
    id: "legs_15", name: "Nordic Curl (Negatives)", category: "legs", tier: 5, xp: 900, difficulty: 5,
    target: "Hamstrings, Knees", desc: "Slow eccentric fall to floor with heels anchored.",
    howTo: ["Kneel, anchor heels under sofa/wall lip.", "Lower torso slowly to floor (5-6s count).", "Keep hips locked straight.", "Catch yourself on hands, push back."],
    prereqs: ["legs_12"], boss: false, env: "furniture"
  },
  {
    id: "legs_16", name: "Full Nordic Curl", category: "legs", tier: 5, xp: 1200, difficulty: 5,
    target: "Hamstrings, Glutes, Knees", desc: "BOSS SKILL. Lowering to floor and pulling back up, no hands.",
    howTo: ["Anchor heels firmly, kneel.", "Lower chest to floor under control.", "Just before touching, use hamstrings to pull back up.", "No arm push helper."],
    prereqs: ["legs_15", "legs_13", "legs_14"], boss: true, env: "furniture"
  },
  {
    id: "legs_17", name: "Sissy Squat", category: "legs", tier: 3, xp: 480, difficulty: 3,
    target: "Quads, Knees, Core Stability", desc: "Leaning torso back from knees while pushing hips forward.",
    howTo: ["Stand holding wall/ledge for light balance.", "Lean back from knees, pushing hips forward.", "Lower heels, squatting deep on toes.", "Drive back up using quad contraction."],
    prereqs: ["legs_2"], boss: false, env: "wall"
  },
  {
    id: "legs_18", name: "Single-Leg Step-down", category: "legs", tier: 3, xp: 500, difficulty: 3,
    target: "Quads, Glutes, Knee Control", desc: "Slow eccentric step down from a couch or box.",
    howTo: ["Stand on one foot on a chair or couch.", "Lower non-standing foot slowly to floor.", "Touch heel lightly, then drive back up.", "Maintain knee alignment over toes."],
    prereqs: ["legs_4"], boss: false, env: "furniture"
  },
  {
    id: "legs_19", name: "Nordic Curl (Tucked/Hip-bent)", category: "legs", tier: 4, xp: 750, difficulty: 4,
    target: "Hamstrings, Knees, Lower Back", desc: "Nordic curl with hips bent 45 degrees to scale load.",
    howTo: ["Kneel, anchor heels firmly.", "Bend hips 45 degrees forward.", "Lower chest to floor using hamstrings.", "Pull back up, maintaining hip angle."],
    prereqs: ["legs_15"], boss: false, env: "furniture"
  },
  {
    id: "legs_20", name: "Pistol Squat Jump", category: "legs", tier: 5, xp: 1300, difficulty: 5,
    target: "Quads, Glutes, Calf, Explosive Power", desc: "ULTIMATE CHAMPION SKILL. Exploding into jump at top of pistol squat.",
    howTo: ["Perform full deep pistol squat.", "Drive up explosively from bottom.", "Launch standing foot off ground.", "Land softly, absorbing impact on leg."],
    prereqs: ["legs_10"], boss: true, env: "floor"
  },

  // ==================== WALL BRANCH (20 skills) ====================
  {
    id: "wall_1", name: "Pike Hold", category: "wall", tier: 1, xp: 100, difficulty: 1,
    target: "Shoulders, Overhead Mobility", desc: "Hinging at hips, hands on floor, loading shoulders.",
    howTo: ["Hands on floor, feet back.", "Walk feet in, push hips to ceiling.", "Form inverted 'V' shape.", "Push floor to elevate shoulders."],
    prereqs: [], boss: false, env: "floor"
  },
  {
    id: "wall_2", name: "Feet-Elevated Pike Hold", category: "wall", tier: 1, xp: 120, difficulty: 1,
    target: "Shoulders, Core, Triceps", desc: "Pike hold with feet elevated on sofa to shift weight to hands.",
    howTo: ["Place feet on sofa seat.", "Place hands on floor, walk them towards sofa.", "Push hips high above shoulders.", "Keep legs locked, push floor away."],
    prereqs: ["wall_1"], boss: false, env: "furniture"
  },
  {
    id: "wall_3", name: "Wall Walk-up (Chest-to-Wall)", category: "wall", tier: 1, xp: 140, difficulty: 1,
    target: "Shoulder endurance, Core", desc: "Walking feet up wall, hands closer to build vertical alignment.",
    howTo: ["Start in push-up stance, feet near wall.", "Walk feet up wall, hands walking back.", "Get as close as comfortable to vertical.", "Keep core flat (no banana back), slide back down."],
    prereqs: ["wall_2"], boss: false, env: "wall"
  },
  {
    id: "wall_4", name: "Wall Handstand Kick-up", category: "wall", tier: 1, xp: 160, difficulty: 1,
    target: "Shoulder Power, Confidence", desc: "Kicking up to handstand, back resting against wall.",
    howTo: ["Hands 6-8 inches from wall.", "Lunge forward, kick legs up one by one.", "Rest heels gently against wall.", "Push floor, keep head neutral."],
    prereqs: ["wall_3"], boss: false, env: "wall"
  },
  {
    id: "wall_5", name: "Wall Handstand Hold", category: "wall", tier: 2, xp: 200, difficulty: 2,
    target: "Shoulders, Wrists, Core alignment", desc: "Holding straight vertical line with wall support (chest facing wall).",
    howTo: ["Walk up to vertical handstand against wall.", "Place hands 3-4 inches away.", "Touch only nose and toes to wall.", "Engage glutes & core, hold for time."],
    prereqs: ["wall_4"], boss: false, env: "wall"
  },
  {
    id: "wall_6", name: "Wall HS Push-up (Negative)", category: "wall", tier: 2, xp: 220, difficulty: 2,
    target: "Shoulders, Triceps, Wrists", desc: "Slow lowering phase from wall handstand.",
    howTo: ["Kick up to wall handstand.", "Lower head slowly to floor (3-4s count).", "Keep elbows tucked forward (not flared).", "Step down, repeat next rep."],
    prereqs: ["wall_5"], boss: false, env: "wall"
  },
  {
    id: "wall_7", name: "Wall HS Push-up (Partial)", category: "wall", tier: 2, xp: 240, difficulty: 2,
    target: "Shoulders, Triceps, Deltoids", desc: "Pushing back up from wall handstand with limited range.",
    howTo: ["Wall handstand support.", "Lower body halfway down.", "Push back up to lockout.", "Focus on straight line core tension."],
    prereqs: ["wall_6"], boss: false, env: "wall"
  },
  {
    id: "wall_8", name: "Wall HS Push-up (Full)", category: "wall", tier: 2, xp: 260, difficulty: 2,
    target: "Shoulders, Triceps, Upper Chest", desc: "Full range head-to-floor handstand push-up on wall.",
    howTo: ["Kick up to wall handstand.", "Lower head until nose touches floor.", "Press back up powerfully to lockout.", "Keep body straight, push through shoulders."],
    prereqs: ["wall_7"], boss: false, env: "wall"
  },
  {
    id: "wall_9", name: "Crow Pose (Bakasana)", category: "wall", tier: 3, xp: 400, difficulty: 3,
    target: "Wrists, Core, Balance, Hip Flexors", desc: "Balancing knees on back of triceps, feet off floor.",
    howTo: ["Squat, hands flat on floor.", "Place knees high on back of triceps.", "Lean forward, shifting weight to hands.", "Float feet off floor, balance on hands."],
    prereqs: ["wall_1"], boss: false, env: "floor"
  },
  {
    id: "wall_10", name: "Crane Pose (Straight-Arm)", category: "wall", tier: 3, xp: 420, difficulty: 3,
    target: "Wrists, Shoulders, Core", desc: "Crow pose, but locking elbows completely straight.",
    howTo: ["From Crow pose, push floor away.", "Extend arms fully straight.", "Squeeze knees tight against arms.", "Raise hips higher, hold static."],
    prereqs: ["wall_9"], boss: false, env: "floor"
  },
  {
    id: "wall_11", name: "Freestanding HS Kick-up", category: "wall", tier: 3, xp: 450, difficulty: 3,
    target: "Wrist balance, Coordination", desc: "Kicking up to vertical balance without wall aid.",
    howTo: ["Place hands on floor.", "Lunge and kick up leg, catching balance with fingers.", "Keep eyes on floor between hands.", "Learn to roll out if overbalancing."],
    prereqs: ["wall_5", "wall_9"], boss: false, env: "floor"
  },
  {
    id: "wall_12", name: "Freestanding HS Hold", category: "wall", tier: 4, xp: 600, difficulty: 4,
    target: "Shoulders, Wrists, Balance, Core", desc: "Holding vertical alignment, no support, for 10s+.",
    howTo: ["Kick up to vertical.", "Squeeze fingers, align ankles/hips/shoulders.", "Lock elbows, push floor to ceiling.", "Balance static, control with fingers."],
    prereqs: ["wall_11", "wall_10"], boss: false, env: "floor"
  },
  {
    id: "wall_13", name: "Freestanding HS Push-up (Negative)", category: "wall", tier: 4, xp: 650, difficulty: 4,
    target: "Shoulders, Triceps, Balance", desc: "Lowering slowly to head-touch without losing handstand balance.",
    howTo: ["Freestanding handstand, lock balance.", "Lean forward slightly while bending elbows.", "Lower head slowly to touch floor.", "Roll or kick out safely."],
    prereqs: ["wall_12", "wall_8"], boss: false, env: "floor"
  },
  {
    id: "wall_14", name: "Freestanding HS Push-up (Full)", category: "wall", tier: 5, xp: 1200, difficulty: 5,
    target: "Shoulders, Triceps, Wrists, Balance", desc: "BOSS SKILL. Lowering head to floor and pressing back to handstand, no wall.",
    howTo: ["Freestanding handstand.", "Lower head to floor under control.", "Press back up to lock out arms.", "Keep body straight, balance using fingers."],
    prereqs: ["wall_13"], boss: true, env: "floor"
  },
  {
    id: "wall_15", name: "Hollowback Handstand", category: "wall", tier: 5, xp: 1000, difficulty: 5,
    target: "Shoulders, Spine Flexibility", desc: "Handstand with deep shoulder angle opening.",
    howTo: ["Start in freestanding handstand.", "Push shoulders forward, chest out.", "Let feet arch backward over head.", "Look up, balance on fingers."],
    prereqs: ["wall_12"], boss: false, env: "floor"
  },
  {
    id: "wall_16", name: "One-Arm Handstand", category: "wall", tier: 5, xp: 1200, difficulty: 5,
    target: "Shoulders, Wrists, Obliques, Balance", desc: "BOSS SKILL. Balancing body weight on a single hand.",
    howTo: ["Freestanding handstand, legs wide (straddle).", "Shift weight over one hand.", "Lift opposite hand onto fingers, then off.", "Balance static on single arm."],
    prereqs: ["wall_14", "wall_15"], boss: true, env: "floor"
  },
  {
    id: "wall_17", name: "Wall HS Shoulder Taps", category: "wall", tier: 3, xp: 480, difficulty: 3,
    target: "Shoulders, Obliques, Balance", desc: "Tapping opposite shoulders while in wall handstand.",
    howTo: ["Kick up to chest-to-wall handstand.", "Shift weight onto one arm.", "Tap shoulder with opposite hand.", "Alternate sides, keeping body straight."],
    prereqs: ["wall_5"], boss: false, env: "wall"
  },
  {
    id: "wall_18", name: "Freestanding HS Pirouette", category: "wall", tier: 4, xp: 750, difficulty: 4,
    target: "Wrist Balance, Shoulders, Coordination", desc: "Rotating 90 or 180 degrees in a handstand.",
    howTo: ["Establish freestanding handstand.", "Shift weight onto one hand, pivot body.", "Step opposite hand around to follow rotation.", "Re-establish vertical balance."],
    prereqs: ["wall_12"], boss: false, env: "floor"
  },
  {
    id: "wall_19", name: "90-Degree HS Push-up", category: "wall", tier: 5, xp: 1300, difficulty: 5,
    target: "Shoulders, Triceps, Lower Back, Balance", desc: "Lowering from handstand to horizontal, then pressing back up.",
    howTo: ["Start in freestanding handstand.", "Lower body into elbow-bent planche.", "Press back up to straight handstand.", "Maintain balance and form."],
    prereqs: ["wall_14", "push_15"], boss: false, env: "floor"
  },
  {
    id: "wall_20", name: "One-Arm HS Push-up", category: "wall", tier: 5, xp: 1600, difficulty: 5,
    target: "Unilateral Shoulders, Triceps, Balance", desc: "ULTIMATE CHAMPION SKILL. Performing push-up on one arm.",
    howTo: ["Start in one-arm handstand.", "Bend elbow, lowering head to floor.", "Press back up to one-arm handstand.", "Extremely advanced shoulder power."],
    prereqs: ["wall_16"], boss: true, env: "floor"
  },

  // ==================== MOBILITY BRANCH (20 skills) ====================
  {
    id: "mobility_1", name: "Wrist Routine A", category: "mobility", tier: 1, xp: 100, difficulty: 1,
    target: "Wrists, Forearms", desc: "Dynamic rocking motions on knees to stretch wrists.",
    howTo: ["Get on all fours.", "Rock forward and backward over fingers.", "Rock side to side, fingers out.", "Turn fingers back, stretch forearms."],
    prereqs: [], boss: false, env: "floor"
  },
  {
    id: "mobility_2", name: "Wrist Routine B", category: "mobility", tier: 1, xp: 120, difficulty: 1,
    target: "Wrists, Flexors", desc: "Kneeling wrist extensions and circles for wrist strength.",
    howTo: ["Place back of hands on floor, fingers facing knees.", "Gently lean back to stretch wrist extensors.", "Make light fists and release.", "Do slow wrist circles on floor."],
    prereqs: ["mobility_1"], boss: false, env: "floor"
  },
  {
    id: "mobility_3", name: "Scapular Shrugs (Floor)", category: "mobility", tier: 1, xp: 140, difficulty: 1,
    target: "Scapula protractors/retractors", desc: "Squeezing shoulder blades in plank or all fours.",
    howTo: ["Start on all fours or push-up stance.", "Lower chest by sinking shoulder blades together.", "Push floor away to round upper back.", "Keep arms fully straight."],
    prereqs: [], boss: false, env: "floor"
  },
  {
    id: "mobility_4", name: "Deep Squat Hold", category: "mobility", tier: 1, xp: 160, difficulty: 1,
    target: "Hips, Ankles, Lower Back", desc: "Resting in a deep squat position for time.",
    howTo: ["Squat down as deep as possible.", "Keep heels flat on floor, chest open.", "Press knees out with elbows.", "Hold static for 30s-60s."],
    prereqs: ["mobility_3"], boss: false, env: "floor"
  },
  {
    id: "mobility_5", name: "Shoulder Dislocates (Broomstick)", category: "mobility", tier: 2, xp: 200, difficulty: 2,
    target: "Shoulder Rotators, Chest", desc: "Passing broomstick overhead and behind back with straight arms.",
    howTo: ["Hold stick with wide grip in front of hips.", "Raise stick overhead and all the way behind hips.", "Keep elbows locked.", "Bring back to front, narrow grip to advance."],
    prereqs: ["mobility_1"], boss: false, env: "floor"
  },
  {
    id: "mobility_6", name: "Cobra Stretch", category: "mobility", tier: 2, xp: 220, difficulty: 2,
    target: "Abs, Spine Extensors", desc: "Prone backbend stretching the abdominal wall.",
    howTo: ["Lie face down, hands under shoulders.", "Press chest up, keeping hips on floor.", "Roll shoulders back, look up.", "Hold stretch for 15s-20s."],
    prereqs: ["mobility_3"], boss: false, env: "floor"
  },
  {
    id: "mobility_7", name: "Downward Dog Flow", category: "mobility", tier: 2, xp: 240, difficulty: 2,
    target: "Hamstrings, Calves, Shoulders", desc: "Transitioning between plank and downward dog.",
    howTo: ["Start in push-up plank.", "Push hips back and up into inverted V.", "Press heels to floor, chest to knees.", "Return to plank and repeat."],
    prereqs: ["mobility_4", "mobility_6"], boss: false, env: "floor"
  },
  {
    id: "mobility_8", name: "World's Greatest Stretch", category: "mobility", tier: 2, xp: 260, difficulty: 2,
    target: "Hips, Spine rotation, Groin", desc: "Lunge with thoracic rotation reach.",
    howTo: ["Lunge left foot forward, right hand on floor.", "Rotate left hand up to ceiling, looking up.", "Touch left elbow to inside of left ankle.", "Repeat and switch sides."],
    prereqs: ["mobility_7"], boss: false, env: "floor"
  },
  {
    id: "mobility_9", name: "Deep Lunge Reach", category: "mobility", tier: 2, xp: 280, difficulty: 2,
    target: "Hip Flexors, Psoas", desc: "Deep forward lunge raising hands overhead to stretch hips.",
    howTo: ["Take large step forward, drop back knee.", "Push hips forward.", "Raise arms straight up, leaning back slightly.", "Hold stretch, breathing deeply."],
    prereqs: ["mobility_8"], boss: false, env: "floor"
  },
  {
    id: "mobility_10", name: "Bridge Hold", category: "mobility", tier: 3, xp: 500, difficulty: 3,
    target: "Shoulder Flexion, Spine Extensors, Hips", desc: "BOSS SKILL. Pushing up into wheel/bridge from floor.",
    howTo: ["Lie on back, feet flat, hands next to head.", "Press through hands and feet.", "Extend arms and legs, arching back.", "Push shoulders over hands."],
    prereqs: ["mobility_6", "mobility_5"], boss: true, env: "floor"
  },
  {
    id: "mobility_11", name: "Cossack Stretch", category: "mobility", tier: 3, xp: 420, difficulty: 3,
    target: "Groin, Hamstrings, Hips", desc: "Deep lateral lunge keeping heel of extended leg up.",
    howTo: ["Wide stance, lower hips to left.", "Keep left heel flat on floor.", "Point right toes to ceiling, knee straight.", "Keep chest tall, push back to center."],
    prereqs: ["mobility_4"], boss: false, env: "floor"
  },
  {
    id: "mobility_12", name: "Side Splits Prep", category: "mobility", tier: 3, xp: 450, difficulty: 3,
    target: "Adductors, Groin", desc: "Wide kneeling straddle stretch (Frog stretch).",
    howTo: ["Get on knees, slide knees wide apart.", "90 degree angle at knees and ankles.", "Lower forearms to floor.", "Push hips backward to intensify stretch."],
    prereqs: ["mobility_11"], boss: false, env: "floor"
  },
  {
    id: "mobility_13", name: "Pancake Stretch Prep", category: "mobility", tier: 4, xp: 600, difficulty: 4,
    target: "Hamstrings, Hips, Lower Back", desc: "Seated straddle reaching forward with upright back.",
    howTo: ["Sit on floor, spread legs as wide as possible.", "Sit up tall, tilt pelvis forward.", "Walk hands forward, keeping spine flat.", "Hold position of mild stretch."],
    prereqs: ["mobility_12"], boss: false, env: "floor"
  },
  {
    id: "mobility_14", name: "Pancake Stretch Full", category: "mobility", tier: 4, xp: 700, difficulty: 4,
    target: "Hips, Groin, Hamstrings", desc: "Torso and chest flat to floor in straddle.",
    howTo: ["Sit in wide straddle.", "Fold forward, hinging from hips.", "Lay belly, chest, and arms flat on floor.", "Hold stretch for 30s."],
    prereqs: ["mobility_13", "mobility_10"], boss: false, env: "floor"
  },
  {
    id: "mobility_15", name: "Bridge Rotation Flow", category: "mobility", tier: 4, xp: 700, difficulty: 4,
    target: "Shoulders, Spine rotation, Hips", desc: "Rotating dynamic from crab reach to full bridge.",
    howTo: ["Sit, feet flat, hands behind (crab).", "Lift hips, reach one arm overhead.", "Pivot on feet, place hand down into bridge.", "Pivot back to starting crab."],
    prereqs: ["mobility_10"], boss: false, env: "floor"
  },
  {
    id: "mobility_16", name: "Middle Splits", category: "mobility", tier: 5, xp: 1200, difficulty: 5,
    target: "Hips, Adductors, Hamstrings", desc: "BOSS SKILL. Legs spread out 180 degrees flat to sides.",
    howTo: ["Slide feet out to sides slowly.", "Keep knees locked, pointing forward/up.", "Lower hips all the way to floor.", "Hold splits with upright chest."],
    prereqs: ["mobility_14", "mobility_15"], boss: true, env: "floor"
  },
  {
    id: "mobility_17", name: "Thoracic Bridge Reach", category: "mobility", tier: 2, xp: 280, difficulty: 2,
    target: "Shoulders, Thoracic Spine, Obliques", desc: "Dynamic reaching rotation from low bridge bend.",
    howTo: ["Enter low bridge position.", "Lift one hand, rotate torso.", "Reach arm far overhead to stretch shoulder.", "Return hand, repeat on other side."],
    prereqs: ["mobility_6"], boss: false, env: "floor"
  },
  {
    id: "mobility_18", name: "Ledge Splits Prep", category: "mobility", tier: 3, xp: 500, difficulty: 3,
    target: "Groin, Adductors, Hips", desc: "Elevating front foot on a ledge or chair for splits training.",
    howTo: ["Place one foot on chair/couch seat.", "Slide back leg out on floor.", "Lower hips under control.", "Hold stretch, keeping chest upright."],
    prereqs: ["mobility_12"], boss: false, env: "furniture"
  },
  {
    id: "mobility_19", name: "Active Pancake Liftoffs", category: "mobility", tier: 4, xp: 750, difficulty: 4,
    target: "Hip Flexors, Deep Abs, Hamstrings", desc: "Lifting straight legs while folded in pancake straddle.",
    howTo: ["Sit in straddle, fold forward.", "Place hands on floor in front of you.", "Keep legs locked, lift feet off floor.", "Builds deep active compression power."],
    prereqs: ["mobility_14"], boss: false, env: "floor"
  },
  {
    id: "mobility_20", name: "Over-split Stretch", category: "mobility", tier: 5, xp: 1300, difficulty: 5,
    target: "Hips, Groin, Hamstrings", desc: "ULTIMATE CHAMPION SKILL. Splits with feet elevated on cushions.",
    howTo: ["Place front/back feet on elevated ledges/pillows.", "Lower hips below level of supports.", "Keep knees straight and locked.", "Hold stretch under control."],
    prereqs: ["mobility_16"], boss: true, env: "furniture"
  },
  // ==================== PULL BRANCH (20 skills) ====================
  {
    id: "pull_1", name: "Australian Row (Chest-height)", category: "pull", tier: 1, xp: 100, difficulty: 1,
    target: "Upper Back, Lats, Biceps", desc: "Beginner pulling entry point using a chest-height bar or table edge to scale down load.",
    howTo: ["Lie face up under a chest-height bar or table edge.", "Grip edge shoulder-width, heels on floor.", "Pull chest to bar, keeping body in straight plank.", "Lower under control to straight arms."],
    prereqs: [], boss: false, env: "bar"
  },
  {
    id: "pull_2", name: "Australian Row (Waist-height)", category: "pull", tier: 1, xp: 120, difficulty: 1,
    target: "Upper Back, Lats, Biceps, Core", desc: "Lower bar angle shifting more bodyweight into the pull.",
    howTo: ["Set bar or table to waist-height.", "Grip shoulder-width, body aligned straight.", "Pull chest to bar, squeezing shoulder blades.", "Lower slowly back to starting posture."],
    prereqs: ["pull_1"], boss: false, env: "bar"
  },
  {
    id: "pull_3", name: "Chin-up (Negative)", category: "pull", tier: 1, xp: 140, difficulty: 1,
    target: "Lats, Biceps, Grip", desc: "Slow eccentrics to build pulling strength using an underhand grip.",
    howTo: ["Jump or step up until chin is over bar.", "Grip underhand (palms facing you).", "Lower body as slowly as possible (aim for 5-8 seconds).", "Extend arms fully at bottom before repeating."],
    prereqs: ["pull_2"], boss: false, env: "bar"
  },
  {
    id: "pull_4", name: "Pull-up (Negative)", category: "pull", tier: 1, xp: 160, difficulty: 1,
    target: "Lats, Upper Back, Grip", desc: "Slow eccentrics using overhand grip to prepare for full pull-ups.",
    howTo: ["Jump to top position, chin over bar.", "Grip overhand (palms facing away).", "Lower down under strict control over 6-8 seconds.", "Perform a dead hang at bottom briefly."],
    prereqs: ["pull_3"], boss: false, env: "bar"
  },
  {
    id: "pull_5", name: "Chin-up", category: "pull", tier: 2, xp: 200, difficulty: 2,
    target: "Lats, Biceps, Brachialis", desc: "Full range of motion pull using an underhand grip.",
    howTo: ["Hang from bar with underhand grip.", "Pull chest to bar, elbows driven down.", "Clear bar with chin, squeeze biceps.", "Lower back down to a dead hang."],
    prereqs: ["pull_3"], boss: false, env: "bar"
  },
  {
    id: "pull_6", name: "Regular Pull-up", category: "pull", tier: 2, xp: 220, difficulty: 2,
    target: "Lats, Mid-Back, Shoulders", desc: "The ultimate yardstick of upper-body pulling mastery.",
    howTo: ["Hang from bar with overhand grip.", "Depress shoulder blades, pull chest up.", "Keep core tight, avoiding hip kick.", "Clear bar with chin, lower under control."],
    prereqs: ["pull_4", "pull_5"], boss: false, env: "bar"
  },
  {
    id: "pull_7", name: "Wide Grip Pull-up", category: "pull", tier: 2, xp: 240, difficulty: 2,
    target: "Outer Lats, Teres Major", desc: "Hands placed wider than shoulders to emphasize upper back width.",
    howTo: ["Grip bar 1.5x shoulder width.", "Pull chest toward bar, elbows flared wide.", "Focus on drawing shoulder blades together.", "Lower slowly to full stretch."],
    prereqs: ["pull_6"], boss: false, env: "bar"
  },
  {
    id: "pull_8", name: "L-Sit Chin-up (Negative)", category: "pull", tier: 2, xp: 260, difficulty: 2,
    target: "Lats, Biceps, Abs", desc: "Holding legs horizontal while lowering slowly to build core-pull synergy.",
    howTo: ["Jump to top of chin-up, raise legs straight to 90 degrees.", "Maintain L-sit leg alignment.", "Lower torso slowly over 5-8 seconds.", "Keep legs horizontal until arms lock out."],
    prereqs: ["pull_5"], boss: false, env: "bar"
  },
  {
    id: "pull_9", name: "L-Sit Pull-up", category: "pull", tier: 3, xp: 400, difficulty: 3,
    target: "Lats, Abs, Hip Flexors, Grip", desc: "Full pull-up repetitions while holding legs 90 degrees.",
    howTo: ["Hang from bar, raise straight legs to L-sit.", "Pull chest to bar, keeping legs strictly horizontal.", "Lower under control, maintaining 90-degree bend.", "Do not swing or sag hips."],
    prereqs: ["pull_6", "pull_8"], boss: false, env: "bar"
  },
  {
    id: "pull_10", name: "Archer Pull-up", category: "pull", tier: 3, xp: 420, difficulty: 3,
    target: "Unilateral Lats, Biceps, Shoulders", desc: "Pulling up to one arm while extending other arm straight along bar.",
    howTo: ["Wide overhand grip on bar.", "Pull up toward right hand, straightening left arm.", "Torso moves sideways towards right side.", "Lower and repeat or alternate sides."],
    prereqs: ["pull_6"], boss: false, env: "bar"
  },
  {
    id: "pull_11", name: "Close Grip Pull-up", category: "pull", tier: 3, xp: 450, difficulty: 3,
    target: "Lower Lats, Chest, Biceps", desc: "Hands touching on bar, shifting focus to arms and lower lat insertions.",
    howTo: ["Grip bar with index fingers touching.", "Pull chin over bar, keeping elbows forward.", "Squeeze chest and biceps at the top.", "Lower to complete extension."],
    prereqs: ["pull_6"], boss: false, env: "bar"
  },
  {
    id: "pull_12", name: "Tuck Front Lever Row", category: "pull", tier: 3, xp: 480, difficulty: 3,
    target: "Lats, Upper Back, Rear Delts, Core", desc: "Rowing reps while suspended horizontally in a tucked lever.",
    howTo: ["Enter tuck front lever under bar.", "Pull hips to bar, keeping body horizontal.", "Squeeze scapulae at peak of contraction.", "Lower under control back to lever hang."],
    prereqs: ["pull_9"], boss: false, env: "bar"
  },
  {
    id: "pull_13", name: "Explosive Chest-to-Bar Pull-up", category: "pull", tier: 4, xp: 600, difficulty: 4,
    target: "Lats, Biceps, Power", desc: "Pulling dynamically to touch chest or upper stomach to bar.",
    howTo: ["Hang from bar, pull up explosively.", "Drive elbows down and back with maximum velocity.", "Aim to touch collarbone or chest to bar.", "Lower smoothly, absorbing impact."],
    prereqs: ["pull_6"], boss: false, env: "bar"
  },
  {
    id: "pull_14", name: "Gymnastic Ring Row", category: "pull", tier: 4, xp: 650, difficulty: 4,
    target: "Upper Back, Lats, Stabilizers", desc: "Rowing on unstable rings, adding rotation for shoulder health.",
    howTo: ["Set rings to waist height, lie under them.", "Grip rings, pull chest to hands.", "Rotate palms from facing feet to facing each other at top.", "Keep core locked straight."],
    prereqs: ["pull_2"], boss: false, env: "rings"
  },
  {
    id: "pull_15", name: "Gymnastic Ring Pull-up", category: "pull", tier: 4, xp: 700, difficulty: 4,
    target: "Lats, Biceps, Stabilizers", desc: "Pull-ups on unstable rings allowing natural shoulder rotation.",
    howTo: ["Hang from rings with palms facing away.", "Pull up, rotating rings so palms face you at top.", "Keep rings close to shoulders.", "Lower to full extension, rotating back."],
    prereqs: ["pull_6", "pull_14"], boss: false, env: "rings"
  },
  {
    id: "pull_16", name: "Advanced Tuck Front Lever Row", category: "pull", tier: 4, xp: 750, difficulty: 4,
    target: "Lats, Upper Back, Lower Back, Core", desc: "Horizontal rows with flat back and knees at 90 degrees.",
    howTo: ["Establish advanced tuck front lever.", "Pull bar to stomach, keeping back flat.", "Control descent, maintaining knee position.", "Arms fully straight at bottom."],
    prereqs: ["pull_12"], boss: false, env: "bar"
  },
  {
    id: "pull_17", name: "One-Arm Chin-up (Negative)", category: "pull", tier: 5, xp: 900, difficulty: 5,
    target: "Unilateral Lats, Biceps, Grip", desc: "Slow eccentric lowering on one arm to build ultimate strength.",
    howTo: ["Jump to top of bar, chin over bar.", "Release one hand, hold with single underhand grip.", "Lower body as slowly as possible (under 5 seconds).", "Keep shoulder packed at bottom."],
    prereqs: ["pull_5", "pull_10"], boss: false, env: "bar"
  },
  {
    id: "pull_18", name: "Straddle Front Lever Row", category: "pull", tier: 5, xp: 1200, difficulty: 5,
    target: "Lats, Upper Back, Glutes, Hamstrings", desc: "BOSS SKILL. Rowing reps while floating horizontal with legs spread.",
    howTo: ["Enter straddle front lever.", "Pull bar to mid-torso, keeping hips high.", "Perform row under control, squeeze back.", "Lower back to static straddle lever."],
    prereqs: ["pull_16"], boss: true, env: "bar"
  },
  {
    id: "pull_19", name: "One-Arm Chin-up", category: "pull", tier: 5, xp: 1300, difficulty: 5,
    target: "Unilateral Lats, Biceps, Core, Grip", desc: "BOSS SKILL. Pulling chin over bar with a single underhand grip.",
    howTo: ["Hang from bar with one hand, underhand grip.", "Engage lat, pull body up without assistance.", "Clear bar with chin, keep body close to arm.", "Lower under control to straight arm."],
    prereqs: ["pull_17"], boss: true, env: "bar"
  },
  {
    id: "pull_20", name: "One-Arm Pull-up", category: "pull", tier: 5, xp: 1500, difficulty: 5,
    target: "Unilateral Lats, Upper Back, Core, Grip", desc: "ULTIMATE CHAMPION SKILL. Pulling chin over bar with single overhand grip.",
    howTo: ["Hang from bar with one hand, overhand grip.", "Pull body up strictly, avoiding body spin.", "Clear bar with chin.", "Lower slowly to dead hang, packing shoulder."],
    prereqs: ["pull_19"], boss: true, env: "bar"
  }
];


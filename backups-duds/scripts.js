const noteMap = {
    "C2": "c/2", "C#2": "c#/2", "D2": "d/2", "D#2": "d#/2", "E2": "e/2", "F2": "f/2", "F#2": "f#/2", "G2": "g/2", "G#2": "g#/2", "A2": "a/2", "A#2": "a#/2", "B2": "b/2",
    "C3": "c/3", "C#3": "c#/3", "D3": "d/3", "D#3": "d#/3", "E3": "e/3", "F3": "f/3", "F#3": "f#/3", "G3": "g/3", "G#3": "g#/3", "A3": "a/3", "A#3": "a#/3", "B3": "b/3",
    "C4": "c/4", "C#4": "c#/4", "D4": "d/4", "D#4": "d#/4", "E4": "e/4", "F4": "f/4", "F#4": "f#/4", "G4": "g/4", "G#4": "g#/4", "A4": "a/4", "A#4": "a#/4", "B4": "b/4", "C5": "c/5",
    "C#5": "c#/5", "D5": "d/5", "D#5": "d#/5", "E5": "e/5", "F5": "f/5", "F#5": "f#/5", "G5": "g/5", "G#5": "g#/5", "A5": "a/5", "A#5": "a#/5", "B5": "b/5", "C6": "c/6"
};

const KEY_SIGNATURE_ACCIDENTALS = {
    "C": [],
    "G": ["F#"],
    "D": ["F#", "C#"],
    "A": ["F#", "C#", "G#"],
    "E": ["F#", "C#", "G#", "D#"],
    "B": ["F#", "C#", "G#", "D#", "A#"],
    "F#": ["F#", "C#", "G#", "D#", "A#", "E#"],
    "C#": ["F#", "C#", "G#", "D#", "A#", "E#", "B#"],
    "F": ["Bb"],
    "Bb": ["Bb", "Eb"],
    "Eb": ["Bb", "Eb", "Ab"],
    "Ab": ["Bb", "Eb", "Ab", "Db"],
    "Db": ["Bb", "Eb", "Ab", "Db", "Gb"],
    "Gb": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],

    "Am": [],
    "Em": ["F#"],
    "Bm": ["F#", "C#"],
    "F#m": ["F#", "C#", "G#"],
    "C#m": ["F#", "C#", "G#", "D#"],
    "G#m": ["F#", "C#", "G#", "D#", "A#"],
    "D#m": ["F#", "C#", "G#", "D#", "A#", "E#"],
    "A#m": ["F#", "C#", "G#", "D#", "A#", "E#", "B#"],
    "Dm": ["Bb"],
    "Gm": ["Bb", "Eb"],
    "Cm": ["Bb", "Eb", "Ab"],
    "Fm": ["Bb", "Eb", "Ab", "Db"],
    "Bbm": ["Bb", "Eb", "Ab", "Db", "Gb"],
    "Ebm": ["Bb", "Eb", "Ab", "Db", "Gb", "Cb"]
};

const ENHARMONIC_EQUIVALENTS_SHARP_TO_FLAT = {
    "A#": "Bb",
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab"
};

let currentKeySignature = "C";
let currentTimeSignature = "4/4";
let [beatsPerMeasure, beatValue] = parseTimeSignature(currentTimeSignature);

let currentNoteDuration = "q"; // default quarter note
let restMode = false; // if true, add 'r' to durations

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
synth.set(
    {
"volume": -8,
"detune": 0,
"portamento": 50,
"envelope": {
"attack": 0.005,
"attackCurve": "linear",
"decay": 30,
"decayCurve": "exponential",
"release": 5,
"releaseCurve": "exponential",
"sustain": 0.3
},
"oscillator": {
"partialCount": 100,
"partials": [
    0.8105694691387023,
    0,
    -0.0900632743487447,
    0,
    0.03242277876554809,
    0,
    -0.016542234064055146,
    0,
    0.010007030483193857,
    0,
    -0.00669892123255126,
    0,
    0.004796269048158,
    0,
    -0.0036025309739497885,
    0,
    0.0028047386475387615,
    0,
    -0.002245344789857901,
    0,
    0.0018380260071172384,
    0,
    -0.0015322674274833694,
    0,
    0.0012969111506219236,
    0,
    -0.0011118922759104286,
    0,
    0.0009638162534348421,
    0,
    -0.0008434645880735718,
    0,
    0.0007443245813945843,
    0,
    -0.000661689362562206,
    0,
    0.0005920887283701257,
    0,
    -0.0005329187831286668,
    0,
    0.00048219480615032865,
    0,
    -0.00043838262257366267,
    0,
    0.00040028121932775414,
    0,
    -0.0003669395514435048,
    0,
    0.0003375966135521459,
    0,
    -0.0003116376275043069,
    0,
    0.0002885615767670709,
    0,
    -0.0002679568493020503,
    0,
    0.0002494827544286557,
    0,
    -0.00023285534879020466,
    0,
    0.0002178364603973938,
    0,
    -0.0002042251119019154,
    0,
    0.0001918507619263201,
    0,
    -0.00018056793698790425,
    0,
    0.000170251936387041,
    0,
    -0.00016079537177915142,
    0,
    0.00015210536106937555,
    0,
    -0.00014410123895799155,
    0,
    0.0001367126782153318,
    0,
    -0.00012987813958319216,
    0,
    0.00012354358621226983,
    0,
    -0.00011766141227154916,
    0,
    0.00011218954590155046,
    0,
    -0.00010709069482609357,
    0,
    0.00010233170927139278,
    0,
    -0.00009788304179914288,
    0,
    0.00009371828756373018,
    0,
    -0.00008981379159431603,
    0,
    0.00008614831216268492,
    0,
    -0.00008270273126606491,
    0
],
"phase": 10,
"type": "triangle100"
}
}
);

const VF = Vex.Flow;
const staffDiv = document.getElementById("staff");

let measures = [{ trebleNotes: [], bassNotes: [] }];
let currentMeasureIndex = 0;

let chordMode = false;
let currentChord = [];

const undoStack = [];
const redoStack = [];

const toggleChordModeBtn = document.getElementById('toggle-chord-mode');
const addChordBtn = document.getElementById('add-chord');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');

toggleChordModeBtn.addEventListener('click', () => {
    chordMode = !chordMode;
    toggleChordModeBtn.textContent = "Chord Mode: " + (chordMode ? "ON" : "OFF");
    if (!chordMode) {
        currentChord = [];
        addChordBtn.disabled = true;
    }
});

addChordBtn.addEventListener('click', () => {
    if (currentChord.length > 0) {
        pushStateForUndo();
        addChordToMeasure(currentChord);
        currentChord = [];
        addChordBtn.disabled = true;
        updateUndoRedoButtons();
    }
});

document.getElementById('time-signature-select').addEventListener('change', (e) => {
    pushStateForUndo();
    currentTimeSignature = e.target.value;
    [beatsPerMeasure, beatValue] = parseTimeSignature(currentTimeSignature);
    measures = [{ trebleNotes: [], bassNotes: [] }];
    currentMeasureIndex = 0;
    renderAllMeasures();
    updateUndoRedoButtons();
});

document.getElementById('key-signature-select').addEventListener('change', (e) => {
    pushStateForUndo();
    currentKeySignature = e.target.value;
    renderAllMeasures();
    updateUndoRedoButtons();
});

document.getElementById('clear-staff').addEventListener('click', () => {
    pushStateForUndo();
    measures = [{ trebleNotes: [], bassNotes: [] }];
    currentMeasureIndex = 0;
    renderAllMeasures();
    updateUndoRedoButtons();
});

undoBtn.addEventListener('click', () => {
    undoAction();
});

redoBtn.addEventListener('click', () => {
    redoAction();
});

const durationButtons = document.querySelectorAll('.duration-button[data-duration]');
durationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setCurrentNoteDuration(btn.getAttribute('data-duration'));
    });
});

const restToggleBtn = document.getElementById('rest-toggle');
restToggleBtn.addEventListener('click', () => {
    restMode = !restMode;
    restToggleBtn.textContent = "Rest Mode: " + (restMode ? "ON (R)" : "OFF (R)");
});

function setCurrentNoteDuration(dur) {
    const allowed = ['w', 'h', 'q', '8'];
    if (!allowed.includes(dur)) {
        alert("Invalid duration selected. Allowed durations: w,h,q,8. Reverting to quarter note.");
        dur = 'q';
    }
    currentNoteDuration = dur;
    durationButtons.forEach(b => b.classList.remove('duration-selected'));
    const selectedBtn = document.querySelector(`.duration-button[data-duration="${dur}"]`);
    if (selectedBtn) selectedBtn.classList.add('duration-selected');
}

function parseTimeSignature(ts) {
    const [top, bottom] = ts.split('/').map(Number);
    return [top, bottom];
}

function isTreble(noteName) {
    const octave = parseInt(noteName[noteName.length - 1], 10);
    return octave >= 4;
}

function isFlatKey(keySig) {
    const acc = KEY_SIGNATURE_ACCIDENTALS[keySig] || [];
    return acc.some(a => a.includes('b'));
}

function isSharpKey(keySig) {
    const acc = KEY_SIGNATURE_ACCIDENTALS[keySig] || [];
    const hasSharp = acc.some(a => a.includes('#'));
    return hasSharp && !isFlatKey(keySig);
}

function normalizeNoteForKey(noteName, keySig) {
    const pitch = noteName.slice(0, -1);
    const octave = noteName.slice(-1);

    let noteLetter = pitch.charAt(0).toUpperCase();
    let accidental = (pitch.length > 1) ? pitch.charAt(1) : null;

    const accidentalsInKey = KEY_SIGNATURE_ACCIDENTALS[keySig] || [];

    function noteIsInKey(nLetter, acc) {
        const combined = nLetter.toUpperCase() + (acc ? acc : '');
        return accidentalsInKey.includes(combined);
    }

    const flatBased = isFlatKey(keySig);

    if (accidental) {
        if (noteIsInKey(noteLetter, accidental)) {
            return noteLetter.toLowerCase() + "/" + octave;
        } else {
            if (flatBased && accidental === '#') {
                const enharmonic = ENHARMONIC_EQUIVALENTS_SHARP_TO_FLAT[noteLetter + '#'];
                if (enharmonic) {
                    const enhLetter = enharmonic.charAt(0).toLowerCase();
                    const enhAcc = enharmonic.charAt(1);
                    return enhLetter + enhAcc + "/" + octave;
                }
            }
            return noteLetter.toLowerCase() + accidental + "/" + octave;
        }
    } else {
        return noteLetter.toLowerCase() + "/" + octave;
    }
}

function getDurationForCurrentSelection() {
    return currentNoteDuration + (restMode ? "r" : "");
}

// Convert durations to beats depending on beat_value
// factor = 4/beat_value
// w=4*factor, h=2*factor, q=1*factor, 8=0.5*factor
function durationToBeats(dur) {
    const isRest = dur.includes('r');
    const base = dur.replace('r', '');
    const allowed = { w: 4, h: 2, q: 1, "8": 0.5 };
    if (!allowed[base]) {
        alert("Unknown duration encountered, using quarter as fallback.");
        return allowed['q'];
    }
    return allowed[base] * (4 / beatValue);
}

function addNoteToMeasure(noteName) {
    pushStateForUndo();
    const vexKey = normalizeNoteForKey(noteName, currentKeySignature);
    const duration = getDurationForCurrentSelection();

    const currentMeasure = measures[currentMeasureIndex];
    if (isTreble(noteName)) {
        currentMeasure.trebleNotes.push({ keys: [vexKey], duration });
    } else {
        currentMeasure.bassNotes.push({ keys: [vexKey], duration });
    }

    advanceMeasureIfFull(currentMeasure);
    safeRender();
    updateUndoRedoButtons();
}

function addChordToMeasure(noteNames) {
    const vexKeys = noteNames.map(n => normalizeNoteForKey(n, currentKeySignature));
    const duration = getDurationForCurrentSelection();

    const currentMeasure = measures[currentMeasureIndex];
    const shouldBeTreble = noteNames.some(n => isTreble(n));

    if (shouldBeTreble) {
        currentMeasure.trebleNotes.push({ keys: vexKeys, duration });
    } else {
        currentMeasure.bassNotes.push({ keys: vexKeys, duration });
    }

    advanceMeasureIfFull(currentMeasure);
    safeRender();
}

function advanceMeasureIfFull(currentMeasure) {
    // Simple heuristic, if notes exceed measure length in a common scenario,
    // Start a new measure.
    // The user should keep durations correct; if not, an error message will appear on render.
    const trebleCount = countMeasureBeats(currentMeasure.trebleNotes);
    const bassCount = countMeasureBeats(currentMeasure.bassNotes);
    const maxCount = Math.max(trebleCount, bassCount);
    // If measure is full or more, start new measure
    if (maxCount >= beatsPerMeasure * (4 / beatValue)) {
        measures.push({ trebleNotes: [], bassNotes: [] });
        currentMeasureIndex++;
    }
}

function countMeasureBeats(notes) {
    let total = 0;
    for (const n of notes) total += durationToBeats(n.duration);
    return total;
}

function addRestsToFill(notes, clef, beatsNeeded) {
    // We'll try to fill with the largest possible rests:
    // w=4*factor, h=2*factor, q=1*factor, 8=0.5*factor
    // But since the user only had q and 8 rests before, let's stick to q and 8 rests to simplify
    const restKey = (clef === "treble") ? "b/4" : "d/3";

    let remaining = beatsNeeded;

    const qBeats = 1 * (4 / beatValue); // quarter in beats
    const eBeats = 0.5 * (4 / beatValue); // eighth in beats

    while (remaining >= qBeats) {
        notes.push({ keys: [restKey], duration: "qr" });
        remaining -= qBeats;
    }

    while (remaining >= eBeats) {
        notes.push({ keys: [restKey], duration: "8r" });
        remaining -= eBeats;
    }

    // If small floating remainders remain, ignore (should be minimal).
}

function createStaveNotes(notes, clef) {
    const totalBeats = countMeasureBeats(notes);
    const measureBeats = beatsPerMeasure * (4 / beatValue);

    const needed = measureBeats - totalBeats;

    if (needed > 0.0001) {
        addRestsToFill(notes, clef, needed);
    }

    return notes.map(n => {
        const staveNote = new VF.StaveNote({ keys: n.keys, duration: n.duration, clef: clef });

        if (clef === "bass") {
            staveNote.setStemDirection(-1);
        } else {
            staveNote.setStemDirection(1);
        }

        if (!n.duration.includes('r')) {
            n.keys.forEach((key, index) => {
                const [noteName] = key.split('/');
                if (noteName.length > 1) {
                    const accidentalChar = noteName.charAt(1);
                    if (accidentalChar === '#') {
                        staveNote.addAccidental(index, new VF.Accidental('#'));
                    } else if (accidentalChar === 'b') {
                        staveNote.addAccidental(index, new VF.Accidental('b'));
                    }
                }
            });
        }

        return staveNote;
    });
}

function safeRender() {
    try {
        renderAllMeasures();
    } catch (error) {
        console.error("Rendering Error:", error);
        alert("An error occurred while rendering the staff. Likely the durations don't match the time signature. Adjust your notes/rests so that the total equals the measure length (e.g., 4 quarter notes in 4/4).");
    }
}

function renderAllMeasures() {
    staffDiv.innerHTML = "";

    const svgNS = "http://www.w3.org/2000/svg";
    const widthPerMeasure = 420;
    const totalHeight = 350;
    const totalWidth = measures.length * widthPerMeasure + 50;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", totalWidth);
    svg.setAttribute("height", totalHeight);
    staffDiv.appendChild(svg);

    const renderer = new VF.Renderer(svg, VF.Renderer.Backends.SVG);
    renderer.resize(totalWidth, totalHeight);
    const context = renderer.getContext();

    let x = 10;

    for (let i = 0; i < measures.length; i++) {
        const staveTreble = new VF.Stave(x, 50, widthPerMeasure);
        const staveBass = new VF.Stave(x, 200, widthPerMeasure);

        if (i === 0) {
            staveTreble.addClef("treble").addTimeSignature(currentTimeSignature).addKeySignature(currentKeySignature);
            staveBass.addClef("bass").addTimeSignature(currentTimeSignature).addKeySignature(currentKeySignature);
        }

        staveTreble.setContext(context).draw();
        staveBass.setContext(context).draw();

        if (i === 0) {
            new VF.StaveConnector(staveTreble, staveBass).setType(VF.StaveConnector.type.BRACE).setContext(context).draw();
            new VF.StaveConnector(staveTreble, staveBass).setType(VF.StaveConnector.type.SINGLE_LEFT).setContext(context).draw();
        } else {
            new VF.StaveConnector(staveTreble, staveBass).setType(VF.StaveConnector.type.SINGLE).setContext(context).draw();
        }

        const trebleStaveNotes = createStaveNotes([...measures[i].trebleNotes], "treble");
        const bassStaveNotes = createStaveNotes([...measures[i].bassNotes], "bass");

        const trebleVoice = new VF.Voice({ num_beats: beatsPerMeasure, beat_value: beatValue });
        const bassVoice = new VF.Voice({ num_beats: beatsPerMeasure, beat_value: beatValue });

        trebleVoice.addTickables(trebleStaveNotes);
        bassVoice.addTickables(bassStaveNotes);

        new VF.Formatter().joinVoices([trebleVoice]).joinVoices([bassVoice])
            .format([trebleVoice, bassVoice], widthPerMeasure - 50);

        trebleVoice.draw(context, staveTreble);
        bassVoice.draw(context, staveBass);

        x += widthPerMeasure;
    }
}

function pushStateForUndo() {
    const state = {
        measures: JSON.parse(JSON.stringify(measures)),
        currentMeasureIndex: currentMeasureIndex,
        currentTimeSignature: currentTimeSignature,
        currentKeySignature: currentKeySignature
    };
    undoStack.push(state);
    redoStack.length = 0;
}

function undoAction() {
    if (undoStack.length > 0) {
        const currentState = {
            measures: JSON.parse(JSON.stringify(measures)),
            currentMeasureIndex: currentMeasureIndex,
            currentTimeSignature: currentTimeSignature,
            currentKeySignature: currentKeySignature
        };
        redoStack.push(currentState);

        const prevState = undoStack.pop();
        measures = JSON.parse(JSON.stringify(prevState.measures));
        currentMeasureIndex = prevState.currentMeasureIndex;
        currentTimeSignature = prevState.currentTimeSignature;
        currentKeySignature = prevState.currentKeySignature;
        [beatsPerMeasure, beatValue] = parseTimeSignature(currentTimeSignature);
        safeRender();
        updateUndoRedoButtons();
    }
}

function redoAction() {
    if (redoStack.length > 0) {
        const currentState = {
            measures: JSON.parse(JSON.stringify(measures)),
            currentMeasureIndex: currentMeasureIndex,
            currentTimeSignature: currentTimeSignature,
            currentKeySignature: currentKeySignature
        };
        undoStack.push(currentState);

        const nextState = redoStack.pop();
        measures = JSON.parse(JSON.stringify(nextState.measures));
        currentMeasureIndex = nextState.currentMeasureIndex;
        currentTimeSignature = nextState.currentTimeSignature;
        currentKeySignature = nextState.currentKeySignature;
        [beatsPerMeasure, beatValue] = parseTimeSignature(currentTimeSignature);
        safeRender();
        updateUndoRedoButtons();
    }
}

function updateUndoRedoButtons() {
    undoBtn.disabled = (undoStack.length === 0);
    redoBtn.disabled = (redoStack.length === 0);
}

document.querySelectorAll('#piano [data-note]').forEach(key => {
    key.addEventListener('click', async () => {
        const noteName = key.getAttribute('data-note');
        if (!restMode) {
            if (Tone.context.state !== 'running') {
                await Tone.start();
            }
            synth.triggerAttackRelease(noteName, "8n");
        }

        if (chordMode) {
            currentChord.push(noteName);
            addChordBtn.disabled = false;
        } else {
            addNoteToMeasure(noteName);
        }
    });
});

const keyToNoteMap = {
    'a': 'C4',
    'w': 'C#4',
    's': 'D4',
    'e': 'D#4',
    'd': 'E4',
    'f': 'F4',
    't': 'F#4',
    'g': 'G4',
    'y': 'G#4',
    'h': 'A4',
    'u': 'A#4',
    'j': 'B4',
    'k': 'C5',
    'o': 'C#5',
    'l': 'D5',
    'p': 'D#5',
    ';': 'E5'
};

document.addEventListener('keydown', async (e) => {
    const key = e.key.toLowerCase();
    if (keyToNoteMap[key]) {
        const noteName = keyToNoteMap[key];
        if (!restMode) {
            if (Tone.context.state !== 'running') {
                await Tone.start();
            }
            synth.triggerAttackRelease(noteName, "8n");
        }

        if (chordMode) {
            currentChord.push(noteName);
            addChordBtn.disabled = false;
        } else {
            addNoteToMeasure(noteName);
        }
    } else if (key === '1') {
        setCurrentNoteDuration('w');
    } else if (key === '2') {
        setCurrentNoteDuration('h');
    } else if (key === '3') {
        setCurrentNoteDuration('q');
    } else if (key === '4') {
        setCurrentNoteDuration('8');
    } else if (key === 'r') {
        restMode = !restMode;
        restToggleBtn.textContent = "Rest Mode: " + (restMode ? "ON (R)" : "OFF (R)");
    }
});

safeRender();
updateUndoRedoButtons();
const dict = [
    ['einst', 'wilent'],
    ['frei', 'lære'],
    ['freue', 'vröwe'],
    ['grüner', 'grüener'],
    ['klee', 'kle'],
    ['lag', 'lac'],
    ['niemand', 'niemen'],
    ['nötige', 'noet'],
    ['nun', 'nu'],
    ['schnee', 'sne'],
    ['steht', 'stat'],
    ['tau', 'touwet'],
    ['will', 'welle'],
    ['wer', 'swer'],
    ['wo', 'da']
];

const happyMelody = [
    [0.4, 1, 0.8],
    [0.8, 0.5, 1],
    [0.6, 0.8, 0.7],
    [1, 0.8, 0.7],
    [1.6, 0.4, 1],
    [1.2, 1.2, 0.8],
    [2, 0.4, 1]
]

const sadMelody = [
    [2, 0.4, 1],
    [1.2, 1.2, 0.8],
    [1.6, 0.4, 1],
    [1, 0.8, 0.7],
    [0.6, 0.8, 0.7],
    [0.8, 0.5, 1],
    [0.4, 1, 0.8]
]

const funnyMelody = [
    [0.1, 2, 0.8], 
    [1.9, 1.6, 0.9], 
    [1.7, 2.4, 0.8],  
    [1.2, 0.8, 0.5],
    [0.2, 0.4, 0.8],
    [2, 0.4, 0.9],
    [1.4, 2.4, 0.8],
]

// alert user, if Web Speech API is not supported
if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser does not support text to speech!");
}

function submitText() {
    document.getElementById('btn-minnefy').disabled = true;

    // get text input
    let textLines = document.getElementById('my-textarea').value.split(/\r?\n/);
    console.log('text lines: ', textLines);
    let translatedLines = textLines;

    // split each line into words and look for each word for a translation
    for (let i = 0; i < textLines.length; i++) {
        let words = textLines[i].split(' ');
        for (let j = 0; j < words.length; j++) {
            for (let k = 0; k < dict.length; k++) {
                if (words[j].toLowerCase() === dict[k][0]) {
                    words[j] = dict[k][1];
                }
            }
        }
        translatedLines[i] = words.join(' ');
    }
    console.log('translated lines: ', translatedLines);

    // remove old paragraphs
    pars = document.getElementsByClassName('text-output');
    while (pars[0]) {
        pars[0].parentNode.removeChild(pars[0]);
    }

    // display translated text
    document.getElementById('output-container').style.display = 'block';
    translatedLines.forEach(tl => {
        par = document.createElement('p');
        par.classList.add('text-output');
        par.innerHTML = tl;
        document.getElementById('output-container').insertBefore(par, document.getElementById('music-source'));
    });

    // select music track
    let track;
    let melody;
    if (track != null) {
        track.stop();
    }
    switch (document.querySelector('input[name="mood"]:checked').value) {
        case 'happy':
            track = new Audio('audio/happy.mp3');
            melody = happyMelody;
            document.getElementById('music-source').innerHTML = 'Music: "Marked" by Alexander Nakarada [CC-BY 4.0]';
            break;
        case 'sad':
            track = new Audio('audio/sad.mp3');
            melody = sadMelody;
            document.getElementById('music-source').innerHTML = 'Music: "Now We Ride" by Alexander Nakarada [CC-BY 4.0]';
            break;
        case 'funny':
            track = new Audio('audio/funny.mp3');
            melody = funnyMelody;
            document.getElementById('music-source').innerHTML = 'Music: "The Old Tower Inn" by RandomMind [CC0]';
            break;
    }
    if (track != null) {
        track.volume = 0.5;
        track.play();
    }

    playSong(translatedLines, melody);
}

// create promise for each line of the song
const playSong = async (l, m) => {
    for (let i = 0; i < l.length; i++) {
        console.log('sing: ', l[i]);
        await sing (l[i], m[i % m.length][0], m[i % m.length][1], m[i % m.length][2]);
    }
    document.getElementById('btn-minnefy').disabled = false;
}

// sing the line with the selected text, pitch, rate and volume
const sing = (t, p, r, v) => {
    console.log(t, p, r, v);
    return new Promise(resolve => {
        const msg = new SpeechSynthesisUtterance(t);
        // get selected voice (null reverts to default)
        if (document.getElementById('select-voice').value != 'default') {
            msg.voice = returnVoice();
        }
        msg.pitch = p;
        msg.rate = r;
        msg.volume = v;
        window.speechSynthesis.speak(msg);
        // resolve promise once the line has ended
        msg.addEventListener('end', () => {
            resolve();
        });
    });
}

// return the voice with the same name that was selected from the dropdown menu
function returnVoice() {
    let v;
    speechSynthesis.getVoices().forEach(function (voice) {
        if (voice.name === document.getElementById('select-voice').value) {
            v = voice;
        }
    });
    return v;
}

// load available voices and populate dropdown menu
window.speechSynthesis.onvoiceschanged = function () {
    speechSynthesis.getVoices().forEach(function (voice) {
        opt = document.createElement('option');
        opt.value = voice.name;
        opt.innerHTML = voice.name;
        document.getElementById('select-voice').appendChild(opt);
    });
}

// open and close modal
function toggleInfo() {
    const modal = document.getElementById('info-modal');
    console.log(modal.style.display);
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}
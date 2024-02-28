const notes = {
  C: 'sounds/piano-c_C_major.WAV',
  Db: 'sounds/piano-c_C_major.WAV',
  D: 'sounds/piano-d_D_major.WAV',
  E: 'sounds/piano-e_E_major.WAV',
  Eb: 'sounds/piano-eb_D_major.WAV',
  F: 'sounds/piano-f_F_major.WAV',
  Gb: 'sounds/piano-g_GB_major.WAV',
  G: 'sounds/piano-g_G_major.WAV',
  Ab: 'sounds/piano-bb_A_major.WAV',
  A: 'sounds/piano-a_A_major.WAV',
  Bb: 'sounds/piano-c_C_major.WAV',
  B: 'sounds/piano-b_B_major.WAV',
  C2: 'sounds/piano-c_C_major.WAV',
  Db2: 'sounds/piano-c_C_major.WAV',
  D2: 'sounds/piano-d_D_major.WAV',
  E2: 'sounds/piano-e_E_major.WAV',
  Eb2: 'sounds/piano-eb_D_major.WAV',
  F2: 'sounds/piano-f_F_major.WAV',
  Gb2: 'sounds/piano-g_GB_major.WAV',
  G2: 'sounds/piano-g_G_major.WAV',
  Ab2: 'sounds/piano-bb_A_major.WAV',
  A2: 'sounds/piano-a_A_major.WAV',
  Bb2: 'sounds/piano-c_C_major.WAV',
  B2: 'sounds/piano-b_B_major.WAV',
};

function Song(nameSong, NoteOfASong) {
  this.nameSong = nameSong;
  this.NoteOfASong = NoteOfASong
}
const start1 = new Song("adele-dark", 'c c d c ');
const start2 = new Song("stan", 'r e c w u 4 8 ');
const start = new Song("choose your song", '');
const NotesOfASongS = [start, start1, start2]

const advanced1 = new Song("wedding",'z x c | c | c v c x z x c v c x z c ');
const advanced2 = new Song("so_lo", 'z x c v b n m ');
const advanced = new Song("choose your song", '');
const NotesOfASongA = [advanced, advanced1, advanced2]

const white_key = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'e', 'r', 't', 'y', 'u', 'i', 'o'];
const black_key = ['s', 'd', 'f', 'g', 'h', '4', '5', '6', '7', '8'];
let boolIsTurnOn = 0;
let boolIKeyAssist = 0;
let arrKeysLetter;
let bottomsInMusicSheet;
let DivBottomsInMusicSheet;
let boolIsOpenMusicSheet1
let boolIsOpenMusicSheet2
let boolIsOpenMusicSheet3
let boolchange = 0
let indexOfBlack, indexOfWhite
let buttonStarters;
let txt,fast=200
let boolIsOpen = 0, isRecording = 0
let arrRec = []
let playNextNote
let lastDate, today = new Date(), dates = [];
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let saveNmes = JSON.parse(localStorage.getItem("Names"));
let savePassword = JSON.parse(localStorage.getItem("Passwords"));
dates = JSON.parse(localStorage.getItem("datim"));
let isExsist = false;
const name = localStorage.getItem("Name");
const password = localStorage.getItem("Pass")
// איזור הקוד שמטפל בהפעלת צלילים עבור כל קליד

const pianoKeys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

document.addEventListener('keydown', e => {

  indexOfWhite = white_key.indexOf(e.key)
  indexOfBlack = black_key.indexOf(e.key)

  if (indexOfBlack > -1 && boolIsTurnOn == 1)
    playSound(blackKeys[indexOfBlack]);


  if (indexOfWhite > -1 && boolIsTurnOn == 1)
    playSound(whiteKeys[indexOfWhite]);

})
pianoKeys.forEach(key => {
  key.addEventListener('click', () => {
    if (boolIsTurnOn == 1) playSound(key);
  });
});

// פונקציה שמשמשת לנגן צליל
function playSound(key) {
  const note = key.dataset.note;
  console.log()
  const sound = new Audio(notes[note]);
  sound.currentTime = 0;
  if (isRecording == 1) {
    arrRec.push(note);
  }
  sound.play();
  //תאורה בעת לחיצה
  key.classList.add('active');
  setTimeout(() => {
    key.classList.remove('active');
  }, 150);

}

//מטפל בהקלטה  
document.querySelector(".Rec").addEventListener("click", Rec);
function Rec() {
  isRecording = 1
  arrRec = []

}

//השמעת ההקלטה
document.querySelector(".Play").addEventListener('click', Play);
function Play() {
  let index = 0;
  playNextNote = () => {
    if (index < arrRec.length) {
      console.log(arrRec[index])
      const soundFromRecord = new Audio(notes[arrRec[index]]);
      soundFromRecord.play();
      index++;
      setTimeout(playNextNote, 300); // Delay of 1 second (300 milliseconds)
    }
  };

  playNextNote();
}
//השמעת היצירות מהרשימה


//כיבוי או הדלקה של הפסנתר
document.querySelector(".turn").addEventListener('click', turnUp)
function turnUp() {

  if (boolIsTurnOn == 0) {
    boolIsTurnOn = 1
    document.querySelector(".turn").innerHTML = "Turn Off"
  }
  else {
    boolIsTurnOn = 0
    document.querySelector(".turn").innerHTML = "Turn On"
  }
}

//הופעה של חתימת התוים על הקלידים
document.querySelector(".key_Assiat").addEventListener('click', Assiat)
function Assiat() {
  if (boolIKeyAssist == 0) {
    boolIKeyAssist = 1;
    arrKeysLetter = document.querySelectorAll(".assists")
    arrKeysLetter.forEach(element => {
      element.style.display = "none"
    });
  }
  else {
    boolIKeyAssist = 0;
    arrKeysLetter.forEach(element => {
      element.style.display = "block"
    });
  }
}
//פתיחת דף מוזיקה 
document.querySelector(".music_sheet").addEventListener('click', openSheet)

function openSheet() {

  document.querySelector(".music_sheet").innerHTML = "close music sheet"
  document.querySelector(".music_sheet").removeEventListener('click', openSheet)
  document.querySelector(".music_sheet").addEventListener('click', closeSheet)

  bottomsInMusicSheet = document.createElement("button");
  bottomsInMusicSheet.setAttribute("class", "advanced");
  bottomsInMusicSheet.classList.add("button");
  bottomsInMusicSheet.classList.add("stage");
  txt = document.createTextNode("for advanced");
  bottomsInMusicSheet.addEventListener('click', openAdvancedSheet)
  bottomsInMusicSheet.addEventListener('click', createButtomPlay)
  bottomsInMusicSheet.appendChild(txt);
  document.querySelector(".sheet_div").appendChild(bottomsInMusicSheet);

  bottomsInMusicSheet = document.createElement("button");
  bottomsInMusicSheet.setAttribute("class", "starters");
  bottomsInMusicSheet.classList.add("button");
  bottomsInMusicSheet.classList.add("stage");
  bottomsInMusicSheet.addEventListener('click', openStarterSheet)
   bottomsInMusicSheet.addEventListener('click', createButtomPlay)
  txt = document.createTextNode("for starter");
  bottomsInMusicSheet.appendChild(txt);
  document.querySelector(".sheet_div").appendChild(bottomsInMusicSheet);
}
function closeSheet() {

  document.querySelector(".music_sheet").innerHTML = "open music sheet"
  sheetDiv = document.querySelector(".starters");
  sheetDiv.parentNode.removeChild(sheetDiv);
  sheetDiv = document.querySelector(".advanced");
  sheetDiv.parentNode.removeChild(sheetDiv);
  if (boolIsOpenMusicSheet1 == 0) {
    sheetDiv = document.querySelector(".selectSong");
    sheetDiv.parentNode.removeChild(sheetDiv);
    boolIsOpenMusicSheet1 = 1
  }
  if (boolIsOpenMusicSheet2 == 0) {
    sheetDiv = document.querySelector(".Sheet");
    sheetDiv.parentNode.removeChild(sheetDiv);
    boolIsOpenMusicSheet2 = 1
  }
  if (boolIsOpenMusicSheet3 == 0) {
    sheetDiv = document.querySelector(".playselect");
    sheetDiv.parentNode.removeChild(sheetDiv);
    boolIsOpenMusicSheet3 = 1
  }
  document.querySelector(".music_sheet").removeEventListener('click', closeSheet)
  document.querySelector(".music_sheet").addEventListener('click', openSheet)


}
//פתיחת רשימת שירים לשלב מתחילים
function openStarterSheet() {

  const selectElement = document.createElement('select')
  selectElement.setAttribute("class", "selectSong")
  selectElement.classList.add("button")
  for (let i = 0; i < NotesOfASongS.length; i++) {
    const optionElement = document.createElement('option')
  optionElement.value = NotesOfASongS[i].NoteOfASong;
  txt = document.createTextNode(NotesOfASongS[i].nameSong)
  optionElement.appendChild(txt)
  selectElement.appendChild(optionElement);
  }
  selectElement.addEventListener('change', changeSelected)
  document.querySelector(".sheet_div").appendChild(selectElement);
  boolIsOpenMusicSheet1 = 0
  fast=400
}

function openAdvancedSheet() {

  const selectElement = document.createElement('select')
  selectElement.setAttribute("class", "selectSong")
  selectElement.classList.add("button")
  for (let i = 0; i < NotesOfASongA.length; i++) {
    const optionElement = document.createElement('option')
  optionElement.value = NotesOfASongA[i].NoteOfASong;
  txt = document.createTextNode(NotesOfASongA[i].nameSong)
  optionElement.appendChild(txt)
  selectElement.appendChild(optionElement);
  }
  selectElement.addEventListener('change', changeSelected)
  document.querySelector(".sheet_div").appendChild(selectElement);
  boolIsOpenMusicSheet1 = 0
  boolchange=0
  fast=200
}
function createButtomPlay(){
  let stages = document.querySelectorAll(".stage")
  stages.forEach(element => {
    element.style.display = "none"
  });
  bottomsInMusicSheet = document.createElement("button");
  bottomsInMusicSheet.setAttribute("class", "playselect");
  bottomsInMusicSheet.addEventListener('click', playNote)
  bottomsInMusicSheet.classList.add("button");
  txt = document.createTextNode("play");
  bottomsInMusicSheet.appendChild(txt);
  document.querySelector(".sheet_div").appendChild(bottomsInMusicSheet);
  boolIsOpenMusicSheet3 = 0
  boolchange=0
}


//החלפת שיר 
function changeSelected() {
  if (boolchange == 0) {
    divelement = document.createElement("div")
    divelement.setAttribute("class", "Sheet")
    txt = document.createTextNode(this.value);

    divelement.appendChild(txt);
    document.querySelector(".sheet_div").appendChild(divelement)
    boolchange = 1;
  }
  else
    document.querySelector('.Sheet').innerHTML = this.value
  boolIsOpenMusicSheet2 = 0
  let i = 0;
  let countTrue = 0;
  let soundWinOrNot;
  document.addEventListener('keydown', e => {
    if (boolIsTurnOn == 1) {
      if(this.value[i]=='|')
      {  i+=2
         countTrue++;
      }
      console.log(i+" "+this.value[i]+" "+e.key+" ")
      console.log(this.value.length/2-2)
      console.log(countTrue)
      if (this.value[i] === e.key) {
        countTrue++;
        if (this.value.length / 2 == countTrue) {
          soundWinOrNot = new Audio("sounds/נצחון.mp3");
          soundWinOrNot.play();
          countTrue = 0;
          i = -2
        }
      }
      else
        if (this.value[i] != e.key&&this.value[i]!=undefined) {
          soundWinOrNot = new Audio("sounds/negative_beeps-6008.mp3");
          soundWinOrNot.play();
          countTrue = 0;
          i = -2;
        }

      i += 2;
    }

  })
}


let index = 0;
function playNote() {

  console.log(document.querySelector(".Sheet").innerHTML)
  let thisValue = document.querySelector(".Sheet").innerHTML
  if (index < thisValue.length) {
    if(thisValue[index]!='|'){
    indexOfWhite = white_key.indexOf(thisValue[index]);
    indexOfBlack = black_key.indexOf(thisValue[index]);

    if (indexOfBlack > -1 && boolIsTurnOn == 1) {
      playSound(blackKeys[indexOfBlack]);
    }

    if (indexOfWhite > -1 && boolIsTurnOn == 1) {
      playSound(whiteKeys[indexOfWhite]);
    }
  }
    index += 2;

    setTimeout(playNote,fast ); // Delay of fast milliseconds (0.3 seconds)
  }
  else
    index = 0
}

for (let i = 0; i < saveNmes.length; i++) {
  if (saveNmes[i] == name && password == savePassword[i]) {
    if (dates[i] != null)
      document.getElementById("see_date").innerHTML = name + ", last visit " + dates[i]
    else
      document.getElementById("see_date").innerHTML = name + ", well come"

    dates[i] = day + "." + month + '.' + year
    localStorage.setItem("datim", JSON.stringify(dates))
  }
}



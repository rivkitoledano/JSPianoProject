document.querySelector(".name").addEventListener('blur', validName)
function validName() {
  if (document.querySelector(".name").value.trim() == '')
    document.querySelector(".reRequired1").innerHTML = "Required field*"
}
document.querySelector(".password").addEventListener('blur', validPassWord)
function validPassWord() {
  if (document.querySelector(".password").value.trim() == '')
    document.querySelector(".reRequired2").innerHTML = "Required field*"
}
document.querySelector('#form').addEventListener('submit', function (event) {
  event.preventDefault();
  if (validateForm()) {
    window.location.href = '../piano.html';
  }
});
function validateForm() {

  if (document.querySelector(".name").value.trim() === '' || document.querySelector(".password").value.trim() === '') {
    validName()
    validPassWord()
    return false;
  }
  return true;
}
document.querySelector(".link").addEventListener('click', () => {
  //המרת הנתונים למערכים
  let saveNmes = JSON.parse(localStorage.getItem("Names"));
  let savePassword = JSON.parse(localStorage.getItem("Passwords"));
  let dates = JSON.parse(localStorage.getItem("datim"));

  // שומרים את הנתון הנוכחי
  let currentName = document.querySelector(".name").value;
  let pass = document.querySelector(".password").value;
  //בדיקה אם המשתמש קיים
  let IsExsist = false;
  if (saveNmes) {
      for (let index = 0; index < saveNmes.length; index++) {
          if (saveNmes[index] == currentName && savePassword[index] == pass)
              IsExsist = true;
      }
  }
  else {
      saveNmes = [];
      savePassword = [];
      dates=[];

  }
  //אם לא ,דחיפת הנתונים לתוך המערכים
  if (!IsExsist) {
  saveNmes.push(currentName);
  savePassword.push(pass);
  // המרת כל הנתונים לתוך המישתנים על מנת שנוכל להתעסק איתם ב לוקל...
  localStorage.setItem("Names", JSON.stringify(saveNmes))
  localStorage.setItem("Passwords", JSON.stringify(savePassword))
  localStorage.setItem("datim", JSON.stringify(dates))
  }
  //שינוי הנתונים על מנת שנוכל להישתמש בהם אחר כך
  localStorage.setItem("Name", currentName);
  localStorage.setItem("Pass", pass);

})

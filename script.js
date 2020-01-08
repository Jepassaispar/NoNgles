var nLetter = document.querySelector(".n");

var menuButtons = document.querySelectorAll("#menuBars button");

var soundButton = document.getElementById("soundButton");

var soundIcon = document.getElementById("soundIcon");

var mainPage = document.getElementById("mainPage");

var closePopUp = document.querySelector(".closePopUp");

function changeToSoundIcon(icon) {
  icon.src = "./img/icon-sound.png";
}

function changeToNoSoundIcon(icon) {
  icon.src = "./img/icon-no-sound.png";
}

var audio = document.getElementById("menuMusic");
audio.volume = 0.4;

changeToSoundIcon(soundIcon);

var soundOrNot = 0;
soundButton.onclick = function toggleSound() {
  // soundButton = 'pause'
  soundOrNot++;
  if (soundOrNot % 2 != 0) {
    changeToNoSoundIcon(soundIcon);
    audio.pause();
  }
  // soundButton = 'start'
  else {
    changeToSoundIcon(soundIcon);
    audio.play();
  }
};

function hoverOverButtons(button) {}

menuButtons.forEach(function(button) {
  button.onclick = hoverOverButtons;
});

/* SELECT LVL */

var selectLvl = document.querySelector("#buttonSelectLvl");

function togglePopup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

selectLvl.onclick = togglePopup;

closePopUp.onclick = togglePopup;

//  -------Buttons------//

const btnNext = document.getElementById('nextButton');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const page5 = document.getElementById('page5');
const startPage = document.getElementById('startPage');
const btnStart = document.getElementById('startButton');
const userNote = document.getElementById('noteToUser');
const choiceOther = document.getElementById('q7');
const inputOtherAnswer = document.getElementById('inputDiv');
const btnPage2 = document.getElementById('goToPage3');
const btnPage3 = document.getElementById('goToPage4');
const btnPage4 = document.getElementById('goToPage5');
const btnSubmit = document.getElementById('submitButton');

const radioButtons = document.querySelectorAll('.radio-button');
var titleHeader = document.getElementById('titleHeader');
var titleUpperCase = document.getElementById('titleUpperCase');
const question = document.getElementById('question');
var firstName = document.getElementById('name');
var userInputName = document.getElementById('userInputName');

// ----- CSS style ----- //
titleUpperCase.style.textTransform = 'uppercase';
titleUpperCase.style.fontWeight = 'bold';

titleHeader.style.fontStyle = 'italic';
titleHeader.style.fontWeight = 'bold';
userNote.classList.add('noteToUser');

// ----Event listeners ---- //

btnNext.addEventListener('click', checkFirstName);
btnStart.addEventListener('click', changePage);
btnNext.addEventListener('click', nextPageWithName);
btnPage2.addEventListener('click', goToPage3);
btnPage3.addEventListener('click', goToPage4);
btnPage4.addEventListener('click', goToPage5);
btnSubmit.addEventListener('click', submitTwo);


// ---- Functions ----- //

function checkFirstName() {
  if (!firstName.value) {
    alert('Name must be filled out');
  }
}
function changePage() {
  startPage.classList.toggle('d-none');
  page1.classList.toggle('d-none');
}
function nextPageWithName() {
  if (firstName.value) {
    page1.classList.toggle('d-none');
    page2.classList.toggle('d-none');
  }
}

function goToPage3() {
  page2.classList.toggle('d-none');
  page3.classList.toggle('d-none');
}
function goToPage4() {
  page3.classList.toggle('d-none');
  page4.classList.toggle('d-none');
}
function goToPage5() {
  page4.classList.toggle('d-none');
  page5.classList.toggle('d-none');
}

function greeting() {
  var userInputName = document.querySelectorAll('.greetingName');
  for (var i = 0; i < userInputName.length; i++) {
    userInputName[i].innerHTML = 'Hi ' + firstName.value;
    userInputName[i].style.fontWeight = 'bold';
  }
}
radioButtons.forEach((radio) => {
  radio.addEventListener('change', function () {
    if (choiceOther.checked) {
      inputOtherAnswer.classList.remove('d-none');
    } else {
      inputOtherAnswer.classList.add('d-none');
    }
  });
});
function bold() {
  var titleBold = document.querySelectorAll('.pageTitle');
  for (var i = 0; i < titleBold.length; i++) {
    titleBold[i].style.fontWeight = 'bold';
  }
}
bold();

function sliderValue() {
  var range = parseInt(document.getElementById('slider').value, 10);
  switch (range) {
    case 1:
      var page6 = document.getElementById('page6');
      page5.classList.toggle('d-none');
      page6.classList.toggle('d-none');
      break;
    case 2:
      var page7 = document.getElementById('page7');
      page5.classList.toggle('d-none');
      page7.classList.toggle('d-none');
      break;
    case 3:
      var page8 = document.getElementById('page8');
      page5.classList.toggle('d-none');
      page8.classList.toggle('d-none');
      break;
    case 4:
      var page9 = document.getElementById('page9');
      page5.classList.toggle('d-none');
      page9.classList.toggle('d-none');
      break;
    case 5:
      var page10 = document.getElementById('page10');
      page5.classList.toggle('d-none');
      page10.classList.toggle('d-none');
      break;
    default:
      console.log('Something wrong.');
  }
}
function submitTwo() {
  greeting();
  sliderValue();
}

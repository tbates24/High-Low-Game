//Buttons and Input Field

document.getElementById("input-bar").addEventListener("click", startGame);
document
  .getElementById("player-choice")
  .addEventListener("input", playerChoice);
document.getElementById("high-btn").addEventListener("click", playerHighChoice);
document.getElementById("low-btn").addEventListener("click", playerLowChoice);

const backdropElement = document.getElementById("backdrop");
const modalLinkElements = document.querySelectorAll(".info-modal");
let infoModal;

let dealer;
let randNum; //Dealer's number
let pNum; //Player's Number

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randNum = Math.floor(Math.random() * (max - min) + min);
  return randNum; //Returns the random number for the dealer
}
dealer = randomInt(2, 99); //Dealer will choose a number between 1 and 100

function startGame() {
  //Dealer's number is stored in local storage once the user clicks the "Start Game!" button
  document.getElementById("input-bar").value = dealer;
  localStorage.setItem("dealer", dealer);
}

function playerChoice() {
  pNum = document.getElementById("player-choice").value;
  if (pNum > 0 && pNum < 100) {
  } else {
    document.innerHTML = "<h2>Sorry, you need to choose a number between 1 and 100, otherwise i wont work<h2>"
    document.getElementById("player-choice").value = false
    // alert("Choose a number between 1 and 100");
  }
  localStorage.setItem("player", pNum); //Player's number is also stored in local storage once chosen
  return pNum;
}

//The player and dealer numbers are taken from local storage to apply the logic below

function playerHighChoice() {
  //High Button
  localStorage.getItem("player", pNum);
  localStorage.getItem("dealer", dealer);
  if (pNum > dealer) {
    document.getElementById("Win").innerHTML =
      "<h1>YOU WON!!! LEEETTTSSS GOOOOOOO  :D</h1>" + "<h1>The Dealer's Number was " + `${dealer}</h1`;
  } else if (pNum < dealer) {
    document.getElementById("Lost").innerHTML =
      "<h2>YOU LOST!! BOO HOO MCGOO :(</h2>" + "<h2>The Dealer's Number was " + `${dealer}</h2>`;
  }
  document.getElementById("low-btn").disabled = true;
}

function playerLowChoice() {
  //Low Button
  localStorage.getItem("player", pNum);
  localStorage.getItem("dealer", dealer);
  if (pNum < dealer) {
    document.getElementById("Win").innerHTML =
      "<h1>YOU WON!!! LEEETTTSSS GOOOOOOO  :D</h1>" + "<h1>The Dealer's Number was " + `${dealer}</h1>`
    
  } else if (pNum > dealer) {
    document.getElementById("Lost").innerHTML =
      "<h2>YOU LOST!! BOO HOO MCGOO :(</h2>" + "<h2>The Dealer's Number was " + `${dealer}</h2>`;
  }
  
  document.getElementById("high-btn").disabled = true;
}

//HTML animation function
window.onload = function () {
  animateSequence();
};

function animateSequence() {
  let a = document.getElementsByClassName("sequence");
  for (let i = 0; i < a.length; i++) {
    let $this = a[i];
    let letter = $this.innerHTML;
    letter = letter.trim();
    let str = "";
    let delay = 100;
    for (l = 0; l < letter.length; l++) {
      if (letter[l] != " ") {
        str +=
          '<span style="animation-delay:' +
          delay +
          "ms; -moz-animation-delay:" +
          delay +
          "ms; -webkit-animation-delay:" +
          delay +
          'ms; ">' +
          letter[l] +
          "</span>";
        delay += 50;
      } else str += letter[l];
    }
    $this.innerHTML = str;
  }
}

function toggleBackdrop() {
  // backdropElement.classList.toggle('visible');
}

function presentInfoModal(event) {
  // const text = event.target.dataset.text;
  toggleBackdrop();
  infoModal = document.createElement("div");
  infoModal.classList.add("modal");
  infoModal.innerHTML = ``;

  const closeButton = document.createElement("button");
  closeButton.addEventListener("click", hideInfoModal);
  closeButton.textContent = "Okay";
  infoModal.appendChild(closeButton);
  document.body.appendChild(infoModal);
}

function hideInfoModal() {
  toggleBackdrop();
  document.body.removeChild(infoModal);
}

for (const linkElement of modalLinkElements) {
  linkElement.addEventListener("click", presentInfoModal);
}

// backdropElement.addEventListener('click', hideInfoModal);

startGame(localStorage.clear());
console.log(dealer); //For coder to see the random number in the console

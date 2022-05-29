const keywords = document.getElementById("keywords");
const listKeywords = document.getElementById("list-keywords");
const random = document.getElementById("random");

let keywordsArray = [];

const submitBtn = document.getElementById("submit-keywords");
submitBtn.addEventListener("click", displayKeywordsAndButton);
const clearAllBtn = document.getElementById("clear");
clearAllBtn.addEventListener("click", removeAll);

//creates object from keywords, removes any blank accidental inputs with regex
function createKeywordObject() {
  newKeywords = keywords.value;
  keywordsArray = newKeywords.split("\n");
  if (!keywordsArray[0]) {
    listKeywords.classList.add("error");
    listKeywords.textContent = "Please enter some keywords pud";
    return;
  }
  for (let i = 0; i < keywordsArray.length; i++) {
    let regEx = /[a-z]|[A-Z]/;
    if (keywordsArray[i].match(regEx)) {
    } else {
      keywordsArray.splice(i, 1);
      i--;
    }
  }
  if (listKeywords.classList.contains("error")) {
    listKeywords.classList.remove("error");
  }
  listKeywords.textContent = `Your keywords (${keywordsArray.length}) are: 
  ${keywordsArray.join(", ")}`;
  return true;
}

function displayKeywordsAndButton() {
  if (!createKeywordObject()) {
    return;
  }
  removeRandom();
  createLabel();
  createInput();
  createIterationLabel();
  createIterationInput();
  createBtn();
}

//creates the button
function createBtn() {
  let btn = document.createElement("button");
  btn.innerHTML = "Click Me For Random!";
  btn.addEventListener("click", repeatRandomElements);
  random.appendChild(btn);
}

//creates the input
function createInput() {
  let input = document.createElement("input");
  input.type = "number";
  input.name = "randoNum";
  input.id = "randoNum";
  input.value = 5;
  input.min = 1;
  random.appendChild(input);
}

//creates the label
function createLabel() {
  let label = document.createElement("label");
  label.classList.add("new-label");
  label.classList.add("bold");
  label.for = "randoNum";
  label.innerHTML = "Number of random elements you would like:";
  random.appendChild(label);
}

//function creates label for number of iterations of random numbers
function createIterationLabel() {
  let label = document.createElement("label");
  label.classList.add("new-label");
  label.classList.add("bold");
  label.for = "iterations";
  label.innerHTML = "Number of iterations of random elements you would like:";
  random.appendChild(label);
}

//creates the input
function createIterationInput() {
  let input = document.createElement("input");
  input.type = "number";
  input.name = "iteration";
  input.id = "iteration";
  input.value = 1;
  input.min = 1;
  random.appendChild(input);
}

//loops the number of random elements the specified amount of times in iteration input
function repeatRandomElements() {
  const randomIterations = document.getElementById("iteration").value;
  for (let i = 0; i < randomIterations; i++) {
    displayRandom();
  }
}

//this function does too much
function displayRandom() {
  let input = document.getElementById("randoNum");
  let miniKeywordArray = keywordsArray.slice();
  let randomKeywords = [];
  if (!checkInputLength(input, miniKeywordArray)) {
    return;
  }
  for (let i = 0; i < input.value; i++) {
    let randomArray = Math.floor(Math.random() * miniKeywordArray.length);
    randomKeywords[i] = miniKeywordArray.splice(randomArray, 1);
  }
  let pRandomArray = document.createElement("h4");
  pRandomArray.innerHTML = randomKeywords.join(", ").toLowerCase();
  random.appendChild(pRandomArray);
}

//if you ask for more random keywords than you provided throws an error
function checkInputLength(input, miniKeywordArray) {
  if (input.value > miniKeywordArray.length) {
    let pRandomArray = document.createElement("h4");
    pRandomArray.classList.add("error");
    pRandomArray.innerHTML =
      "Your requested number of random keywords exceeds your number of provided keywords";
    random.appendChild(pRandomArray);
    return false;
  } else return true;
}
//if submit keywords is pressed again, erase everything generated
function removeRandom() {
  while (random.firstChild) {
    random.removeChild(random.firstElementChild);
  }
}

//clears all inputs and js created elements
function removeAll() {
  keywords.value = "";
  listKeywords.textContent = "";
  if (listKeywords.classList.contains("error")) {
    listKeywords.classList.remove("error");
  }
  removeRandom();
}

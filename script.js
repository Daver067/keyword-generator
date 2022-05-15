const keywords = document.getElementById("keywords");
const listKeywords = document.getElementById("list-keywords");
const random = document.getElementById("random");
let keywordsArray = [];
let randomKeywords = [];
const submitBtn = document.getElementById("submit-keywords");
submitBtn.addEventListener("click", createKeywordObject);

function createKeywordObject() {
  newKeywords = keywords.value;
  keywordsArray = newKeywords.split("\n");
  for (let i = 0; i < keywordsArray.length; i++) {
    let regEx = /[a-z]|[A-Z]/;
    if (keywordsArray[i].match(regEx)) {
    } else {
      keywordsArray.splice(i, 1);
      i--;
    }
  }
  listKeywords.textContent = `Your keywords (${keywordsArray.length}) are: 
  ${keywordsArray.join(", ")}`;
  removeRandom();
  createLabel();
  createInput();
  createBtn();
}

function createBtn() {
  let btn = document.createElement("button");
  btn.innerHTML = "Click Me For Random!";
  btn.addEventListener("click", displayRandom);
  random.appendChild(btn);
}

function createInput() {
  let input = document.createElement("input");
  input.type = "number";
  input.name = "randoNum";
  input.id = "randoNum";
  random.appendChild(input);
}
function createLabel() {
  let label = document.createElement("label");
  label.classList.add("bold");
  label.for = "randoNum";
  label.innerHTML = "Number of random elements you would like";
  random.appendChild(label);
}

function displayRandom() {
  let input = document.getElementById("randoNum");
  let miniKeywordArray = keywordsArray.slice();
  for (let i = 0; i < input.value; i++) {
    let randomArray = Math.floor(Math.random() * miniKeywordArray.length);
    randomKeywords[i] = miniKeywordArray.splice(randomArray, 1);
  }
  let pRandomArray = document.createElement("h4");
  pRandomArray.innerHTML = randomKeywords.join(", ").toLowerCase();
  random.appendChild(pRandomArray);
}

function removeRandom() {
  while (random.firstChild) {
    random.removeChild(random.firstElementChild);
  }
}

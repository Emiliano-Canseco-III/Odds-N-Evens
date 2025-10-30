// Constants to hold number bank and odd/even lists
const numberBank = [];
const odds = [];
const evens = [];

function oddNumbers() {
  return odds;
}
function evenNumbers() {
  return evens;
}

function addNumberToBank() {
  // Read the input value from the DOM and convert to number
  const value = Number(document.getElementById("number-input").value);
  if (Number.isNaN(value)) return;

  numberBank.push(value);
  renderNumberBank();
}

function sortOne() {
  if (numberBank.length === 0) return;
  const n = numberBank.shift(); // Removes first item

  if (n % 2 === 0) evens.push(n);
  else odds.push(n);

  renderNumberBank();
}

function sortAll() {
  // Uses the sortOne function over and over again in a loop.
  while (numberBank.length > 0) {
    sortOne();
  }
}

//  Render functions, update DOM.
function renderNumberBank() {
  document.getElementById("Odds-list").textContent = odds.join(", ");
  document.getElementById("Evens-list").textContent = evens.join(", ");
  document.getElementById("Bank-list").textContent = numberBank.join(", ");
}

window.addEventListener("DOMContentLoaded", () => {
  /* ===== STATE ===== */
  // Constants to hold number bank and odd/even lists
  const numberBank = []; // Numbers waiting to be sorted
  const odds = []; // Sorted odd numbers
  const evens = []; // Sorted even numbers

  /* ===== BUILD DOM ===== */
  const app = document.createElement("div");
  app.id = "app";
  document.body.appendChild(app);

  const title = document.createElement("h1");
  title.textContent = "Odds-N-Evens";
  app.appendChild(title);

  // Form
  const form = document.createElement("form");
  form.id = "number-form";

  // Creates an input element and gives it an id. type, and placeholder
  const input = document.createElement("input");
  input.id = "number-input";
  input.type = "text";
  input.placeholder = "Enter a number";

  // Creates a button element and gives it text. Then appends it to the form
  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.textContent = "Add to Bank";
  form.append(input, addBtn);
  app.appendChild(form);

  // Sort buttons
  const sortOneBtn = document.createElement("button");
  sortOneBtn.id = "sort-one-btn";
  sortOneBtn.type = "button";
  sortOneBtn.textContent = "Sort One";

  const sortAllBtn = document.createElement("button");
  sortAllBtn.id = "sort-all-btn";
  sortAllBtn.type = "button";
  sortAllBtn.textContent = "Sort All";
  app.append(sortOneBtn, sortAllBtn);

  // Lists container
  const lists = document.createElement("div");
  lists.id = "lists";

  function makeListSection(titleText, listId, countId) {
    const section = document.createElement("section");
    const heading = document.createElement("h2");

    heading.textContent = titleText + " ";
    const countSpan = document.createElement("span");
    countSpan.id = countId;
    countSpan.textContent = "0";
    heading.appendChild(countSpan);

    const listEl = document.createElement("p");
    listEl.id = listId;
    listEl.textContent = "";
    section.append(heading, listEl);
    return section;
  }

  lists.append(
    makeListSection("Bank (unsorted) - count: ", "Bank-list", "Bank-count"),
    makeListSection("Odds - count: ", "Odds-list", "Odds-count"),
    makeListSection("evens - count: ", "Evens-list", "Evens-count")
  );
  app.appendChild(lists);

  /* ===== RENDER ===== */
  function renderNumberBank() {
    const bankEl = document.getElementById("Bank-list");
    const oddsEl = document.getElementById("Odds-list");
    const evensEl = document.getElementById("Evens-list");

    if (bankEl) bankEl.textContent = numberBank.join(", ");
    if (oddsEl) oddsEl.textContent = odds.join(", ");
    if (evensEl) evensEl.textContent = evens.join(", ");

    // Counts
    const bankCount = document.getElementById("Bank-count");
    const oddsCount = document.getElementById("Odds-count");
    const evensCount = document.getElementById("Evens-count");
    if (bankCount) bankCount.textContent = String(numberBank.length);
    if (oddsCount) oddsCount.textContent = String(odds.length);
    if (evensCount) evensCount.textContent = String(evens.length);
  }

  /* ===== HELPERS ===== */
  // Return references to arrays
  function oddNumbers() {
    return odds;
  }
  function evenNumbers() {
    return evens;
  }

  /* ===== CORE ACTIONS ===== */
  // Read input, convert to number, add to bank, re-render
  function addNumberToBank(valueString) {
    const trimmed = (valueString ?? "").trim();
    if (trimmed === "") return;

    // Read the input value from the DOM and convert to number
    const value = Number(trimmed);
    if (Number.isNaN(value)) return;
    numberBank.push(value);
    renderNumberBank();
  }

  // Move first number from bank to correct list
  function sortOne() {
    if (numberBank.length === 0) return;
    const n = numberBank.shift(); // Removes first item in bank
    if (n % 2 === 0) evens.push(n);
    else odds.push(n);
    renderNumberBank();
  }

  /* ===== EVENTS ===== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addNumberToBank(input.value);

    form.reset();
    input.focus();
  });

  while (numberBank.length > 0) sortOne();
  sortOneBtn.addEventListener("click", sortOne);
  sortAllBtn.addEventListener("click", sortAll);

  //initial render
  renderNumberBank();
});

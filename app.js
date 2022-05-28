// get all bar elements and make an array of the NodeList
const allBarsElementsArr = Array.from(document.querySelectorAll(".bar--size"));

// get all day elements from DOM
const allDayElements = Array.from(document.querySelectorAll(".bar--day"));
// get the current day of the week
const allDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const currentDayNum = new Date().getDay();
const currentDay = allDays[currentDayNum];

// set the height of the highest bar (in px)
const heightOfLargestBar = 150;

// get JSON data from file, parse it and return a JS object
fetch("./data.json")
  .then((response) => response.json())
  // make a list of all of the amount values from the returned object
  .then((data) => data.map((dataPart) => dataPart.amount))
  .then((amounts) => {
    // get the value of the largest amount (this will be 100%)
    const largestAmount = amounts.reduce((curr, acc) =>
      curr > acc ? curr : acc
    );
    // calculate the % of the other amounts in relation to the largest amount
    const amountsInPercent = amounts.map(
      (amount) => (amount * 100) / largestAmount
    );
    // calculate the heights of all bars based on the amounts percentage,
    // with the highest (100%) being 150px
    const heightsOfBarsInPx = amountsInPercent.map((amount) => {
      return Math.ceil((amount * heightOfLargestBar) / 100);
    });
    // set the styles on the bars
    allBarsElementsArr.forEach((bar, idx) => {
      // add class 'current' to change color of the bar for the current day
      if (bar.nextElementSibling.textContent.startsWith(currentDay)) {
        bar.classList.add("current");
      }
      // set the height of the bars and add the text in the hover boxes
      bar.style.height = `${heightsOfBarsInPx[idx]}px`;
      bar.firstElementChild.textContent = `$${amounts[idx]}`;
    });
  });

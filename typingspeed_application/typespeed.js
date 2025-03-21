let speedTypingTest = document.getElementById("speedTypingTest");
let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let result = document.getElementById("result");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let displayTab = document.getElementById("displayTab");
let timeReset = document.getElementById("timeReset");

/*
function getAndAppendQuote() {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET",
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            quoteDisplay.textContent = jsonData.content;
        });
}
*/

let getAndAppendQuote = async () => {
  let url = "https://apis.ccbp.in/random-quote";
  let options = {
    method: "GET",
  };
  let response = await fetch(url, options);
  let jsonData = await response.json();
  quoteDisplay.textContent = jsonData.content;
};

getAndAppendQuote();

quoteDisplay.addEventListener("copy", function () {
  quoteInput.placeholder = "No cheating please!!";
  getAndAppendQuote();
});

quoteInput.addEventListener("click", function () {
  quoteInput.placeholder = "Type Here!!";
});

function timeGo() {
  timeClockId = setInterval(function () {
    let count = parseInt(timer.textContent);
    timer.textContent = count + 1;
  }, 1000);
}

timeGo();

timeReset.addEventListener("click", function () {
  quoteInput.value = "";
  clearInterval(timeClockId);
  timer.textContent = 0;
  timeGo();
});

submitBtn.addEventListener("click", function () {
  let testQuote = quoteDisplay.textContent;
  let answerQuote = quoteInput.value;
  if (testQuote === answerQuote) {
    result.textContent = "You typed in " + timer.textContent + " seconds";
    clearInterval(timeClockId);
  } else {
    result.textContent = "You typed incorrect sentence";
  }
});

resetBtn.addEventListener("click", function () {
  clearInterval(timeClockId);
  displayTab.classList.add("d-none");
  speedTypingTest.classList.add(
    "temp-height",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );

  let spinner = document.getElementById("spinner");
  speedTypingTest.appendChild(spinner);
  spinner.classList.toggle("d-none");

  getAndAppendQuote();
  let spincount = 0;
  let spinId = setInterval(function () {
    spincount += 1;
    if (spincount === 1) {
      clearInterval(spinId);
      spinner.classList.toggle("d-none");
      displayTab.classList.remove("d-none");
      speedTypingTest.classList.remove(
        "temp-height",
        "d-flex",
        "align-items-center",
        "justify-content-center"
      );
      quoteInput.value = "";
      result.textContent = "";
      timer.textContent = 0;
    }
  }, 500);

  timeGo();
});

// Get Quote From API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
  if (!loading.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  loading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quotes
    if (data.quoteText.lengh > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;

    // Stop Loader, Show Quote
    complete();
  } catch (error) {
    getQuote();
  }
}
// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authortext.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Even Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();

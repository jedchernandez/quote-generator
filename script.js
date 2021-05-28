const quoteContainer = document.getElementById("quote-generator");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get Quotes From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://morning-lowlands-12361.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    if (
      quoteText.innerText === data.quoteText &&
      authorText.innerText === data.quoteAuthor
    ) {
      return getQuote();
    } else {
      if (data.quoteAuthor === "") {
        // If Author is blank/null, add 'Unknown'
        authorText.innerText = "Unknown";
      } else {
        authorText.innerText = data.quoteAuthor;
      }
      // Reduce font size for long quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add("long-quote");
      } else {
        quoteText.classList.remove("long-quote");
      }
      quoteText.innerText = data.quoteText;
    }

    // Stop Loader, Show Quote
    removeLoadingSpinner();
  } catch (error) {
    // Possible infinite loop
    getQuote();
  }
}

// Tweet Quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();

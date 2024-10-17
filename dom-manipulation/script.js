// Array of quote objects (initial data)
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Action" }
];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length > 0) {  // Check if there are quotes available
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Update the quote display in the DOM
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    } else {
        alert("No quotes available to display."); // Edge case: when no quotes are available
    }
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Check if both quote text and category are provided
    if (quoteText && quoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Clear the input fields after adding the quote
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, refresh the quote display or notify the user
        alert("New quote added!");
    } else {
        alert("Please fill in both the quote text and category.");
    }
}

// Attach event listeners after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the "Show New Quote" button exists and attach the event listener
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    } else {
        console.error("Button to show new quotes not found.");
    }

    // Ensure the "Add Quote" button exists and attach the event listener for adding quotes
    const addQuoteButton = document.getElementById('addQuoteBtn');
    if (addQuoteButton) {
        addQuoteButton.addEventListener('click', addQuote);
    } else {
        console.error("Button to add new quotes not found.");
    }
});

// Array of quote objects (initial data)
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Action" }
];

// Function to display a random quote
function showRandomQuote() {
    console.log("Check for the displayRandomQuote function"); // Checkpoint for the function definition

    if (quotes.length > 0) {  // Check if there are quotes available
        console.log("Check for logic to select a random quote"); // Checkpoint for random quote selection logic
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Update the quote display in the DOM
        console.log("Check for logic to update the DOM with selected quote"); // Checkpoint for DOM update logic
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    } else {
        alert("No quotes available to display."); // Edge case: when no quotes are available
    }
}

// Function to add a new quote
function addQuote() {
    console.log("Check for the addQuote function"); // Checkpoint for the function definition

    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Check if both quote text and category are provided
    if (quoteText && quoteCategory) {
        console.log("Check for logic to add a new quote to the quotes array"); // Checkpoint for adding new quote to the array
        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Clear the input fields after adding the quote
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, refresh the quote display or notify the user
        alert("New quote added!");
        console.log("Check for logic to update the DOM after adding a new quote"); // Checkpoint for DOM update after adding quote
    } else {
        alert("Please fill in both the quote text and category.");
    }
}

// Attach event listeners after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Check for event listener on the 'Show New Quote' button"); // Checkpoint for event listener setup on the "Show New Quote" button
    // Ensure the "Show New Quote" button exists and attach the event listener
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    } else {
        console.error("Button to show new quotes not found.");
    }

    console.log("Check for event listener on the 'Add Quote' button"); // Checkpoint for event listener setup on the "Add Quote" button
    // Ensure the "Add Quote" button exists and attach the event listener for adding quotes
    const addQuoteButton = document.getElementById('addQuoteBtn');
    if (addQuoteButton) {
        addQuoteButton.addEventListener('click', addQuote);
    } else {
        console.error("Button to add new quotes not found.");
    }
});

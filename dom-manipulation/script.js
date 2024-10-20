// Array of quote objects (initial data)
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Action" }
];

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    console.log("Check for the displayRandomQuote function"); // Checkpoint for the function definition

    if (quotes.length > 0) {  // Check if there are quotes available
        console.log("Check for logic to select a random quote"); // Checkpoint for random quote selection logic
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Update the quote display in the DOM using innerHTML
        console.log("Check for logic to update the DOM with selected quote"); // Checkpoint for DOM update logic
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p>- ${randomQuote.category}</p>`; // Use innerHTML to allow for HTML formatting

        // Store the last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
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
        saveQuotes(); // Save updated quotes to local storage

        // Clear the input fields after adding the quote
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, refresh the quote display or notify the user
        alert("New quote added!");
        showRandomQuote(); // Display the newly added quote
    } else {
        alert("Please fill in both the quote text and category.");
    }
}

// Function to export quotes as JSON
function exportQuotesAsJson() {
    const dataStr = JSON.stringify(quotes, null, 2); // Format JSON with indentation for readability
    const blob = new Blob([dataStr], { type: 'application/json' }); // Create a blob object for the JSON data
    const url = URL.createObjectURL(blob); // Create a URL for the blob
    const a = document.createElement('a'); // Create an anchor element
    a.href = url; // Set the href to the blob URL
    a.download = 'quotes.json'; // Set the default filename
    document.body.appendChild(a); // Append the anchor to the body
    a.click(); // Programmatically click the anchor to trigger the download
    document.body.removeChild(a); // Remove the anchor from the body
    URL.revokeObjectURL(url); // Clean up the URL object
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader(); // Create a FileReader object
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result); // Parse the JSON data
        quotes.push(...importedQuotes); // Add the imported quotes to the existing array
        saveQuotes(); // Save to local storage
        alert('Quotes imported successfully!');
        showRandomQuote(); // Optionally show a random quote after importing
    };
    fileReader.readAsText(event.target.files[0]); // Read the selected file as text
}

// Attach event listeners after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Check for event listener on the 'Show New Quote' button"); // Checkpoint for event listener setup on the "Show New Quote" button
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    } else {
        console.error("Button to show new quotes not found.");
    }

    console.log("Check for event listener on the 'Add Quote' button"); // Checkpoint for event listener setup on the "Add Quote" button
    const addQuoteButton = document.getElementById('addQuoteBtn');
    if (addQuoteButton) {
        addQuoteButton.addEventListener('click', addQuote);
    } else {
        console.error("Button to add new quotes not found.");
    }

    // Load existing quotes from local storage
    loadQuotes();

    // Show last viewed quote from session storage, if it exists
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        const quote = JSON.parse(lastViewedQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p>- ${quote.category}</p>`;
    }

    // Event listener for the "Export Quotes" button
    const exportQuotesButton = document.getElementById('exportQuotesBtn');
    if (exportQuotesButton) {
        exportQuotesButton.addEventListener('click', exportQuotesAsJson);
    } else {
        console.error("Button to export quotes not found.");
    }
});

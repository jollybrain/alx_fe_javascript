// Array of quote objects (initial data)
// Load existing quotes from local storage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Action" }
];

// Function to display quotes based on the current filter
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = filteredQuotes.length > 0
        ? filteredQuotes.map(q => `<p>"${q.text}"</p><p>- ${q.category}</p>`).join('')
        : "No quotes available for this category.";
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);
    displayQuotes(filteredQuotes); // Display the filtered quotes

    // Save the last selected category in local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Function to populate the category filter dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(q => q.category))]; // Extract unique categories

    // Populate the dropdown with categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category from local storage, if available
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory; // Set the dropdown value
        filterQuotes(); // Apply filter
    }
}

// Function to show a random quote
function showRandomQuote() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);

    if (filteredQuotes.length > 0) { // Check if there are filtered quotes available
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];

        // Update the quote display in the DOM using innerHTML
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p>- ${randomQuote.category}</p>`;
    } else {
        alert("No quotes available in this category."); // Edge case: when no quotes are available
    }

    // Save the last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', quoteDisplay.innerHTML);
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Check if both quote text and category are provided
    if (quoteText && quoteCategory) {
        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });
        
        // Save updated quotes to local storage
        saveQuotes();
        
        // Populate categories again after adding a new quote
        populateCategories();

        // Clear the input fields after adding the quote
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert("New quote added!");
    } else {
        alert("Please fill in both the quote text and category.");
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to create and append the add quote form
function createAddQuoteForm() {
    // Create form elements
    const form = document.createElement('form');
    const quoteInput = document.createElement('input');
    const categoryInput = document.createElement('input');
    const addButton = document.createElement('button');

    // Set attributes for the quote input
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('placeholder', 'Enter quote text');
    quoteInput.setAttribute('required', true); // Make it required

    // Set attributes for the category input
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
    categoryInput.setAttribute('required', true); // Make it required

    // Set attributes for the add button
    addButton.setAttribute('id', 'addQuoteBtn');
    addButton.textContent = 'Add Quote';
    addButton.type = 'submit'; // Make it a submit button

    // Append inputs and button to the form
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(addButton);

    // Append form to a designated area in the DOM
    document.getElementById('addQuoteForm').appendChild(form);

    // Prevent form submission to allow the addQuote function to handle it
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        addQuote(); // Call addQuote when the form is submitted
    });
}

// Function to export quotes as a JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2); // Convert quotes array to JSON string
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click(); // Simulate click
    document.body.removeChild(a); // Remove the anchor
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Add imported quotes to the array
        saveQuotes(); // Save updated quotes to local storage

        // Populate categories after importing quotes
        populateCategories();

        alert('Quotes imported successfully!');
    };
}

// Attach event listeners after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the "Show New Quote" button exists and attach the event listener
    const newQuoteButton = document.getElementById('newQuote');
    if (newQuoteButton) {
        newQuoteButton.addEventListener('click', showRandomQuote);
    }

    // Attach event listener for exporting quotes
    const exportQuotesButton = document.getElementById('exportQuotesBtn');
    if (exportQuotesButton) {
        exportQuotesButton.addEventListener('click', exportQuotes);
    }

    // Create the add quote form
    createAddQuoteForm(); // Call the function to create the form

    // Populate the categories and restore last selected category
    populateCategories(); // Populate categories and set last selected filter

    // Display the first random quote when the page is loaded
    showRandomQuote(); // Show a random quote initially
});

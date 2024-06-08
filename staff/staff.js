// script.js

// Example: Adding a click event to all buttons
document.querySelectorAll('.product-info button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});

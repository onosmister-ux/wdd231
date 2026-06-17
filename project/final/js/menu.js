// Select elements
const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");

// Toggle menu when button is clicked
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});
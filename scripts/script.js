
document.addEventListener("DOMContentLoaded", function () {
// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    if (mobileMenu.classList.contains("hidden")) {
    mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
    } else {
    mobileMenuButton.innerHTML = '<i class="ri-close-line ri-lg"></i>';
    }
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
    e.preventDefault();
    // Close mobile menu if open
    if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
    }
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
        });
    }
    });
});


// Portfolio Filtering
const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");
portfolioFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
    // Update active filter button
    portfolioFilters.forEach((f) => {
        f.classList.remove("bg-primary", "text-white");
        f.classList.add("bg-gray-200", "text-gray-700");
    });
    this.classList.remove("bg-gray-200", "text-gray-700");
    this.classList.add("bg-primary", "text-white");
    const filterValue = this.getAttribute("data-filter");
    // Show/hide portfolio items
    portfolioItems.forEach((item) => {
        if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
        ) {
        item.classList.add("show");
        } else {
        item.classList.remove("show");
        }
    });
    });
});


// Custom Checkbox
const checkbox = document.getElementById("newsletter-checkbox");
let isChecked = false;
checkbox.addEventListener("click", function () {
    isChecked = !isChecked;
    if (isChecked) {
    this.classList.add("checked");
    } else {
    this.classList.remove("checked");
    }
});
// Budget and Timeline Option Selection
const budgetOptions = document.querySelectorAll(".budget-option");
const timelineOptions = document.querySelectorAll(".timeline-option");
function setupOptionSelection(options) {
    options.forEach((option) => {
    option.addEventListener("click", function () {
        // Remove active class from all options in the same group
        options.forEach((opt) => {
        opt.classList.remove("border-primary", "text-primary");
        opt.classList.add("border-gray-300", "text-gray-700");
        });
        // Add active class to clicked option
        this.classList.remove("border-gray-300", "text-gray-700");
        this.classList.add("border-primary", "text-primary");
    });
    });
}
setupOptionSelection(budgetOptions);
setupOptionSelection(timelineOptions);
// Form Submission
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Simple form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
    }
    // Here you would normally send the form data to a server
    // For demo purposes, we'll just show a success message
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
    checkbox.classList.remove("checked");
    isChecked = false;
});
});

document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = mobileMenuButton.querySelector("i");
    
    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
        if (mobileMenu.classList.contains("hidden")) {
            menuIcon.className = "ri-menu-line text-3xl";
        } else {
            menuIcon.className = "ri-close-line text-3xl";
        }
    });


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            // Close mobile menu if open
            if (!mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
                menuIcon.className = "ri-menu-line text-3xl";
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

    // Form validation function
    function validateForm(form) {
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const phone = form.querySelector('#phone');
        const message = form.querySelector('#message');
        
        // Basic validation
        if (name.value.trim().length < 2) {
            alert('Please enter your full name');
            name.focus();
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            alert('Please enter a valid email address');
            email.focus();
            return false;
        }
        
        // Phone validation (if provided)
        if (phone && phone.value) {
            const phoneRegex = /^[0-9\s+\-()]+$/;
            if (!phoneRegex.test(phone.value)) {
                alert('Please enter a valid phone number');
                phone.focus();
                return false;
            }
        }
        
        // Message validation
        if (message.value.trim().length < 10) {
            alert('Please provide a more detailed message (at least 10 characters)');
            message.focus();
            return false;
        }
        
        return true;
    }

    // Form Submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
            
            // If using Netlify forms, this will submit normally
            // If you want to add additional processing, you can do it here
            
            // Optional: Add loading state
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';
            }
            
            return true;
        });
    }
});


// Business Type Search
const businessOptions = [
    { value: "restaurant", label: "Restaurant", category: "Food & Beverage" },
    { value: "cafe", label: "Café", category: "Food & Beverage" },
    { value: "foodcart", label: "Food Cart/Stall", category: "Food & Beverage" },
    { value: "salon", label: "Beauty Salon/Spa", category: "Body and Beauty" },
    { value: "lawyer", label: "Lawyer", category: "Professional Services" },
    { value: "plumber", label: "Plumber", category: "Professional Services" },
    { value: "electrician", label: "Electrician", category: "Professional Services" },
    { value: "doctor", label: "Doctor", category: "Professional Services" },
    { value: "dentist", label: "Dentist", category: "Professional Services" },
    { value: "pharmacist", label: "Pharmacist", category: "Professional Services" },
    { value: "massage", label: "Massage", category: "Professional Services" },
    { value: "fitness", label: "Fitness", category: "Professional Services" },
    { value: "catering", label: "Catering", category: "Food & Beverage" },
    { value: "automotive", label: "Automotive", category: "Technical Services" },
    { value: "driving", label: "Driving School", category: "Technical Services" },
    { value: "photography", label: "Photography", category: "Professional Services" },
    { value: "other", label: "Other", category: "Other" },
    // Add all other options from your original select...
];

const searchInput = document.getElementById('business-search');
const suggestionsContainer = document.getElementById('business-suggestions');

searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.length < 1) {
        suggestionsContainer.classList.add('hidden');
        return;
    }

    const filtered = businessOptions.filter(option =>
        option.label.toLowerCase().includes(searchTerm) ||
        option.category.toLowerCase().includes(searchTerm)
    );

    displaySuggestions(filtered);
});

function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = '<div class="p-3 text-gray-500">Other (Please Specify)</div>';
        suggestionsContainer.classList.remove('hidden');
        return;
    }

    let html = '';
    let currentCategory = null;

    suggestions.forEach(option => {
        if (option.category !== currentCategory) {
            html += `<div class="sticky top-0 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">${option.category}</div>`;
            currentCategory = option.category;
        }
        html += `
        <div
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          data-value="${option.value}"
          onclick="selectSuggestion('${option.value}', '${option.label}')"
        >${option.label}</div>
      `;
    });

    suggestionsContainer.innerHTML = html;
    suggestionsContainer.classList.remove('hidden');
}

function selectSuggestion(value, label) {
    searchInput.value = label;
    document.getElementById("business-value").value = value; // Set hidden input
    suggestionsContainer.classList.add('hidden');
}

// Close suggestions when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('#business-search') && !e.target.closest('#business-suggestions')) {
        suggestionsContainer.classList.add('hidden');
    }
});
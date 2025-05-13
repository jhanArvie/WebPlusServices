
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
        // Validate fields (optional)
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !message) {
            e.preventDefault(); // Only prevent if validation fails
            alert("Please fill in all required fields.");
            return;
        }
        // Let Netlify handle submission if validation passes
    });
});


// Business Type Search
const businessOptions = [
    { value: "restaurant", label: "Restaurant", category: "Food & Beverage" },
    { value: "cafe", label: "Café", category: "Food & Beverage" },
    { value: "foodcart", label: "Food Cart/Stall", category: "Food & Beverage" },
    { value: "dental", label: "Dental Clinic", category: "Professional Services" },
    { value: "salon", label: "Beauty Salon/Spa", category: "Professional Services" },
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
        suggestionsContainer.innerHTML = '<div class="p-3 text-gray-500">No matching business types found</div>';
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
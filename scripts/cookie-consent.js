// Cookie consent functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice
    if (!localStorage.getItem('cookie-consent')) {
        // Create the cookie consent banner
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50';
        banner.innerHTML = `
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="text-sm">
                        <p class="font-medium">We use cookies to enhance your experience.</p>
                        <p class="text-gray-300">By continuing to browse, you agree to our use of cookies. <a href="../privacy-policy.html" class="text-blue-300 hover:text-white underline">Learn more</a></p>
                    </div>
                    <div class="flex gap-3">
                        <button id="cookie-consent-accept" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-button text-sm font-medium transition-colors">
                            Accept All
                        </button>
                        <button id="cookie-consent-necessary" class="bg-transparent border border-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-button text-sm font-medium transition-colors">
                            Necessary Only
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add the banner to the page
        document.body.appendChild(banner);
        
        // Add event listeners to the buttons
        document.getElementById('cookie-consent-accept').addEventListener('click', function() {
            // Set consent for all cookie types
            localStorage.setItem('cookie-consent', 'all');
            document.dispatchEvent(new CustomEvent('cookieconsent', { 
                detail: { consent: true, type: 'all' } 
            }));
            banner.remove();
        });
        
        document.getElementById('cookie-consent-necessary').addEventListener('click', function() {
            // Set consent for necessary cookies only
            localStorage.setItem('cookie-consent', 'necessary');
            document.dispatchEvent(new CustomEvent('cookieconsent', { 
                detail: { consent: false, type: 'necessary' } 
            }));
            banner.remove();
        });
        
        // Add styles for the banner
        const style = document.createElement('style');
        style.textContent = `
            #cookie-consent-banner {
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            }
            @media (max-width: 768px) {
                #cookie-consent-banner {
                    padding: 16px;
                }
            }
        `;
        document.head.appendChild(style);
    } else {
        // If user already made a choice, trigger the consent event
        const consentType = localStorage.getItem('cookie-consent');
        document.dispatchEvent(new CustomEvent('cookieconsent', { 
            detail: { 
                consent: consentType === 'all', 
                type: consentType 
            } 
        }));
    }
});

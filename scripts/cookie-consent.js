// Cookie consent functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to delete a cookie
    function deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // Function to handle cookie consent
    function handleCookieConsent(consentType, preferences = {}) {
        const consent = consentType === 'all';
        localStorage.setItem('cookie-consent', consentType);
        
        // Save preferences if provided
        if (Object.keys(preferences).length > 0) {
            localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
        } else {
            // Default preferences if none provided
            const defaultPrefs = {
                necessary: true,
                analytics: consent,
                marketing: consent,
                preferences: consent
            };
            localStorage.setItem('cookie-preferences', JSON.stringify(defaultPrefs));
        }
        
        // Set a cookie to remember the consent
        setCookie('cookie_consent', consentType, 365);
        
        // Apply the consent preferences
        applyCookiePreferences();
        
        // Dispatch event for other scripts
        document.dispatchEvent(new CustomEvent('cookieconsent', { 
            detail: { 
                consent: consent, 
                type: consentType,
                preferences: preferences,
                timestamp: new Date().toISOString()
            } 
        }));
    }

    // Function to apply cookie preferences
    function applyCookiePreferences() {
        const preferences = JSON.parse(localStorage.getItem('cookie-preferences') || '{}');
        
        // Analytics cookies
        if (!preferences.analytics) {
            deleteCookie('_ga');
            deleteCookie('_gid');
            deleteCookie('_gat');
        }
        
        // Marketing cookies
        if (!preferences.marketing) {
            deleteCookie('_fbp');
            deleteCookie('_fbc');
            // Add other marketing cookies here
        }
    }

    // Function to check if we can set a specific type of cookie
    function canSetCookie(type = 'necessary') {
        if (type === 'necessary') return true;
        
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'all') return true;
        
        const preferences = JSON.parse(localStorage.getItem('cookie-preferences') || '{}');
        return !!preferences[type];
    }

    // Show cookie settings panel
    function showCookieSettings() {
        // Remove any existing settings panel first
        const existingPanel = document.getElementById('cookie-settings-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const preferences = JSON.parse(localStorage.getItem('cookie-preferences') || '{"necessary":true,"analytics":false,"marketing":false,"preferences":false}');
        
        const settingsPanel = document.createElement('div');
        settingsPanel.id = 'cookie-settings-panel';
        settingsPanel.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        settingsPanel.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-gray-900">Cookie Settings</h3>
                        <button id="close-cookie-settings" class="text-gray-500 hover:text-gray-700">
                            <i class="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-6">
                        <!-- Necessary Cookies -->
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-900">Necessary Cookies</h4>
                                    <p class="text-sm text-gray-600">Essential for the website to function properly.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="cookie-necessary" class="sr-only peer" checked disabled>
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Analytics Cookies -->
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-900">Analytics Cookies</h4>
                                    <p class="text-sm text-gray-600">Help us understand how visitors interact with our website.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="cookie-analytics" class="sr-only peer" ${preferences.analytics ? 'checked' : ''}>
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Marketing Cookies -->
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-900">Marketing Cookies</h4>
                                    <p class="text-sm text-gray-600">Used to track visitors across websites for marketing purposes.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="cookie-marketing" class="sr-only peer" ${preferences.marketing ? 'checked' : ''}>
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Preferences Cookies -->
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium text-gray-900">Preference Cookies</h4>
                                    <p class="text-sm text-gray-600">Remember your preferences for future visits.</p>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="cookie-preferences" class="sr-only peer" ${preferences.preferences ? 'checked' : ''}>
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Buttons -->
                        <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                            <button id="save-cookie-settings" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors">
                                Save Settings
                            </button>
                            <button id="accept-all-cookies" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors">
                                Accept All
                            </button>
                            <button id="reject-all-cookies" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm font-medium transition-colors">
                                Reject All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(settingsPanel);
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        const closeSettings = () => {
            settingsPanel.remove();
            document.body.style.overflow = '';
        };
        
        // Close button
        document.getElementById('close-cookie-settings').addEventListener('click', closeSettings);
        
        // Close when clicking outside the modal
        settingsPanel.addEventListener('click', (e) => {
            if (e.target === settingsPanel) {
                closeSettings();
            }
        });
        
        // Save Settings button
        document.getElementById('save-cookie-settings').addEventListener('click', () => {
            const preferences = {
                necessary: true, // Always enabled
                analytics: document.getElementById('cookie-analytics').checked,
                marketing: document.getElementById('cookie-marketing').checked,
                preferences: document.getElementById('cookie-preferences').checked
            };
            
            const consentType = Object.values(preferences).every(v => v) ? 'all' : 'custom';
            handleCookieConsent(consentType, preferences);
            closeSettings();
            showConfirmation('Your cookie preferences have been saved.');
        });
        
        // Accept All button
        document.getElementById('accept-all-cookies').addEventListener('click', () => {
            handleCookieConsent('all', {
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            });
            closeSettings();
            showConfirmation('All cookies have been accepted.');
        });
        
        // Reject All button
        document.getElementById('reject-all-cookies').addEventListener('click', () => {
            handleCookieConsent('necessary', {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false
            });
            closeSettings();
            showConfirmation('Non-essential cookies have been rejected.');
        });
    }
    
    // Show confirmation message
    function showConfirmation(message) {
        const confirmation = document.createElement('div');
        confirmation.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        confirmation.textContent = message;
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    }

    // Initialize cookie consent
    function initCookieConsent() {
        const consentType = localStorage.getItem('cookie-consent');
        
        // If no consent has been given, show the banner
        if (!consentType) {
            showCookieBanner();
        } else {
            // Apply saved preferences
            applyCookiePreferences();
        }
        
        // Make cookie settings available globally
        window.showCookieSettings = showCookieSettings;
    }
    
    // Show cookie banner
    function showCookieBanner() {
        // Create the cookie consent banner
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50';
        banner.innerHTML = `
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="text-sm">
                        <p class="font-medium">We use cookies to enhance your experience.</p>
                        <p class="text-gray-300">By continuing to browse, you agree to our use of cookies. <a href="../services/privacy-policy.html" class="text-blue-300 hover:text-white underline">Learn more</a></p>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <button id="cookie-consent-settings" class="bg-transparent border border-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Cookie Settings
                        </button>
                        <button id="cookie-consent-necessary" class="bg-transparent border border-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Necessary Only
                        </button>
                        <button id="cookie-consent-accept" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add the banner to the page
        document.body.appendChild(banner);
        
        // Add event listeners to the buttons
        document.getElementById('cookie-consent-accept').addEventListener('click', function() {
            handleCookieConsent('all');
            banner.remove();
        });
        
        document.getElementById('cookie-consent-necessary').addEventListener('click', function() {
            handleCookieConsent('necessary');
            banner.remove();
        });
        
        document.getElementById('cookie-consent-settings').addEventListener('click', function() {
            banner.remove();
            showCookieSettings();
        });
    }

    // Make the cookie consent functions available globally
    window.cookieConsent = {
        canSet: canSetCookie,
        setConsent: handleCookieConsent,
        getConsent: () => localStorage.getItem('cookie-consent') || 'necessary',
        showSettings: showCookieSettings
    };

    // Initialize the cookie consent
    initCookieConsent();
    
    // Add event listener for cookie settings link in footer
    document.addEventListener('click', function(e) {
        if (e.target.matches('#open-cookie-settings, [href="#cookie-settings"]')) {
            e.preventDefault();
            showCookieSettings();
        }
    });
});

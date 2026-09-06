/**
 * Application Configuration
 * 
 * Note: To use your own Gemini API Key securely, you can either enter it
 * via the Chat Settings UI in the browser or replace the default key below.
 */
const CONFIG = {
    // Default demo key (can be overridden dynamically in the Chat interface)
    API_KEY: localStorage.getItem('user_gemini_key') || "AIzaSyBnXg6eL4HAyEWVfHlmQFsJsLAeIVy1Vcg",
    
    // Gemini Model Configuration
    MODEL: "gemini-2.5-flash",
    API_BASE: "https://generativelanguage.googleapis.com/v1beta/models",
    
    // Web3Forms or Contact Endpoint (Replace with your free key at web3forms.com)
    CONTACT_ENDPOINT: "https://api.web3forms.com/submit",
    WEB3FORMS_KEY: "YOUR_WEB3FORMS_ACCESS_KEY", // Optional: replace with your key or use mailto fallback
    
    // Site Metadata
    SITE_URL: "https://amitcodes.in",
    AUTHOR_EMAIL: "garaiamit64@gmail.com"
};

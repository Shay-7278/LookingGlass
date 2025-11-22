/* ==============================================
   StyleVault - Main Application Entry Point
   ==============================================
   This file initializes all components and
   bootstraps the application.
   ============================================== */

// Store
import { loadDefaultItems } from './store.js';

// Components
import { initNavigation } from './components/navigation.js';
import { initClosetFilters, renderCloset } from './components/closet.js';
import { renderCarousels } from './components/outfit-builder.js';
import { renderSavedOutfits } from './components/saved-outfits.js';
import { updateAnalytics } from './components/analytics.js';
import { generateInitialSuggestions } from './components/ai-suggestions.js';
import { initModal } from './components/modal.js';

/**
 * Initialize the application
 */
function initApp() {
    console.log('🎨 StyleVault initializing...');

    // Load default items if first visit
    loadDefaultItems();

    // Initialize components
    initNavigation();
    initClosetFilters();
    initModal();

    // Render initial content
    renderCloset();
    renderCarousels();
    renderSavedOutfits();
    updateAnalytics();
    generateInitialSuggestions();

    console.log('✅ StyleVault ready!');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

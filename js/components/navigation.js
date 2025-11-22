/* ==============================================
   Navigation Component
   ============================================== */

import { updateAnalytics } from './analytics.js';

/**
 * Initialize navigation tab functionality
 */
export function initNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => handleTabClick(tab));
    });
}

/**
 * Handle tab click event
 * @param {HTMLElement} tab - Clicked tab element
 */
function handleTabClick(tab) {
    const targetSection = tab.dataset.section;

    // Update tabs
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(targetSection).classList.add('active');

    // Refresh content if needed
    if (targetSection === 'analytics') {
        updateAnalytics();
    }
}

/**
 * Switch to a specific section programmatically
 * @param {string} sectionId - Section ID to switch to
 */
export function switchToSection(sectionId) {
    const tab = document.querySelector(`.nav-tab[data-section="${sectionId}"]`);
    if (tab) {
        handleTabClick(tab);
    }
}

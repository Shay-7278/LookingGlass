/* ==============================================
   AI Suggestions Component
   ============================================== */

import { showNotification } from '../utils/notifications.js';

// Predefined suggestions
const SUGGESTIONS = [
    { icon: '🎨', text: 'Try monochrome outfit with your black items' },
    { icon: '🌈', text: 'Add a pop of color with bright accessories' },
    { icon: '🧥', text: 'Layer your denim jacket over basic tees' },
    { icon: '👟', text: 'White sneakers go with everything!' },
    { icon: '🎯', text: 'Create a capsule wardrobe with 10 key pieces' },
    { icon: '✨', text: 'Mix textures for visual interest' },
    { icon: '👔', text: 'Dress up casual pieces with structured blazers' },
    { icon: '🎭', text: 'Try contrasting patterns for a bold look' },
    { icon: '🌙', text: 'Dark colors create a sleek evening vibe' },
    { icon: '☀️', text: 'Light colors are perfect for daytime looks' }
];

/**
 * Generate and display AI suggestions
 */
export function generateSuggestions() {
    const grid = document.getElementById('suggestionGrid');
    if (!grid) return;

    // Shuffle and pick 6 random suggestions
    const shuffled = [...SUGGESTIONS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);

    grid.innerHTML = selected.map(s => `
        <div class="suggestion-card">
            <div class="suggestion-icon">${s.icon}</div>
            <div class="suggestion-text">${s.text}</div>
        </div>
    `).join('');

    showNotification('New style suggestions generated!');
}

/**
 * Generate initial suggestions on page load
 */
export function generateInitialSuggestions() {
    const grid = document.getElementById('suggestionGrid');
    if (!grid) return;

    const initial = SUGGESTIONS.slice(0, 6);

    grid.innerHTML = initial.map(s => `
        <div class="suggestion-card">
            <div class="suggestion-icon">${s.icon}</div>
            <div class="suggestion-text">${s.text}</div>
        </div>
    `).join('');
}

// Expose to global scope for onclick handlers
window.generateSuggestions = generateSuggestions;

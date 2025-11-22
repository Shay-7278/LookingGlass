/* ==============================================
   Saved Outfits Component
   ============================================== */

import { savedOutfits } from '../store.js';

/**
 * Render saved outfits grid
 */
export function renderSavedOutfits() {
    const grid = document.getElementById('savedOutfitsGrid');

    if (!grid) return;

    if (savedOutfits.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">👗</div>
                <div class="empty-text">No saved outfits yet</div>
                <div class="empty-subtext">Use the Outfit Builder to create your first look</div>
            </div>
        `;
        return;
    }

    grid.innerHTML = savedOutfits.map(outfit => {
        const items = Object.values(outfit.items).filter(Boolean);
        return `
            <div class="outfit-card">
                <div class="outfit-items">
                    ${items.map(item => `
                        <div class="outfit-mini-item" style="background: ${item.color}20;">
                            ${item.icon}
                        </div>
                    `).join('')}
                </div>
                <div class="outfit-name">${outfit.name}</div>
                <div class="outfit-date">${outfit.date}</div>
            </div>
        `;
    }).join('');
}
